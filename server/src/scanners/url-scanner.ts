import { getHttpClient } from '../utils/http-client.js';
import { parseHtml, extractLinks, findPrivacyPolicyLinks, detectScripts } from '../utils/html-parser.js';

export interface UrlScanResult {
  url: string;
  finalUrl: string;
  isHttps: boolean;
  statusCode: number;
  htmlContent: string;
  links: string[];
  privacyPolicyLinks: string[];
  scripts: Array<{ src: string; isExternal: boolean }>;
  error?: string;
}

export async function scanUrl(targetUrl: string): Promise<UrlScanResult> {
  const client = getHttpClient();

  try {
    const response = await client.get(targetUrl, {
      responseType: 'text',
      maxRedirects: 5,
    });

    const htmlContent = typeof response.data === 'string' ? response.data : '';
    const finalUrl = response.request?.res?.responseUrl || targetUrl;

    const $ = parseHtml(htmlContent);
    const links = extractLinks($, finalUrl);
    const privacyPolicyLinks = findPrivacyPolicyLinks(links);
    const scripts = detectScripts($, finalUrl);

    const isHttps = new URL(finalUrl).protocol === 'https:';

    return {
      url: targetUrl,
      finalUrl,
      isHttps,
      statusCode: response.status,
      htmlContent,
      links,
      privacyPolicyLinks,
      scripts,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido ao acessar o site';
    return {
      url: targetUrl,
      finalUrl: targetUrl,
      isHttps: targetUrl.startsWith('https://'),
      statusCode: 0,
      htmlContent: '',
      links: [],
      privacyPolicyLinks: [],
      scripts: [],
      error: message,
    };
  }
}
