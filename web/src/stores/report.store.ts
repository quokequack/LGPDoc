import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { ReportResponse } from '@/types/report.types';
import * as reportService from '@/services/report.service';

export const useReportStore = defineStore('report', () => {
  const report = ref<ReportResponse | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  async function fetchReport(scanId: string) {
    isLoading.value = true;
    error.value = null;
    try {
      report.value = await reportService.getReport(scanId);
      return report.value;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro ao carregar relatorio';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  function reset() {
    report.value = null;
    error.value = null;
    isLoading.value = false;
  }

  return {
    report,
    isLoading,
    error,
    fetchReport,
    reset,
  };
});
