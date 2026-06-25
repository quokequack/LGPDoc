import { useRoute } from 'vue-router';
import { useReport } from '@/composables/useReport';
import ScoreGauge from '@/components/report/ScoreGauge.vue';
import RiskBadge from '@/components/report/RiskBadge.vue';
import CategorySummary from '@/components/report/CategorySummary.vue';
import FindingCard from '@/components/report/FindingCard.vue';
import LegalDisclaimer from '@/components/layout/LegalDisclaimer.vue';
import Card from '@/components/ui/Card.vue';
import Badge from '@/components/ui/Badge.vue';
import Separator from '@/components/ui/Separator.vue';
import { CATEGORY_LABELS } from '@/types/report.types';
const route = useRoute();
const scanId = route.params.id;
const { report, isLoading, error } = useReport(scanId);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "space-y-6" },
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
else if (__VLS_ctx.report) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
        ...{ class: "lofi-tape rotate-[-1deg] space-y-4 rounded-sm border-2 border-foreground bg-card p-5 text-center shadow-[8px_8px_0_hsl(var(--foreground))]" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
        ...{ class: "lofi-title font-display text-2xl font-bold" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
        href: (__VLS_ctx.report.scan.url),
        target: "_blank",
        rel: "noopener",
        ...{ class: "text-sm text-primary break-all hover:underline" },
    });
    (__VLS_ctx.report.scan.url);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "flex items-center justify-center gap-6 flex-wrap" },
    });
    /** @type {[typeof ScoreGauge, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(ScoreGauge, new ScoreGauge({
        score: (__VLS_ctx.report.scan.score),
        size: "lg",
    }));
    const __VLS_1 = __VLS_0({
        score: (__VLS_ctx.report.scan.score),
        size: "lg",
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "text-left space-y-1" },
    });
    /** @type {[typeof RiskBadge, ]} */ ;
    // @ts-ignore
    const __VLS_3 = __VLS_asFunctionalComponent(RiskBadge, new RiskBadge({
        riskLevel: __VLS_ctx.report.scan.riskLevel,
    }));
    const __VLS_4 = __VLS_3({
        riskLevel: __VLS_ctx.report.scan.riskLevel,
    }, ...__VLS_functionalComponentArgsRest(__VLS_3));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "text-sm text-muted-foreground" },
    });
    (__VLS_ctx.report.scan.score.toFixed(1));
    /** @type {[typeof LegalDisclaimer, ]} */ ;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(LegalDisclaimer, new LegalDisclaimer({}));
    const __VLS_7 = __VLS_6({}, ...__VLS_functionalComponentArgsRest(__VLS_6));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({});
    /** @type {[typeof CategorySummary, ]} */ ;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent(CategorySummary, new CategorySummary({
        categories: (__VLS_ctx.report.categories),
    }));
    const __VLS_10 = __VLS_9({
        categories: (__VLS_ctx.report.categories),
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    for (const [cat] of __VLS_getVForSourceType((__VLS_ctx.report.categories))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
            key: (cat.category),
            ...{ class: "space-y-3" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "flex items-center gap-2" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
            ...{ class: "font-display text-lg font-semibold text-primary" },
        });
        (__VLS_ctx.CATEGORY_LABELS[cat.category] || cat.category);
        /** @type {[typeof Badge, typeof Badge, ]} */ ;
        // @ts-ignore
        const __VLS_12 = __VLS_asFunctionalComponent(Badge, new Badge({
            variant: "secondary",
            ...{ class: "text-xs" },
        }));
        const __VLS_13 = __VLS_12({
            variant: "secondary",
            ...{ class: "text-xs" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_12));
        __VLS_14.slots.default;
        (cat.percentage);
        (cat.score.toFixed(1));
        (cat.maxScore);
        var __VLS_14;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: "text-sm text-muted-foreground" },
        });
        (cat.summary);
        for (const [f] of __VLS_getVForSourceType((cat.findings))) {
            /** @type {[typeof FindingCard, ]} */ ;
            // @ts-ignore
            const __VLS_15 = __VLS_asFunctionalComponent(FindingCard, new FindingCard({
                key: (f.id),
                finding: (f),
            }));
            const __VLS_16 = __VLS_15({
                key: (f.id),
                finding: (f),
            }, ...__VLS_functionalComponentArgsRest(__VLS_15));
        }
    }
    /** @type {[typeof Separator, ]} */ ;
    // @ts-ignore
    const __VLS_18 = __VLS_asFunctionalComponent(Separator, new Separator({}));
    const __VLS_19 = __VLS_18({}, ...__VLS_functionalComponentArgsRest(__VLS_18));
    if (__VLS_ctx.report.cookies.length) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
            ...{ class: "space-y-2" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
            ...{ class: "font-display text-lg font-semibold text-primary" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "rotate-[1deg] overflow-x-auto rounded-sm border-2 border-foreground bg-card shadow-[7px_7px_0_hsl(var(--foreground))]" },
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
        __VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
        for (const [c] of __VLS_getVForSourceType((__VLS_ctx.report.cookies))) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
                key: (c.id),
                ...{ class: "border-t-2 border-foreground" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                ...{ class: "p-3 font-mono text-xs" },
            });
            (c.name);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                ...{ class: "p-3 text-xs" },
            });
            (c.domain);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                ...{ class: "p-3" },
            });
            /** @type {[typeof Badge, typeof Badge, ]} */ ;
            // @ts-ignore
            const __VLS_21 = __VLS_asFunctionalComponent(Badge, new Badge({
                variant: "outline",
                ...{ class: "text-[0.65rem]" },
            }));
            const __VLS_22 = __VLS_21({
                variant: "outline",
                ...{ class: "text-[0.65rem]" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_21));
            __VLS_23.slots.default;
            (c.type);
            var __VLS_23;
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                ...{ class: "p-3 text-xs" },
            });
            (c.origin === 'first_party' ? 'Proprio' : 'Terceiro');
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                ...{ class: "p-3" },
            });
            /** @type {[typeof Badge, typeof Badge, ]} */ ;
            // @ts-ignore
            const __VLS_24 = __VLS_asFunctionalComponent(Badge, new Badge({
                variant: (c.loadedBeforeConsent ? 'destructive' : 'default'),
                ...{ class: "text-[0.65rem]" },
            }));
            const __VLS_25 = __VLS_24({
                variant: (c.loadedBeforeConsent ? 'destructive' : 'default'),
                ...{ class: "text-[0.65rem]" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_24));
            __VLS_26.slots.default;
            (c.loadedBeforeConsent ? 'Sim' : 'Nao');
            var __VLS_26;
        }
    }
    if (__VLS_ctx.report.forms.length) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
            ...{ class: "space-y-3" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
            ...{ class: "font-display text-lg font-semibold text-primary" },
        });
        for (const [form] of __VLS_getVForSourceType((__VLS_ctx.report.forms))) {
            /** @type {[typeof Card, typeof Card, ]} */ ;
            // @ts-ignore
            const __VLS_27 = __VLS_asFunctionalComponent(Card, new Card({
                key: (form.id),
                ...{ class: "p-4 space-y-2 text-sm" },
            }));
            const __VLS_28 = __VLS_27({
                key: (form.id),
                ...{ class: "p-4 space-y-2 text-sm" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_27));
            __VLS_29.slots.default;
            __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
            __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
            (form.pageUrl);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
            __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
            (form.hasSecureAction ? 'Sim' : 'Nao');
            __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
            (form.privacyNotice ? 'Presente' : 'Ausente');
            if (form.fields.length) {
                __VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({
                    ...{ class: "list-disc pl-5 space-y-1" },
                });
                for (const [f, i] of __VLS_getVForSourceType((form.fields))) {
                    __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
                        key: (i),
                        ...{ class: "flex items-center gap-2 flex-wrap" },
                    });
                    (f.label || f.name);
                    if (f.isPersonalData) {
                        /** @type {[typeof Badge, typeof Badge, ]} */ ;
                        // @ts-ignore
                        const __VLS_30 = __VLS_asFunctionalComponent(Badge, new Badge({
                            variant: "secondary",
                            ...{ class: "text-[0.6rem]" },
                        }));
                        const __VLS_31 = __VLS_30({
                            variant: "secondary",
                            ...{ class: "text-[0.6rem]" },
                        }, ...__VLS_functionalComponentArgsRest(__VLS_30));
                        __VLS_32.slots.default;
                        var __VLS_32;
                    }
                    if (f.isSensitive) {
                        /** @type {[typeof Badge, typeof Badge, ]} */ ;
                        // @ts-ignore
                        const __VLS_33 = __VLS_asFunctionalComponent(Badge, new Badge({
                            variant: "destructive",
                            ...{ class: "text-[0.6rem]" },
                        }));
                        const __VLS_34 = __VLS_33({
                            variant: "destructive",
                            ...{ class: "text-[0.6rem]" },
                        }, ...__VLS_functionalComponentArgsRest(__VLS_33));
                        __VLS_35.slots.default;
                        var __VLS_35;
                    }
                }
            }
            if (form.excessiveFields.length) {
                __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
                    ...{ class: "rounded-sm border-2 border-foreground bg-muted p-2 text-xs text-secondary" },
                });
                (form.excessiveFields.join(', '));
            }
            var __VLS_29;
        }
    }
    /** @type {[typeof LegalDisclaimer, ]} */ ;
    // @ts-ignore
    const __VLS_36 = __VLS_asFunctionalComponent(LegalDisclaimer, new LegalDisclaimer({}));
    const __VLS_37 = __VLS_36({}, ...__VLS_functionalComponentArgsRest(__VLS_36));
}
/** @type {__VLS_StyleScopedClasses['space-y-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['py-12']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['py-12']} */ ;
/** @type {__VLS_StyleScopedClasses['text-destructive']} */ ;
/** @type {__VLS_StyleScopedClasses['lofi-tape']} */ ;
/** @type {__VLS_StyleScopedClasses['rotate-[-1deg]']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['border-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-card']} */ ;
/** @type {__VLS_StyleScopedClasses['p-5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-[8px_8px_0_hsl(var(--foreground))]']} */ ;
/** @type {__VLS_StyleScopedClasses['lofi-title']} */ ;
/** @type {__VLS_StyleScopedClasses['font-display']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['break-all']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:underline']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['text-left']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-3']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['font-display']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
/** @type {__VLS_StyleScopedClasses['font-display']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['rotate-[1deg]']} */ ;
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
/** @type {__VLS_StyleScopedClasses['border-t-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[0.65rem]']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[0.65rem]']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-3']} */ ;
/** @type {__VLS_StyleScopedClasses['font-display']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['list-disc']} */ ;
/** @type {__VLS_StyleScopedClasses['pl-5']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-1']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[0.6rem]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[0.6rem]']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['border-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-muted']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-secondary']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            ScoreGauge: ScoreGauge,
            RiskBadge: RiskBadge,
            CategorySummary: CategorySummary,
            FindingCard: FindingCard,
            LegalDisclaimer: LegalDisclaimer,
            Card: Card,
            Badge: Badge,
            Separator: Separator,
            CATEGORY_LABELS: CATEGORY_LABELS,
            report: report,
            isLoading: isLoading,
            error: error,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
