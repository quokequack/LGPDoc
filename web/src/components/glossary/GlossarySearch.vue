<script setup lang="ts">
import { ref, watch } from 'vue';

const emit = defineEmits<{
  search: [query: string];
}>();

const query = ref('');
let debounceTimer: ReturnType<typeof setTimeout> | null = null;

watch(query, (val) => {
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    emit('search', val.trim());
  }, 300);
});
</script>

<template>
  <div class="glossary-search">
    <label for="glossary-search-input" class="sr-only">Buscar termo no glossario</label>
    <input
      id="glossary-search-input"
      v-model="query"
      type="search"
      placeholder="Buscar termo... (ex: consentimento, titular, dado pessoal)"
      class="search-input"
      aria-label="Buscar no glossario"
    />
    <span v-if="query" class="clear-btn" role="button" tabindex="0" @click="query = ''; emit('search', '')" @keydown.enter="query = ''; emit('search', '')" aria-label="Limpar busca">
      &times;
    </span>
  </div>
</template>

<style scoped>
.glossary-search {
  position: relative;
  max-width: 560px;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
}

.search-input {
  width: 100%;
  padding: 12px 40px 12px 16px;
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: 1rem;
  font-family: var(--font-sans);
  outline: none;
  transition: border-color 0.15s;
}

.search-input:focus {
  border-color: var(--color-primary);
}

.clear-btn {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: var(--color-text-secondary);
  font-size: 1.3rem;
  line-height: 1;
}

.clear-btn:hover {
  color: var(--color-text);
}
</style>
