import { getHttpClient } from '../utils/http-client.js';
import { parseHtml, extractText } from '../utils/html-parser.js';
import { matchKeywords, LGPD_KEYWORDS } from '../utils/text-analyzer.js';
import type { ScanCategory } from '@prisma/client';
import getPrisma from '../config/database.js';

export interface PrivacyPolicyAnalysis {
  category: ScanCategory;
  criteriaResults: CriterionResult[];
  summary: string;
}

interface CriterionResult {
  criterionCode: string;
  criterionName: string;
  status: 'FOUND' | 'PARTIAL' | 'ABSENT';
  score: number;
  maxScore: number;
  evidence: string | null;
  explanation: string;
  lgpdReference: string;
  recommendation?: {
    title: string;
    description: string;
    priority: 'HIGH' | 'MEDIUM' | 'LOW';
    howToImprove: string;
  };
}

const category: ScanCategory = 'PRIVACY_POLICY';

export async function analyzePrivacyPolicy(
  policyUrl: string | null,
  fallbackHtml: string
): Promise<PrivacyPolicyAnalysis> {
  const prisma = getPrisma();
  const criteria = await prisma.criterion.findMany({
    where: { category },
    orderBy: { code: 'asc' },
  });

  let policyText = '';
  let policyFound = false;

  if (policyUrl) {
    try {
      const client = getHttpClient();
      const response = await client.get(policyUrl, { responseType: 'text' });
      const html = typeof response.data === 'string' ? response.data : '';
      const $ = parseHtml(html);
      policyText = extractText($);
      policyFound = true;
    } catch {
      // If policy page is unreachable, fall back to analyzing the main page
    }
  }

  if (!policyFound && fallbackHtml) {
    const $ = parseHtml(fallbackHtml);
    policyText = extractText($);
  }

  const results: CriterionResult[] = [];

  for (const criterion of criteria) {
    let status: 'FOUND' | 'PARTIAL' | 'ABSENT' = 'ABSENT';
    let score = 0;
    let evidence: string | null = null;

    if (!policyFound && !policyText) {
      // No policy found at all
      const isC01 = criterion.code === 'C01';
      results.push({
        criterionCode: criterion.code,
        criterionName: criterion.name,
        status: isC01 ? 'ABSENT' : 'ABSENT',
        score: 0,
        maxScore: criterion.weight,
        evidence: isC01 ? 'Politica de privacidade nao encontrada no site.' : 'Politica de privacidade ausente.',
        explanation: criterion.educationalExplanation,
        lgpdReference: 'Art. 6, VI, LGPD (Transparencia)',
        recommendation: {
          title: criterion.name,
          description: criterion.description,
          priority: mapRiskToPriority(criterion.riskIfAbsent),
          howToImprove: criterion.improvementSuggestion,
        },
      });
      continue;
    }

    switch (criterion.code) {
      case 'C01':
        status = policyFound ? 'FOUND' : 'ABSENT';
        score = policyFound ? criterion.weight : 0;
        evidence = policyFound ? `Politica de privacidade encontrada em: ${policyUrl}` : null;
        break;

      case 'C02': {
        const kw = matchKeywords(policyText, LGPD_KEYWORDS.dataCollected);
        status = kwToStatus(kw);
        score = kwToScore(kw, criterion.weight);
        evidence = kw.matches.length > 0 ? `Termos encontrados: ${kw.matches.join(', ')}` : null;
        break;
      }

      case 'C03': {
        const kw = matchKeywords(policyText, LGPD_KEYWORDS.purpose);
        status = kwToStatus(kw);
        score = kwToScore(kw, criterion.weight);
        evidence = kw.matches.length > 0 ? `Termos encontrados: ${kw.matches.join(', ')}` : null;
        break;
      }

      case 'C04': {
        const kw = matchKeywords(policyText, LGPD_KEYWORDS.retention);
        status = kwToStatus(kw);
        score = kwToScore(kw, criterion.weight);
        evidence = kw.matches.length > 0 ? `Termos encontrados: ${kw.matches.join(', ')}` : null;
        break;
      }

      case 'C05': {
        const kw = matchKeywords(policyText, LGPD_KEYWORDS.sharing);
        status = kwToStatus(kw);
        score = kwToScore(kw, criterion.weight);
        evidence = kw.matches.length > 0 ? `Termos encontrados: ${kw.matches.join(', ')}` : null;
        break;
      }

      case 'C06': {
        const kw = matchKeywords(policyText, LGPD_KEYWORDS.legalBasis);
        status = kwToStatus(kw);
        score = kwToScore(kw, criterion.weight);
        evidence = kw.matches.length > 0 ? `Bases encontradas: ${kw.matches.join(', ')}` : null;
        break;
      }

      case 'C07': {
        const kw = matchKeywords(policyText, LGPD_KEYWORDS.controller);
        status = kwToStatus(kw);
        score = kwToScore(kw, criterion.weight);
        evidence = kw.matches.length > 0 ? `Termos encontrados: ${kw.matches.join(', ')}` : null;
        break;
      }

      case 'C08': {
        const kw = matchKeywords(policyText, LGPD_KEYWORDS.contact);
        status = kwToStatus(kw);
        score = kwToScore(kw, criterion.weight);
        evidence = kw.matches.length > 0 ? `Termos encontrados: ${kw.matches.join(', ')}` : null;
        break;
      }

      default: {
        const kw = matchKeywords(policyText, [criterion.name]);
        status = kwToStatus(kw);
        score = kwToScore(kw, criterion.weight);
        evidence = kw.matches.length > 0 ? `Termos encontrados: ${kw.matches.join(', ')}` : null;
      }
    }

    const recommendation = status !== 'FOUND' ? {
      title: criterion.name,
      description: criterion.description,
      priority: mapRiskToPriority(criterion.riskIfAbsent),
      howToImprove: criterion.improvementSuggestion,
    } : undefined;

    results.push({
      criterionCode: criterion.code,
      criterionName: criterion.name,
      status,
      score,
      maxScore: criterion.weight,
      evidence,
      explanation: criterion.educationalExplanation,
      lgpdReference: getLgpdReference(criterion.code),
      recommendation,
    });
  }

  const totalScore = results.reduce((sum, r) => sum + r.score, 0);
  const maxScore = results.reduce((sum, r) => sum + r.maxScore, 0);
  const foundCount = results.filter((r) => r.status === 'FOUND').length;
  const partialCount = results.filter((r) => r.status === 'PARTIAL').length;

  let summary = '';
  if (!policyFound && !policyText) {
    summary = 'Politica de privacidade nao encontrada. Todos os criterios desta categoria ficaram prejudicados.';
  } else {
    summary = `Politica analisada: ${foundCount} criterios atendidos, ${partialCount} parciais, ${results.length - foundCount - partialCount} ausentes.`;
  }

  return {
    category,
    criteriaResults: results,
    summary,
  };
}

