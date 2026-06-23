import { parseHtml } from '../utils/html-parser.js';
import type { ScanCategory, CookieType, CookieOrigin, CookieDuration } from '@prisma/client';
import type { CheerioAPI } from 'cheerio';
import getPrisma from '../config/database.js';

export interface CookieAnalysis {
  category: ScanCategory;
  criteriaResults: CriterionResult[];
  cookies: CookieDetection[];
  summary: string;
}

interface CriterionResult {
  criterionCode: string;
  criterionName: string;
  status: 'FOUND' | 'PARTIAL' | 'ABSENT';
  score: number;
  maxScore: number;
  evidence: string | null;
  explanation: string;
  lgpdReference: string;
  recommendation?: {
    title: string;
    description: string;
    priority: 'HIGH' | 'MEDIUM' | 'LOW';
    howToImprove: string;
  };
}

export interface CookieDetection {
  name: string;
  domain: string;
  type: CookieType;
  origin: CookieOrigin;
  duration: CookieDuration;
  loadedBeforeConsent: boolean;
  source: string;
  description: string | null;
}

const category: ScanCategory = 'COOKIES';

export async function analyzeCookies(
  htmlContent: string,
  baseUrl: string
): Promise<CookieAnalysis> {
  const prisma = getPrisma();
  const criteria = await prisma.criterion.findMany({
    where: { category },
    orderBy: { code: 'asc' },
  });

  const $ = parseHtml(htmlContent);
  const text = $('body').text().toLowerCase();
  const siteDomain = new URL(baseUrl).hostname;

  // Detect cookie banner
  const hasBanner = detectCookieBanner($, text);
  const hasAcceptBtn = detectButton($, text, ['aceitar', 'aceito', 'concordo', 'ok', 'entendi', 'fechar', 'accept', 'agree', 'got it']);
  const hasRejectBtn = detectButton($, text, ['recusar', 'rejeitar', 'nao aceito', 'reject', 'decline', 'recusar todos']);
  const hasPreferences = detectButton($, text, ['preferencias', 'configurar', 'gerenciar', 'opcoes', 'preferences', 'settings', 'manage', 'customize']);
  const hasPolicyLink = detectCookiePolicyLink($, baseUrl);

  // Extract cookies from inline scripts
  const inlineCookies = extractCookiesFromScripts(htmlContent, siteDomain);

  // Classify cookies
  const cookies: CookieDetection[] = inlineCookies.map((c) => classifyCookie(c, siteDomain));

  // Check for non-necessary cookies loaded before consent
  const nonNecessaryBeforeConsent = cookies.some(
    (c) => c.type !== 'NECESSARY' && c.loadedBeforeConsent
  );

  const results: CriterionResult[] = [];

  for (const criterion of criteria) {
    let status: 'FOUND' | 'PARTIAL' | 'ABSENT' = 'ABSENT';
    let score = 0;
    let evidence: string | null = null;

    switch (criterion.code) {
      case 'C09':
        status = hasBanner ? 'FOUND' : 'ABSENT';
        score = hasBanner ? criterion.weight : 0;
        evidence = hasBanner ? 'Banner de cookies detectado na pagina.' : 'Nenhum banner de cookies encontrado.';
        break;

      case 'C10':
        status = hasAcceptBtn ? 'FOUND' : 'ABSENT';
        score = hasAcceptBtn ? criterion.weight : 0;
        evidence = hasAcceptBtn ? 'Botao de aceitar cookies encontrado.' : 'Botao de aceitar cookies nao encontrado.';
        break;

      case 'C11':
        status = hasRejectBtn ? 'FOUND' : 'ABSENT';
        score = hasRejectBtn ? criterion.weight : 0;
        evidence = hasRejectBtn ? 'Botao de recusar cookies encontrado.' : 'Botao de recusar cookies nao encontrado.';
        break;

      case 'C12':
        status = hasPreferences ? 'FOUND' : 'ABSENT';
        score = hasPreferences ? criterion.weight : 0;
        evidence = hasPreferences ? 'Opcao de gerenciar preferencias encontrada.' : 'Opcao de gerenciar preferencias nao encontrada.';
        break;

      case 'C13':
        status = hasPolicyLink ? 'FOUND' : 'ABSENT';
        score = hasPolicyLink ? criterion.weight : 0;
        evidence = hasPolicyLink ? 'Link para politica de cookies/privacidade encontrado no banner.' : 'Link para politica nao encontrado.';
        break;

      case 'C14':
        status = nonNecessaryBeforeConsent ? 'ABSENT' : 'FOUND';
        score = nonNecessaryBeforeConsent ? 0 : criterion.weight;
        evidence = nonNecessaryBeforeConsent
          ? 'Cookies nao necessarios detectados sem mecanismo de consentimento adequado.'
          : 'Nao foram detectados cookies nao necessarios carregados antes do consentimento.';
        break;

      default:
        status = 'ABSENT';
        score = 0;
    }

    const recommendation = status !== 'FOUND' ? {
      title: criterion.name,
      description: criterion.description,
      priority: mapRiskToPriority(criterion.riskIfAbsent),
      howToImprove: criterion.improvementSuggestion,
    } : undefined;

    results.push({
      criterionCode: criterion.code,
      criterionName: criterion.name,
      status,
      score: Math.round(score * 100) / 100,
      maxScore: criterion.weight,
      evidence,
      explanation: criterion.educationalExplanation,
      lgpdReference: getLgpdReference(criterion.code),
      recommendation,
    });
  }

  const totalScore = results.reduce((sum, r) => sum + r.score, 0);
  const foundCount = results.filter((r) => r.status === 'FOUND').length;
  const partialCount = results.filter((r) => r.status === 'PARTIAL').length;

  const summary = `Cookies analisados: ${cookies.length} detectados. Banner: ${hasBanner ? 'presente' : 'ausente'}. ${foundCount} criterios atendidos, ${partialCount} parciais.`;

  return {
    category,
    criteriaResults: results,
    cookies,
    summary,
  };
}

