import { matchKeywords, LGPD_KEYWORDS, extractEmailAddresses, extractCNPJ } from '../utils/text-analyzer.js';
import type { ScanCategory } from '@prisma/client';
import getPrisma from '../config/database.js';

export interface ControllerAnalysis {
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

const category: ScanCategory = 'CONTROLLER';

export async function analyzeController(policyText: string): Promise<ControllerAnalysis> {
  const prisma = getPrisma();
  const criteria = await prisma.criterion.findMany({
    where: { category },
    orderBy: { code: 'asc' },
  });

  const emails = extractEmailAddresses(policyText);
  const cnpjs = extractCNPJ(policyText);

  // Check for privacy-related emails
  const privacyEmails = emails.filter((e) =>
    e.toLowerCase().includes('privacidade') ||
    e.toLowerCase().includes('lgpd') ||
    e.toLowerCase().includes('dpo') ||
    e.toLowerCase().includes('encarregado')
  );

  const results: CriterionResult[] = [];

  for (const criterion of criteria) {
    let status: 'FOUND' | 'PARTIAL' | 'ABSENT' = 'ABSENT';
    let score = 0;
    let evidence: string | null = null;

    if (!policyText) {
      evidence = 'Politica de privacidade nao disponivel para analise.';
      results.push({
        criterionCode: criterion.code,
        criterionName: criterion.name,
        status: 'ABSENT',
        score: 0,
        maxScore: criterion.weight,
        evidence,
        explanation: criterion.educationalExplanation,
        lgpdReference: getLgpdReference(criterion.code),
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
      case 'C25': {
        const kw = matchKeywords(policyText, LGPD_KEYWORDS.controller);
        const hasCNPJ = cnpjs.length > 0;
        if (kw.found || hasCNPJ) {
          status = kw.found ? 'FOUND' : 'PARTIAL';
          score = kw.found ? criterion.weight : Math.round(criterion.weight * 0.5 * 100) / 100;
          const parts: string[] = [];
          if (kw.matches.length > 0) parts.push(`Termos: ${kw.matches.join(', ')}`);
          if (hasCNPJ) parts.push(`CNPJ: ${cnpjs.join(', ')}`);
          evidence = parts.join('; ');
        } else {
          evidence = 'Nao foi possivel identificar o controlador na politica.';
        }
        break;
      }

      case 'C26': {
        const kw = matchKeywords(policyText, LGPD_KEYWORDS.contact);
        const hasEmail = emails.length > 0;
        if (kw.found || hasEmail) {
          status = 'FOUND';
          score = criterion.weight;
          const parts: string[] = [];
          if (kw.matches.length > 0) parts.push(`Termos: ${kw.matches.join(', ')}`);
          if (hasEmail) parts.push(`E-mails: ${emails.slice(0, 3).join(', ')}`);
          evidence = parts.join('; ');
        } else {
          evidence = 'Nenhum canal de contato para privacidade encontrado.';
        }
        break;
      }

      case 'C27': {
        const dpoKeywords = ['encarregado', 'dpo', 'data protection officer', 'encarregado de dados'];
        const hasDPO = matchKeywords(policyText, dpoKeywords).found || privacyEmails.length > 0;
        status = hasDPO ? 'FOUND' : 'ABSENT';
        score = hasDPO ? criterion.weight : 0;
        evidence = hasDPO
          ? `Indicacao de encarregado/DPO encontrada. ${privacyEmails.length > 0 ? `E-mail: ${privacyEmails.join(', ')}` : ''}`
          : 'Nao foi encontrada indicacao de encarregado/DPO.';
        break;
      }

      default:
        status = 'ABSENT';
        score = 0;
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
  const summary = `Controlador e contato analisados: ${foundCount} criterios atendidos, ${emails.length} e-mails encontrados.`;

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
    'C25': 'Art. 5, VI, LGPD (Controlador)',
    'C26': 'Art. 9, LGPD (Canal de Contato)',
    'C27': 'Art. 5, VIII, LGPD (Encarregado/DPO)',
  };
  return refs[code] || 'LGPD';
}
