import { describe, it, expect } from 'vitest';
import { calculateTotalScore } from '../../../src/scanners/risk-scoring-engine.js';

describe('riskScoringEngine', () => {
  it('should calculate 100 for all criteria found', () => {
    const result = calculateTotalScore([
      {
        category: 'PRIVACY_POLICY',
        criteriaResults: [
          { criterionCode: 'C01', status: 'FOUND', score: 3.12, maxScore: 3.12 },
          { criterionCode: 'C02', status: 'FOUND', score: 3.12, maxScore: 3.12 },
          { criterionCode: 'C03', status: 'FOUND', score: 3.12, maxScore: 3.12 },
          { criterionCode: 'C04', status: 'FOUND', score: 3.12, maxScore: 3.12 },
        ],
      },
    ]);

    expect(result.totalScore).toBe(100);
    expect(result.riskLevel).toBe('GOOD');
  });

  it('should calculate 0 for all criteria absent', () => {
    const result = calculateTotalScore([
      {
        category: 'COOKIES',
        criteriaResults: [
          { criterionCode: 'C09', status: 'ABSENT', score: 0, maxScore: 4 },
          { criterionCode: 'C10', status: 'ABSENT', score: 0, maxScore: 4 },
        ],
      },
    ]);

    expect(result.totalScore).toBe(0);
    expect(result.riskLevel).toBe('HIGH');
  });

  it('should classify HIGH risk for score 0-39', () => {
    const result = calculateTotalScore([
      {
        category: 'TEST',
        criteriaResults: [
          { criterionCode: 'T01', status: 'FOUND', score: 20, maxScore: 100 },
          { criterionCode: 'T02', status: 'ABSENT', score: 0, maxScore: 100 },
        ],
      },
    ]);

    expect(Math.round(result.totalScore)).toBe(10);
    expect(result.riskLevel).toBe('HIGH');
  });

  it('should classify MEDIUM risk for score 40-69', () => {
    const result = calculateTotalScore([
      {
        category: 'TEST',
        criteriaResults: [
          { criterionCode: 'T01', status: 'FOUND', score: 50, maxScore: 100 },
        ],
      },
    ]);

    expect(result.riskLevel).toBe('MEDIUM');
  });

  it('should classify LOW risk for score 70-89', () => {
    const result = calculateTotalScore([
      {
        category: 'TEST',
        criteriaResults: [
          { criterionCode: 'T01', status: 'FOUND', score: 75, maxScore: 100 },
        ],
      },
    ]);

    expect(result.riskLevel).toBe('LOW');
  });

  it('should classify GOOD for score 90-100', () => {
    const result = calculateTotalScore([
      {
        category: 'TEST',
        criteriaResults: [
          { criterionCode: 'T01', status: 'FOUND', score: 95, maxScore: 100 },
        ],
      },
    ]);

    expect(result.riskLevel).toBe('GOOD');
  });

  it('should compute per-category scores', () => {
    const result = calculateTotalScore([
      {
        category: 'PRIVACY_POLICY',
        criteriaResults: [
          { criterionCode: 'C01', status: 'FOUND', score: 5, maxScore: 10 },
          { criterionCode: 'C02', status: 'FOUND', score: 5, maxScore: 10 },
        ],
      },
      {
        category: 'COOKIES',
        criteriaResults: [
          { criterionCode: 'C09', status: 'ABSENT', score: 0, maxScore: 10 },
        ],
      },
    ]);

    expect(result.categories).toHaveLength(2);
    expect(result.categories[0].percentage).toBe(50);
    expect(result.categories[0].foundCount).toBe(2);
    expect(result.categories[1].percentage).toBe(0);
    expect(result.categories[1].foundCount).toBe(0);
  });

  it('should handle partial status correctly', () => {
    const result = calculateTotalScore([
      {
        category: 'TEST',
        criteriaResults: [
          { criterionCode: 'T01', status: 'PARTIAL', score: 5, maxScore: 10 },
        ],
      },
    ]);

    expect(result.categories[0].partialCount).toBe(1);
    expect(result.categories[0].percentage).toBe(50);
  });
});
