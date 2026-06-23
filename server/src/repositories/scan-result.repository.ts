import { PrismaClient, ScanCategory } from '@prisma/client';
import getPrisma from '../config/database.js';

export class ScanResultRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = getPrisma();
  }

  async create(data: { scanId: string; category: ScanCategory; score: number; maxScore: number; summary: string }) {
    return this.prisma.scanResult.create({
      data: {
        scanId: data.scanId,
        category: data.category,
        score: data.score,
        maxScore: data.maxScore,
        summary: data.summary,
      },
      include: {
        findings: true,
      },
    });
  }

  async findByScanId(scanId: string) {
    return this.prisma.scanResult.findMany({
      where: { scanId },
      include: {
        findings: {
          include: {
            recommendations: true,
            criterion: true,
          },
        },
      },
    });
  }

  async findByScanIdAndCategory(scanId: string, category: ScanCategory) {
    return this.prisma.scanResult.findUnique({
      where: {
        scanId_category: {
          scanId,
          category,
        },
      },
      include: {
        findings: {
          include: {
            recommendations: true,
            criterion: true,
          },
        },
      },
    });
  }
}

export const scanResultRepository = new ScanResultRepository();
