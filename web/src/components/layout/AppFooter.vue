<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<template>
  <footer class="mt-16 border-t border-border">
    <div class="mx-auto flex max-w-laudo flex-col gap-3 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div class="flex items-center gap-2.5">
        <span class="grid h-7 w-7 place-items-center rounded-sm bg-primary font-serif text-base leading-none text-accent">§</span>
        <p class="font-mono text-xs text-muted-foreground">
          LGPDoc · protótipo educacional · {{ year }}
        </p>
      </div>
      <p class="max-w-sm text-xs leading-relaxed text-muted-foreground">
        Baseado na Lei nº 13.709/2018 (LGPD). Analisa apenas informações públicas; não armazena
        dados pessoais dos sites avaliados.
      </p>
    </div>
  </footer>
</template>
