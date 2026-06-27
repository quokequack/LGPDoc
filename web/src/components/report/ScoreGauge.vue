<script setup lang="ts">
import { computed, useId } from 'vue';
import type { RiskLevel } from '@/types/scan.types';

const props = withDefaults(
  defineProps<{
    score: number;
    riskLevel?: RiskLevel | null;
    size?: 'sm' | 'md' | 'lg';
    animate?: boolean;
  }>(),
  { size: 'md', animate: true, riskLevel: null },
);

const px = { sm: 96, md: 140, lg: 196 };

const uid = useId();
const pathId = `selo-ring-${uid}`;

// raio da textPath e seu perímetro (para forçar o preenchimento exato do anel)
const TR = 84;
const ringLen = 2 * Math.PI * TR;

const ringText = 'AVALIAÇÃO EDUCATIVA ✦ NÃO SUBSTITUI PARECER JURÍDICO ✦ ';

const verdict = computed(() => {
  switch (props.riskLevel) {
    case 'good': return 'BOAS PRÁTICAS';
    case 'low': return 'RISCO BAIXO';
    case 'medium': return 'RISCO MÉDIO';
    case 'high': return 'RISCO ALTO';
    default:
      return props.score >= 80 ? 'BOAS PRÁTICAS'
        : props.score >= 60 ? 'RISCO BAIXO'
        : props.score >= 40 ? 'RISCO MÉDIO' : 'RISCO ALTO';
  }
});

const inkVar = computed(() => {
  const level = props.riskLevel
    ?? (props.score >= 80 ? 'good' : props.score >= 60 ? 'low' : props.score >= 40 ? 'medium' : 'high');
  return `var(--risk-${level})`;
});

const scoreLabel = computed(() => Math.round(props.score).toString());
</script>

<template>
  <div
    class="selo-press relative inline-grid place-items-center"
    :class="animate ? 'animate-stamp' : '-rotate-[4deg]'"
    :style="{ width: `${px[size]}px`, height: `${px[size]}px`, maxWidth: '100%', color: `hsl(${inkVar})` }"
    role="meter"
    :aria-valuenow="Math.round(score)"
    aria-valuemin="0"
    aria-valuemax="100"
    :aria-label="`Pontuação ${scoreLabel} de 100 — ${verdict}. Avaliação educativa, não substitui parecer jurídico.`"
  >
    <svg viewBox="0 0 200 200" class="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <path
          :id="pathId"
          :d="`M 100,100 m -${TR},0 a ${TR},${TR} 0 1,1 ${TR * 2},0 a ${TR},${TR} 0 1,1 -${TR * 2},0`"
          fill="none"
        />
      </defs>
      <circle cx="100" cy="100" r="97" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.9" />
      <circle cx="100" cy="100" r="71" fill="none" stroke="currentColor" stroke-width="1" opacity="0.55" />
      <text
        fill="currentColor"
        :font-size="9.5"
        letter-spacing="1.5"
        style="font-family: 'IBM Plex Mono', monospace; font-weight: 500;"
      >
        <textPath
          :href="`#${pathId}`"
          startOffset="0"
          :textLength="ringLen"
          lengthAdjust="spacing"
        >{{ ringText }}</textPath>
      </text>
    </svg>

    <div class="flex flex-col items-center justify-center leading-none">
      <span class="font-mono text-[0.55rem] tracking-[0.18em] opacity-70">PONTUAÇÃO</span>
      <span class="font-display font-extrabold tabular-nums" :class="size === 'lg' ? 'text-6xl' : size === 'sm' ? 'text-3xl' : 'text-5xl'">
        {{ scoreLabel }}
      </span>
      <span class="font-mono text-[0.6rem] tracking-[0.12em] opacity-60">/ 100</span>
      <span
        class="mt-1.5 border-t pt-1 font-mono font-semibold tracking-[0.1em]"
        :class="size === 'sm' ? 'text-[0.5rem]' : 'text-[0.62rem]'"
        :style="{ borderColor: 'currentColor' }"
      >{{ verdict }}</span>
    </div>
  </div>
</template>
