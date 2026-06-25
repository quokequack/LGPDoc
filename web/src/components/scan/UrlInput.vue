<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useScan } from '@/composables/useScan';
import Input from '@/components/ui/Input.vue';
import Button from '@/components/ui/Button.vue';
import { cn } from '@/lib/utils';
import { Globe, AlertCircle } from '@lucide/vue';
import { DEMO_SCAN_URL } from '@/mock/scans';

const { url, urlError, isSubmitting, validateUrl, submitScan } = useScan();
const localUrl = ref('');

watch(localUrl, (v) => { if (v) validateUrl(v); else urlError.value = null; });

function handleSubmit() { url.value = localUrl.value; submitScan(); }
function handleDemoSubmit() {
  localUrl.value = DEMO_SCAN_URL;
  url.value = DEMO_SCAN_URL;
  submitScan();
}

const inputClass = computed(() => cn('h-12 pl-10 text-base', urlError.value && 'border-destructive focus-visible:border-destructive'));
</script>

<template>
  <form class="w-full space-y-3" @submit.prevent="handleSubmit">
    <label for="scan-url" class="eyebrow block">Endereço do site</label>
    <div class="flex flex-col gap-2.5 sm:flex-row">
      <div class="relative flex-1">
        <Globe class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
        <Input
          id="scan-url"
          v-model="localUrl"
          type="text"
          :placeholder="DEMO_SCAN_URL"
          :disabled="isSubmitting"
          aria-label="URL do site para analisar"
          :aria-invalid="!!urlError"
          :class="inputClass"
          @keyup.enter="handleSubmit"
        />
      </div>
      <Button type="submit" size="lg" :disabled="isSubmitting || !localUrl.trim()" class="h-12 sm:w-44">
        {{ isSubmitting ? 'Abrindo laudo…' : 'Analisar site' }}
      </Button>
    </div>

    <p v-if="urlError" class="flex items-center gap-1.5 text-sm text-risk-high" role="alert">
      <AlertCircle class="h-4 w-4 shrink-0" aria-hidden="true" />
      {{ urlError }}
    </p>

    <button
      type="button"
      :disabled="isSubmitting"
      class="text-sm font-medium text-primary underline-offset-4 transition hover:underline disabled:opacity-50"
      @click="handleDemoSubmit"
    >
      Ver um laudo de exemplo →
    </button>
  </form>
</template>
