import { z } from 'zod';

export const createScanSchema = z.object({
  url: z
    .string()
    .trim()
    .min(1, 'URL e obrigatoria')
    .max(2048, 'URL muito longa')
    .refine(
      (value) => {
        try {
          const url = new URL(value);
          return url.protocol === 'http:' || url.protocol === 'https:';
        } catch {
          return false;
        }
      },
      { message: 'URL invalida. Informe uma URL valida com http:// ou https://' }
    ),
});

export const scanListQuerySchema = z.object({
  page: z
    .string()
    .optional()
    .transform((v) => parseInt(v || '1', 10))
    .pipe(z.number().int().min(1).default(1)),
  limit: z
    .string()
    .optional()
    .transform((v) => parseInt(v || '20', 10))
    .pipe(z.number().int().min(1).max(100).default(20)),
  sort: z.enum(['createdAt', 'score', 'url']).optional().default('createdAt'),
  order: z.enum(['asc', 'desc']).optional().default('desc'),
});

export const glossaryQuerySchema = z.object({
  search: z.string().optional().default(''),
});

export const criteriaQuerySchema = z.object({
  category: z
    .enum(['PRIVACY_POLICY', 'COOKIES', 'FORMS', 'RIGHTS', 'CONTROLLER', 'SECURITY', 'LANGUAGE'])
    .optional(),
});

export const exportQuerySchema = z.object({
  format: z.enum(['json']).optional().default('json'),
});

export type CreateScanInput = z.infer<typeof createScanSchema>;
export type ScanListQuery = z.infer<typeof scanListQuerySchema>;
export type GlossaryQuery = z.infer<typeof glossaryQuerySchema>;
export type CriteriaQuery = z.infer<typeof criteriaQuerySchema>;
export type ExportQuery = z.infer<typeof exportQuerySchema>;
