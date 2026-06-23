import { PrismaClient } from '@prisma/client';
import getPrisma from '../config/database.js';

export class ScanRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = getPrisma();
  }

  async create(data: { url: string }) {
    return this.prisma.scan.create({
      data: {
        url: data.url,
        status: 'PENDING',
      },
    });
  }

  async findById(id: string) {
    return this.prisma.scan.findUnique({
      where: { id },
      include: {
        scanResults: {
          include: {
            findings: {
              include: {
                recommendations: true,
                criterion: true,
              },
            },
          },
        },
        cookieRecords: true,
        formRecords: true,
      },
    });
  }

  async findAll(params: { page: number; limit: number; sort: string; order: string }) {
    const skip = (params.page - 1) * params.limit;
    const [data, total] = await Promise.all([
      this.prisma.scan.findMany({
        skip,
        take: params.limit,
        orderBy: { [params.sort]: params.order },
        select: {
          id: true,
          url: true,
          status: true,
          score: true,
          riskLevel: true,
          createdAt: true,
        },
      }),
      this.prisma.scan.count(),
    ]);

    return {
      data,
      total,
      page: params.page,
      limit: params.limit,
      totalPages: Math.ceil(total / params.limit),
    };
  }

  async updateStatus(id: string, data: { status: 'RUNNING' | 'COMPLETED' | 'FAILED'; errorMessage?: string }) {
    const updateData: Record<string, unknown> = { status: data.status };
    if (data.status === 'RUNNING' && !data.errorMessage) {
      updateData.startedAt = new Date();
    }
    if (data.status === 'COMPLETED' || data.status === 'FAILED') {
      updateData.completedAt = new Date();
    }
    if (data.errorMessage) {
      updateData.errorMessage = data.errorMessage;
    }
    return this.prisma.scan.update({
      where: { id },
      data: updateData,
    });
  }

  async updateScore(id: string, data: { score: number; riskLevel: 'HIGH' | 'MEDIUM' | 'LOW' | 'GOOD' }) {
    return this.prisma.scan.update({
      where: { id },
      data: {
        score: data.score,
        riskLevel: data.riskLevel,
      },
    });
  }
}

export const scanRepository = new ScanRepository();
