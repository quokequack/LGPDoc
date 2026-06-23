export interface ReportResponse {
  scan: {
    id: string;
    url: string;
    score: number;
    riskLevel: string;
    completedAt: Date | null;
  };
  categories: CategoryResult[];
  cookies: CookieItem[];
  forms: FormItem[];
  legalDisclaimer: string;
}

export interface CategoryResult {
  category: string;
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
  status: string;
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
  priority: string;
  description: string;
  howToImprove: string;
}

export interface CookieItem {
  id: string;
  name: string;
  domain: string;
  type: string;
  origin: string;
  duration: string;
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
  PRIVACY_POLICY: 'Politica de Privacidade',
  COOKIES: 'Cookies',
  FORMS: 'Formularios',
  RIGHTS: 'Direitos do Titular',
  CONTROLLER: 'Controlador e Contato',
  SECURITY: 'Seguranca Basica',
  LANGUAGE: 'Linguagem Clara',
};

export const LEGAL_DISCLAIMER =
  'Esta analise tem carater exclusivamente educativo e nao constitui parecer juridico. ' +
  'A pontuacao gerada nao representa certificacao de conformidade com a LGPD. ' +
  'Para avaliacao juridica completa, consulte um profissional especializado em protecao de dados.';
