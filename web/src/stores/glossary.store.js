import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getMockGlossaryTerms, searchMockGlossary } from '@/mock/glossary';
export const useGlossaryStore = defineStore('glossary', () => {
    const terms = ref([]);
    const searchQuery = ref('');
    const isLoading = ref(false);
    const error = ref(null);
    let requestId = 0;
    async function fetchTerms(search) {
        const currentRequest = ++requestId;
        const normalizedSearch = search?.trim() || '';
        isLoading.value = true;
        error.value = null;
        searchQuery.value = normalizedSearch;
        try {
            const nextTerms = normalizedSearch
                ? await searchMockGlossary(normalizedSearch, 300)
                : getMockGlossaryTerms();
            if (currentRequest !== requestId)
                return;
            terms.value = nextTerms;
        }
        catch (e) {
            if (currentRequest !== requestId)
                return;
            error.value = e instanceof Error ? e.message : 'Erro ao carregar glossario';
        }
        finally {
            if (currentRequest === requestId)
                isLoading.value = false;
        }
    }
    function reset() {
        requestId++;
        terms.value = [];
        searchQuery.value = '';
        error.value = null;
        isLoading.value = false;
    }
    return { terms, searchQuery, isLoading, error, fetchTerms, reset };
});
