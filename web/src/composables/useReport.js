import { onMounted, onUnmounted } from 'vue';
import { useReportStore } from '@/stores/report.store';
import { useScanStore } from '@/stores/scan.store';
import { DEMO_SCAN_URL } from '@/mock/scans';
export function useReport(scanId) {
    const store = useReportStore();
    const scanStore = useScanStore();
    onMounted(() => {
        const currentUrl = scanStore.currentScan?.id === scanId ? scanStore.currentScan.url : DEMO_SCAN_URL;
        store.fetchReport(scanId, currentUrl);
    });
    onUnmounted(() => { store.reset(); });
    return { report: store.report, isLoading: store.isLoading, error: store.error };
}
