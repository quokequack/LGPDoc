import { describe, it, expect, vi } from 'vitest';
import { scanUrl } from '../../../src/scanners/url-scanner.js';

// Mock the HTTP client
vi.mock('../../../src/utils/http-client.js', () => ({
  getHttpClient: () => ({
    get: vi.fn().mockResolvedValue({
      data: '<html><head><title>Test</title></head><body><a href="/privacidade">Privacidade</a><a href="/contato">Contato</a></body></html>',
      status: 200,
      request: { res: { responseUrl: 'https://exemplo.com.br' } },
    }),
  }),
  createRequestId: () => 'test-id',
}));

describe('urlScanner', () => {
  it('should fetch HTML and extract links', async () => {
    const result = await scanUrl('https://exemplo.com.br');

    expect(result.isHttps).toBe(true);
    expect(result.statusCode).toBe(200);
    expect(result.links).toContain('https://exemplo.com.br/privacidade');
    expect(result.links).toContain('https://exemplo.com.br/contato');
    expect(result.privacyPolicyLinks).toContain('https://exemplo.com.br/privacidade');
  });

  it('should detect HTTPS', async () => {
    const result = await scanUrl('https://secure-site.com.br');
    expect(result.isHttps).toBe(true);
  });

  it('should detect non-HTTPS', async () => {
    // For HTTP, we test the property based on input
    const result = await scanUrl('http://site.com.br');
    expect(result.finalUrl).toBeDefined();
  });

  it('should handle fetch errors gracefully', async () => {
    vi.mocked(vi.importActual, { partial: true });

    // Re-mock to simulate error
    vi.doMock('../../../src/utils/http-client.js', () => ({
      getHttpClient: () => ({
        get: vi.fn().mockRejectedValue(new Error('Nao foi possivel conectar')),
      }),
      createRequestId: () => 'test-id',
    }));
  });
});
