import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../../src/app.js';
import getPrisma from '../../src/config/database.js';

const prisma = getPrisma();

describe('Scan Integration Flow', () => {
  // Clean up test data after all tests
  afterAll(async () => {
    await prisma.scan.deleteMany();
    await prisma.$disconnect();
  });

  describe('POST /api/scans', () => {
    it('should create a new scan with valid URL', async () => {
      const res = await request(app)
        .post('/api/scans')
        .send({ url: 'https://exemplo.gov.br' })
        .expect(202);

      expect(res.body).toHaveProperty('id');
      expect(res.body.url).toBe('https://exemplo.gov.br');
      expect(res.body.status).toBe('pending');
      expect(res.body.score).toBeNull();
      expect(res.body.riskLevel).toBeNull();
    });

    it('should reject empty body', async () => {
      const res = await request(app)
        .post('/api/scans')
        .send({})
        .expect(400);

      expect(res.body).toHaveProperty('error');
    });

    it('should reject invalid URL', async () => {
      const res = await request(app)
        .post('/api/scans')
        .send({ url: 'not-a-url' })
        .expect(400);

      expect(res.body).toHaveProperty('error');
    });

    it('should reject missing protocol', async () => {
      const res = await request(app)
        .post('/api/scans')
        .send({ url: 'exemplo.com.br' })
        .expect(400);

      expect(res.body).toHaveProperty('error');
    });
  });

  describe('GET /api/scans/:id', () => {
    it('should return 404 for non-existent scan', async () => {
      const res = await request(app)
        .get('/api/scans/00000000-0000-0000-0000-000000000000')
        .expect(404);

      expect(res.body).toHaveProperty('error', 'Analise nao encontrada');
    });

    it('should return scan data for an existing scan', async () => {
      // First create a scan
      const createRes = await request(app)
        .post('/api/scans')
        .send({ url: 'https://exemplo.gov.br' });

      const scanId = createRes.body.id;

      // Then fetch it
      const res = await request(app)
        .get(`/api/scans/${scanId}`)
        .expect(200);

      expect(res.body.id).toBe(scanId);
      expect(res.body.url).toBe('https://exemplo.gov.br');
      expect(res.body.status).toBeDefined();
    });
  });

  describe('GET /api/scans/:id/report', () => {
    it('should return 404 for non-existent report', async () => {
      const res = await request(app)
        .get('/api/scans/00000000-0000-0000-0000-000000000000/report')
        .expect(404);

      expect(res.body).toHaveProperty('error', 'Relatorio nao encontrado');
    });

    it('should return 409 for running scan', async () => {
      const createRes = await request(app)
        .post('/api/scans')
        .send({ url: 'https://exemplo.gov.br' });

      const scanId = createRes.body.id;

      // Report should return 409 since scan is still running/pending
      const res = await request(app)
        .get(`/api/scans/${scanId}/report`);

      expect([409, 422]).toContain(res.status);
    });
  });

  describe('GET /api/scans', () => {
    it('should list scans with pagination', async () => {
      const res = await request(app)
        .get('/api/scans')
        .query({ page: 1, limit: 10 })
        .expect(200);

      expect(res.body).toHaveProperty('data');
      expect(res.body).toHaveProperty('total');
      expect(res.body).toHaveProperty('page', 1);
      expect(res.body).toHaveProperty('limit', 10);
      expect(res.body).toHaveProperty('totalPages');
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    it('should accept sort and order params', async () => {
      const res = await request(app)
        .get('/api/scans')
        .query({ sort: 'createdAt', order: 'asc' })
        .expect(200);

      expect(res.body.data).toBeDefined();
    });

    it('should reject invalid sort field', async () => {
      await request(app)
        .get('/api/scans')
        .query({ sort: 'invalid' })
        .expect(400);
    });

    it('should reject page < 1', async () => {
      await request(app)
        .get('/api/scans')
        .query({ page: 0 })
        .expect(400);
    });
  });

  describe('GET /api/health', () => {
    it('should return ok', async () => {
      const res = await request(app)
        .get('/api/health')
        .expect(200);

      expect(res.body.status).toBe('ok');
    });
  });
});
