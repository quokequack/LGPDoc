import { Request, Response, NextFunction } from 'express';
import { listGlossary } from '../services/glossary.service.js';
import { glossaryQuerySchema } from '../validators/scan.validator.js';

export async function getGlossary(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const query = glossaryQuerySchema.parse(req.query);
    const terms = await listGlossary(query.search || undefined);
    res.json(terms);
  } catch (error) {
    next(error);
  }
}
