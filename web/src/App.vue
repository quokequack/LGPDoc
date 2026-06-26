<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useTheme } from '@/composables/useTheme';
import AppHeader from '@/components/layout/AppHeader.vue';
import AppFooter from '@/components/layout/AppFooter.vue';

useTheme();
</script>

<template>
  <div class="flex min-h-screen flex-col bg-background text-foreground transition-colors duration-300">
    <AppHeader />
    <main class="mx-auto w-full max-w-laudo flex-1 px-4 py-10 sm:px-6 lg:py-14">
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>
