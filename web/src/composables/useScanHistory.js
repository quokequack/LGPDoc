import { ref } from 'vue';
import { useScanStore } from '@/stores/scan.store';
export function useScanHistory() {
    const store = useScanStore();
    const currentPage = ref(1);
    const pageSize = ref(20);
    async function loadHistory(page = 1) {
        currentPage.value = page;
        await store.fetchScanList(page, pageSize.value);
    }
    function goToPage(page) {
        if (page < 1 || page > store.totalPages)
            return;
        loadHistory(page);
    }
    function prevPage() { if (currentPage.value > 1)
        goToPage(currentPage.value - 1); }
    function nextPage() { if (currentPage.value < store.totalPages)
        goToPage(currentPage.value + 1); }
    return {
        scans: store.scanList, total: store.totalScans, totalPages: store.totalPages,
        currentPage, pageSize, isLoading: store.isLoading, error: store.error,
        loadHistory, goToPage, prevPage, nextPage,
    };
}
