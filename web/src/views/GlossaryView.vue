<script setup lang="ts">
import { onMounted } from 'vue';
import { useGlossaryStore } from '@/stores/glossary.store';
import GlossarySearch from '@/components/glossary/GlossarySearch.vue';
import GlossaryTerm from '@/components/glossary/GlossaryTerm.vue';
import Skeleton from '@/components/ui/Skeleton.vue';

const store = useGlossaryStore();

onMounted(() => store.fetchTerms());

function handleSearch(q: string) { store.fetchTerms(q || undefined); }
</script>

<template>
  <div class="space-y-8">
    <header class="space-y-3 border-b border-border pb-5">
      <p class="eyebrow">Vocabulário · LGPD</p>
      <h1 class="font-display text-3xl font-extrabold tracking-tight">Glossário</h1>
      <p class="prose-lei max-w-xl text-lg leading-relaxed text-muted-foreground">
        Os termos da Lei Geral de Proteção de Dados, explicados em linguagem acessível e
        ligados aos seus artigos.
      </p>
      <GlossarySearch class="pt-1" @search="handleSearch" />
    </header>

    <div v-if="store.isLoading" class="space-y-3">
      <Skeleton v-for="i in 5" :key="i" class="h-28 w-full" />
    </div>

    <div v-else-if="store.error" class="py-10 text-center text-risk-high">{{ store.error }}</div>

    <div v-else class="space-y-3">
      <p v-if="store.terms.length === 0" class="py-10 text-center text-muted-foreground">
        Nenhum termo encontrado para “{{ store.searchQuery }}”. Tente outra palavra.
      </p>

      <TransitionGroup name="list" tag="div" class="flex flex-col gap-3">
        <GlossaryTerm
          v-for="(term, index) in store.terms"
          :key="term.id"
          :term="term"
          :style="{ transitionDelay: `${Math.min(index * 40, 240)}ms` }"
        />
      </TransitionGroup>

      <p v-if="store.terms.length" class="pt-2 font-mono text-xs text-muted-foreground">
        {{ store.terms.length }} termo(s)<span v-if="store.searchQuery"> · “{{ store.searchQuery }}”</span>
      </p>
    </div>
  </div>
</template>

<style scoped>
.list-enter-active { transition: opacity 0.4s ease, transform 0.4s ease; }
.list-leave-active { transition: all 0.2s ease; position: absolute; }
.list-enter-from { opacity: 0; transform: translateY(10px); }
.list-leave-to { opacity: 0; transform: translateY(6px); }
.list-move { transition: transform 0.3s ease; }
@media (prefers-reduced-motion: reduce) {
  .list-enter-from { transform: none; }
}
</style>
