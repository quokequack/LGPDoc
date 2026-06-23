import api from './api';
import type { ReportResponse } from '@/types/report.types';

export async function getReport(scanId: string): Promise<ReportResponse> {
  const { data } = await api.get<ReportResponse>(`/scans/${scanId}/report`);
  return data;
}
