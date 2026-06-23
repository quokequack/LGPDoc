import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useScanStore } from '@/stores/scan.store';

export function useScan() {
  const router = useRouter();
  const scanStore = useScanStore();
  const url = ref('');
  const urlError = ref<string | null>(null);
  const isSubmitting = ref(false);

  function validateUrl(value: string): boolean {
    urlError.value = null;
    const trimmed = value.trim();

    if (!trimmed) {
      urlError.value = 'URL e obrigatoria';
      return false;
    }

    try {
      const parsed = new URL(trimmed);
      if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
        urlError.value = 'URL deve comecar com http:// ou https://';
        return false;
      }
      if (trimmed.length > 2048) {
        urlError.value = 'URL muito longa';
        return false;
      }
    } catch {
      urlError.value = 'URL invalida. Informe uma URL valida com http:// ou https://';
      return false;
    }

    return true;
  }

  async function submitScan() {
    if (!validateUrl(url.value)) return;

    isSubmitting.value = true;
    try {
      const scan = await scanStore.startScan(url.value.trim());

      // Navigate to scan progress page, which will also poll
      router.push({
        name: 'scan-progress',
        params: { id: scan.id },
      });
    } catch {
      urlError.value = scanStore.error || 'Erro ao iniciar analise';
    } finally {
      isSubmitting.value = false;
    }
  }

  return {
    url,
    urlError,
    isSubmitting,
    validateUrl,
    submitScan,
  };
}
