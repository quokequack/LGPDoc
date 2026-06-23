import type { RiskLevel, FindingStatus, Priority, CookieType, CookieOrigin, CookieDuration, ScanCategory } from './scan.types';

export interface ReportResponse {
  scan: {
    id: string;
    url: string;
    score: number;
    riskLevel: RiskLevel;
    completedAt: string;
  };
  categories: CategoryResult[];
  cookies: CookieItem[];
  forms: FormItem[];
  legalDisclaimer: string;
}

export interface CategoryResult {
  category: ScanCategory;
  label: string;
  score: number;
  maxScore: number;
  percentage: number;
  summary: string;
  findings: FindingItem[];
}

export interface FindingItem {
  id: string;
  criterionCode: string;
  criterionName: string;
  status: FindingStatus;
  score: number;
  maxScore: number;
  evidence: string | null;
  explanation: string;
  lgpdReference: string;
  recommendations: RecommendationItem[];
}

export interface RecommendationItem {
  id: string;
  title: string;
  priority: Priority;
  description: string;
  howToImprove: string;
}

export interface CookieItem {
  id: string;
  name: string;
  domain: string;
  type: CookieType;
  origin: CookieOrigin;
  duration: CookieDuration;
  loadedBeforeConsent: boolean;
  description: string | null;
}

export interface FormField {
  name: string;
  type: string;
  label: string;
  isPersonalData: boolean;
  isSensitive: boolean;
  isRequired: boolean;
}

export interface FormItem {
  id: string;
  pageUrl: string;
  fields: FormField[];
  sensitiveFields: string[];
  excessiveFields: string[];
  hasSecureAction: boolean;
  privacyNotice: boolean;
}

export const CATEGORY_LABELS: Record<string, string> = {
  privacy_policy: 'Politica de Privacidade',
  cookies: 'Cookies',
  forms: 'Formularios',
  rights: 'Direitos do Titular',
  controller: 'Controlador e Contato',
  security: 'Seguranca Basica',
  language: 'Linguagem Clara',
};

export const RISK_LEVEL_LABELS: Record<string, string> = {
  high: 'Risco Alto',
  medium: 'Risco Medio',
  low: 'Risco Baixo',
  good: 'Boas Praticas Aparentes',
};

export const FINDING_STATUS_LABELS: Record<string, string> = {
  found: 'Encontrado',
  partial: 'Parcial',
  absent: 'Ausente',
};

export const PRIORITY_LABELS: Record<string, string> = {
  high: 'Alta',
  medium: 'Media',
  low: 'Baixa',
};

export const COOKIE_TYPE_LABELS: Record<string, string> = {
  necessary: 'Necessario',
  analytics: 'Analitico',
  functional: 'Funcional',
  marketing: 'Marketing',
};
