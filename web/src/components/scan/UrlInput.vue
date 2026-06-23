<script setup lang="ts">
import { ref, watch } from 'vue';
import { useScan } from '@/composables/useScan';

const { url, urlError, isSubmitting, validateUrl, submitScan } = useScan();

const localUrl = ref('');

watch(() => localUrl.value, (val) => {
  if (val) validateUrl(val);
  else urlError.value = null;
});

function handleSubmit() {
  url.value = localUrl.value;
  submitScan();
}
</script>

<template>
  <form class="url-input" @submit.prevent="handleSubmit">
    <div class="input-group">
      <label for="scan-url" class="sr-only">URL do site para analisar</label>
      <input
        id="scan-url"
        v-model="localUrl"
        type="text"
        placeholder="https://exemplo.com.br"
        class="url-field"
        :class="{ 'url-field--error': urlError }"
        :disabled="isSubmitting"
        aria-describedby="url-error"
        autocomplete="url"
        enterkeyhint="go"
      />
      <button
        type="submit"
        class="url-submit"
        :disabled="isSubmitting || !localUrl.trim()"
      >
        {{ isSubmitting ? 'Analisando...' : 'Analisar' }}
      </button>
    </div>
    <p
      v-if="urlError"
      id="url-error"
      class="url-error"
      role="alert"
      aria-live="polite"
    >
      {{ urlError }}
    </p>
  </form>
</template>

<style scoped>
.url-input {
  width: 100%;
}

.input-group {
  display: flex;
  gap: 8px;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
}

.url-field {
  flex: 1;
  padding: 12px 16px;
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: 1rem;
  font-family: var(--font-sans);
  outline: none;
  transition: border-color 0.15s;
}

.url-field:focus {
  border-color: var(--color-primary);
}

.url-field--error {
  border-color: var(--color-danger);
}

.url-field:disabled {
  background: var(--color-bg);
  color: var(--color-text-secondary);
}

.url-submit {
  padding: 12px 24px;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s;
}

.url-submit:hover:not(:disabled) {
  background: var(--color-primary-dark);
}

.url-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.url-error {
  color: var(--color-danger);
  font-size: 0.85rem;
  margin-top: 8px;
}
</style>
