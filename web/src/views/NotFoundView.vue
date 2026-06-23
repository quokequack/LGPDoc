<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="not-found-view">
    <h1>404</h1>
    <p>Pagina nao encontrada.</p>
    <RouterLink to="/">Voltar ao inicio</RouterLink>
  </div>
</template>

<style scoped>
.not-found-view {
  text-align: center;
  padding: 64px 16px;
}

.not-found-view h1 {
  font-size: 4rem;
  color: var(--color-text-secondary);
  margin-bottom: 8px;
}

.not-found-view a {
  display: inline-block;
  margin-top: 16px;
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 500;
}
</style>
