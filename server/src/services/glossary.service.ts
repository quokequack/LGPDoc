import { glossaryRepository } from '../repositories/glossary.repository.js';

export interface GlossaryTermDto {
  id: string;
  term: string;
  definition: string;
  lgpdArticle: string | null;
  relatedTerms: string[];
}

function toDto(record: {
  id: string;
  term: string;
  definition: string;
  lgpdArticle: string | null;
  relatedTerms: string;
}): GlossaryTermDto {
  let relatedTerms: string[] = [];
  try {
    relatedTerms = JSON.parse(record.relatedTerms);
  } catch {
    relatedTerms = [];
  }
  return {
    id: record.id,
    term: record.term,
    definition: record.definition,
    lgpdArticle: record.lgpdArticle,
    relatedTerms,
  };
}

export async function listGlossary(search?: string): Promise<GlossaryTermDto[]> {
  const records = search
    ? await glossaryRepository.search(search)
    : await glossaryRepository.findAll();

  return records.map(toDto);
}

export async function getGlossaryTerm(id: string): Promise<GlossaryTermDto | null> {
  const record = await glossaryRepository.findById(id);
  return record ? toDto(record) : null;
}