function kwToStatus(kw: { found: boolean; partial: boolean }): 'FOUND' | 'PARTIAL' | 'ABSENT' {
  if (kw.found) return 'FOUND';
  if (kw.partial) return 'PARTIAL';
  return 'ABSENT';
}

function kwToScore(kw: { found: boolean; partial: boolean }, weight: number): number {
  if (kw.found) return weight;
  if (kw.partial) return Math.round(weight * 0.5 * 100) / 100;
  return 0;
}

function mapRiskToPriority(risk: string): 'HIGH' | 'MEDIUM' | 'LOW' {
  if (risk === 'HIGH') return 'HIGH';
  if (risk === 'MEDIUM') return 'MEDIUM';
  return 'LOW';
}

function getLgpdReference(code: string): string {
  const refs: Record<string, string> = {
    'C01': 'Art. 6, VI, LGPD (Transparencia)',
    'C02': 'Art. 6, VI, LGPD (Transparencia)',
    'C03': 'Art. 6, I, LGPD (Finalidade)',
    'C04': 'Art. 6, III, LGPD (Necessidade)',
    'C05': 'Art. 9, LGPD',
    'C06': 'Art. 7, LGPD (Bases Legais)',
    'C07': 'Art. 5, VI e Art. 6, VII, LGPD (Responsabilizacao)',
    'C08': 'Art. 9 e Art. 18, LGPD',
  };
  return refs[code] || 'LGPD';
}
