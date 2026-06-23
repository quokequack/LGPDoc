import { scanRepository } from '../repositories/scan.repository.js';
import { generateReport } from '../scanners/report-generator.js';
import type { ReportResponse } from '../dto/report.dto.js';
import { AppError } from '../middleware/error-handler.js';

export async function getReport(scanId: string): Promise<ReportResponse> {
  const scan = await scanRepository.findById(scanId);

  if (!scan) {
    throw new AppError('Relatorio nao encontrado', 404);
  }

  if (scan.status === 'PENDING' || scan.status === 'RUNNING') {
    throw new AppError('Analise ainda em andamento', 409);
  }

  if (scan.status === 'FAILED') {
    throw new AppError(`Analise falhou: ${scan.errorMessage || 'Erro desconhecido'}`, 422);
  }

  return generateReport(scan);
}
