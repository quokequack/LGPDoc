<script setup lang="ts">
import { onMounted, onUnmounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useScanStore } from '@/stores/scan.store';

const route = useRoute();
const router = useRouter();
const scanStore = useScanStore();

const scanId = route.params.id as string;

const progressSteps = [
  { key: 'fetching', label: 'Acessando o site...' },
  { key: 'privacy', label: 'Analisando politica de privacidade...' },
  { key: 'cookies', label: 'Verificando cookies...' },
  { key: 'forms', label: 'Analisando formularios...' },
  { key: 'security', label: 'Verificando seguranca...' },
  { key: 'scoring', label: 'Calculando pontuacao...' },
];

const currentStep = computed(() => {
  if (scanStore.currentScan?.status === 'completed') return progressSteps.length;
  if (scanStore.currentScan?.status === 'failed') return -1;
  // Simulate progress based on elapsed time
  const elapsed = scanStore.currentScan?.startedAt
    ? (Date.now() - new Date(scanStore.currentScan.startedAt).getTime()) / 1000
    : 0;
  return Math.min(Math.floor(elapsed / 10), progressSteps.length - 1);
});

const progressPercent = computed(() => {
  if (scanStore.currentScan?.status === 'completed') return 100;
  if (scanStore.currentScan?.status === 'failed') return 100;
  return Math.min(Math.round((currentStep.value / progressSteps.length) * 100), 95);
});

onMounted(() => {
  scanStore.startPolling(scanId, (scan) => {
    if (scan.status === 'completed') {
      setTimeout(() => {
        router.push({ name: 'report', params: { id: scanId } });
      }, 500);
    }
  });
});

onUnmounted(() => {
  scanStore.stopPolling();
});
</script>

<template>
  <div class="scan-progress" role="status" aria-live="polite">
    <h2>Analisando site</h2>
    <p class="scan-url">{{ scanStore.currentScan?.url || '...' }}</p>

    <div class="progress-bar-wrapper">
      <div
        class="progress-bar"
        :style="{ width: progressPercent + '%' }"
        :class="{ 'progress-bar--error': scanStore.currentScan?.status === 'failed' }"
      />
    </div>
    <p class="progress-text">{{ progressPercent }}%</p>

    <ul class="steps-list">
      <li
        v-for="(step, i) in progressSteps"
        :key="step.key"
        class="step"
        :class="{
          'step--active': i === currentStep,
          'step--done': i < currentStep,
        }"
      >
        <span class="step-icon">
          <span v-if="i < currentStep">&#10003;</span>
          <span v-else-if="i === currentStep" class="spinner" />
          <span v-else>{{ i + 1 }}</span>
        </span>
        <span class="step-label">{{ step.label }}</span>
      </li>
    </ul>

    <p v-if="scanStore.currentScan?.status === 'failed'" class="error-message">
      {{ scanStore.currentScan.errorMessage || 'Falha ao analisar o site. Tente novamente.' }}
    </p>

    <p class="estimated-time">
      Tempo estimado: ate 60 segundos
    </p>
  </div>
</template>

<style scoped>
.scan-progress {
  text-align: center;
  padding: 32px 16px;
  max-width: 480px;
  margin: 0 auto;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 4px;
}

.scan-url {
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  word-break: break-all;
  margin-bottom: 24px;
}

.progress-bar-wrapper {
  height: 8px;
  background: var(--color-border);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
}

.progress-bar {
  height: 100%;
  background: var(--color-primary);
  border-radius: 4px;
  transition: width 0.6s ease;
}

.progress-bar--error {
  background: var(--color-danger);
}

.progress-text {
  color: var(--color-text-secondary);
  font-size: 0.85rem;
  margin-bottom: 24px;
}

.steps-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: left;
}

.step {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  border-radius: var(--radius-sm);
  color: var(--color-text-secondary);
  font-size: 0.9rem;
}

.step--active {
  background: rgba(26, 115, 232, 0.06);
  color: var(--color-text);
  font-weight: 500;
}

.step--done {
  color: var(--color-success);
}

.step-icon {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 2px solid var(--color-border);
  font-size: 0.8rem;
  flex-shrink: 0;
}

.step--active .step-icon {
  border-color: var(--color-primary);
}

.step--done .step-icon {
  border-color: var(--color-success);
  background: var(--color-success);
  color: white;
}

.spinner {
  width: 14px;
  height: 14px;
  border: 2px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-message {
  color: var(--color-danger);
  margin-top: 16px;
  font-size: 0.9rem;
}

.estimated-time {
  color: var(--color-text-secondary);
  font-size: 0.8rem;
  margin-top: 24px;
}
</style>
