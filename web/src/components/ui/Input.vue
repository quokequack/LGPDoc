<script setup lang="ts">
import { cn } from '@/lib/utils';
import { type InputHTMLAttributes, useTemplateRef } from 'vue';

interface Props extends /* @vue-ignore */ InputHTMLAttributes {
  class?: string;
}

defineProps<Props>();

const inputRef = useTemplateRef<HTMLInputElement>('input');

defineExpose({ inputRef });
</script>

<template>
  <input
    ref="input"
    :class="cn(
      'flex h-11 w-full rounded-sm border border-input bg-card px-3.5 py-2 font-mono text-sm text-foreground ring-offset-background transition-colors placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50',
      $props.class,
    )"
  />
</template>
