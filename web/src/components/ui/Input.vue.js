import { cn } from '@/lib/utils';
import { useTemplateRef } from 'vue';
const __VLS_props = defineProps();
const inputRef = useTemplateRef('input');
const __VLS_exposed = { inputRef };
defineExpose(__VLS_exposed);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    ref: "input",
    ...{ class: (__VLS_ctx.cn('flex h-10 w-full rounded-sm border-2 border-input bg-card px-3 py-2 font-mono text-sm text-foreground shadow-[3px_3px_0_hsl(var(--foreground))] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50', __VLS_ctx.$props.class)) },
});
/** @type {typeof __VLS_ctx.input} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            cn: cn,
        };
    },
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {
            ...__VLS_exposed,
        };
    },
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
