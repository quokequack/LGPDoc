import { describe, it, expect } from 'vitest';
import { createScanSchema, scanListQuerySchema } from '../../../src/validators/scan.validator.js';

describe('scanValidator - createScanSchema', () => {
  it('should accept valid scan input', () => {
    expect(() => createScanSchema.parse({ url: 'https://exemplo.com.br' })).not.toThrow();
  });

  it('should reject missing URL', () => {
    expect(() => createScanSchema.parse({})).toThrow();
  });

  it('should reject invalid URL', () => {
    expect(() => createScanSchema.parse({ url: 'invalid' })).toThrow();
  });

  it('should reject empty URL', () => {
    expect(() => createScanSchema.parse({ url: '' })).toThrow('URL e obrigatoria');
  });

  it('should reject too long URL', () => {
    const long = 'https://x.com/' + 'a'.repeat(2100);
    expect(() => createScanSchema.parse({ url: long })).toThrow('URL muito longa');
  });
});

describe('scanValidator - scanListQuerySchema', () => {
  it('should use defaults for empty query', () => {
    const result = scanListQuerySchema.parse({});
    expect(result.page).toBe(1);
    expect(result.limit).toBe(20);
    expect(result.sort).toBe('createdAt');
    expect(result.order).toBe('desc');
  });

  it('should parse query params', () => {
    const result = scanListQuerySchema.parse({ page: '3', limit: '10', sort: 'score', order: 'asc' });
    expect(result.page).toBe(3);
    expect(result.limit).toBe(10);
    expect(result.sort).toBe('score');
    expect(result.order).toBe('asc');
  });

  it('should reject invalid sort field', () => {
    expect(() => scanListQuerySchema.parse({ sort: 'invalid' })).toThrow();
  });
});
