import { PrismaClient, Priority } from '@prisma/client';
import getPrisma from '../config/database.js';

export class RecommendationRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = getPrisma();
  }

  async create(data: {
    findingId: string;
    title: string;
    description: string;
    priority: Priority;
    howToImprove: string;
  }) {
    return this.prisma.recommendation.create({
      data: {
        findingId: data.findingId,
        title: data.title,
        description: data.description,
        priority: data.priority,
        howToImprove: data.howToImprove,
      },
    });
  }

  async findByFindingId(findingId: string) {
    return this.prisma.recommendation.findMany({
      where: { findingId },
    });
  }
}

export const recommendationRepository = new RecommendationRepository();
