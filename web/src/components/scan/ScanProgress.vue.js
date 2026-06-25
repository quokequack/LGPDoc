import { onMounted, onUnmounted, computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useScanStore } from '@/stores/scan.store';
import Progress from '@/components/ui/Progress.vue';
import { Check, Loader2 } from '@lucide/vue';
const route = useRoute();
const router = useRouter();
const scanStore = useScanStore();
const scanId = route.params.id;
const steps = [
    { key: 'fetching', label: 'Acessando o site...' },
    { key: 'privacy', label: 'Analisando política de privacidade...' },
    { key: 'cookies', label: 'Verificando cookies...' },
    { key: 'forms', label: 'Analisando formulários...' },
    { key: 'security', label: 'Verificando segurança...' },
    { key: 'scoring', label: 'Montando o resultado demonstrativo' },
];
const elapsedMs = ref(0);
let timer = null;
onMounted(() => {
    timer = setInterval(() => { elapsedMs.value += 100; }, 100);
    scanStore.startPolling(scanId, (scan) => {
        if (scan.status === 'completed') {
            setTimeout(() => router.push({ name: 'resultado' }), 600);
        }
    });
});
onUnmounted(() => { if (timer)
    clearInterval(timer); scanStore.stopPolling(); });
const progressPct = computed(() => {
    if (scanStore.currentScan?.status === 'completed')
        return 100;
    if (scanStore.currentScan?.status === 'failed')
        return 100;
    return Math.min(Math.round((elapsedMs.value / 4500) * 100), 95);
});
const currentStepIdx = computed(() => Math.min(Math.floor(elapsedMs.value / 750), steps.length - 1));
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mx-auto max-w-xl space-y-6 py-8" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "text-center space-y-2" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
    ...{ class: "lofi-title font-display text-xl font-semibold" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "text-sm text-muted-foreground break-all" },
});
(__VLS_ctx.scanStore.currentScan?.url || '...');
/** @type {[typeof Progress, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(Progress, new Progress({
    modelValue: (__VLS_ctx.progressPct),
    ...{ class: "h-2" },
}));
const __VLS_1 = __VLS_0({
    modelValue: (__VLS_ctx.progressPct),
    ...{ class: "h-2" },
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "text-center text-sm text-muted-foreground" },
});
(__VLS_ctx.progressPct);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "lofi-panel space-y-2 rounded-sm border-2 border-foreground bg-card p-4" },
});
for (const [step, i] of __VLS_getVForSourceType((__VLS_ctx.steps))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        key: (step.key),
        ...{ class: "flex items-center gap-3 px-2" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "flex h-7 w-7 shrink-0 items-center justify-center rounded-md border-2 transition-colors" },
        ...{ class: ({
                'border-foreground bg-primary text-primary-foreground': i < __VLS_ctx.currentStepIdx,
                'border-foreground bg-card text-primary': i === __VLS_ctx.currentStepIdx,
                'border-muted-foreground/30': i > __VLS_ctx.currentStepIdx,
            }) },
    });
    if (i < __VLS_ctx.currentStepIdx) {
        const __VLS_3 = {}.Check;
        /** @type {[typeof __VLS_components.Check, ]} */ ;
        // @ts-ignore
        const __VLS_4 = __VLS_asFunctionalComponent(__VLS_3, new __VLS_3({
            ...{ class: "w-3.5 h-3.5" },
        }));
        const __VLS_5 = __VLS_4({
            ...{ class: "w-3.5 h-3.5" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_4));
    }
    else if (i === __VLS_ctx.currentStepIdx) {
        const __VLS_7 = {}.Loader2;
        /** @type {[typeof __VLS_components.Loader2, ]} */ ;
        // @ts-ignore
        const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({
            ...{ class: "w-3.5 h-3.5 animate-spin" },
        }));
        const __VLS_9 = __VLS_8({
            ...{ class: "w-3.5 h-3.5 animate-spin" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "text-xs text-muted-foreground" },
        });
        (i + 1);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "text-sm transition-colors" },
        ...{ class: ({
                'text-foreground font-medium': i === __VLS_ctx.currentStepIdx,
                'text-muted-foreground': i < __VLS_ctx.currentStepIdx || i > __VLS_ctx.currentStepIdx,
            }) },
    });
    (step.label);
}
if (__VLS_ctx.scanStore.currentScan?.status === 'failed') {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "text-center text-sm text-destructive" },
    });
    (__VLS_ctx.scanStore.currentScan.errorMessage || 'Falha ao analisar. Tente novamente.');
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "text-center text-xs text-muted-foreground" },
});
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-6']} */ ;
/** @type {__VLS_StyleScopedClasses['py-8']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
/** @type {__VLS_StyleScopedClasses['lofi-title']} */ ;
/** @type {__VLS_StyleScopedClasses['font-display']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['break-all']} */ ;
/** @type {__VLS_StyleScopedClasses['h-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['lofi-panel']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['border-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-card']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-7']} */ ;
/** @type {__VLS_StyleScopedClasses['w-7']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['border-2']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
/** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
/** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
/** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-spin']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-destructive']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Progress: Progress,
            Check: Check,
            Loader2: Loader2,
            scanStore: scanStore,
            steps: steps,
            progressPct: progressPct,
            currentStepIdx: currentStepIdx,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
