export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  lgpdArticle: string | null;
  relatedTerms: string[];
}

export interface GlossaryResponse {
  data: GlossaryTerm[];
}
