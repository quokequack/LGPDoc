import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { ScanResponse, ScanListItem } from '@/types/scan.types';
import { getMockScanProgress, generateMockScanList } from '@/mock/scans';

export const useScanStore = defineStore('scan', () => {
  const currentScan = ref<ScanResponse | null>(null);
  const scanList = ref<ScanListItem[]>([]);
  const totalScans = ref(0);
  const totalPages = ref(0);
  const currentPage = ref(1);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  let pollingTimer: ReturnType<typeof setInterval> | null = null;

  async function startScan(url: string) {
    isLoading.value = true;
    error.value = null;
    try {
      const scan: ScanResponse = {
        id: crypto.randomUUID(),
        url,
        status: 'pending',
        score: null,
        riskLevel: null,
        startedAt: new Date().toISOString(),
        completedAt: null,
        errorMessage: null,
        createdAt: new Date().toISOString(),
      };
      currentScan.value = scan;
      isLoading.value = false;

      // Simulate progress: pending -> running -> completed.
      setTimeout(() => {
        if (currentScan.value?.id === scan.id) {
          currentScan.value = { ...currentScan.value, status: 'running' };
        }
      }, 300);

      getMockScanProgress(url, 4000)
        .then((result) => {
          if (currentScan.value?.id === scan.id) {
            currentScan.value = { ...result, id: scan.id };
          }
        })
        .catch((e) => {
          if (currentScan.value?.id === scan.id) {
            currentScan.value = {
              ...currentScan.value,
              status: 'failed',
              errorMessage: e instanceof Error ? e.message : 'Erro ao iniciar analise',
            };
          }
          error.value = e instanceof Error ? e.message : 'Erro ao iniciar analise';
        });

      return scan;
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Erro ao iniciar analise';
      throw e;
    } finally {
      if (!currentScan.value) isLoading.value = false;
    }
  }

  function startPolling(scanId: string, onComplete?: (scan: ScanResponse) => void) {
    stopPolling();
    const completeIfReady = () => {
      if (
        currentScan.value?.id === scanId &&
        (currentScan.value.status === 'completed' || currentScan.value.status === 'failed')
      ) {
        stopPolling();
        if (onComplete && currentScan.value) onComplete(currentScan.value);
      }
    };

    completeIfReady();
    pollingTimer = setInterval(completeIfReady, 500);
  }

  function stopPolling() {
    if (pollingTimer) {
      clearInterval(pollingTimer);
      pollingTimer = null;
    }
  }

  async function fetchScanList(page = 1, limit = 20) {
    isLoading.value = true;
    try {
      const all = generateMockScanList(10);
      const start = (page - 1) * limit;
      scanList.value = all.slice(start, start + limit);
      totalScans.value = all.length;
      totalPages.value = Math.ceil(all.length / limit);
      currentPage.value = page;
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Erro ao carregar historico';
    } finally {
      isLoading.value = false;
    }
  }

  function reset() {
    currentScan.value = null;
    error.value = null;
    isLoading.value = false;
    stopPolling();
  }

  return {
    currentScan,
    scanList,
    totalScans,
    totalPages,
    currentPage,
    isLoading,
    error,
    startScan,
    startPolling,
    stopPolling,
    fetchScanList,
    reset,
  };
});
