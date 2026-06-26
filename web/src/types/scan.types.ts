export type ScanStatus = 'pending' | 'running' | 'completed' | 'failed';

export type RiskLevel = 'high' | 'medium' | 'low' | 'good';

export type FindingStatus = 'found' | 'partial' | 'absent';

export type Priority = 'high' | 'medium' | 'low';

export type CookieType = 'necessary' | 'analytics' | 'functional' | 'marketing';

export type CookieOrigin = 'first_party' | 'third_party';

export type CookieDuration = 'session' | 'persistent';

export type ScanCategory = 'privacy_policy' | 'cookies' | 'forms' | 'rights' | 'controller' | 'security' | 'language';

export interface ScanResponse {
  id: string;
  url: string;
  status: ScanStatus;
  score: number | null;
  riskLevel: RiskLevel | null;
  startedAt: string | null;
  completedAt: string | null;
  errorMessage: string | null;
  createdAt: string;
}

export interface CreateScanInput {
  url: string;
}

export interface ScanListItem {
  id: string;
  url: string;
  status: ScanStatus;
  score: number | null;
  riskLevel: RiskLevel | null;
  createdAt: string;
}

export interface ScanListResponse {
  data: ScanListItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
