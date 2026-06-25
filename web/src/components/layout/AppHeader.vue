<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useTheme } from '@/composables/useTheme';
import { Sun, Moon } from '@lucide/vue';
import Button from '@/components/ui/Button.vue';

const { isDark, toggle } = useTheme();

const nav = [
  { to: '/', label: 'Início' },
  { to: '/glossary', label: 'Glossário' },
  { to: '/history', label: 'Histórico' },
];
</script>

<template>
  <header class="sticky top-0 z-50 w-full border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
    <div class="mx-auto flex min-h-16 max-w-laudo items-center justify-between gap-4 px-4 sm:px-6">
      <RouterLink to="/" class="group flex items-center gap-3 no-underline" aria-label="LGPDoc, página inicial">
        <span class="grid h-9 w-9 place-items-center rounded-sm bg-primary font-serif text-xl leading-none text-accent shadow-sm transition-transform group-hover:-translate-y-0.5">
          §
        </span>
        <span class="flex flex-col leading-none">
          <span class="font-display text-lg font-extrabold tracking-tight text-foreground">LGPDoc</span>
          <span class="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground">Laudo educacional</span>
        </span>
      </RouterLink>

      <nav class="flex items-center gap-1 sm:gap-2" aria-label="Navegação principal">
        <RouterLink
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          class="border-b-2 border-transparent px-2.5 py-3 text-sm font-medium text-muted-foreground no-underline transition-colors hover:text-foreground sm:px-3"
          exact-active-class="!border-accent !text-foreground"
        >
          {{ item.label }}
        </RouterLink>
        <span class="mx-1 h-5 w-px bg-border" aria-hidden="true" />
        <Button
          variant="ghost"
          size="icon"
          @click="toggle"
          :aria-label="isDark ? 'Mudar para tema claro' : 'Mudar para tema escuro'"
        >
          <Sun v-if="isDark" class="h-4 w-4" />
          <Moon v-else class="h-4 w-4" />
        </Button>
      </nav>
    </div>
  </header>
</template>
