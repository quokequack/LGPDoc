import { cn } from '@/lib/utils';
import { computed } from 'vue';
const props = withDefaults(defineProps(), {
    modelValue: 0,
    max: 100,
});
const percentage = computed(() => Math.min(100, Math.max(0, (props.modelValue / props.max) * 100)));
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_withDefaultsArg = (function (t) { return t; })({
    modelValue: 0,
    max: 100,
});
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: (__VLS_ctx.cn('relative h-3 w-full overflow-hidden rounded-sm border-2 border-foreground bg-muted', __VLS_ctx.$props.class)) },
    role: "progressbar",
    'aria-valuenow': (__VLS_ctx.modelValue),
    'aria-valuemin': "0",
    'aria-valuemax': (__VLS_ctx.max),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div)({
    ...{ class: "h-full bg-primary transition-all duration-500 ease-in-out" },
    ...{ style: ({ width: __VLS_ctx.percentage + '%' }) },
});
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-500']} */ ;
/** @type {__VLS_StyleScopedClasses['ease-in-out']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            cn: cn,
            percentage: percentage,
        };
    },
    __typeProps: {},
    props: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
    props: {},
});
; /* PartiallyEnd: #4569/main.vue */
