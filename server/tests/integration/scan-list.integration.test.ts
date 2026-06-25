import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../../src/app.js';
import getPrisma from '../../src/config/database.js';

const prisma = getPrisma();

describe('Scan List Integration', () => {
  beforeAll(async () => {
    // Create some test scans
    const scans = [
      { url: 'https://site-a.com.br', status: 'COMPLETED' as const, score: 85, riskLevel: 'LOW' as const },
      { url: 'https://site-b.com.br', status: 'COMPLETED' as const, score: 45, riskLevel: 'MEDIUM' as const },
      { url: 'https://site-c.com.br', status: 'PENDING' as const, score: null, riskLevel: null },
    ];

    for (const s of scans) {
      await prisma.scan.create({ data: s });
    }
  });

  afterAll(async () => {
    await prisma.scan.deleteMany({
      where: { url: { startsWith: 'https://site-' } },
    });
    await prisma.$disconnect();
  });

  it('should list scans with default pagination', async () => {
    const res = await request(app)
      .get('/api/scans')
      .expect(200);

    expect(res.body).toHaveProperty('data');
    expect(res.body).toHaveProperty('total');
    expect(res.body).toHaveProperty('page', 1);
    expect(res.body).toHaveProperty('limit', 20);
    expect(res.body).toHaveProperty('totalPages');
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('should respect page and limit params', async () => {
    const res = await request(app)
      .get('/api/scans')
      .query({ page: 1, limit: 2 })
      .expect(200);

    expect(res.body.limit).toBe(2);
    expect(res.body.data.length).toBeLessThanOrEqual(2);
  });

  it('should sort by score in ascending order', async () => {
    const res = await request(app)
      .get('/api/scans')
      .query({ sort: 'score', order: 'asc' })
      .expect(200);

    const scores = res.body.data
      .filter((s: { score: number | null }) => s.score !== null)
      .map((s: { score: number }) => s.score);

    for (let i = 1; i < scores.length; i++) {
      expect(scores[i]).toBeGreaterThanOrEqual(scores[i - 1]);
    }
  });

  it('should sort by createdAt in descending order', async () => {
    const res = await request(app)
      .get('/api/scans')
      .query({ sort: 'createdAt', order: 'desc' })
      .expect(200);

    const dates = res.body.data.map((s: { createdAt: string }) => new Date(s.createdAt).getTime());
    for (let i = 1; i < dates.length; i++) {
      expect(dates[i]).toBeLessThanOrEqual(dates[i - 1]);
    }
  });

  it('should reject page less than 1', async () => {
    await request(app)
      .get('/api/scans')
      .query({ page: 0 })
      .expect(400);
  });

  it('should reject limit greater than 100', async () => {
    await request(app)
      .get('/api/scans')
      .query({ limit: 101 })
      .expect(400);
  });

  it('should return correct total pages', async () => {
    const res = await request(app)
      .get('/api/scans')
      .query({ limit: 1 })
      .expect(200);

    expect(res.body.totalPages).toBeGreaterThanOrEqual(1);
  });
});
