import type { RiskLevel } from '@prisma/client';

export interface CategoryScore {
  category: string;
  score: number;
  maxScore: number;
  percentage: number;
  criteriaCount: number;
  foundCount: number;
  partialCount: number;
}

export interface ScoringResult {
  totalScore: number;
  riskLevel: RiskLevel;
  categories: CategoryScore[];
}

interface CriterionResultInput {
  criterionCode: string;
  score: number;
  maxScore: number;
  status: 'FOUND' | 'PARTIAL' | 'ABSENT';
}

export function calculateTotalScore(
  categoryResults: Array<{
    category: string;
    criteriaResults: CriterionResultInput[];
  }>
): ScoringResult {
  const categories: CategoryScore[] = [];
  let totalScore = 0;
  let totalMaxScore = 0;

  for (const cat of categoryResults) {
    const catScore = cat.criteriaResults.reduce((sum, c) => sum + c.score, 0);
    const catMaxScore = cat.criteriaResults.reduce((sum, c) => sum + c.maxScore, 0);
    const foundCount = cat.criteriaResults.filter((c) => c.status === 'FOUND').length;
    const partialCount = cat.criteriaResults.filter((c) => c.status === 'PARTIAL').length;

    categories.push({
      category: cat.category,
      score: Math.round(catScore * 100) / 100,
      maxScore: Math.round(catMaxScore * 100) / 100,
      percentage: catMaxScore > 0 ? Math.round((catScore / catMaxScore) * 100) : 0,
      criteriaCount: cat.criteriaResults.length,
      foundCount,
      partialCount,
    });

    totalScore += catScore;
    totalMaxScore += catMaxScore;
  }

  // Normalize to 0-100 scale
  const normalizedScore = totalMaxScore > 0
    ? Math.round((totalScore / totalMaxScore) * 100 * 10) / 10
    : 0;

  const riskLevel = classifyRiskLevel(normalizedScore);

  return {
    totalScore: normalizedScore,
    riskLevel,
    categories,
  };
}

function classifyRiskLevel(score: number): RiskLevel {
  if (score >= 90) return 'GOOD';
  if (score >= 70) return 'LOW';
  if (score >= 40) return 'MEDIUM';
  return 'HIGH';
}
