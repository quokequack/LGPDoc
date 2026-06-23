import { PrismaClient } from '@prisma/client';
import getPrisma from '../config/database.js';

export class GlossaryRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = getPrisma();
  }

  async findAll() {
    return this.prisma.glossaryTerm.findMany({
      orderBy: { term: 'asc' },
    });
  }

  async search(query: string) {
    return this.prisma.glossaryTerm.findMany({
      where: {
        term: {
          contains: query,
        },
      },
      orderBy: { term: 'asc' },
    });
  }

  async findById(id: string) {
    return this.prisma.glossaryTerm.findUnique({
      where: { id },
    });
  }
}

export const glossaryRepository = new GlossaryRepository();
