<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import type { FindingItem } from '@/types/report.types';
import { FINDING_STATUS_LABELS } from '@/types/report.types';
import RecommendationList from './RecommendationList.vue';
import { Check, Minus, X } from '@lucide/vue';

const props = withDefaults(defineProps<{ finding: FindingItem; index?: number }>(), {
  index: 0,
});

const rootRef = ref<HTMLElement | null>(null);
const isVisible = ref(false);
let observer: IntersectionObserver | null = null;

type Tone = 'good' | 'medium' | 'high';
const tone = computed<Tone>(() =>
  props.finding.status === 'found' ? 'good' : props.finding.status === 'partial' ? 'medium' : 'high',
);

const tarja: Record<Tone, string> = {
  good: 'border-l-risk-good',
  medium: 'border-l-risk-medium',
  high: 'border-l-risk-high',
};
const chip: Record<Tone, string> = {
  good: 'bg-risk-good/12 text-risk-good',
  medium: 'bg-risk-medium/12 text-risk-medium',
  high: 'bg-risk-high/12 text-risk-high',
};

const revealDelay = computed(() => `${Math.min(props.index * 50, 300)}ms`);

onMounted(() => {
  if (!rootRef.value || !('IntersectionObserver' in window)) {
    isVisible.value = true;
    return;
  }
  observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      isVisible.value = true;
      observer?.disconnect();
    }
  }, { threshold: 0.15, rootMargin: '0px 0px -40px' });
  observer.observe(rootRef.value);
});

onBeforeUnmount(() => observer?.disconnect());
</script>

<template>
  <article
    ref="rootRef"
    class="sheet tarja overflow-hidden border-l-2 transition-[opacity,transform] duration-500 ease-out"
    :class="[tarja[tone], isVisible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0']"
    :style="{ transitionDelay: revealDelay }"
  >
    <div class="flex flex-col gap-3 p-4 sm:p-5">
      <!-- Cabeçalho da linha: marca de status · código · critério · pontuação -->
      <div class="flex items-start gap-3">
        <span
          class="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-sm"
          :class="chip[tone]"
          :title="FINDING_STATUS_LABELS[finding.status]"
        >
          <Check v-if="finding.status === 'found'" class="h-4 w-4" />
          <Minus v-else-if="finding.status === 'partial'" class="h-4 w-4" />
          <X v-else class="h-4 w-4" />
        </span>

        <div class="min-w-0 flex-1">
          <div class="flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <code class="font-mono text-xs font-semibold text-muted-foreground">{{ finding.criterionCode }}</code>
            <span class="font-mono text-[0.7rem] font-medium uppercase tracking-[0.08em]" :class="`text-risk-${tone}`">
              {{ FINDING_STATUS_LABELS[finding.status] }}
            </span>
          </div>
          <h3 class="mt-0.5 font-display text-[0.95rem] font-semibold leading-snug">{{ finding.criterionName }}</h3>
        </div>

        <span class="shrink-0 text-right font-mono text-xs tabular-nums text-muted-foreground">
          {{ finding.score.toFixed(1) }}<span class="opacity-50">/{{ finding.maxScore.toFixed(1) }}</span>
        </span>
      </div>

      <!-- Referência legal — o marcador estrutural -->
      <p class="font-mono text-[0.72rem] tracking-wide text-accent">
        <span class="opacity-60">§</span> {{ finding.lgpdReference }}
      </p>

      <!-- Evidência citada do site -->
      <blockquote
        v-if="finding.evidence"
        class="prose-lei border-l-2 border-border pl-3 text-[0.85rem] italic leading-relaxed text-muted-foreground"
      >
        “{{ finding.evidence }}”
      </blockquote>

      <!-- Comentário educativo (voz da lei) -->
      <p class="prose-lei text-[0.9rem] leading-relaxed text-card-foreground/90">{{ finding.explanation }}</p>

      <RecommendationList v-if="finding.recommendations.length" :recommendations="finding.recommendations" />
    </div>
  </article>
</template>
