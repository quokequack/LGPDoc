<script setup lang="ts">
import type { PrimitiveProps } from 'radix-vue';
import { cn } from '@/lib/utils';
import { Primitive } from 'radix-vue';
import { computed } from 'vue';

export type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

interface Props extends /* @vue-ignore */ PrimitiveProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'default',
  as: 'button',
});

const variantClasses: Record<ButtonVariant, string> = {
  default:
    'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 active:translate-y-px',
  destructive:
    'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 active:translate-y-px',
  outline:
    'border border-input bg-card text-foreground hover:border-primary hover:text-primary',
  secondary:
    'bg-accent text-accent-foreground shadow-sm hover:bg-accent/90 active:translate-y-px',
  ghost: 'text-foreground hover:bg-muted',
  link: 'text-primary underline-offset-4 hover:underline',
};

const sizeClasses: Record<ButtonSize, string> = {
  default: 'h-10 px-5 py-2',
  sm: 'h-9 px-3.5 text-xs',
  lg: 'h-12 px-7 text-base',
  icon: 'h-10 w-10',
};

const classes = computed(() =>
  cn(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-semibold tracking-tight ring-offset-background transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    variantClasses[props.variant],
    sizeClasses[props.size],
    props.class,
  ),
);
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="classes">
    <slot />
  </Primitive>
</template>
