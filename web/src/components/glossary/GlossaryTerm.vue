<script setup lang="ts">
import type { GlossaryTerm } from '@/types/glossary.types';

defineProps<{
  term: GlossaryTerm;
}>();
</script>

<template>
  <article class="glossary-term">
    <h3 class="term-name">{{ term.term }}</h3>
    <p class="term-definition">{{ term.definition }}</p>
    <div class="term-meta">
      <span v-if="term.lgpdArticle" class="term-article">
        {{ term.lgpdArticle }}
      </span>
      <span v-if="term.relatedTerms.length > 0" class="term-related">
        Relacionados:
        <span
          v-for="(rel, i) in term.relatedTerms"
          :key="i"
          class="related-tag"
        >
          {{ rel }}<span v-if="i < term.relatedTerms.length - 1">, </span>
        </span>
      </span>
    </div>
  </article>
</template>

<style scoped>
.glossary-term {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 16px;
}

.term-name {
  font-size: 1.05rem;
  color: var(--color-primary);
  margin-bottom: 8px;
}

.term-definition {
  font-size: 0.92rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 10px;
}

.term-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 0.8rem;
}

.term-article {
  background: var(--color-bg);
  padding: 3px 8px;
  border-radius: var(--radius-sm);
  font-weight: 500;
  color: var(--color-text-secondary);
}

.term-related {
  color: var(--color-text-secondary);
}

.related-tag {
  color: var(--color-primary);
}
</style>
