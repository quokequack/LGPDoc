import { PrismaClient } from '@prisma/client';
import getPrisma from '../config/database.js';

export class FormRecordRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = getPrisma();
  }

  async create(data: {
    scanId: string;
    pageUrl: string;
    action?: string;
    method: string;
    fields: string;
    sensitiveFields: string;
    excessiveFields: string;
    hasSecureAction: boolean;
    privacyNotice: boolean;
  }) {
    return this.prisma.formRecord.create({
      data: {
        scanId: data.scanId,
        pageUrl: data.pageUrl,
        action: data.action || null,
        method: data.method,
        fields: data.fields,
        sensitiveFields: data.sensitiveFields,
        excessiveFields: data.excessiveFields,
        hasSecureAction: data.hasSecureAction,
        privacyNotice: data.privacyNotice,
      },
    });
  }

  async findByScanId(scanId: string) {
    return this.prisma.formRecord.findMany({
      where: { scanId },
    });
  }
}

export const formRecordRepository = new FormRecordRepository();
