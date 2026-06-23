<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <header class="app-header" role="banner">
    <div class="header-inner">
      <RouterLink to="/" class="header-logo" aria-label="Ir para pagina inicial">
        <span class="logo-icon">&#9733;</span>
        <span class="logo-text">Scanner LGPD Educacional</span>
      </RouterLink>
      <nav class="header-nav" aria-label="Navegacao principal">
        <RouterLink to="/" class="nav-link" active-class="nav-link--active">
          Inicio
        </RouterLink>
        <RouterLink to="/glossary" class="nav-link" active-class="nav-link--active">
          Glossario
        </RouterLink>
        <RouterLink to="/history" class="nav-link" active-class="nav-link--active">
          Historico
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-inner {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
}

.header-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: var(--color-text);
  font-weight: 600;
  font-size: 1.1rem;
}

.logo-icon {
  color: var(--color-primary);
  font-size: 1.3rem;
}

.header-nav {
  display: flex;
  gap: 4px;
}

.nav-link {
  padding: 8px 16px;
  text-decoration: none;
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  font-weight: 500;
  border-radius: var(--radius-sm);
  transition: color 0.15s, background 0.15s;
}

.nav-link:hover {
  color: var(--color-text);
  background: var(--color-bg);
}

.nav-link--active {
  color: var(--color-primary);
  background: rgba(26, 115, 232, 0.08);
}

@media (max-width: 600px) {
  .header-inner {
    flex-direction: column;
    height: auto;
    padding: 12px 16px;
    gap: 8px;
  }
}
</style>
