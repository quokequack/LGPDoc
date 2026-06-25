<script setup lang="ts">
import Badge from '@/components/ui/Badge.vue';
import type { RiskLevel } from '@/types/scan.types';

const props = defineProps<{ riskLevel: RiskLevel }>();

const config: Record<RiskLevel, { label: string; variant: 'good' | 'low' | 'medium' | 'high' }> = {
  good: { label: 'Boas práticas', variant: 'good' },
  low: { label: 'Risco baixo', variant: 'low' },
  medium: { label: 'Risco médio', variant: 'medium' },
  high: { label: 'Risco alto', variant: 'high' },
};

const c = config[props.riskLevel] ?? { label: props.riskLevel, variant: 'medium' as const };
</script>

<template>
  <Badge :variant="c.variant">{{ c.label }}</Badge>
</template>
