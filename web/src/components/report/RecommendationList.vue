<script setup lang="ts">
import type { RecommendationItem } from '@/types/report.types';
import { PRIORITY_LABELS } from '@/types/report.types';
import Badge from '@/components/ui/Badge.vue';
import { ArrowRight } from '@lucide/vue';

defineProps<{ recommendations: RecommendationItem[] }>();

const prioVariant: Record<string, 'high' | 'medium' | 'low'> = {
  high: 'high', medium: 'medium', low: 'low',
};
const prioBorder: Record<string, string> = {
  high: 'border-l-risk-high', medium: 'border-l-risk-medium', low: 'border-l-risk-low',
};
</script>

<template>
  <div class="space-y-2.5 border-t border-dashed border-border pt-3">
    <p class="eyebrow">Como corrigir</p>
    <div
      v-for="rec in recommendations"
      :key="rec.id"
      class="space-y-2 rounded-sm border-l-2 bg-muted/40 p-3.5 text-sm"
      :class="prioBorder[rec.priority]"
    >
      <div class="flex flex-wrap items-center gap-2">
        <strong class="font-display text-[0.9rem] font-semibold">{{ rec.title }}</strong>
        <Badge :variant="prioVariant[rec.priority]">{{ PRIORITY_LABELS[rec.priority] || rec.priority }}</Badge>
      </div>
      <p class="prose-lei text-[0.85rem] leading-relaxed text-muted-foreground">{{ rec.description }}</p>
      <p class="flex items-start gap-1.5 text-[0.85rem] leading-relaxed">
        <ArrowRight class="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
        <span>{{ rec.howToImprove }}</span>
      </p>
    </div>
  </div>
</template>
