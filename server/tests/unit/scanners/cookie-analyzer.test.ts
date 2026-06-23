import { describe, it, expect } from 'vitest';
import { detectForms, extractLinks, findPrivacyPolicyLinks, detectScripts, extractText, parseHtml } from '../../../src/utils/html-parser.js';

describe('htmlParser - parseHtml', () => {
  it('should parse HTML string', () => {
    const $ = parseHtml('<html><body><p>Hello</p></body></html>');
    expect($).toBeDefined();
    expect($('p').text()).toBe('Hello');
  });
});

describe('htmlParser - extractLinks', () => {
  it('should extract absolute links', () => {
    const $ = parseHtml('<a href="https://exemplo.com/pagina">Page</a><a href="/relativa">Rel</a>');
    const links = extractLinks($, 'https://exemplo.com');
    expect(links).toContain('https://exemplo.com/pagina');
    expect(links).toContain('https://exemplo.com/relativa');
  });

  it('should deduplicate links', () => {
    const $ = parseHtml('<a href="/a">A</a><a href="/a">A</a>');
    const links = extractLinks($, 'https://exemplo.com');
    expect(links).toHaveLength(1);
  });

  it('should skip javascript: and handle hash links', () => {
    const $ = parseHtml('<a href="javascript:void(0)">JS</a>');
    const links = extractLinks($, 'https://exemplo.com');
    expect(links).toHaveLength(0);
  });
});

describe('htmlParser - findPrivacyPolicyLinks', () => {
  it('should find privacy policy links', () => {
    const links = [
      'https://exemplo.com/privacidade',
      'https://exemplo.com/contato',
      'https://exemplo.com/politica-de-privacidade',
      'https://exemplo.com/lgpd',
    ];
    const result = findPrivacyPolicyLinks(links);
    expect(result).toHaveLength(3); // privacidade, politica-de-privacidade, lgpd
    expect(result).toContain('https://exemplo.com/privacidade');
  });

  it('should not flag non-privacy links', () => {
    const links = ['https://exemplo.com/contato', 'https://exemplo.com/sobre'];
    const result = findPrivacyPolicyLinks(links);
    expect(result).toHaveLength(0);
  });
});

describe('htmlParser - detectForms', () => {
  it('should detect form fields', () => {
    const $ = parseHtml('<form><input name="email" type="email" required><input name="nome" type="text"></form>');
    const forms = detectForms($);
    expect(forms).toHaveLength(1);
    expect(forms[0].fields).toHaveLength(2);
    expect(forms[0].fields[0].name).toBe('email');
  });

  it('should skip hidden and submit inputs', () => {
    const $ = parseHtml('<form><input type="hidden" name="csrf"><input type="submit" value="Enviar"><input name="email" type="email"></form>');
    const forms = detectForms($);
    expect(forms[0].fields).toHaveLength(1);
    expect(forms[0].fields[0].name).toBe('email');
  });

  it('should return empty for pages without forms', () => {
    const $ = parseHtml('<html><body><p>No forms</p></body></html>');
    const forms = detectForms($);
    expect(forms).toHaveLength(0);
  });
});

describe('htmlParser - detectScripts', () => {
  it('should detect external scripts', () => {
    const $ = parseHtml('<script src="https://cdn.externo.com/lib.js"></script><script src="/local.js"></script>');
    const scripts = detectScripts($, 'https://exemplo.com');
    expect(scripts).toHaveLength(2);
    expect(scripts[0].isExternal).toBe(true);
    expect(scripts[1].isExternal).toBe(false);
  });
});

describe('htmlParser - extractText', () => {
  it('should extract body text excluding scripts', () => {
    const $ = parseHtml('<html><body><script>var x = 1;</script><p>Hello World</p></body></html>');
    const text = extractText($);
    expect(text).toContain('Hello World');
    expect(text).not.toContain('var x');
  });
});
