import { Request, Response, NextFunction } from 'express';
import { startScan } from '../services/scan.service.js';
import { scanRepository } from '../repositories/scan.repository.js';
import { createScanSchema, scanListQuerySchema } from '../validators/scan.validator.js';
import { AppError } from '../middleware/error-handler.js';

export async function createScan(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const input = createScanSchema.parse(req.body);
    const scan = await startScan(input.url);

    res.status(202).json({
      id: scan.id,
      url: scan.url,
      status: scan.status.toLowerCase(),
      score: scan.score,
      riskLevel: scan.riskLevel ? scan.riskLevel.toLowerCase() : null,
      createdAt: scan.createdAt,
    });
  } catch (error) {
    next(error);
  }
}

export async function getScan(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params as { id: string };
    const scan = await scanRepository.findById(id);

    if (!scan) {
      throw new AppError('Analise nao encontrada', 404);
    }

    res.json({
      id: scan.id,
      url: scan.url,
      status: scan.status.toLowerCase(),
      score: scan.score,
      riskLevel: scan.riskLevel ? scan.riskLevel.toLowerCase() : null,
      startedAt: scan.startedAt,
      completedAt: scan.completedAt,
      errorMessage: scan.errorMessage,
      createdAt: scan.createdAt,
    });
  } catch (error) {
    next(error);
  }
}

export async function listScans(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const query = scanListQuerySchema.parse(req.query);
    const result = await scanRepository.findAll(query);

    res.json({
      data: result.data.map((scan) => ({
        id: scan.id,
        url: scan.url,
        status: scan.status.toLowerCase(),
        score: scan.score,
        riskLevel: scan.riskLevel ? scan.riskLevel.toLowerCase() : null,
        createdAt: scan.createdAt,
      })),
      total: result.total,
      page: result.page,
      limit: result.limit,
      totalPages: result.totalPages,
    });
  } catch (error) {
    next(error);
  }
}
