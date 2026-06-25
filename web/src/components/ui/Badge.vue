<script setup lang="ts">
import { cn } from '@/lib/utils';
import { computed } from 'vue';

type Variant =
  | 'default' | 'secondary' | 'destructive' | 'outline'
  | 'good' | 'low' | 'medium' | 'high';

const props = withDefaults(defineProps<{ variant?: Variant; class?: string }>(), {
  variant: 'default',
});

const variantClasses: Record<Variant, string> = {
  default: 'border-primary/25 bg-primary/10 text-primary',
  secondary: 'border-accent/30 bg-accent/12 text-accent',
  destructive: 'border-risk-high/30 bg-risk-high/12 text-risk-high',
  outline: 'border-border bg-transparent text-muted-foreground',
  good: 'border-risk-good/30 bg-risk-good/12 text-risk-good',
  low: 'border-risk-low/30 bg-risk-low/12 text-risk-low',
  medium: 'border-risk-medium/30 bg-risk-medium/12 text-risk-medium',
  high: 'border-risk-high/30 bg-risk-high/12 text-risk-high',
};

const classes = computed(() =>
  cn(
    'inline-flex items-center gap-1 rounded-sm border px-2 py-0.5 font-mono text-[0.65rem] font-medium uppercase tracking-[0.08em]',
    variantClasses[props.variant],
    props.class,
  ),
);
</script>

<template>
  <span :class="classes">
    <slot />
  </span>
</template>
