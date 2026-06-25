import { cn } from '@/lib/utils';
import { Primitive } from 'radix-vue';
import { computed } from 'vue';
const props = withDefaults(defineProps(), {
    variant: 'default',
    size: 'default',
    as: 'button',
});
const variantClasses = {
    default: 'border-2 border-foreground bg-primary text-primary-foreground shadow-[4px_4px_0_hsl(var(--foreground))] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_hsl(var(--foreground))]',
    destructive: 'border-2 border-foreground bg-destructive text-destructive-foreground shadow-[4px_4px_0_hsl(var(--foreground))] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_hsl(var(--foreground))]',
    outline: 'border-2 border-foreground bg-card text-foreground shadow-[3px_3px_0_hsl(var(--foreground))] hover:bg-accent hover:text-accent-foreground',
    secondary: 'border-2 border-foreground bg-accent text-accent-foreground shadow-[4px_4px_0_hsl(var(--foreground))] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_hsl(var(--foreground))]',
    ghost: 'text-foreground hover:bg-card hover:shadow-[3px_3px_0_hsl(var(--foreground))]',
    link: 'text-primary underline-offset-4 hover:underline',
};
const sizeClasses = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 rounded-md px-3',
    lg: 'h-11 rounded-md px-8',
    icon: 'h-10 w-10',
};
const classes = computed(() => cn('inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50', 'tracking-normal transition-transform', variantClasses[props.variant], sizeClasses[props.size], props.class));
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_withDefaultsArg = (function (t) { return t; })({
    variant: 'default',
    size: 'default',
    as: 'button',
});
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.Primitive;
/** @type {[typeof __VLS_components.Primitive, typeof __VLS_components.Primitive, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    as: (__VLS_ctx.as),
    asChild: (__VLS_ctx.asChild),
    ...{ class: (__VLS_ctx.classes) },
}));
const __VLS_2 = __VLS_1({
    as: (__VLS_ctx.as),
    asChild: (__VLS_ctx.asChild),
    ...{ class: (__VLS_ctx.classes) },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
var __VLS_5 = {};
var __VLS_3;
// @ts-ignore
var __VLS_6 = __VLS_5;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Primitive: Primitive,
            classes: classes,
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
