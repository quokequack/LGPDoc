import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useScanHistory } from '@/composables/useScanHistory';
import RiskBadge from '@/components/report/RiskBadge.vue';
import Badge from '@/components/ui/Badge.vue';
import Button from '@/components/ui/Button.vue';
import Skeleton from '@/components/ui/Skeleton.vue';
const router = useRouter();
const { scans, total, totalPages, currentPage, isLoading, error, loadHistory, prevPage, nextPage } = useScanHistory();
onMounted(() => loadHistory(1));
function viewReport(s) { if (s.status === 'completed')
    router.push({ name: 'resultado' }); }
function fmtDate(d) { return new Date(d).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }); }
const statusMap = {
    pending: { label: 'Pendente', variant: 'secondary' },
    running: { label: 'Em andamento', variant: 'default' },
    completed: { label: 'Concluido', variant: 'default' },
    failed: { label: 'Falhou', variant: 'destructive' },
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "space-y-4" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
    ...{ class: "lofi-title font-display text-2xl font-bold" },
});
if (__VLS_ctx.isLoading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "space-y-2" },
    });
    for (const [i] of __VLS_getVForSourceType((5))) {
        /** @type {[typeof Skeleton, ]} */ ;
        // @ts-ignore
        const __VLS_0 = __VLS_asFunctionalComponent(Skeleton, new Skeleton({
            key: (i),
            ...{ class: "h-12 w-full" },
        }));
        const __VLS_1 = __VLS_0({
            key: (i),
            ...{ class: "h-12 w-full" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    }
}
else if (__VLS_ctx.error) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "text-destructive text-center py-8" },
    });
    (__VLS_ctx.error);
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "text-sm text-muted-foreground" },
    });
    (__VLS_ctx.total);
}
if (!__VLS_ctx.isLoading && __VLS_ctx.scans.length === 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "text-center py-12 text-muted-foreground space-y-2" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    const __VLS_3 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    const __VLS_4 = __VLS_asFunctionalComponent(__VLS_3, new __VLS_3({
        to: "/",
        ...{ class: "text-primary font-medium hover:underline" },
    }));
    const __VLS_5 = __VLS_4({
        to: "/",
        ...{ class: "text-primary font-medium hover:underline" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_4));
    __VLS_6.slots.default;
    var __VLS_6;
}
else if (!__VLS_ctx.isLoading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "rotate-[-1deg] overflow-x-auto rounded-sm border-2 border-foreground bg-card shadow-[7px_7px_0_hsl(var(--foreground))]" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({
        ...{ class: "w-full text-sm" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({
        ...{ class: "bg-primary text-primary-foreground" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        ...{ class: "text-left p-3 font-medium" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        ...{ class: "text-left p-3 font-medium" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        ...{ class: "text-left p-3 font-medium" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        ...{ class: "text-left p-3 font-medium" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        ...{ class: "text-left p-3 font-medium" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        ...{ class: "text-left p-3 font-medium" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
    for (const [s] of __VLS_getVForSourceType((__VLS_ctx.scans))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
            ...{ onClick: (...[$event]) => {
                    if (!!(!__VLS_ctx.isLoading && __VLS_ctx.scans.length === 0))
                        return;
                    if (!(!__VLS_ctx.isLoading))
                        return;
                    __VLS_ctx.viewReport(s);
                } },
            key: (s.id),
            ...{ class: "cursor-pointer border-t-2 border-foreground transition-colors hover:bg-muted" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            ...{ class: "p-3 max-w-[200px] truncate font-mono text-xs" },
            title: (s.url),
        });
        (s.url);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            ...{ class: "p-3" },
        });
        /** @type {[typeof Badge, typeof Badge, ]} */ ;
        // @ts-ignore
        const __VLS_7 = __VLS_asFunctionalComponent(Badge, new Badge({
            variant: (__VLS_ctx.statusMap[s.status]?.variant || 'secondary'),
            ...{ class: "text-[0.65rem]" },
        }));
        const __VLS_8 = __VLS_7({
            variant: (__VLS_ctx.statusMap[s.status]?.variant || 'secondary'),
            ...{ class: "text-[0.65rem]" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_7));
        __VLS_9.slots.default;
        (__VLS_ctx.statusMap[s.status]?.label || s.status);
        var __VLS_9;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            ...{ class: "p-3 font-semibold tabular-nums" },
        });
        (s.score !== null ? s.score.toFixed(1) : '—');
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            ...{ class: "p-3" },
        });
        if (s.riskLevel) {
            /** @type {[typeof RiskBadge, ]} */ ;
            // @ts-ignore
            const __VLS_10 = __VLS_asFunctionalComponent(RiskBadge, new RiskBadge({
                riskLevel: s.riskLevel,
            }));
            const __VLS_11 = __VLS_10({
                riskLevel: s.riskLevel,
            }, ...__VLS_functionalComponentArgsRest(__VLS_10));
        }
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            ...{ class: "p-3 text-xs text-muted-foreground whitespace-nowrap" },
        });
        (__VLS_ctx.fmtDate(s.createdAt));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            ...{ class: "p-3" },
        });
        if (s.status === 'completed') {
            /** @type {[typeof Button, typeof Button, ]} */ ;
            // @ts-ignore
            const __VLS_13 = __VLS_asFunctionalComponent(Button, new Button({
                ...{ 'onClick': {} },
                size: "sm",
                variant: "outline",
            }));
            const __VLS_14 = __VLS_13({
                ...{ 'onClick': {} },
                size: "sm",
                variant: "outline",
            }, ...__VLS_functionalComponentArgsRest(__VLS_13));
            let __VLS_16;
            let __VLS_17;
            let __VLS_18;
            const __VLS_19 = {
                onClick: (...[$event]) => {
                    if (!!(!__VLS_ctx.isLoading && __VLS_ctx.scans.length === 0))
                        return;
                    if (!(!__VLS_ctx.isLoading))
                        return;
                    if (!(s.status === 'completed'))
                        return;
                    __VLS_ctx.viewReport(s);
                }
            };
            __VLS_15.slots.default;
            var __VLS_15;
        }
    }
}
if (__VLS_ctx.totalPages > 1) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "flex items-center justify-center gap-4 pt-2" },
    });
    /** @type {[typeof Button, typeof Button, ]} */ ;
    // @ts-ignore
    const __VLS_20 = __VLS_asFunctionalComponent(Button, new Button({
        ...{ 'onClick': {} },
        variant: "outline",
        size: "sm",
        disabled: (__VLS_ctx.currentPage <= 1),
    }));
    const __VLS_21 = __VLS_20({
        ...{ 'onClick': {} },
        variant: "outline",
        size: "sm",
        disabled: (__VLS_ctx.currentPage <= 1),
    }, ...__VLS_functionalComponentArgsRest(__VLS_20));
    let __VLS_23;
    let __VLS_24;
    let __VLS_25;
    const __VLS_26 = {
        onClick: (...[$event]) => {
            if (!(__VLS_ctx.totalPages > 1))
                return;
            __VLS_ctx.prevPage();
        }
    };
    __VLS_22.slots.default;
    var __VLS_22;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "text-sm text-muted-foreground" },
    });
    (__VLS_ctx.currentPage);
    (__VLS_ctx.totalPages);
    /** @type {[typeof Button, typeof Button, ]} */ ;
    // @ts-ignore
    const __VLS_27 = __VLS_asFunctionalComponent(Button, new Button({
        ...{ 'onClick': {} },
        variant: "outline",
        size: "sm",
        disabled: (__VLS_ctx.currentPage >= __VLS_ctx.totalPages),
    }));
    const __VLS_28 = __VLS_27({
        ...{ 'onClick': {} },
        variant: "outline",
        size: "sm",
        disabled: (__VLS_ctx.currentPage >= __VLS_ctx.totalPages),
    }, ...__VLS_functionalComponentArgsRest(__VLS_27));
    let __VLS_30;
    let __VLS_31;
    let __VLS_32;
    const __VLS_33 = {
        onClick: (...[$event]) => {
            if (!(__VLS_ctx.totalPages > 1))
                return;
            __VLS_ctx.nextPage();
        }
    };
    __VLS_29.slots.default;
    var __VLS_29;
}
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
/** @type {__VLS_StyleScopedClasses['lofi-title']} */ ;
/** @type {__VLS_StyleScopedClasses['font-display']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
/** @type {__VLS_StyleScopedClasses['h-12']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['text-destructive']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['py-8']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['py-12']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:underline']} */ ;
/** @type {__VLS_StyleScopedClasses['rotate-[-1deg]']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-x-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['border-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-card']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-[7px_7px_0_hsl(var(--foreground))]']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['text-left']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-left']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-left']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-left']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-left']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-left']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['border-t-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-muted']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-[200px]']} */ ;
/** @type {__VLS_StyleScopedClasses['truncate']} */ ;
/** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[0.65rem]']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['tabular-nums']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            RiskBadge: RiskBadge,
            Badge: Badge,
            Button: Button,
            Skeleton: Skeleton,
            scans: scans,
            total: total,
            totalPages: totalPages,
            currentPage: currentPage,
            isLoading: isLoading,
            error: error,
            prevPage: prevPage,
            nextPage: nextPage,
            viewReport: viewReport,
            fmtDate: fmtDate,
            statusMap: statusMap,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
