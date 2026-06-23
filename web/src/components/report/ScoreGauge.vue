<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  score: number;
  size?: 'sm' | 'md' | 'lg';
}>();

const radius = props.size === 'sm' ? 36 : props.size === 'lg' ? 56 : 44;
const strokeWidth = props.size === 'sm' ? 4 : 5;
const circumference = 2 * Math.PI * radius;
const offset = computed(() => circumference - (props.score / 100) * circumference);

const color = computed(() => {
  if (props.score >= 90) return '#188038';
  if (props.score >= 70) return '#1a73e8';
  if (props.score >= 40) return '#e37400';
  return '#d93025';
});
</script>

<template>
  <div
    class="score-gauge"
    :class="`score-gauge--${size || 'md'}`"
    role="meter"
    :aria-valuenow="score"
    aria-valuemin="0"
    aria-valuemax="100"
    :aria-label="`Pontuacao: ${score} de 100`"
  >
    <svg :width="(radius + strokeWidth) * 2" :height="(radius + strokeWidth) * 2" viewBox="0 0 120 120">
      <circle
        cx="60"
        cy="60"
        :r="radius"
        fill="none"
        stroke="var(--color-border)"
        :stroke-width="strokeWidth"
      />
      <circle
        cx="60"
        cy="60"
        :r="radius"
        fill="none"
        :stroke="color"
        :stroke-width="strokeWidth"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="offset"
        stroke-linecap="round"
        transform="rotate(-90 60 60)"
        style="transition: stroke-dashoffset 0.8s ease;"
      />
    </svg>
    <div class="gauge-value" :style="{ color }">
      <span class="gauge-score">{{ Math.round(score) }}</span>
      <span class="gauge-max">/100</span>
    </div>
  </div>
</template>

<style scoped>
.score-gauge {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.gauge-value {
  position: absolute;
  display: flex;
  align-items: baseline;
  gap: 2px;
}

.gauge-score {
  font-weight: 700;
}

.gauge-max {
  font-size: 0.65em;
  opacity: 0.6;
}

.score-gauge--sm .gauge-score { font-size: 1.1rem; }
.score-gauge--md .gauge-score { font-size: 1.5rem; }
.score-gauge--lg .gauge-score { font-size: 2rem; }
</style>
