<script setup lang="ts">
import { useScan } from '@/composables/useScan';
import UrlInput from '@/components/scan/UrlInput.vue';
import LegalDisclaimer from '@/components/layout/LegalDisclaimer.vue';
</script>

<template>
  <div class="home-view">
    <section class="hero">
      <h1>Scanner LGPD Educacional</h1>
      <p class="hero-subtitle">
        Analise gratuita e educativa de sites para verificar boas praticas de protecao de dados pessoais
        conforme a Lei Geral de Protecao de Dados (LGPD).
      </p>
    </section>

    <section class="scan-section">
      <UrlInput />
    </section>

    <section class="info-section">
      <div class="info-card">
        <h3>Como funciona</h3>
        <ol>
          <li>Informe a URL de um site</li>
          <li>Aguarde a analise automatizada (ate 60 segundos)</li>
          <li>Receba um relatorio didatico com pontuacao, riscos e recomendacoes</li>
        </ol>
      </div>
      <div class="info-card">
        <h3>O que e analisado</h3>
        <ul>
          <li>Politica de privacidade</li>
          <li>Cookies e banners de consentimento</li>
          <li>Formularios e dados coletados</li>
          <li>Direitos do titular</li>
          <li>Seguranca basica (HTTPS)</li>
          <li>Clareza da linguagem</li>
        </ul>
      </div>
      <div class="info-card">
        <h3>Importante</h3>
        <p>Esta ferramenta tem carater <strong>exclusivamente educativo</strong>. O resultado nao constitui parecer juridico ou certificacao de conformidade.</p>
      </div>
    </section>

    <LegalDisclaimer />
  </div>
</template>

<style scoped>
.home-view {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.hero {
  text-align: center;
  padding: 32px 0 8px;
}

.hero h1 {
  font-size: 2rem;
  color: var(--color-text);
  margin-bottom: 8px;
}

.hero-subtitle {
  font-size: 1.05rem;
  color: var(--color-text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.5;
}

.scan-section {
  max-width: 560px;
  margin: 0 auto;
  width: 100%;
}

.info-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

.info-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 20px;
}

.info-card h3 {
  font-size: 1rem;
  margin-bottom: 12px;
  color: var(--color-primary);
}

.info-card ol,
.info-card ul {
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 0.9rem;
  color: var(--color-text-secondary);
}

.info-card p {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  line-height: 1.5;
}
</style>
