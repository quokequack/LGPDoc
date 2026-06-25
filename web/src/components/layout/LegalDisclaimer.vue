<script setup lang="ts">
import { Info } from '@lucide/vue';
</script>

<template>
  <aside
    class="tarja flex items-start gap-3 rounded-sm border border-border bg-muted/50 px-4 py-3 text-sm"
    role="note"
    aria-label="Aviso legal"
  >
    <Info class="mt-0.5 h-4 w-4 shrink-0 text-risk-medium" aria-hidden="true" />
    <p class="prose-lei leading-relaxed text-muted-foreground">
      <span class="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-risk-medium">Documento didático ·</span>
      Este laudo tem caráter exclusivamente educativo. Não constitui parecer jurídico, não
      certifica conformidade com a LGPD e não substitui a avaliação de um profissional
      especializado em proteção de dados.
    </p>
  </aside>
</template>
