import type { ReportResponse, CategoryResult, FindingItem, CookieItem, FormItem, FormField } from '../dto/report.dto.js';
import { CATEGORY_LABELS, LEGAL_DISCLAIMER } from '../dto/report.dto.js';
import type { Scan, ScanResult, Finding, Recommendation, Criterion, CookieRecord, FormRecord, RiskLevel } from '@prisma/client';

type ScanWithRelations = Scan & {
  scanResults: (ScanResult & {
    findings: (Finding & {
      recommendations: Recommendation[];
      criterion: Criterion;
    })[];
  })[];
  cookieRecords: CookieRecord[];
  formRecords: FormRecord[];
};

export function generateReport(scan: ScanWithRelations): ReportResponse {
  const categories: CategoryResult[] = scan.scanResults.map((sr) => {
    const findings: FindingItem[] = sr.findings.map((f) => ({
      id: f.id,
      criterionCode: f.criterion.code,
      criterionName: f.criterion.name,
      status: f.status.toLowerCase(),
      score: f.score,
      maxScore: f.criterion.weight,
      evidence: f.evidence,
      explanation: f.explanation,
      lgpdReference: f.lgpdReference,
      recommendations: f.recommendations.map((rec) => ({
        id: rec.id,
        title: rec.title,
        priority: rec.priority.toLowerCase(),
        description: rec.description,
        howToImprove: rec.howToImprove,
      })),
    }));

    const percentage = sr.maxScore > 0 ? Math.round((sr.score / sr.maxScore) * 100) : 0;

    return {
      category: sr.category.toLowerCase(),
      label: CATEGORY_LABELS[sr.category] || sr.category,
      score: sr.score,
      maxScore: sr.maxScore,
      percentage,
      summary: sr.summary,
      findings,
    };
  });

  const cookies: CookieItem[] = scan.cookieRecords.map((cr) => ({
    id: cr.id,
    name: cr.name,
    domain: cr.domain,
    type: cr.type.toLowerCase() as CookieItem['type'],
    origin: cr.origin.toLowerCase() as CookieItem['origin'],
    duration: cr.duration.toLowerCase() as CookieItem['duration'],
    loadedBeforeConsent: cr.loadedBeforeConsent,
    description: cr.description,
  }));

  const forms: FormItem[] = scan.formRecords.map((fr) => {
    let fields: FormField[] = [];
    try {
      fields = JSON.parse(fr.fields);
    } catch {
      fields = [];
    }

    let sensitiveFields: string[] = [];
    try {
      sensitiveFields = JSON.parse(fr.sensitiveFields);
    } catch {
      sensitiveFields = [];
    }

    let excessiveFields: string[] = [];
    try {
      excessiveFields = JSON.parse(fr.excessiveFields);
    } catch {
      excessiveFields = [];
    }

    return {
      id: fr.id,
      pageUrl: fr.pageUrl,
      fields,
      sensitiveFields,
      excessiveFields,
      hasSecureAction: fr.hasSecureAction,
      privacyNotice: fr.privacyNotice,
    };
  });

  return {
    scan: {
      id: scan.id,
      url: scan.url,
      score: scan.score || 0,
      riskLevel: (scan.riskLevel || 'HIGH').toLowerCase(),
      completedAt: scan.completedAt,
    },
    categories,
    cookies,
    forms,
    legalDisclaimer: LEGAL_DISCLAIMER,
  };
}
