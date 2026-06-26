<script setup lang="ts">
import { cn } from '@/lib/utils';
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  modelValue?: number;
  max?: number;
  class?: string;
}>(), {
  modelValue: 0,
  max: 100,
});

const percentage = computed(() => Math.min(100, Math.max(0, (props.modelValue / props.max) * 100)));
</script>

<template>
  <div
    :class="cn('relative h-1.5 w-full overflow-hidden rounded-full bg-muted', $props.class)"
    role="progressbar"
    :aria-valuenow="modelValue"
    aria-valuemin="0"
    :aria-valuemax="max"
  >
    <div
      class="h-full rounded-full bg-primary transition-all duration-500 ease-out"
      :style="{ width: percentage + '%' }"
    />
  </div>
</template>
