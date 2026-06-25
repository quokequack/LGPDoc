import { ref, watch } from 'vue';
import Input from '@/components/ui/Input.vue';
import { Search, X } from '@lucide/vue';
const emit = defineEmits();
const query = ref('');
let timer = null;
watch(query, (v) => {
    if (timer)
        clearTimeout(timer);
    timer = setTimeout(() => emit('search', v.trim()), 300);
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "relative max-w-sm" },
});
const __VLS_0 = {}.Search;
/** @type {[typeof __VLS_components.Search, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ class: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" },
}));
const __VLS_2 = __VLS_1({
    ...{ class: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
/** @type {[typeof Input, ]} */ ;
// @ts-ignore
const __VLS_4 = __VLS_asFunctionalComponent(Input, new Input({
    modelValue: (__VLS_ctx.query),
    type: "search",
    placeholder: "Buscar termo...",
    ...{ class: "pl-9 pr-8" },
    'aria-label': "Buscar no glossario",
}));
const __VLS_5 = __VLS_4({
    modelValue: (__VLS_ctx.query),
    type: "search",
    placeholder: "Buscar termo...",
    ...{ class: "pl-9 pr-8" },
    'aria-label': "Buscar no glossario",
}, ...__VLS_functionalComponentArgsRest(__VLS_4));
if (__VLS_ctx.query) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.query))
                    return;
                __VLS_ctx.query = '';
                __VLS_ctx.emit('search', '');
            } },
        ...{ class: "absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" },
        'aria-label': "Limpar busca",
    });
    const __VLS_7 = {}.X;
    /** @type {[typeof __VLS_components.X, ]} */ ;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({
        ...{ class: "w-4 h-4" },
    }));
    const __VLS_9 = __VLS_8({
        ...{ class: "w-4 h-4" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
}
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['left-3']} */ ;
/** @type {__VLS_StyleScopedClasses['top-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['-translate-y-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['pl-9']} */ ;
/** @type {__VLS_StyleScopedClasses['pr-8']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['right-2']} */ ;
/** @type {__VLS_StyleScopedClasses['top-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['-translate-y-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Input: Input,
            Search: Search,
            X: X,
            emit: emit,
            query: query,
        };
    },
    __typeEmits: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEmits: {},
});
; /* PartiallyEnd: #4569/main.vue */
