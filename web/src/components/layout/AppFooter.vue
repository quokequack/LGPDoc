<script setup lang="ts">
import LegalDisclaimer from './LegalDisclaimer.vue';
</script>

<template>
  <footer class="app-footer" role="contentinfo">
    <div class="footer-inner">
      <LegalDisclaimer />
      <p class="footer-copy">
        &copy; {{ new Date().getFullYear() }} Scanner LGPD Educacional — Prototipo educacional.
      </p>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  margin-top: 48px;
  padding: 24px 16px;
}

.footer-inner {
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-copy {
  color: var(--color-text-secondary);
  font-size: 0.8rem;
  text-align: center;
}
</style>
