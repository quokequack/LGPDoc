<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppHeader from '@/components/layout/AppHeader.vue';
import AppFooter from '@/components/layout/AppFooter.vue';
</script>

<template>
  <div class="app-layout">
    <AppHeader />
    <main class="app-main">
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --color-primary: #1a73e8;
  --color-primary-dark: #1557b0;
  --color-danger: #d93025;
  --color-warning: #e37400;
  --color-success: #188038;
  --color-info: #1967d2;
  --color-bg: #f8f9fa;
  --color-surface: #ffffff;
  --color-text: #202124;
  --color-text-secondary: #5f6368;
  --color-border: #dadce0;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 2px 8px rgba(0, 0, 0, 0.12);
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

html {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
}

body {
  font-family: var(--font-sans);
  color: var(--color-text);
  background: var(--color-bg);
  line-height: 1.6;
}

.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-main {
  flex: 1;
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding: 32px 16px;
}

@media (max-width: 768px) {
  .app-main {
    padding: 16px 12px;
  }
}
</style>
