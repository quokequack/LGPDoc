import Badge from '@/components/ui/Badge.vue';
const props = defineProps();
const config = {
    good: { label: 'Boas Praticas', variant: 'default' },
    low: { label: 'Risco Baixo', variant: 'secondary' },
    medium: { label: 'Risco Medio', variant: 'outline' },
    high: { label: 'Risco Alto', variant: 'destructive' },
};
const c = config[props.riskLevel] || { label: props.riskLevel, variant: 'outline' };
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {[typeof Badge, typeof Badge, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(Badge, new Badge({
    variant: (__VLS_ctx.c.variant),
}));
const __VLS_1 = __VLS_0({
    variant: (__VLS_ctx.c.variant),
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
var __VLS_3 = {};
__VLS_2.slots.default;
(__VLS_ctx.c.label);
var __VLS_2;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Badge: Badge,
            c: c,
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
