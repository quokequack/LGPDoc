import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useReport } from '@/composables/useReport';
import FindingCard from '@/components/report/FindingCard.vue';
import Badge from '@/components/ui/Badge.vue';
import { CATEGORY_LABELS } from '@/types/report.types';
const route = useRoute();
const category = route.params.category;
const { report, isLoading, error } = useReport();
const cat = computed(() => report?.categories.find((c) => c.category === category) || null);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "space-y-4" },
});
if (__VLS_ctx.isLoading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "text-center py-12 text-muted-foreground" },
    });
}
else if (__VLS_ctx.error) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "text-center py-12 text-destructive" },
    });
    (__VLS_ctx.error);
}
else if (__VLS_ctx.cat) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "lofi-tape rotate-[-1deg] flex items-center gap-3 rounded-sm border-2 border-foreground bg-card p-4 shadow-[6px_6px_0_hsl(var(--foreground))]" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
        ...{ class: "lofi-title font-display text-xl font-bold" },
    });
    (__VLS_ctx.CATEGORY_LABELS[__VLS_ctx.cat.category] || __VLS_ctx.cat.category);
    /** @type {[typeof Badge, typeof Badge, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(Badge, new Badge({
        variant: "secondary",
    }));
    const __VLS_1 = __VLS_0({
        variant: "secondary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    __VLS_2.slots.default;
    (__VLS_ctx.cat.percentage);
    (__VLS_ctx.cat.score.toFixed(1));
    (__VLS_ctx.cat.maxScore);
    var __VLS_2;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "text-sm text-muted-foreground" },
    });
    (__VLS_ctx.cat.summary);
    for (const [f] of __VLS_getVForSourceType((__VLS_ctx.cat.findings))) {
        /** @type {[typeof FindingCard, ]} */ ;
        // @ts-ignore
        const __VLS_3 = __VLS_asFunctionalComponent(FindingCard, new FindingCard({
            key: (f.id),
            finding: (f),
        }));
        const __VLS_4 = __VLS_3({
            key: (f.id),
            finding: (f),
        }, ...__VLS_functionalComponentArgsRest(__VLS_3));
    }
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "text-center py-12 text-muted-foreground" },
    });
}
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['py-12']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['py-12']} */ ;
/** @type {__VLS_StyleScopedClasses['text-destructive']} */ ;
/** @type {__VLS_StyleScopedClasses['lofi-tape']} */ ;
/** @type {__VLS_StyleScopedClasses['rotate-[-1deg]']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['border-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-card']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-[6px_6px_0_hsl(var(--foreground))]']} */ ;
/** @type {__VLS_StyleScopedClasses['lofi-title']} */ ;
/** @type {__VLS_StyleScopedClasses['font-display']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['py-12']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            FindingCard: FindingCard,
            Badge: Badge,
            CATEGORY_LABELS: CATEGORY_LABELS,
            isLoading: isLoading,
            error: error,
            cat: cat,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
