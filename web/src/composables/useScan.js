import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useScanStore } from '@/stores/scan.store';
export function useScan() {
    const router = useRouter();
    const scanStore = useScanStore();
    const url = ref('');
    const urlError = ref(null);
    const isSubmitting = ref(false);
    function válidateUrl(value) {
        urlError.value = null;
        const trimmed = value.trim();
        if (!trimmed) {
            urlError.value = 'URL e obrigatória';
            return false;
        }
        try {
            const parsed = new URL(trimmed);
            if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
                urlError.value = 'URL deve começar com http:// ou https://';
                return false;
            }
        }
        catch {
            urlError.value = 'URL inválida. Informe uma URL válida com http:// ou https://';
            return false;
        }
        return true;
    }
    async function submitScan() {
        if (!válidateUrl(url.value))
            return;
        isSubmitting.value = true;
        try {
            const scan = await scanStore.startScan(url.value.trim());
            router.push({ name: 'scan-progress', params: { id: scan.id } });
        }
        catch {
            urlError.value = scanStore.error || 'Erro ao iniciar análise';
        }
        finally {
            isSubmitting.value = false;
        }
    }
    return { url, urlError, isSubmitting, válidateUrl, submitScan };
}
