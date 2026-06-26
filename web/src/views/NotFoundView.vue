<script setup lang="ts">
import { RouterLink } from 'vue-router';
import Button from '@/components/ui/Button.vue';
</script>

<template>
  <div class="mx-auto max-w-md py-20 text-center">
    <div class="sheet selo-press -rotate-[3deg] p-10">
      <p class="eyebrow">Sem registro</p>
      <h1 class="mt-2 font-display text-7xl font-extrabold tracking-tight text-primary">404</h1>
      <p class="prose-lei mt-3 text-muted-foreground">Esta página não consta nos autos.</p>
      <Button as-child variant="outline" class="mt-6">
        <RouterLink to="/">Voltar ao início</RouterLink>
      </Button>
    </div>
  </div>
</template>
