import api from './api';
import type { GlossaryTerm } from '@/types/glossary.types';

export async function getGlossary(search?: string): Promise<GlossaryTerm[]> {
  const { data } = await api.get<GlossaryTerm[]>('/glossary', {
    params: search ? { search } : {},
  });
  return data.map((term) => ({
    ...term,
    relatedTerms: typeof term.relatedTerms === 'string'
      ? JSON.parse(term.relatedTerms as string)
      : term.relatedTerms,
  }));
}
