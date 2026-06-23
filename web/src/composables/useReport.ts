import { ref, onMounted, onUnmounted } from 'vue';
import { useReportStore } from '@/stores/report.store';

export function useReport(scanId: string) {
  const reportStore = useReportStore();

  onMounted(async () => {
    await reportStore.fetchReport(scanId);
  });

  onUnmounted(() => {
    reportStore.reset();
  });

  return {
    report: reportStore.report,
    isLoading: reportStore.isLoading,
    error: reportStore.error,
  };
}
