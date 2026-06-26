<script setup lang="ts">
import type { GlossaryTerm } from '@/types/glossary.types';
import Badge from '@/components/ui/Badge.vue';

defineProps<{ term: GlossaryTerm }>();
const emit = defineEmits<{ relatedClick: [term: string] }>();
</script>

<template>
  <article class="sheet group space-y-3 p-5 transition-all duration-200 hover:border-primary/30">
    <div class="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
      <h3 class="font-display text-lg font-bold">{{ term.term }}</h3>
      <Badge v-if="term.lgpdArticle" variant="secondary">
        <span class="opacity-70">§</span> {{ term.lgpdArticle }}
      </Badge>
    </div>
    <p class="prose-lei leading-relaxed text-card-foreground/90">{{ term.definition }}</p>
    <div v-if="term.relatedTerms.length" class="flex flex-wrap items-center gap-1.5 pt-1">
      <span class="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-muted-foreground">Ver também</span>
      <button
        v-for="(r, i) in term.relatedTerms"
        :key="i"
        type="button"
        class="inline-flex"
        @click="emit('relatedClick', r)"
      >
        <Badge variant="outline" class="cursor-pointer transition-colors hover:border-primary hover:text-primary">
          {{ r }}
        </Badge>
      </button>
    </div>
  </article>
</template>