function detectCookieBanner($: CheerioAPI, text: string): boolean {
  const bannerKeywords = ['cookie', 'cookies', 'privacidade', 'lgpd'];
  const bodyText = text;

  let keywordCount = 0;
  for (const kw of bannerKeywords) {
    if (bodyText.includes(kw)) keywordCount++;
  }

  // Check for common cookie banner classes/ids
  const bannerSelectors = [
    '[class*="cookie"]', '[id*="cookie"]',
    '[class*="banner"]', '[id*="banner"]',
    '[class*="consent"]', '[id*="consent"]',
    '[class*="lgpd"]', '[id*="lgpd"]',
    '[class*="gdpr"]', '[id*="gdpr"]',
    '[class*="notice"]', '[id*="notice"]',
    '[aria-label*="cookie"]', '[aria-label*="privacidade"]',
  ];

  let hasSelectorMatch = false;
  for (const sel of bannerSelectors) {
    if ($(sel).length > 0) {
      hasSelectorMatch = true;
      break;
    }
  }

  return hasSelectorMatch || keywordCount >= 2;
}

function detectButton($: CheerioAPI, text: string, labels: string[]): boolean {
  const buttons = $('button, a.button, a.btn, [role="button"], .button, .btn');
  let found = false;

  buttons.each((_i, el) => {
    const btnText = ($(el).text() as string).toLowerCase().trim();
    for (const label of labels) {
      if (btnText === label || btnText.includes(label)) {
        found = true;
        return false; // break loop
      }
    }
  });

  if (!found) {
    for (const label of labels) {
      if (text.includes(label)) {
        found = true;
        break;
      }
    }
  }

  return found;
}

function detectCookiePolicyLink($: CheerioAPI, baseUrl: string): boolean {
  const links = $('a[href]');
  let found = false;

  links.each((_i, el) => {
    const href = (($(el).attr('href') as string) || '').toLowerCase();
    const linkText = ($(el).text() as string).toLowerCase();
    if (
      href.includes('cookie') || href.includes('privacidade') || href.includes('privacy') ||
      linkText.includes('cookie') || linkText.includes('privacidade') || linkText.includes('politica')
    ) {
      found = true;
      return false;
    }
  });

  return found;
}

function extractCookiesFromScripts(html: string, siteDomain: string): CookieDetection[] {
  const cookies: CookieDetection[] = [];
  const cookieRegex = /document\.cookie\s*[=;].*?['"]([^'"]+)['"]/g;
  let match;

  while ((match = cookieRegex.exec(html)) !== null) {
    const cookieStr = match[1];
    const parts = cookieStr.split(';')[0].split('=');
    if (parts.length >= 1 && parts[0].trim()) {
      const name = parts[0].trim();
      if (!cookies.some((c) => c.name === name)) {
        cookies.push({
          name,
          domain: siteDomain,
          type: 'NECESSARY',
          origin: 'FIRST_PARTY',
          duration: 'SESSION',
          loadedBeforeConsent: true,
          source: 'script',
          description: null,
        });
      }
    }
  }

  return cookies;
}

function classifyCookie(cookie: CookieDetection, siteDomain: string): CookieDetection {
  const name = cookie.name.toLowerCase();
  const domain = cookie.domain.toLowerCase();

  // Classify type
  if (/session|csrf|auth|token|security/i.test(name)) {
    cookie.type = 'NECESSARY';
  } else if (/_ga|_gid|_gat|_ym_|_pk_|analytics|pixel/i.test(name)) {
    cookie.type = 'ANALYTICS';
  } else if (/pref|lang|theme|display|layout/i.test(name)) {
    cookie.type = 'FUNCTIONAL';
  } else if (/_fbp|_gcl_|ads|track|market|advert/i.test(name)) {
    cookie.type = 'MARKETING';
  }

  // Classify origin
  if (!domain.includes(siteDomain.replace('www.', ''))) {
    cookie.origin = 'THIRD_PARTY';
  }

  // Duration
  cookie.duration = 'SESSION'; // Default; could be enhanced with actual expiry parsing

  // Loaded before consent
  cookie.loadedBeforeConsent = true; // Conservative assumption for script-detected cookies

  return cookie;
}

function mapRiskToPriority(risk: string): 'HIGH' | 'MEDIUM' | 'LOW' {
  if (risk === 'HIGH') return 'HIGH';
  if (risk === 'MEDIUM') return 'MEDIUM';
  return 'LOW';
}

function getLgpdReference(code: string): string {
  const refs: Record<string, string> = {
    'C09': 'Art. 7, LGPD (Consentimento)',
    'C10': 'Art. 8, LGPD (Consentimento)',
    'C11': 'Art. 8, par. 5, LGPD (Revogacao)',
    'C12': 'Art. 8, LGPD (Consentimento Especifico)',
    'C13': 'Art. 9, LGPD (Transparencia)',
    'C14': 'Art. 7, LGPD (Consentimento Previo)',
  };
  return refs[code] || 'LGPD';
}
