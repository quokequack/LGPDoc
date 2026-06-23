export enum ScanStatus {
  PENDING = 'pending',
  RUNNING = 'running',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export enum RiskLevel {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
  GOOD = 'good',
}

export enum FindingStatus {
  FOUND = 'found',
  PARTIAL = 'partial',
  ABSENT = 'absent',
}

export enum Priority {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

export enum CookieType {
  NECESSARY = 'necessary',
  ANALYTICS = 'analytics',
  FUNCTIONAL = 'functional',
  MARKETING = 'marketing',
}

export enum CookieOrigin {
  FIRST_PARTY = 'first_party',
  THIRD_PARTY = 'third_party',
}

export enum CookieDuration {
  SESSION = 'session',
  PERSISTENT = 'persistent',
}

export enum ScanCategory {
  PRIVACY_POLICY = 'privacy_policy',
  COOKIES = 'cookies',
  FORMS = 'forms',
  RIGHTS = 'rights',
  CONTROLLER = 'controller',
  SECURITY = 'security',
  LANGUAGE = 'language',
}

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
