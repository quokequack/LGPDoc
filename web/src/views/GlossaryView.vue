<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useGlossaryStore } from '@/stores/glossary.store';
import GlossarySearch from '@/components/glossary/GlossarySearch.vue';
import GlossaryTerm from '@/components/glossary/GlossaryTerm.vue';

const store = useGlossaryStore();

onMounted(() => {
  store.fetchTerms();
});

function handleSearch(query: string) {
  store.fetchTerms(query || undefined);
}
</script>

<template>
  <div class="glossary-view">
    <section class="glossary-header">
      <h1>Glossario LGPD</h1>
      <p class="glossary-desc">
        Consulte os principais termos da Lei Geral de Protecao de Dados (LGPD)
        com definicoes claras e acessiveis.
      </p>
      <GlossarySearch @search="handleSearch" />
    </section>

    <div v-if="store.isLoading" class="loading">Carregando...</div>

    <div v-else-if="store.error" class="error">{{ store.error }}</div>

    <section v-else class="term-list">
      <p v-if="store.terms.length === 0" class="no-results">
        Nenhum termo encontrado para "{{ store.searchQuery }}".
      </p>

      <GlossaryTerm
        v-for="term in store.terms"
        :key="term.id"
        :term="term"
      />

      <p class="term-count">
        {{ store.terms.length }} termo(s)
        <span v-if="store.searchQuery">para "{{ store.searchQuery }}"</span>
      </p>
    </section>
  </div>
</template>

<style scoped>
.glossary-view {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.glossary-header {
  text-align: center;
}

h1 {
  font-size: 1.6rem;
  margin-bottom: 4px;
}

.glossary-desc {
  color: var(--color-text-secondary);
  font-size: 0.95rem;
  margin-bottom: 16px;
  line-height: 1.5;
}

.loading,
.error,
.no-results {
  text-align: center;
  padding: 32px 16px;
  color: var(--color-text-secondary);
}

.error {
  color: var(--color-danger);
}

.term-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.term-count {
  text-align: center;
  font-size: 0.82rem;
  color: var(--color-text-secondary);
  margin-top: 8px;
}
</style>
