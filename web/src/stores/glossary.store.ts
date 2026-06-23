import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { GlossaryTerm } from '@/types/glossary.types';
import * as glossaryService from '@/services/glossary.service';

export const useGlossaryStore = defineStore('glossary', () => {
  const terms = ref<GlossaryTerm[]>([]);
  const searchQuery = ref('');
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  async function fetchTerms(search?: string) {
    isLoading.value = true;
    error.value = null;
    try {
      searchQuery.value = search || '';
      terms.value = await glossaryService.getGlossary(search || undefined);
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro ao carregar glossario';
    } finally {
      isLoading.value = false;
    }
  }

  function reset() {
    terms.value = [];
    searchQuery.value = '';
    error.value = null;
  }

  return {
    terms,
    searchQuery,
    isLoading,
    error,
    fetchTerms,
    reset,
  };
});
