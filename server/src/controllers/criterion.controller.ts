import { Request, Response, NextFunction } from 'express';
import { criterionRepository } from '../repositories/criterion.repository.js';
import { criteriaQuerySchema } from '../validators/scan.validator.js';

export async function getCriteria(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const query = criteriaQuerySchema.parse(req.query);
    const criteria = await criterionRepository.findAll(query.category);
    res.json(
      criteria.map((c) => ({
        ...c,
        category: c.category.toLowerCase(),
        riskIfAbsent: c.riskIfAbsent.toLowerCase(),
      }))
    );
  } catch (error) {
    next(error);
  }
}
