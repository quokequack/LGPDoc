import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { ScanResponse, ScanListItem } from '@/types/scan.types';
import * as scanService from '@/services/scan.service';

export const useScanStore = defineStore('scan', () => {
  const currentScan = ref<ScanResponse | null>(null);
  const scanList = ref<ScanListItem[]>([]);
  const totalScans = ref(0);
  const totalPages = ref(0);
  const currentPage = ref(1);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const pollingId = ref<ReturnType<typeof setInterval> | null>(null);

  async function startScan(url: string) {
    isLoading.value = true;
    error.value = null;
    try {
      currentScan.value = await scanService.createScan(url);
      return currentScan.value;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro ao iniciar analise';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  function startPolling(scanId: string, onComplete?: (scan: ScanResponse) => void) {
    stopPolling();
    pollingId.value = setInterval(async () => {
      try {
        const scan = await scanService.getScan(scanId);
        currentScan.value = scan;
        if (scan.status === 'completed' || scan.status === 'failed') {
          stopPolling();
          if (onComplete) onComplete(scan);
        }
      } catch {
        stopPolling();
      }
    }, 2000);
  }

  function stopPolling() {
    if (pollingId.value) {
      clearInterval(pollingId.value);
      pollingId.value = null;
    }
  }

  async function fetchScanList(page = 1, limit = 20) {
    isLoading.value = true;
    try {
      const result = await scanService.listScans({ page, limit, sort: 'createdAt', order: 'desc' });
      scanList.value = result.data;
      totalScans.value = result.total;
      totalPages.value = result.totalPages;
      currentPage.value = page;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro ao carregar historico';
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
