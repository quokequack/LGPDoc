<script setup lang="ts">
import type { CategoryResult } from '@/types/report.types';
import { CATEGORY_LABELS } from '@/types/report.types';
import { Check, Minus, X } from '@lucide/vue';

defineProps<{ categories: CategoryResult[] }>();

function tone(pct: number) {
  return pct >= 80 ? 'good' : pct >= 50 ? 'medium' : 'high';
}
</script>

<template>
  <div>
    <div class="space-y-3.5">
      <div v-for="cat in categories" :key="cat.category" class="grid min-w-0 grid-cols-[1.25rem_minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1.5">
        <span
          class="grid h-5 w-5 place-items-center rounded-sm"
          :class="{
            'bg-risk-good/12 text-risk-good': tone(cat.percentage) === 'good',
            'bg-risk-medium/12 text-risk-medium': tone(cat.percentage) === 'medium',
            'bg-risk-high/12 text-risk-high': tone(cat.percentage) === 'high',
          }"
        >
          <Check v-if="tone(cat.percentage) === 'good'" class="h-3 w-3" />
          <Minus v-else-if="tone(cat.percentage) === 'medium'" class="h-3 w-3" />
          <X v-else class="h-3 w-3" />
        </span>
        <span class="min-w-0 text-sm font-medium">{{ CATEGORY_LABELS[cat.category] || cat.category }}</span>
        <span class="font-mono text-xs tabular-nums text-muted-foreground">{{ cat.percentage }}%</span>

        <div class="col-start-2 col-end-4 h-1 overflow-hidden rounded-full bg-muted">
          <div
            class="h-full rounded-full transition-all duration-700 ease-out"
            :class="{
              'bg-risk-good': tone(cat.percentage) === 'good',
              'bg-risk-medium': tone(cat.percentage) === 'medium',
              'bg-risk-high': tone(cat.percentage) === 'high',
            }"
            :style="{ width: cat.percentage + '%' }"
          />
        </div>
      </div>
    </div>
  </div>
</template>
