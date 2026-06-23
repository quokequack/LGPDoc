import { describe, it, expect } from 'vitest';
import { urlSchema, urlInputSchema } from '../../../src/validators/url.validator.js';

describe('urlSchema', () => {
  it('should accept valid HTTPS URL', () => {
    expect(() => urlSchema.parse('https://exemplo.com.br')).not.toThrow();
  });

  it('should accept valid HTTP URL', () => {
    expect(() => urlSchema.parse('http://exemplo.com.br')).not.toThrow();
  });

  it('should accept URL with path', () => {
    expect(() => urlSchema.parse('https://exemplo.com.br/pagina')).not.toThrow();
  });

  it('should accept URL with query params', () => {
    expect(() => urlSchema.parse('https://exemplo.com.br?q=teste')).not.toThrow();
  });

  it('should reject empty string', () => {
    expect(() => urlSchema.parse('')).toThrow('URL e obrigatoria');
  });

  it('should reject whitespace-only string', () => {
    expect(() => urlSchema.parse('   ')).toThrow('URL e obrigatoria');
  });

  it('should reject URL without protocol', () => {
    expect(() => urlSchema.parse('exemplo.com.br')).toThrow();
  });

  it('should reject ftp URL', () => {
    expect(() => urlSchema.parse('ftp://exemplo.com.br')).toThrow();
  });

  it('should reject malformed URL', () => {
    expect(() => urlSchema.parse('not-a-url')).toThrow();
  });

  it('should reject overly long URL', () => {
    const longUrl = 'https://exemplo.com.br/' + 'a'.repeat(2100);
    expect(() => urlSchema.parse(longUrl)).toThrow('URL muito longa');
  });
});

describe('urlInputSchema', () => {
  it('should accept object with valid URL', () => {
    expect(() => urlInputSchema.parse({ url: 'https://exemplo.com.br' })).not.toThrow();
  });

  it('should reject missing url field', () => {
    expect(() => urlInputSchema.parse({})).toThrow();
  });

  it('should reject invalid URL in object', () => {
    expect(() => urlInputSchema.parse({ url: 'invalid' })).toThrow();
  });
});
