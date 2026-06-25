<script setup lang="ts">
import { ref, watch } from 'vue';
import Input from '@/components/ui/Input.vue';
import { Search, X } from '@lucide/vue';

const emit = defineEmits<{ search: [query: string] }>();
const query = ref('');
let timer: ReturnType<typeof setTimeout> | null = null;

watch(query, (v) => {
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => emit('search', v.trim()), 300);
});
</script>

<template>
  <div class="relative w-full max-w-md">
    <Search class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
    <Input v-model="query" type="search" placeholder="Buscar termo… ex.: consentimento, anonimização" class="pl-10 pr-9" aria-label="Buscar no glossário" />
    <button
      v-if="query"
      class="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
      @click="query = ''; emit('search', '')"
      aria-label="Limpar busca"
    >
      <X class="h-4 w-4" />
    </button>
  </div>
</template>
