<script setup lang="ts">
import type { FindingItem } from '@/types/report.types';
import { FINDING_STATUS_LABELS } from '@/types/report.types';
import RecommendationList from './RecommendationList.vue';

defineProps<{
  finding: FindingItem;
}>();
</script>

<template>
  <div class="finding-card" :class="`finding-card--${finding.status}`">
    <div class="finding-header">
      <span class="finding-code">{{ finding.criterionCode }}</span>
      <h4 class="finding-name">{{ finding.criterionName }}</h4>
      <span class="finding-status" :class="`status--${finding.status}`">
        {{ FINDING_STATUS_LABELS[finding.status] || finding.status }}
      </span>
    </div>

    <div v-if="finding.evidence" class="finding-evidence">
      <strong>Evidencia:</strong> {{ finding.evidence }}
    </div>

    <div class="finding-explanation">
      <p>{{ finding.explanation }}</p>
    </div>

    <div class="finding-reference">
      <strong>Referencia LGPD:</strong> {{ finding.lgpdReference }}
    </div>

    <div class="finding-score">
      Pontuacao: <strong>{{ finding.score.toFixed(1) }}/{{ finding.maxScore.toFixed(1) }}</strong>
    </div>

    <RecommendationList
      v-if="finding.recommendations.length > 0"
      :recommendations="finding.recommendations"
    />
  </div>
</template>

<style scoped>
.finding-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 16px;
  margin-bottom: 12px;
}

.finding-card--found {
  border-left: 4px solid #188038;
}

.finding-card--partial {
  border-left: 4px solid #e37400;
}

.finding-card--absent {
  border-left: 4px solid #d93025;
}

.finding-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  flex-wrap: wrap;
}

.finding-code {
  background: var(--color-bg);
  padding: 2px 8px;
  border-radius: var(--radius-sm);
  font-size: 0.8rem;
  font-weight: 600;
  font-family: monospace;
}

.finding-name {
  font-size: 0.95rem;
  flex: 1;
}

.finding-status {
  font-size: 0.78rem;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: var(--radius-sm);
}

.status--found { background: #e6f4ea; color: #188038; }
.status--partial { background: #fef7e0; color: #e37400; }
.status--absent { background: #fce8e6; color: #d93025; }

.finding-evidence {
  background: var(--color-bg);
  padding: 8px 12px;
  border-radius: var(--radius-sm);
  font-size: 0.85rem;
  margin-bottom: 8px;
  line-height: 1.4;
}

.finding-explanation {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  line-height: 1.5;
  margin-bottom: 8px;
}

.finding-reference {
  font-size: 0.82rem;
  color: var(--color-primary);
  margin-bottom: 8px;
}

.finding-score {
  font-size: 0.82rem;
  color: var(--color-text-secondary);
}
</style>
