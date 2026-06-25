<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import { useReport } from '@/composables/useReport';
import FindingCard from '@/components/report/FindingCard.vue';
import Badge from '@/components/ui/Badge.vue';
import { ArrowLeft } from '@lucide/vue';
import { CATEGORY_LABELS } from '@/types/report.types';

const route = useRoute();
const scanId = route.params.id as string;
const category = route.params.category as string;
const { report, isLoading, error } = useReport(scanId);

const cat = computed(() => report.value?.categories.find((c) => c.category === category) || null);
</script>

<template>
  <div class="space-y-8">
    <div v-if="isLoading" class="py-16 text-center text-muted-foreground">Carregando…</div>
    <div v-else-if="error" class="py-16 text-center text-risk-high">{{ error }}</div>
    <template v-else-if="cat">
      <header class="space-y-2 border-b border-border pb-5">
        <RouterLink :to="{ name: 'report', params: { id: scanId } }"
                    class="inline-flex items-center gap-1.5 font-mono text-xs text-primary hover:underline">
          <ArrowLeft class="h-3.5 w-3.5" /> Voltar ao laudo
        </RouterLink>
        <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h1 class="font-display text-3xl font-extrabold tracking-tight">{{ CATEGORY_LABELS[cat.category] || cat.category }}</h1>
          <Badge variant="outline">{{ cat.percentage }}% · {{ cat.score.toFixed(1) }}/{{ cat.maxScore }}</Badge>
        </div>
        <p class="prose-lei max-w-2xl text-sm leading-relaxed text-muted-foreground">{{ cat.summary }}</p>
      </header>
      <div class="space-y-3">
        <FindingCard v-for="(f, i) in cat.findings" :key="f.id" :finding="f" :index="i" />
      </div>
    </template>
    <div v-else class="py-16 text-center text-muted-foreground">Categoria não encontrada.</div>
  </div>
</template>
