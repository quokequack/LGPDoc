import { describe, it, expect, afterAll } from 'vitest';
import request from 'supertest';
import app from '../../src/app.js';
import getPrisma from '../../src/config/database.js';

const prisma = getPrisma();

describe('Glossary Integration', () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('GET /api/glossary', () => {
    it('should return list of glossary terms', async () => {
      const res = await request(app)
        .get('/api/glossary')
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThanOrEqual(10);
      expect(res.body[0]).toHaveProperty('term');
      expect(res.body[0]).toHaveProperty('definition');
      expect(res.body[0]).toHaveProperty('lgpdArticle');
      expect(res.body[0]).toHaveProperty('relatedTerms');
      expect(Array.isArray(res.body[0].relatedTerms)).toBe(true);
    });

    it('should filter terms by search query', async () => {
      const res = await request(app)
        .get('/api/glossary')
        .query({ search: 'consentimento' })
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      if (res.body.length > 0) {
        expect(res.body[0].term.toLowerCase()).toContain('consentimento');
      }
    });

    it('should return empty array for no matches', async () => {
      const res = await request(app)
        .get('/api/glossary')
        .query({ search: 'zzzzzzzz_notfound' })
        .expect(200);

      expect(res.body).toHaveLength(0);
    });

    it('should handle missing search param gracefully', async () => {
      const res = await request(app)
        .get('/api/glossary')
        .query({})
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('GET /api/criteria', () => {
    it('should return all criteria', async () => {
      const res = await request(app)
        .get('/api/criteria')
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(33);
      expect(res.body[0]).toHaveProperty('code');
      expect(res.body[0]).toHaveProperty('category');
      expect(res.body[0]).toHaveProperty('name');
      expect(res.body[0]).toHaveProperty('weight');
    });

    it('should filter by category', async () => {
      const res = await request(app)
        .get('/api/criteria')
        .query({ category: 'COOKIES' })
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(6); // C09-C14
      expect(res.body.every((c: { category: string }) => c.category === 'cookies')).toBe(true);
    });

    it('should reject invalid category', async () => {
      await request(app)
        .get('/api/criteria')
        .query({ category: 'INVALID' })
        .expect(400);
    });
  });
});
