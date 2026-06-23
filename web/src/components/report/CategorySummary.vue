<script setup lang="ts">
import { computed } from 'vue';
import type { CategoryResult } from '@/types/report.types';
import { CATEGORY_LABELS } from '@/types/report.types';

const props = defineProps<{
  categories: CategoryResult[];
}>();

function statusIcon(percentage: number) {
  if (percentage >= 80) return 'check';
  if (percentage >= 50) return 'partial';
  return 'absent';
}
</script>

<template>
  <div class="category-summary">
    <h3 class="summary-title">Categorias Analisadas</h3>
    <div class="category-list">
      <div
        v-for="cat in categories"
        :key="cat.category"
        class="category-item"
      >
        <div class="cat-header">
          <span class="cat-icon" :class="`cat-icon--${statusIcon(cat.percentage)}`">
            <span v-if="statusIcon(cat.percentage) === 'check'">&#10003;</span>
            <span v-else-if="statusIcon(cat.percentage) === 'partial'">~</span>
            <span v-else>&#10007;</span>
          </span>
          <span class="cat-name">{{ CATEGORY_LABELS[cat.category] || cat.category }}</span>
        </div>
        <div class="cat-score">
          <div class="cat-bar-wrapper">
            <div
              class="cat-bar"
              :style="{ width: cat.percentage + '%' }"
              :class="{
                'cat-bar--good': cat.percentage >= 80,
                'cat-bar--medium': cat.percentage >= 50 && cat.percentage < 80,
                'cat-bar--low': cat.percentage < 50,
              }"
            />
          </div>
          <span class="cat-value">{{ cat.score.toFixed(1) }}/{{ cat.maxScore }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.category-summary {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 20px;
}

.summary-title {
  font-size: 1rem;
  margin-bottom: 16px;
}

.category-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.category-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.cat-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.cat-icon {
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 0.75rem;
  font-weight: 700;
}

.cat-icon--check { background: #e6f4ea; color: #188038; }
.cat-icon--partial { background: #fef7e0; color: #e37400; }
.cat-icon--absent { background: #fce8e6; color: #d93025; }

.cat-name {
  font-size: 0.9rem;
  font-weight: 500;
}

.cat-score {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-left: 30px;
}

.cat-bar-wrapper {
  flex: 1;
  height: 6px;
  background: var(--color-border);
  border-radius: 3px;
  overflow: hidden;
}

.cat-bar {
  height: 100%;
  border-radius: 3px;
  transition: width 0.6s ease;
}

.cat-bar--good { background: #188038; }
.cat-bar--medium { background: #e37400; }
.cat-bar--low { background: #d93025; }

.cat-value {
  font-size: 0.8rem;
  color: var(--color-text-secondary);
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
}
</style>
