import { onUnmounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useReportStore } from '@/stores/report.store';
import { DEMO_SCAN_URL } from '@/mock/scans';
export function useReport() {
    const store = useReportStore();
    const { report, isLoading, error } = storeToRefs(store);
    store.fetchReport('resultado-demo', DEMO_SCAN_URL);
    onUnmounted(() => { store.reset(); });
    return { report, isLoading, error };
}
