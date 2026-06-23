import { detectVagueLanguage, assessTextComplexity } from '../utils/text-analyzer.js';
import type { ScanCategory } from '@prisma/client';
import getPrisma from '../config/database.js';

export interface LanguageAnalysis {
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

const category: ScanCategory = 'LANGUAGE';

export async function analyzeLanguage(policyText: string): Promise<LanguageAnalysis> {
  const prisma = getPrisma();
  const criteria = await prisma.criterion.findMany({
    where: { category },
    orderBy: { code: 'asc' },
  });

  const vagueResult = detectVagueLanguage(policyText);
  const complexityResult = assessTextComplexity(policyText);

  const results: CriterionResult[] = [];

  for (const criterion of criteria) {
    let status: 'FOUND' | 'PARTIAL' | 'ABSENT' = 'ABSENT';
    let score = 0;
    let evidence: string | null = null;

    if (!policyText) {
      evidence = 'Politica de privacidade nao disponivel para analise de linguagem.';
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
      case 'C32':
        if (vagueResult.count === 0) {
          status = 'FOUND';
          score = criterion.weight;
          evidence = 'Nao foram encontrados termos excessivamente genericos na politica.';
        } else if (vagueResult.count <= 2) {
          status = 'PARTIAL';
          score = Math.round(criterion.weight * 0.5 * 100) / 100;
          evidence = `Poucos termos vagos encontrados: ${vagueResult.phrases.join(', ')}`;
        } else {
          evidence = `Termos vagos encontrados: ${vagueResult.phrases.join(', ')}`;
        }
        break;

      case 'C33':
        if (complexityResult.complexity === 'simple') {
          status = 'FOUND';
          score = criterion.weight;
          evidence = `Texto com linguagem clara. ${complexityResult.wordCount} palavras, media de ${complexityResult.avgSentenceLength} palavras por sentenca.`;
        } else if (complexityResult.complexity === 'moderate') {
          status = 'PARTIAL';
          score = Math.round(criterion.weight * 0.5 * 100) / 100;
          evidence = `Texto com complexidade moderada. ${complexityResult.wordCount} palavras, media de ${complexityResult.avgSentenceLength} palavras por sentenca.`;
        } else {
          evidence = `Texto complexo detectado. ${complexityResult.wordCount} palavras, media de ${complexityResult.avgSentenceLength} palavras por sentenca. Considere simplificar.`;
        }
        break;

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
  const partialCount = results.filter((r) => r.status === 'PARTIAL').length;

  const summary = `Linguagem analisada: ${foundCount} criterios atendidos, ${partialCount} parciais. ${vagueResult.count} termos vagos detectados. Complexidade: ${complexityResult.complexity}.`;

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
    'C32': 'Art. 6, VI, LGPD (Transparencia)',
    'C33': 'Art. 9, par. 1, LGPD (Clareza)',
  };
  return refs[code] || 'LGPD';
}
