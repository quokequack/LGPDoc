<script setup lang="ts">
import UrlInput from '@/components/scan/UrlInput.vue';
import LegalDisclaimer from '@/components/layout/LegalDisclaimer.vue';
import {
  Globe, ScanSearch, FileCheck2,
  FileText, Cookie, ClipboardList, Scale, Building2, ShieldCheck, Languages,
} from '@lucide/vue';

const steps = [
  { n: '01', icon: Globe, title: 'Informe a URL', desc: 'Cole o endereço público de um site brasileiro que você queira avaliar.' },
  { n: '02', icon: ScanSearch, title: 'Perícia automática', desc: 'Lemos política, cookies, formulários e segurança — só o que é público.' },
  { n: '03', icon: FileCheck2, title: 'Veja o resultado', desc: 'Pontuação, nível de risco e correções, artigo por artigo da LGPD.' },
];

const categories = [
  { icon: FileText, title: 'Política de Privacidade', art: 'Art. 6º · 9º', desc: 'Existência, finalidade, bases legais e retenção.' },
  { icon: Cookie, title: 'Cookies', art: 'Art. 7º · 8º', desc: 'Banner, consentimento e classificação por tipo.' },
  { icon: ClipboardList, title: 'Formulários', art: 'Art. 5º · 11', desc: 'Dados pessoais, sensíveis e minimização.' },
  { icon: Scale, title: 'Direitos do Titular', art: 'Art. 18', desc: 'Acesso, correção, exclusão e portabilidade.' },
  { icon: Building2, title: 'Controlador e Contato', art: 'Art. 5º · 41', desc: 'Identificação do responsável e canal do DPO.' },
  { icon: ShieldCheck, title: 'Segurança Básica', art: 'Art. 46', desc: 'HTTPS, páginas seguras e scripts de terceiros.' },
  { icon: Languages, title: 'Linguagem Clara', art: 'Art. 6º VI', desc: 'Transparência e ausência de termos vagos.' },
];
</script>

<template>
  <div class="space-y-16">
    <!-- Hero: abertura do resultado -->
    <section class="mx-auto max-w-3xl py-4 text-center">
      <div class="space-y-6">
        <p class="eyebrow">Resultado educativo · Lei nº 13.709/2018</p>
        <h1 class="font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
          Seu site fala
          <span class="text-primary">a língua da LGPD?</span>
        </h1>
        <p class="prose-lei max-w-xl text-lg leading-relaxed text-muted-foreground">
          Informe um endereço e o LGPDoc emite um resultado didático: o que está conforme, o que falta
          e como corrigir — cada ponto ligado ao artigo da lei que o sustenta.
        </p>
        <div class="sheet mx-auto max-w-2xl p-5 text-left sm:p-6">
          <UrlInput />
        </div>
        <LegalDisclaimer class="mx-auto max-w-2xl text-left" />
      </div>
    </section>

    <!-- Como funciona — sequência real, por isso numerada -->
    <section class="space-y-6">
      <header class="flex items-end justify-between gap-4 border-b border-border pb-3">
        <h2 class="font-display text-xl font-bold">Como funciona</h2>
        <span class="eyebrow">Três passos</span>
      </header>
      <ol class="grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-3">
        <li v-for="step in steps" :key="step.n" class="flex flex-col gap-3 bg-card p-5">
          <div class="flex items-center justify-between">
            <component :is="step.icon" class="h-6 w-6 text-primary" aria-hidden="true" />
            <span class="font-mono text-2xl font-medium text-accent/40">{{ step.n }}</span>
          </div>
          <h3 class="font-display text-base font-semibold">{{ step.title }}</h3>
          <p class="text-sm leading-relaxed text-muted-foreground">{{ step.desc }}</p>
        </li>
      </ol>
    </section>

    <!-- O que é analisado — espelha a coluna de artigos do resultado -->
    <section class="space-y-6">
      <header class="flex items-end justify-between gap-4 border-b border-border pb-3">
        <div class="space-y-1">
          <h2 class="font-display text-xl font-bold">O que é analisado</h2>
          <p class="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            As frentes abaixo aparecem depois no relatório e foram destacadas para que a leitura da análise fique mais direta.
          </p>
        </div>
        <span class="eyebrow">7 frentes · 33 critérios</span>
      </header>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="cat in categories" :key="cat.title" class="sheet flex items-start gap-4 border-l-4 border-primary p-5 transition-transform duration-150 hover:-translate-y-0.5">
          <span class="grid h-11 w-11 shrink-0 place-items-center rounded-sm bg-primary/10 text-primary ring-1 ring-primary/10">
            <component :is="cat.icon" class="h-5 w-5" aria-hidden="true" />
          </span>
          <div class="min-w-0">
            <div class="flex flex-wrap items-baseline gap-x-2">
              <h3 class="font-display text-sm font-semibold">{{ cat.title }}</h3>
              <span class="font-mono text-[0.65rem] text-accent">{{ cat.art }}</span>
            </div>
            <p class="mt-1 text-xs leading-relaxed text-muted-foreground">{{ cat.desc }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
