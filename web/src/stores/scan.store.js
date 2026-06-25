import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getMockScanProgress, generateMockScanList } from '@/mock/scans';
export const useScanStore = defineStore('scan', () => {
    const currentScan = ref(null);
    const scanList = ref([]);
    const totalScans = ref(0);
    const totalPages = ref(0);
    const currentPage = ref(1);
    const isLoading = ref(false);
    const error = ref(null);
    let pollingTimer = null;
    async function startScan(url) {
        isLoading.value = true;
        error.value = null;
        try {
            const elapsed = ref(0);
            currentScan.value = {
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
            // Simulate progress: pending → running → completed
            setTimeout(() => {
                if (currentScan.value) {
                    currentScan.value = { ...currentScan.value, status: 'running' };
                }
            }, 300);
            const result = await getMockScanProgress(url, 4000);
            currentScan.value = result;
            return result;
        }
        catch (e) {
            error.value = e instanceof Error ? e.message : 'Erro ao iniciar analise';
            throw e;
        }
        finally {
            isLoading.value = false;
        }
    }
    function startPolling(scanId, onComplete) {
        stopPolling();
        pollingTimer = setInterval(() => {
            if (currentScan.value?.status === 'completed' || currentScan.value?.status === 'failed') {
                stopPolling();
                if (onComplete && currentScan.value)
                    onComplete(currentScan.value);
            }
        }, 500);
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
        }
        catch (e) {
            error.value = e instanceof Error ? e.message : 'Erro ao carregar historico';
        }
        finally {
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
