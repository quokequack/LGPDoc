import { computed } from 'vue';
import { FINDING_STATUS_LABELS } from '@/types/report.types';
import Card from '@/components/ui/Card.vue';
import CardContent from '@/components/ui/CardContent.vue';
import Badge from '@/components/ui/Badge.vue';
import RecommendationList from './RecommendationList.vue';
import { cn } from '@/lib/utils';
const props = defineProps();
const cardClass = computed(() => cn({
    'border-l-4 border-l-primary': props.finding.status === 'found',
    'border-l-4 border-l-secondary': props.finding.status === 'partial',
    'border-l-4 border-l-destructive': props.finding.status === 'absent',
}));
const statusVariant = {
    found: 'default', partial: 'secondary', absent: 'destructive',
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {[typeof Card, typeof Card, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(Card, new Card({
    ...{ class: "overflow-hidden" },
    ...{ class: (__VLS_ctx.cardClass) },
}));
const __VLS_1 = __VLS_0({
    ...{ class: "overflow-hidden" },
    ...{ class: (__VLS_ctx.cardClass) },
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
var __VLS_3 = {};
__VLS_2.slots.default;
/** @type {[typeof CardContent, typeof CardContent, ]} */ ;
// @ts-ignore
const __VLS_4 = __VLS_asFunctionalComponent(CardContent, new CardContent({
    ...{ class: "p-4 space-y-3" },
}));
const __VLS_5 = __VLS_4({
    ...{ class: "p-4 space-y-3" },
}, ...__VLS_functionalComponentArgsRest(__VLS_4));
__VLS_6.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex items-center gap-2 flex-wrap" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({
    ...{ class: "rounded-sm border-2 border-foreground bg-muted px-2 py-0.5 font-mono text-xs text-primary" },
});
(__VLS_ctx.finding.criterionCode);
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "text-sm font-medium flex-1" },
});
(__VLS_ctx.finding.criterionName);
/** @type {[typeof Badge, typeof Badge, ]} */ ;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent(Badge, new Badge({
    variant: (__VLS_ctx.statusVariant[__VLS_ctx.finding.status]),
}));
const __VLS_8 = __VLS_7({
    variant: (__VLS_ctx.statusVariant[__VLS_ctx.finding.status]),
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
__VLS_9.slots.default;
(__VLS_ctx.FINDING_STATUS_LABELS[__VLS_ctx.finding.status] || __VLS_ctx.finding.status);
var __VLS_9;
if (__VLS_ctx.finding.evidence) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "rounded-sm border-2 border-foreground bg-muted p-2.5 text-xs leading-relaxed" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "font-medium" },
    });
    (__VLS_ctx.finding.evidence);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "text-sm text-muted-foreground leading-relaxed" },
});
(__VLS_ctx.finding.explanation);
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "text-xs text-primary font-medium" },
});
(__VLS_ctx.finding.lgpdReference);
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "text-xs text-muted-foreground" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
(__VLS_ctx.finding.score.toFixed(1));
(__VLS_ctx.finding.maxScore.toFixed(1));
if (__VLS_ctx.finding.recommendations.length) {
    /** @type {[typeof RecommendationList, ]} */ ;
    // @ts-ignore
    const __VLS_10 = __VLS_asFunctionalComponent(RecommendationList, new RecommendationList({
        recommendations: (__VLS_ctx.finding.recommendations),
    }));
    const __VLS_11 = __VLS_10({
        recommendations: (__VLS_ctx.finding.recommendations),
    }, ...__VLS_functionalComponentArgsRest(__VLS_10));
}
var __VLS_6;
var __VLS_2;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-3']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['border-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-muted']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-0.5']} */ ;
/** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['border-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-muted']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-relaxed']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-relaxed']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            FINDING_STATUS_LABELS: FINDING_STATUS_LABELS,
            Card: Card,
            CardContent: CardContent,
            Badge: Badge,
            RecommendationList: RecommendationList,
            cardClass: cardClass,
            statusVariant: statusVariant,
        };
    },
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
