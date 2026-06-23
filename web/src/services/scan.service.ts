import api from './api';
import type { ScanResponse, ScanListItem, ScanListResponse } from '@/types/scan.types';

export async function createScan(url: string): Promise<ScanResponse> {
  const { data } = await api.post<ScanResponse>('/scans', { url });
  return data;
}

export async function getScan(id: string): Promise<ScanResponse> {
  const { data } = await api.get<ScanResponse>(`/scans/${id}`);
  return data;
}

export async function listScans(params: {
  page?: number;
  limit?: number;
  sort?: string;
  order?: string;
}): Promise<ScanListResponse> {
  const { data } = await api.get<ScanListResponse>('/scans', { params });
  return data;
}
