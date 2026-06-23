export interface CreateScanInput {
  url: string;
}

export interface ScanResponse {
  id: string;
  url: string;
  status: string;
  score: number | null;
  riskLevel: string | null;
  startedAt: Date | null;
  completedAt: Date | null;
  errorMessage: string | null;
  createdAt: Date;
}

export interface ScanListQuery {
  page: number;
  limit: number;
  sort: string;
  order: string;
}

export interface ScanListResponse {
  data: Array<{
    id: string;
    url: string;
    status: string;
    score: number | null;
    riskLevel: string | null;
    createdAt: Date;
  }>;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
