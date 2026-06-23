<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useReport } from '@/composables/useReport';
import FindingCard from '@/components/report/FindingCard.vue';
import { CATEGORY_LABELS } from '@/types/report.types';

const route = useRoute();
const scanId = route.params.id as string;
const category = route.params.category as string;
const { report, isLoading, error } = useReport(scanId);

const categoryData = computed(() => {
  if (!report) return null;
  return report.categories.find((c: { category: string }) => c.category === category) || null;
});
</script>

<template>
  <div class="category-detail-view">
    <div v-if="isLoading" class="loading">Carregando...</div>

    <div v-else-if="error" class="error">{{ error }}</div>

    <template v-else-if="categoryData">
      <h1>{{ CATEGORY_LABELS[categoryData.category] || categoryData.category }}</h1>
      <div class="cat-stats">
        <span>Pontuacao: {{ categoryData.score.toFixed(1) }}/{{ categoryData.maxScore }}</span>
        <span>{{ categoryData.percentage }}%</span>
      </div>
      <p class="cat-summary">{{ categoryData.summary }}</p>

      <FindingCard
        v-for="finding in categoryData.findings"
        :key="finding.id"
        :finding="finding"
      />
    </template>

    <div v-else class="not-found">
      Categoria nao encontrada.
    </div>
  </div>
</template>

<style scoped>
.category-detail-view {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

h1 {
  font-size: 1.4rem;
}

.cat-stats {
  display: flex;
  gap: 16px;
  font-size: 0.9rem;
  color: var(--color-text-secondary);
}

.cat-summary {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  line-height: 1.5;
}
</style>
