import { onMounted } from 'vue';
import { useGlossaryStore } from '@/stores/glossary.store';
import GlossarySearch from '@/components/glossary/GlossarySearch.vue';
import GlossaryTerm from '@/components/glossary/GlossaryTerm.vue';
import Skeleton from '@/components/ui/Skeleton.vue';
const store = useGlossaryStore();
onMounted(() => store.fetchTerms());
function handleSearch(q) { store.fetchTerms(q || undefined); }
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "space-y-6" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "lofi-tape rotate-[-1deg] space-y-2 rounded-sm border-2 border-foreground bg-card p-5 text-center shadow-[7px_7px_0_hsl(var(--foreground))]" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
    ...{ class: "lofi-title font-display text-2xl font-bold" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "text-muted-foreground text-sm max-w-md mx-auto" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex justify-center" },
});
/** @type {[typeof GlossarySearch, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(GlossarySearch, new GlossarySearch({
    ...{ 'onSearch': {} },
}));
const __VLS_1 = __VLS_0({
    ...{ 'onSearch': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
let __VLS_3;
let __VLS_4;
let __VLS_5;
const __VLS_6 = {
    onSearch: (__VLS_ctx.handleSearch)
};
var __VLS_2;
if (__VLS_ctx.store.isLoading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "space-y-3" },
    });
    for (const [i] of __VLS_getVForSourceType((5))) {
        /** @type {[typeof Skeleton, ]} */ ;
        // @ts-ignore
        const __VLS_7 = __VLS_asFunctionalComponent(Skeleton, new Skeleton({
            key: (i),
            ...{ class: "h-24 w-full" },
        }));
        const __VLS_8 = __VLS_7({
            key: (i),
            ...{ class: "h-24 w-full" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    }
}
else if (__VLS_ctx.store.error) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "text-center text-destructive py-8" },
    });
    (__VLS_ctx.store.error);
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "space-y-3" },
    });
    if (__VLS_ctx.store.terms.length === 0) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: "text-center text-muted-foreground py-8" },
        });
        (__VLS_ctx.store.searchQuery);
    }
    const __VLS_10 = {}.TransitionGroup;
    /** @type {[typeof __VLS_components.TransitionGroup, typeof __VLS_components.TransitionGroup, ]} */ ;
    // @ts-ignore
    const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
        name: "list",
        tag: "div",
        ...{ class: "space-y-3" },
    }));
    const __VLS_12 = __VLS_11({
        name: "list",
        tag: "div",
        ...{ class: "space-y-3" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_11));
    __VLS_13.slots.default;
    for (const [term] of __VLS_getVForSourceType((__VLS_ctx.store.terms))) {
        /** @type {[typeof GlossaryTerm, ]} */ ;
        // @ts-ignore
        const __VLS_14 = __VLS_asFunctionalComponent(GlossaryTerm, new GlossaryTerm({
            key: (term.id),
            term: (term),
        }));
        const __VLS_15 = __VLS_14({
            key: (term.id),
            term: (term),
        }, ...__VLS_functionalComponentArgsRest(__VLS_14));
    }
    var __VLS_13;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "text-center text-xs text-muted-foreground" },
    });
    (__VLS_ctx.store.terms.length);
    if (__VLS_ctx.store.searchQuery) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (__VLS_ctx.store.searchQuery);
    }
}
/** @type {__VLS_StyleScopedClasses['space-y-6']} */ ;
/** @type {__VLS_StyleScopedClasses['lofi-tape']} */ ;
/** @type {__VLS_StyleScopedClasses['rotate-[-1deg]']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['border-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-card']} */ ;
/** @type {__VLS_StyleScopedClasses['p-5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-[7px_7px_0_hsl(var(--foreground))]']} */ ;
/** @type {__VLS_StyleScopedClasses['lofi-title']} */ ;
/** @type {__VLS_StyleScopedClasses['font-display']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-md']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-3']} */ ;
/** @type {__VLS_StyleScopedClasses['h-24']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-destructive']} */ ;
/** @type {__VLS_StyleScopedClasses['py-8']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['py-8']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            GlossarySearch: GlossarySearch,
            GlossaryTerm: GlossaryTerm,
            Skeleton: Skeleton,
            store: store,
            handleSearch: handleSearch,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
