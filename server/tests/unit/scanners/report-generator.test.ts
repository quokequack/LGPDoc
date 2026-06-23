import { describe, it, expect } from 'vitest';
import { generateReport } from '../../../src/scanners/report-generator.js';
import { LEGAL_DISCLAIMER } from '../../../src/dto/report.dto.js';

function makeMockScan(overrides: Record<string, unknown> = {}) {
  return {
    id: 'scan-1',
    url: 'https://exemplo.com.br',
    status: 'COMPLETED',
    score: 65.5,
    riskLevel: 'MEDIUM',
    startedAt: new Date(),
    completedAt: new Date(),
    errorMessage: null,
    createdAt: new Date(),
    scanResults: [
      {
        id: 'sr-1',
        scanId: 'scan-1',
        category: 'PRIVACY_POLICY',
        score: 15,
        maxScore: 25,
        summary: 'Test summary',
        createdAt: new Date(),
        findings: [
          {
            id: 'f-1',
            scanResultId: 'sr-1',
            criterionId: 'c-1',
            status: 'FOUND',
            score: 3.12,
            evidence: 'Politica encontrada',
            explanation: 'Test explanation',
            lgpdReference: 'Art. 6',
            createdAt: new Date(),
            criterion: {
              id: 'c-1',
              code: 'C01',
              category: 'PRIVACY_POLICY',
              name: 'Existencia de politica',
              description: '...',
              expectedEvidence: '...',
              riskIfAbsent: 'HIGH',
              educationalExplanation: '...',
              improvementSuggestion: '...',
              weight: 3.12,
              createdAt: new Date(),
            },
            recommendations: [
              {
                id: 'r-1',
                findingId: 'f-1',
                title: 'Test rec',
                description: 'Rec description',
                priority: 'HIGH' as const,
                howToImprove: 'Do this',
                createdAt: new Date(),
              },
            ],
          },
        ],
      },
    ],
    cookieRecords: [],
    formRecords: [],
    ...overrides,
  } as const;
}

describe('reportGenerator', () => {
  it('should generate a valid report structure', () => {
    const scan = makeMockScan();
    const report = generateReport(scan as Parameters<typeof generateReport>[0]);

    expect(report.scan).toBeDefined();
    expect(report.scan.id).toBe('scan-1');
    expect(report.scan.url).toBe('https://exemplo.com.br');
    expect(report.scan.score).toBe(65.5);
    expect(report.scan.riskLevel).toBe('medium');
  });

  it('should include all categories', () => {
    const scan = makeMockScan();
    const report = generateReport(scan as Parameters<typeof generateReport>[0]);

    expect(report.categories).toBeDefined();
    expect(report.categories.length).toBeGreaterThan(0);
  });

  it('should include findings with recommendations', () => {
    const scan = makeMockScan();
    const report = generateReport(scan as Parameters<typeof generateReport>[0]);

    const category = report.categories[0];
    expect(category.findings).toHaveLength(1);
    expect(category.findings[0].criterionCode).toBe('C01');
    expect(category.findings[0].status).toBe('found');
    expect(category.findings[0].recommendations).toHaveLength(1);
  });

  it('should include cookie list', () => {
    const scan = makeMockScan();
    const report = generateReport(scan as Parameters<typeof generateReport>[0]);

    expect(report.cookies).toBeDefined();
    expect(Array.isArray(report.cookies)).toBe(true);
  });

  it('should include form list', () => {
    const scan = makeMockScan();
    const report = generateReport(scan as Parameters<typeof generateReport>[0]);

    expect(report.forms).toBeDefined();
    expect(Array.isArray(report.forms)).toBe(true);
  });

  it('should include legal disclaimer', () => {
    const scan = makeMockScan();
    const report = generateReport(scan as Parameters<typeof generateReport>[0]);

    expect(report.legalDisclaimer).toBe(LEGAL_DISCLAIMER);
  });

  it('should compute category percentage correctly', () => {
    const scan = makeMockScan({
      scanResults: [
        {
          id: 'sr-1',
          scanId: 'scan-1',
          category: 'PRIVACY_POLICY',
          score: 20,
          maxScore: 25,
          summary: 'Test',
          createdAt: new Date(),
          findings: [],
        },
      ],
    });
    const report = generateReport(scan as Parameters<typeof generateReport>[0]);

    expect(report.categories[0].percentage).toBe(80);
    expect(report.categories[0].label).toBe('Politica de Privacidade');
  });
});
