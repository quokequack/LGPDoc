import { onMounted, onUnmounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useReportStore } from '@/stores/report.store';
import { useScanStore } from '@/stores/scan.store';
import { DEMO_SCAN_URL } from '@/mock/scans';

export function useReport(scanId: string) {
  const store = useReportStore();
  const scanStore = useScanStore();
  const { report, isLoading, error } = storeToRefs(store);

  onMounted(() => {
    const currentUrl = scanStore.currentScan?.id === scanId ? scanStore.currentScan.url : DEMO_SCAN_URL;
    console.log("USEREPORT onMounted firing", scanId); store.fetchReport(scanId, currentUrl);
  });
  onUnmounted(() => { store.reset(); });

  return { report, isLoading, error };
}
