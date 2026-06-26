<script setup lang="ts">
import { cn } from '@/lib/utils';

defineProps<{
  orientation?: 'horizontal' | 'vertical';
  class?: string;
  label?: string;
}>();
</script>

<template>
  <div
    :class="cn(
      'shrink-0 bg-border',
      orientation === 'vertical' ? 'h-full w-px' : 'h-px w-full',
      $props.class,
    )"
    :role="label ? 'separator' : 'none'"
    :aria-label="label"
  />
</template>
