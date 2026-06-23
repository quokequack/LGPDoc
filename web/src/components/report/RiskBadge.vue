<script setup lang="ts">
import { computed } from 'vue';
import type { RiskLevel } from '@/types/scan.types';

const props = defineProps<{
  riskLevel: RiskLevel;
}>();

const config = computed(() => {
  switch (props.riskLevel) {
    case 'good':
      return { label: 'Boas Praticas', color: '#188038', bg: '#e6f4ea' };
    case 'low':
      return { label: 'Risco Baixo', color: '#1a73e8', bg: '#e8f0fe' };
    case 'medium':
      return { label: 'Risco Medio', color: '#e37400', bg: '#fef7e0' };
    case 'high':
      return { label: 'Risco Alto', color: '#d93025', bg: '#fce8e6' };
    default:
      return { label: 'Desconhecido', color: '#5f6368', bg: '#f1f3f4' };
  }
});
</script>

<template>
  <span
    class="risk-badge"
    :style="{ color: config.color, background: config.bg }"
    role="status"
  >
    {{ config.label }}
  </span>
</template>

<style scoped>
.risk-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}
</style>
