import { PrismaClient, type ScanCategory } from '@prisma/client';
import getPrisma from '../config/database.js';

export class CriterionRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = getPrisma();
  }

  async findAll(category?: string) {
    const where = category ? { category: category as ScanCategory } : {};
    return this.prisma.criterion.findMany({
      where,
      orderBy: { code: 'asc' },
      select: {
        id: true,
        code: true,
        category: true,
        name: true,
        description: true,
        riskIfAbsent: true,
        weight: true,
      },
    });
  }
}

export const criterionRepository = new CriterionRepository();
