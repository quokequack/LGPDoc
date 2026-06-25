<script setup lang="ts">
import type { GlossaryTerm } from '@/types/glossary.types';
import Badge from '@/components/ui/Badge.vue';

defineProps<{ term: GlossaryTerm }>();
</script>

<template>
  <article class="sheet space-y-2.5 p-5">
    <div class="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
      <h3 class="font-display text-lg font-bold">{{ term.term }}</h3>
      <span v-if="term.lgpdArticle" class="font-mono text-xs text-accent">
        <span class="opacity-60">§</span> {{ term.lgpdArticle }}
      </span>
    </div>
    <p class="prose-lei leading-relaxed text-card-foreground/90">{{ term.definition }}</p>
    <div v-if="term.relatedTerms.length" class="flex flex-wrap items-center gap-1.5 pt-1">
      <span class="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-muted-foreground">Ver também</span>
      <Badge v-for="(r, i) in term.relatedTerms" :key="i" variant="outline">{{ r }}</Badge>
    </div>
  </article>
</template>
