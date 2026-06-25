<script setup lang="ts">
import { cn } from '@/lib/utils';
import { TabsTrigger } from 'radix-vue';

defineProps<{ value: string; class?: string }>();
</script>

<template>
  <TabsTrigger
    :value="value"
    :class="cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-sm border-2 border-transparent px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:rotate-[-1deg] data-[state=active]:border-foreground data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-[3px_3px_0_hsl(var(--foreground))]',
      $props.class,
    )"
  >
    <slot />
  </TabsTrigger>
</template>
