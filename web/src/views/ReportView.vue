<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useReport } from '@/composables/useReport';
import ScoreGauge from '@/components/report/ScoreGauge.vue';
import RiskBadge from '@/components/report/RiskBadge.vue';
import CategorySummary from '@/components/report/CategorySummary.vue';
import FindingCard from '@/components/report/FindingCard.vue';
import LegalDisclaimer from '@/components/layout/LegalDisclaimer.vue';
import Badge from '@/components/ui/Badge.vue';
import Skeleton from '@/components/ui/Skeleton.vue';
import type { RiskLevel } from '@/types/scan.types';
import { CATEGORY_LABELS, COOKIE_TYPE_LABELS } from '@/types/report.types';

const route = useRoute();
const scanId = route.params.id as string;
const { report, isLoading, error } = useReport(scanId);

const CATEGORY_ARTICLE: Record<string, string> = {
  privacy_policy: 'Art. 6º · 9º',
  cookies: 'Art. 7º · 8º',
  forms: 'Art. 5º · 11',
  rights: 'Art. 18',
  controller: 'Art. 5º · 41',
  security: 'Art. 46',
  language: 'Art. 6º VI',
};

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });
}
</script>

<template>
  <!-- Carregando -->
  <div v-if="isLoading" class="grid gap-8 lg:grid-cols-[18rem_1fr]">
    <div class="space-y-4">
      <Skeleton class="mx-auto h-44 w-44 rounded-full" />
      <Skeleton class="h-40 w-full" />
    </div>
    <div class="space-y-4">
      <Skeleton class="h-10 w-72" />
      <Skeleton v-for="i in 5" :key="i" class="h-32 w-full" />
    </div>
  </div>

  <div v-else-if="error" class="py-16 text-center text-risk-high">{{ error }}</div>

  <div v-else-if="report" class="grid gap-8 lg:grid-cols-[18rem_1fr]">
    <!-- Trilho do laudo: selo + índice de conformidade -->
    <aside class="space-y-5 lg:sticky lg:top-20 lg:self-start">
      <div class="sheet flex flex-col items-center gap-3 p-6">
        <ScoreGauge :score="report.scan.score" :risk-level="report.scan.riskLevel as RiskLevel" size="lg" />
        <RiskBadge :risk-level="report.scan.riskLevel as RiskLevel" />
      </div>
      <div class="sheet space-y-4 p-5">
        <p class="eyebrow">Síntese por categoria</p>
        <CategorySummary :categories="report.categories" />
      </div>
    </aside>

    <!-- Corpo do laudo -->
    <div class="space-y-10">
      <header class="space-y-2 border-b border-border pb-5">
        <p class="eyebrow">Laudo de conformidade · LGPD</p>
        <h1 class="font-display text-3xl font-extrabold tracking-tight">Relatório de avaliação</h1>
        <a :href="report.scan.url" target="_blank" rel="noopener"
           class="block break-all font-mono text-sm text-primary hover:underline">{{ report.scan.url }}</a>
        <p class="font-mono text-xs text-muted-foreground">Emitido em {{ fmtDate(report.scan.completedAt) }}</p>
      </header>

      <LegalDisclaimer />

      <section v-for="cat in report.categories" :key="cat.category" :id="`cat-${cat.category}`" class="scroll-mt-20 space-y-4">
        <header class="space-y-1.5">
          <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h2 class="font-display text-xl font-bold">{{ CATEGORY_LABELS[cat.category] || cat.category }}</h2>
            <span class="font-mono text-xs text-accent">{{ CATEGORY_ARTICLE[cat.category] }}</span>
            <Badge variant="outline" class="ml-auto">{{ cat.percentage }}% · {{ cat.score.toFixed(1) }}/{{ cat.maxScore }}</Badge>
          </div>
          <p class="prose-lei text-sm leading-relaxed text-muted-foreground">{{ cat.summary }}</p>
        </header>
        <div class="space-y-3">
          <FindingCard v-for="(f, i) in cat.findings" :key="f.id" :finding="f" :index="i" />
        </div>
      </section>

      <!-- Cookies -->
      <section v-if="report.cookies.length" class="space-y-4">
        <header class="flex flex-wrap items-baseline gap-x-3 border-b border-border pb-2">
          <h2 class="font-display text-xl font-bold">Cookies detectados</h2>
          <span class="font-mono text-xs text-accent">Art. 7º · 8º</span>
        </header>
        <div class="sheet overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead>
              <tr class="border-b border-border bg-muted/50 font-mono text-[0.65rem] uppercase tracking-[0.08em] text-muted-foreground">
                <th class="px-4 py-2.5 font-medium">Nome</th>
                <th class="px-4 py-2.5 font-medium">Domínio</th>
                <th class="px-4 py-2.5 font-medium">Tipo</th>
                <th class="px-4 py-2.5 font-medium">Origem</th>
                <th class="px-4 py-2.5 font-medium">Antes do consentimento</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border">
              <tr v-for="c in report.cookies" :key="c.id" class="transition-colors hover:bg-muted/40">
                <td class="px-4 py-3 font-mono text-xs">{{ c.name }}</td>
                <td class="px-4 py-3 text-xs text-muted-foreground">{{ c.domain }}</td>
                <td class="px-4 py-3"><Badge variant="outline">{{ COOKIE_TYPE_LABELS[c.type] || c.type }}</Badge></td>
                <td class="px-4 py-3 text-xs">{{ c.origin === 'first_party' ? 'Próprio' : 'Terceiro' }}</td>
                <td class="px-4 py-3">
                  <Badge :variant="c.loadedBeforeConsent ? 'high' : 'good'">
                    {{ c.loadedBeforeConsent ? 'Sim' : 'Não' }}
                  </Badge>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Formulários -->
      <section v-if="report.forms.length" class="space-y-4">
        <header class="flex flex-wrap items-baseline gap-x-3 border-b border-border pb-2">
          <h2 class="font-display text-xl font-bold">Formulários</h2>
          <span class="font-mono text-xs text-accent">Art. 5º · 11</span>
        </header>
        <div class="sheet space-y-3 p-5 text-sm" v-for="form in report.forms" :key="form.id">
          <p class="break-all font-mono text-xs text-muted-foreground">{{ form.pageUrl }}</p>
          <div class="flex flex-wrap gap-2">
            <Badge :variant="form.hasSecureAction ? 'good' : 'high'">HTTPS · {{ form.hasSecureAction ? 'Sim' : 'Não' }}</Badge>
            <Badge :variant="form.privacyNotice ? 'good' : 'medium'">Aviso de privacidade · {{ form.privacyNotice ? 'Presente' : 'Ausente' }}</Badge>
          </div>
          <ul v-if="form.fields.length" class="flex flex-wrap gap-2">
            <li v-for="(f, i) in form.fields" :key="i"
                class="inline-flex items-center gap-1.5 rounded-sm border border-border px-2 py-1 text-xs">
              {{ f.label || f.name }}
              <Badge v-if="f.isSensitive" variant="high">Sensível</Badge>
              <Badge v-else-if="f.isPersonalData" variant="default">Pessoal</Badge>
            </li>
          </ul>
          <p v-if="form.excessiveFields.length" class="tarja rounded-sm bg-muted/50 p-3 text-xs leading-relaxed">
            <strong class="text-risk-medium">Campos possivelmente excessivos:</strong> {{ form.excessiveFields.join(', ') }}
          </p>
        </div>
      </section>

      <LegalDisclaimer />
    </div>
  </div>
</template>
