import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import getPrisma from '../../../src/config/database.js';
import { listGlossary, getGlossaryTerm } from '../../../src/services/glossary.service.js';

const prisma = getPrisma();

describe('glossaryService', () => {
  beforeAll(async () => {
    // Ensure we have test data
    await prisma.glossaryTerm.upsert({
      where: { term: 'TesteTermo' },
      update: {},
      create: {
        term: 'TesteTermo',
        definition: 'Definicao de teste',
        lgpdArticle: 'Art. 1',
        relatedTerms: '["Termo A", "Termo B"]',
      },
    });
  });

  afterAll(async () => {
    await prisma.glossaryTerm.deleteMany({ where: { term: 'TesteTermo' } });
    await prisma.$disconnect();
  });

  it('should list all terms', async () => {
    const terms = await listGlossary();
    expect(terms.length).toBeGreaterThanOrEqual(1);
    expect(terms[0]).toHaveProperty('id');
    expect(terms[0]).toHaveProperty('term');
    expect(terms[0]).toHaveProperty('definition');
    expect(terms[0]).toHaveProperty('lgpdArticle');
    expect(terms[0]).toHaveProperty('relatedTerms');
    expect(Array.isArray(terms[0].relatedTerms)).toBe(true);
  });

  it('should search terms by name', async () => {
    const terms = await listGlossary('TesteTermo');
    expect(terms.length).toBe(1);
    expect(terms[0].term).toBe('TesteTermo');
  });

  it('should return empty for non-matching search', async () => {
    const terms = await listGlossary('zzzzzz_notfound');
    expect(terms.length).toBe(0);
  });

  it('should get term by ID', async () => {
    const allTerms = await listGlossary('TesteTermo');
    const term = await getGlossaryTerm(allTerms[0].id);
    expect(term).not.toBeNull();
    expect(term!.term).toBe('TesteTermo');
  });

  it('should return null for non-existent ID', async () => {
    const term = await getGlossaryTerm('00000000-0000-0000-0000-000000000000');
    expect(term).toBeNull();
  });

  it('should parse relatedTerms JSON correctly', async () => {
    const terms = await listGlossary('TesteTermo');
    expect(terms[0].relatedTerms).toContain('Termo A');
    expect(terms[0].relatedTerms).toContain('Termo B');
  });
});
