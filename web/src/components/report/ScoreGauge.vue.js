import { computed } from 'vue';
const props = withDefaults(defineProps(), { size: 'md' });
const dims = { sm: 48, md: 56, lg: 72 };
const sw = { sm: 3, md: 4, lg: 5 };
const r = computed(() => (dims[props.size] - sw[props.size] * 2) / 2);
const circ = computed(() => 2 * Math.PI * r.value);
const offset = computed(() => circ.value - (props.score / 100) * circ.value);
const color = computed(() => props.score >= 70 ? 'hsl(var(--primary))' : props.score >= 40 ? 'hsl(var(--secondary))' : 'hsl(var(--destructive))');
const sizeClass = computed(() => props.size === 'sm' ? 'text-lg' : props.size === 'lg' ? 'text-3xl' : 'text-xl');
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_withDefaultsArg = (function (t) { return t; })({ size: 'md' });
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "relative inline-flex items-center justify-center" },
    role: "meter",
    'aria-valuenow': (__VLS_ctx.score),
    'aria-valuemin': "0",
    'aria-valuemax': "100",
    'aria-label': (`Pontuacao: ${__VLS_ctx.score} de 100`),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
    width: (__VLS_ctx.dims[__VLS_ctx.size]),
    height: (__VLS_ctx.dims[__VLS_ctx.size]),
    viewBox: (`0 0 ${__VLS_ctx.dims[__VLS_ctx.size]} ${__VLS_ctx.dims[__VLS_ctx.size]}`),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.circle)({
    cx: (__VLS_ctx.dims[__VLS_ctx.size] / 2),
    cy: (__VLS_ctx.dims[__VLS_ctx.size] / 2),
    r: (__VLS_ctx.r),
    fill: "none",
    stroke: "hsl(var(--muted))",
    'stroke-width': (__VLS_ctx.sw[__VLS_ctx.size]),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.circle)({
    cx: (__VLS_ctx.dims[__VLS_ctx.size] / 2),
    cy: (__VLS_ctx.dims[__VLS_ctx.size] / 2),
    r: (__VLS_ctx.r),
    fill: "none",
    stroke: (__VLS_ctx.color),
    'stroke-width': (__VLS_ctx.sw[__VLS_ctx.size]),
    'stroke-dasharray': (__VLS_ctx.circ),
    'stroke-dashoffset': (__VLS_ctx.offset),
    'stroke-linecap': "round",
    transform: "rotate(-90)",
    ...{ style: {} },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "absolute flex items-baseline gap-0.5" },
    ...{ style: ({ color: __VLS_ctx.color }) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: (__VLS_ctx.sizeClass) },
    ...{ class: "font-bold tabular-nums" },
});
(Math.round(__VLS_ctx.score));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "text-[0.5em] opacity-60" },
});
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-baseline']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-0.5']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['tabular-nums']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[0.5em]']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-60']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            dims: dims,
            sw: sw,
            r: r,
            circ: circ,
            offset: offset,
            color: color,
            sizeClass: sizeClass,
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
