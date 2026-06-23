import { matchKeywords, LGPD_KEYWORDS } from '../utils/text-analyzer.js';
import type { ScanCategory } from '@prisma/client';
import getPrisma from '../config/database.js';

export interface RightsAnalysis {
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

const category: ScanCategory = 'RIGHTS';

export async function analyzeRights(policyText: string): Promise<RightsAnalysis> {
  const prisma = getPrisma();
  const criteria = await prisma.criterion.findMany({
    where: { category },
    orderBy: { code: 'asc' },
  });

  const results: CriterionResult[] = [];

  for (const criterion of criteria) {
    let status: 'FOUND' | 'PARTIAL' | 'ABSENT' = 'ABSENT';
    let score = 0;
    let evidence: string | null = null;
    let keywords: string[] = [];

    switch (criterion.code) {
      case 'C19':
        keywords = LGPD_KEYWORDS.rights.access;
        break;
      case 'C20':
        keywords = LGPD_KEYWORDS.rights.correction;
        break;
      case 'C21':
        keywords = LGPD_KEYWORDS.rights.deletion;
        break;
      case 'C22':
        keywords = LGPD_KEYWORDS.rights.portability;
        break;
      case 'C23':
        keywords = LGPD_KEYWORDS.rights.revocation;
        break;
      case 'C24':
        keywords = LGPD_KEYWORDS.rights.sharingInfo;
        break;
    }

    if (policyText) {
      const kw = matchKeywords(policyText, keywords);
      if (kw.found) {
        status = 'FOUND';
        score = criterion.weight;
      } else if (kw.partial) {
        status = 'PARTIAL';
        score = Math.round(criterion.weight * 0.5 * 100) / 100;
      }
      evidence = kw.matches.length > 0 ? `Termos encontrados: ${kw.matches.join(', ')}` : null;
    } else {
      evidence = 'Politica de privacidade nao disponivel para analise.';
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

  const foundCount = results.filter((r) => r.status === 'FOUND').length;
  const partialCount = results.filter((r) => r.status === 'PARTIAL').length;

  const summary = `Direitos do titular analisados: ${foundCount} mencionados, ${partialCount} parcialmente mencionados, ${results.length - foundCount - partialCount} ausentes.`;

  return {
    category,
    criteriaResults: results,
    summary,
  };
}

function mapRiskToPriority(risk: string): 'HIGH' | 'MEDIUM' | 'LOW' {
  if (risk === 'HIGH') return 'HIGH';
  if (risk === 'MEDIUM') return 'MEDIUM';
  return 'LOW';
}

function getLgpdReference(code: string): string {
  const refs: Record<string, string> = {
    'C19': 'Art. 18, I e II, LGPD (Direito de Acesso)',
    'C20': 'Art. 18, III, LGPD (Direito de Correcao)',
    'C21': 'Art. 18, V, LGPD (Direito de Exclusao)',
    'C22': 'Art. 18, V, LGPD (Direito de Portabilidade)',
    'C23': 'Art. 8, par. 5, LGPD (Revogacao do Consentimento)',
    'C24': 'Art. 18, VII, LGPD (Informacao sobre Compartilhamento)',
  };
  return refs[code] || 'LGPD';
}
