<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useReport } from '@/composables/useReport';
import ScoreGauge from '@/components/report/ScoreGauge.vue';
import RiskBadge from '@/components/report/RiskBadge.vue';
import CategorySummary from '@/components/report/CategorySummary.vue';
import FindingCard from '@/components/report/FindingCard.vue';
import LegalDisclaimer from '@/components/layout/LegalDisclaimer.vue';
import { CATEGORY_LABELS } from '@/types/report.types';
import type { RiskLevel } from '@/types/scan.types';

const route = useRoute();
const scanId = route.params.id as string;
const { report, isLoading, error } = useReport(scanId);
</script>

<template>
  <div class="report-view">
    <div v-if="isLoading" class="loading">Carregando relatorio...</div>

    <div v-else-if="error" class="error">{{ error }}</div>

    <template v-else-if="report">
      <!-- Header -->
      <section class="report-header">
        <h1>Relatorio de Analise</h1>
        <a :href="report.scan.url" target="_blank" rel="noopener" class="report-url">
          {{ report.scan.url }}
        </a>
        <div class="score-section">
          <ScoreGauge :score="report.scan.score" size="lg" />
          <div class="score-info">
            <RiskBadge :risk-level="report.scan.riskLevel as RiskLevel" />
            <p class="score-text">Pontuacao geral: {{ report.scan.score.toFixed(1) }}/100</p>
          </div>
        </div>
      </section>

      <LegalDisclaimer />

      <!-- Category Summary -->
      <section class="report-section">
        <h2>Resumo por Categoria</h2>
        <CategorySummary :categories="report.categories" />
      </section>

      <!-- Detailed Findings per Category -->
      <section
        v-for="cat in report.categories"
        :key="cat.category"
        class="report-section"
      >
        <h2>
          {{ CATEGORY_LABELS[cat.category] || cat.category }}
          <span class="cat-score-badge">
            {{ cat.percentage }}% ({{ cat.score.toFixed(1) }}/{{ cat.maxScore }})
          </span>
        </h2>
        <p class="cat-summary">{{ cat.summary }}</p>

        <FindingCard
          v-for="finding in cat.findings"
          :key="finding.id"
          :finding="finding"
        />
      </section>

      <!-- Cookies -->
      <section v-if="report.cookies.length > 0" class="report-section">
        <h2>Cookies Detectados</h2>
        <div class="table-wrapper">
          <table class="cookie-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Domínio</th>
                <th>Tipo</th>
                <th>Origem</th>
                <th>Carregado antes do consentimento</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cookie in report.cookies" :key="cookie.id">
                <td>{{ cookie.name }}</td>
                <td>{{ cookie.domain }}</td>
                <td>{{ cookie.type }}</td>
                <td>{{ cookie.origin === 'first_party' ? 'Proprio' : 'Terceiro' }}</td>
                <td>
                  <span v-if="cookie.loadedBeforeConsent" class="badge badge--warn">Sim</span>
                  <span v-else class="badge badge--ok">Nao</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Forms -->
      <section v-if="report.forms.length > 0" class="report-section">
        <h2>Formularios Encontrados</h2>
        <div v-for="form in report.forms" :key="form.id" class="form-card">
          <p><strong>Pagina:</strong> {{ form.pageUrl }}</p>
          <p><strong>HTTPS:</strong> {{ form.hasSecureAction ? 'Sim' : 'Nao' }}</p>
          <p><strong>Aviso de privacidade:</strong> {{ form.privacyNotice ? 'Presente' : 'Ausente' }}</p>
          <div v-if="form.fields.length > 0">
            <strong>Campos:</strong>
            <ul class="field-list">
              <li v-for="(field, i) in form.fields" :key="i">
                {{ field.label || field.name }}
                <span v-if="field.isPersonalData" class="badge badge--info">Dado pessoal</span>
                <span v-if="field.isSensitive" class="badge badge--warn">Sensivel</span>
              </li>
            </ul>
          </div>
          <div v-if="form.excessiveFields.length > 0" class="excessive-alert">
            Campos potencialmente excessivos: {{ form.excessiveFields.join(', ') }}
          </div>
        </div>
      </section>

      <LegalDisclaimer />
    </template>
  </div>
</template>

<style scoped>
.report-view {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.loading,
.error {
  text-align: center;
  padding: 48px 16px;
  color: var(--color-text-secondary);
}

.error {
  color: var(--color-danger);
}

.report-header {
  text-align: center;
  padding: 16px 0;
}

h1 {
  font-size: 1.6rem;
  margin-bottom: 4px;
}

.report-url {
  color: var(--color-primary);
  font-size: 0.9rem;
  word-break: break-all;
  display: block;
  margin-bottom: 20px;
}

.score-section {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.score-info {
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.score-text {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
}

.report-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.report-section h2 {
  font-size: 1.2rem;
}

.cat-score-badge {
  font-size: 0.8rem;
  font-weight: 400;
  color: var(--color-text-secondary);
  margin-left: 8px;
}

.cat-summary {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
}

.table-wrapper {
  overflow-x: auto;
}

.cookie-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}

.cookie-table th,
.cookie-table td {
  padding: 8px 12px;
  text-align: left;
  border-bottom: 1px solid var(--color-border);
}

.cookie-table th {
  font-weight: 600;
  background: var(--color-bg);
}

.badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 600;
}

.badge--warn { background: #fef7e0; color: #e37400; }
.badge--ok { background: #e6f4ea; color: #188038; }
.badge--info { background: #e8f0fe; color: #1a73e8; }

.form-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 0.9rem;
  margin-bottom: 8px;
}

.field-list {
  margin-top: 4px;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 0.85rem;
}

.field-list li {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.excessive-alert {
  background: #fef7e0;
  border: 1px solid #fbbc04;
  border-radius: var(--radius-sm);
  padding: 8px 12px;
  font-size: 0.82rem;
  color: #5f4b00;
}
</style>
