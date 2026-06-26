import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getMockReport } from '@/mock/reports';
import { DEMO_SCAN_URL } from '@/mock/scans';
export const useReportStore = defineStore('report', () => {
    const report = ref(null);
    const isLoading = ref(false);
    const error = ref(null);
    async function fetchReport(scanId, url = DEMO_SCAN_URL) {
        isLoading.value = true;
        error.value = null;
        report.value = null;
        try {
            // Simulate network delay
            await new Promise((r) => setTimeout(r, 400));
            report.value = getMockReport(scanId, url);
            return report.value;
        }
        catch (e) {
            error.value = e instanceof Error ? e.message : 'Erro ao carregar resultado';
            throw e;
        }
        finally {
            isLoading.value = false;
        }
    }
    function reset() {
        report.value = null;
        error.value = null;
        isLoading.value = false;
    }
    return { report, isLoading, error, fetchReport, reset };
});
