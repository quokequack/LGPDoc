import { cn } from '@/lib/utils';
import { computed } from 'vue';
const props = withDefaults(defineProps(), {
    variant: 'default',
});
const variantClasses = computed(() => {
    switch (props.variant) {
        case 'secondary': return 'border-foreground bg-accent text-accent-foreground';
        case 'destructive': return 'border-foreground bg-destructive text-destructive-foreground';
        case 'outline': return 'border-foreground bg-card text-foreground';
        default: return 'border-foreground bg-primary text-primary-foreground';
    }
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_withDefaultsArg = (function (t) { return t; })({
    variant: 'default',
});
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: (__VLS_ctx.cn('inline-flex rotate-[-1deg] items-center rounded-sm border-2 px-2.5 py-0.5 font-mono text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2', __VLS_ctx.variantClasses, __VLS_ctx.$props.class)) },
});
var __VLS_0 = {};
// @ts-ignore
var __VLS_1 = __VLS_0;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            cn: cn,
            variantClasses: variantClasses,
        };
    },
    __typeProps: {},
    props: {},
});
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
    props: {},
});
export default {};
; /* PartiallyEnd: #4569/main.vue */
