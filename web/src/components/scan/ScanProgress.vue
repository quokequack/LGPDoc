<script setup lang="ts">
import { onMounted, onUnmounted, computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useScanStore } from '@/stores/scan.store';
import Progress from '@/components/ui/Progress.vue';
import { Check, Loader2, AlertCircle } from '@lucide/vue';

const route = useRoute();
const router = useRouter();
const scanStore = useScanStore();
const scanId = route.params.id as string;

const steps = [
  { key: 'fetching', label: 'Acessando o site' },
  { key: 'privacy', label: 'Lendo a política de privacidade' },
  { key: 'cookies', label: 'Inspecionando cookies' },
  { key: 'forms', label: 'Analisando formulários' },
  { key: 'security', label: 'Verificando segurança' },
  { key: 'scoring', label: 'Emitindo o laudo' },
];

const elapsedMs = ref(0);
let timer: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
  timer = setInterval(() => { elapsedMs.value += 100; }, 100);
  scanStore.startPolling(scanId, (scan) => {
    if (scan.status === 'completed') {
      setTimeout(() => router.push({ name: 'report', params: { id: scanId } }), 600);
    }
  });
});

onUnmounted(() => { if (timer) clearInterval(timer); scanStore.stopPolling(); });

const progressPct = computed(() => {
  if (scanStore.currentScan?.status === 'completed') return 100;
  if (scanStore.currentScan?.status === 'failed') return 100;
  return Math.min(Math.round((elapsedMs.value / 4500) * 100), 95);
});

const currentStepIdx = computed(() => Math.min(Math.floor(elapsedMs.value / 750), steps.length - 1));
</script>

<template>
  <div class="mx-auto max-w-xl space-y-8 py-10">
    <div class="space-y-2 text-center">
      <p class="eyebrow">Perícia em andamento</p>
      <h2 class="font-display text-2xl font-bold">Analisando o site</h2>
      <p class="break-all font-mono text-sm text-muted-foreground">{{ scanStore.currentScan?.url || '…' }}</p>
    </div>

    <div class="space-y-2">
      <Progress :model-value="progressPct" />
      <div class="flex items-center justify-between font-mono text-xs text-muted-foreground">
        <span>Processando</span>
        <span class="tabular-nums">{{ progressPct }}%</span>
      </div>
    </div>

    <ol class="sheet divide-y divide-border">
      <li v-for="(step, i) in steps" :key="step.key" class="flex items-center gap-3 px-4 py-3">
        <span
          class="grid size-7 shrink-0 place-items-center rounded-sm transition-all duration-300 ease-out"
          :class="{
            'bg-risk-good/15 text-risk-good': i < currentStepIdx,
            'bg-primary text-primary-foreground': i === currentStepIdx,
            'bg-muted text-muted-foreground': i > currentStepIdx,
          }"
        >
          <Check v-if="i < currentStepIdx" class="size-3.5" />
          <Loader2 v-else-if="i === currentStepIdx" class="size-3.5 animate-spin" />
          <span v-else class="font-mono text-xs">{{ i + 1 }}</span>
        </span>
        <span
          class="text-sm transition-colors"
          :class="i === currentStepIdx ? 'font-semibold text-foreground' : 'text-muted-foreground'"
        >
          {{ step.label }}
        </span>
      </li>
    </ol>

    <p v-if="scanStore.currentScan?.status === 'failed'" class="flex items-center justify-center gap-2 text-sm text-risk-high" role="alert">
      <AlertCircle class="h-4 w-4" aria-hidden="true" />
      {{ scanStore.currentScan.errorMessage || 'Não foi possível analisar o site. Tente novamente.' }}
    </p>
    <p class="text-center font-mono text-xs text-muted-foreground">Tempo estimado · até 5 segundos</p>
  </div>
</template>
