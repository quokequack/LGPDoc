import { PrismaClient, FindingStatus } from '@prisma/client';
import getPrisma from '../config/database.js';

export class FindingRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = getPrisma();
  }

  async create(data: {
    scanResultId: string;
    criterionId: string;
    status: FindingStatus;
    score: number;
    evidence?: string;
    explanation: string;
    lgpdReference: string;
  }) {
    return this.prisma.finding.create({
      data: {
        scanResultId: data.scanResultId,
        criterionId: data.criterionId,
        status: data.status,
        score: data.score,
        evidence: data.evidence || null,
        explanation: data.explanation,
        lgpdReference: data.lgpdReference,
      },
    });
  }

  async findByScanResultId(scanResultId: string) {
    return this.prisma.finding.findMany({
      where: { scanResultId },
      include: {
        recommendations: true,
        criterion: true,
      },
    });
  }
}

export const findingRepository = new FindingRepository();
