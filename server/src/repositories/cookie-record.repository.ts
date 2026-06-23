import { PrismaClient, CookieType, CookieOrigin, CookieDuration } from '@prisma/client';
import getPrisma from '../config/database.js';

export class CookieRecordRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = getPrisma();
  }

  async create(data: {
    scanId: string;
    name: string;
    domain: string;
    type: CookieType;
    origin: CookieOrigin;
    duration: CookieDuration;
    loadedBeforeConsent: boolean;
    source: string;
    description?: string;
  }) {
    return this.prisma.cookieRecord.create({
      data: {
        scanId: data.scanId,
        name: data.name,
        domain: data.domain,
        type: data.type,
        origin: data.origin,
        duration: data.duration,
        loadedBeforeConsent: data.loadedBeforeConsent,
        source: data.source,
        description: data.description || null,
      },
    });
  }

  async findByScanId(scanId: string) {
    return this.prisma.cookieRecord.findMany({
      where: { scanId },
    });
  }
}

export const cookieRecordRepository = new CookieRecordRepository();
