import { Request, Response, NextFunction } from 'express';
import { getReport } from '../services/report.service.js';

export async function getScanReport(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params as { id: string };
    const report = await getReport(id);

    res.json(report);
  } catch (error) {
    next(error);
  }
}
