import { z } from 'zod';

export const urlSchema = z
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
  );

export const urlInputSchema = z.object({
  url: urlSchema,
});

export type UrlInput = z.infer<typeof urlInputSchema>;
