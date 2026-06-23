import { scanRepository } from '../repositories/scan.repository.js';
import { scanResultRepository } from '../repositories/scan-result.repository.js';
import { findingRepository } from '../repositories/finding.repository.js';
import { recommendationRepository } from '../repositories/recommendation.repository.js';
import { cookieRecordRepository } from '../repositories/cookie-record.repository.js';
import { formRecordRepository } from '../repositories/form-record.repository.js';
import { scanUrl } from '../scanners/url-scanner.js';
import { analyzePrivacyPolicy } from '../scanners/privacy-policy-analyzer.js';
import { analyzeCookies } from '../scanners/cookie-analyzer.js';
import { analyzeForms } from '../scanners/form-analyzer.js';
import { analyzeSecurity } from '../scanners/security-checker.js';
import { analyzeRights } from '../scanners/rights-analyzer.js';
import { analyzeController } from '../scanners/controller-analyzer.js';
import { analyzeLanguage } from '../scanners/language-analyzer.js';
import { calculateTotalScore } from '../scanners/risk-scoring-engine.js';
import { parseHtml, extractText } from '../utils/html-parser.js';
import getPrisma from '../config/database.js';
import type { Scan } from '@prisma/client';

export async function startScan(url: string): Promise<Scan> {
  const scan = await scanRepository.create({ url });
  // Fire and forget the analysis
  runScanPipeline(scan.id, url).catch((err) => {
    console.error(`Scan ${scan.id} failed:`, err);
  });
  return scan;
}

async function runScanPipeline(scanId: string, url: string): Promise<void> {
  try {
    // Update to RUNNING
    await scanRepository.updateStatus(scanId, { status: 'RUNNING' });

    // Step 1: Fetch the URL
    const urlResult = await scanUrl(url);
    if (urlResult.error && !urlResult.htmlContent) {
      await scanRepository.updateStatus(scanId, {
        status: 'FAILED',
        errorMessage: urlResult.error,
      });
      return;
    }

    const htmlContent = urlResult.htmlContent;
    const policyUrl = urlResult.privacyPolicyLinks[0] || null;
    const isHttps = urlResult.isHttps;

    // Step 2: Parse privacy policy text for downstream analyzers
    let policyText = '';
    if (policyUrl) {
      try {
        const policyResult = await scanUrl(policyUrl);
        if (policyResult.htmlContent) {
          const $ = parseHtml(policyResult.htmlContent);
          policyText = extractText($);
        }
      } catch {
        // Fallback to main page text
      }
    }
    if (!policyText && htmlContent) {
      const $ = parseHtml(htmlContent);
      policyText = extractText($);
    }

    // Step 3: Run all analyzers in parallel
    const [
      privacyResult,
      cookieResult,
      formResult,
      rightsResult,
      controllerResult,
      languageResult,
    ] = await Promise.all([
      analyzePrivacyPolicy(policyUrl, htmlContent),
      analyzeCookies(htmlContent, urlResult.finalUrl),
      analyzeForms(htmlContent, urlResult.finalUrl),
      analyzeRights(policyText),
      analyzeController(policyText),
      analyzeLanguage(policyText),
    ]);

    // Step 4: Security analyzer (depends on forms and URL result)
    const formsForSecurity = formResult.forms.map((f) => ({
      pageUrl: f.pageUrl,
      action: f.action,
      hasSecureAction: f.hasSecureAction,
    }));
    const securityResult = await analyzeSecurity(
      isHttps,
      htmlContent,
      urlResult.finalUrl,
      formsForSecurity,
      urlResult.scripts
    );

    // Step 5: Calculate total score
    const allResults = [
      privacyResult,
      cookieResult,
      formResult,
      rightsResult,
      controllerResult,
      securityResult,
      languageResult,
    ];

    const scoringResult = calculateTotalScore(allResults);

    // Preload criteria to map codes to IDs
    const prisma = getPrisma();
    const allCriteria = await prisma.criterion.findMany();
    const criteriaByCode = new Map(allCriteria.map((c) => [c.code, c.id]));

    // Step 6: Persist scan results
    for (const catResult of allResults) {
      const score = catResult.criteriaResults.reduce((sum, c) => sum + c.score, 0);
      const maxScore = catResult.criteriaResults.reduce((sum, c) => sum + c.maxScore, 0);

      const scanResult = await scanResultRepository.create({
        scanId,
        category: catResult.category,
        score,
        maxScore,
        summary: catResult.summary,
      });

      // Persist findings and recommendations
      for (const cr of catResult.criteriaResults) {
        const criterionId = criteriaByCode.get(cr.criterionCode);
        if (!criterionId) continue;

        const finding = await findingRepository.create({
          scanResultId: scanResult.id,
          criterionId,
          status: cr.status,
          score: cr.score,
          evidence: cr.evidence || undefined,
          explanation: cr.explanation,
          lgpdReference: cr.lgpdReference,
        });

        if (cr.recommendation) {
          await recommendationRepository.create({
            findingId: finding.id,
            title: cr.recommendation.title,
            description: cr.recommendation.description,
            priority: cr.recommendation.priority as 'HIGH' | 'MEDIUM' | 'LOW',
            howToImprove: cr.recommendation.howToImprove,
          });
        }
      }
    }

    // Step 7: Persist cookies
    for (const cookie of cookieResult.cookies) {
      await cookieRecordRepository.create({
        scanId,
        name: cookie.name,
        domain: cookie.domain,
        type: cookie.type,
        origin: cookie.origin,
        duration: cookie.duration,
        loadedBeforeConsent: cookie.loadedBeforeConsent,
        source: cookie.source,
        description: cookie.description || undefined,
      });
    }

    // Step 8: Persist forms
    for (const form of formResult.forms) {
      await formRecordRepository.create({
        scanId,
        pageUrl: form.pageUrl,
        action: form.action,
        method: form.method,
        fields: JSON.stringify(form.fields),
        sensitiveFields: JSON.stringify(form.sensitiveFields),
        excessiveFields: JSON.stringify(form.excessiveFields),
        hasSecureAction: form.hasSecureAction,
        privacyNotice: form.privacyNotice,
      });
    }

    // Step 9: Update scan with final score
    const riskLevel = scoringResult.riskLevel as 'HIGH' | 'MEDIUM' | 'LOW' | 'GOOD';
    await scanRepository.updateScore(scanId, {
      score: scoringResult.totalScore,
      riskLevel,
    });
    await scanRepository.updateStatus(scanId, { status: 'COMPLETED' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido durante a analise';
    await scanRepository.updateStatus(scanId, {
      status: 'FAILED',
      errorMessage: message,
    });
  }
}
