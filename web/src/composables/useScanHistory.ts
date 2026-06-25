import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useScanStore } from '@/stores/scan.store';

export function useScanHistory() {
  const store = useScanStore();
  const { scanList: scans, totalScans: total, totalPages, isLoading, error } = storeToRefs(store);
  const currentPage = ref(1);
  const pageSize = ref(20);

  async function loadHistory(page = 1) {
    currentPage.value = page;
    await store.fetchScanList(page, pageSize.value);
  }

  function goToPage(page: number) {
    if (page < 1 || page > store.totalPages) return;
    loadHistory(page);
  }

  function prevPage() { if (currentPage.value > 1) goToPage(currentPage.value - 1); }
  function nextPage() { if (currentPage.value < store.totalPages) goToPage(currentPage.value + 1); }

  return {
    scans, total, totalPages,
    currentPage, pageSize, isLoading, error,
    loadHistory, goToPage, prevPage, nextPage,
  };
}
