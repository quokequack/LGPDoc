<script setup lang="ts">
import { cn } from '@/lib/utils';
import { TabsRoot, TabsList, TabsIndicator, TabsTrigger } from 'radix-vue';

defineProps<{ class?: string; defaultValue?: string }>();
</script>

<template>
  <TabsRoot
    :class="cn('', $props.class)"
    :default-value="defaultValue"
  >
    <slot />
  </TabsRoot>
</template>
