<script setup lang="ts">
import type { RecommendationItem } from '@/types/report.types';
import { PRIORITY_LABELS } from '@/types/report.types';

defineProps<{
  recommendations: RecommendationItem[];
}>();
</script>

<template>
  <div class="recommendation-list">
    <h5 class="rec-title">Recomendacoes de Melhoria</h5>
    <div
      v-for="rec in recommendations"
      :key="rec.id"
      class="rec-item"
      :class="`rec-item--${rec.priority}`"
    >
      <div class="rec-header">
        <strong>{{ rec.title }}</strong>
        <span class="rec-priority" :class="`priority--${rec.priority}`">
          {{ PRIORITY_LABELS[rec.priority] || rec.priority }}
        </span>
      </div>
      <p class="rec-description">{{ rec.description }}</p>
      <div class="rec-how">
        <strong>Como melhorar:</strong> {{ rec.howToImprove }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.recommendation-list {
  margin-top: 12px;
  border-top: 1px solid var(--color-border);
  padding-top: 12px;
}

.rec-title {
  font-size: 0.9rem;
  margin-bottom: 8px;
  color: var(--color-text);
}

.rec-item {
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  margin-bottom: 8px;
  background: var(--color-bg);
}

.rec-item--high { border-left: 3px solid #d93025; }
.rec-item--medium { border-left: 3px solid #e37400; }
.rec-item--low { border-left: 3px solid #1a73e8; }

.rec-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  font-size: 0.9rem;
}

.rec-priority {
  font-size: 0.72rem;
  font-weight: 600;
  padding: 1px 6px;
  border-radius: var(--radius-sm);
}

.priority--high { background: #fce8e6; color: #d93025; }
.priority--medium { background: #fef7e0; color: #e37400; }
.priority--low { background: #e8f0fe; color: #1a73e8; }

.rec-description {
  font-size: 0.84rem;
  color: var(--color-text-secondary);
  line-height: 1.4;
  margin-bottom: 6px;
}

.rec-how {
  font-size: 0.82rem;
  line-height: 1.4;
}
</style>
