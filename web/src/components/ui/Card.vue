<script setup lang="ts">
import { cn } from '@/lib/utils';

defineProps<{ class?: string }>();
</script>

<template>
  <div :class="cn('sheet text-card-foreground', $props.class)">
    <slot />
  </div>
</template>
