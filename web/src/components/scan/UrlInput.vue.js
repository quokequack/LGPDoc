import { ref, watch, computed } from 'vue';
import { useScan } from '@/composables/useScan';
import Input from '@/components/ui/Input.vue';
import Button from '@/components/ui/Button.vue';
import { cn } from '@/lib/utils';
import { DEMO_SCAN_URL } from '@/mock/scans';
const { url, urlError, isSubmitting, validateUrl, submitScan } = useScan();
const localUrl = ref('');
watch(localUrl, (v) => { if (v)
    validateUrl(v);
else
    urlError.value = null; });
function handleSubmit() { url.value = localUrl.value; submitScan(); }
function handleDemoSubmit() {
    localUrl.value = DEMO_SCAN_URL;
    url.value = DEMO_SCAN_URL;
    submitScan();
}
const inputClass = computed(() => cn('flex-1 h-11 text-base', urlError.value && 'border-destructive'));
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
    ...{ onSubmit: (__VLS_ctx.handleSubmit) },
    ...{ class: "mx-auto flex w-full max-w-2xl flex-col gap-2" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex flex-col gap-2 sm:flex-row" },
});
/** @type {[typeof Input, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(Input, new Input({
    ...{ 'onKeyup': {} },
    id: "scan-url",
    modelValue: (__VLS_ctx.localUrl),
    type: "text",
    placeholder: (__VLS_ctx.DEMO_SCAN_URL),
    disabled: (__VLS_ctx.isSubmitting),
    'aria-label': "URL do site para analisar",
    ...{ class: (__VLS_ctx.inputClass) },
}));
const __VLS_1 = __VLS_0({
    ...{ 'onKeyup': {} },
    id: "scan-url",
    modelValue: (__VLS_ctx.localUrl),
    type: "text",
    placeholder: (__VLS_ctx.DEMO_SCAN_URL),
    disabled: (__VLS_ctx.isSubmitting),
    'aria-label': "URL do site para analisar",
    ...{ class: (__VLS_ctx.inputClass) },
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
let __VLS_3;
let __VLS_4;
let __VLS_5;
const __VLS_6 = {
    onKeyup: (__VLS_ctx.handleSubmit)
};
var __VLS_2;
/** @type {[typeof Button, typeof Button, ]} */ ;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent(Button, new Button({
    type: "submit",
    disabled: (__VLS_ctx.isSubmitting || !__VLS_ctx.localUrl.trim()),
    ...{ class: "h-11 px-6" },
}));
const __VLS_8 = __VLS_7({
    type: "submit",
    disabled: (__VLS_ctx.isSubmitting || !__VLS_ctx.localUrl.trim()),
    ...{ class: "h-11 px-6" },
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
__VLS_9.slots.default;
(__VLS_ctx.isSubmitting ? 'Analisando...' : 'Analisar');
var __VLS_9;
/** @type {[typeof Button, typeof Button, ]} */ ;
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent(Button, new Button({
    ...{ 'onClick': {} },
    type: "button",
    variant: "outline",
    disabled: (__VLS_ctx.isSubmitting),
    ...{ class: "h-10 self-start" },
}));
const __VLS_11 = __VLS_10({
    ...{ 'onClick': {} },
    type: "button",
    variant: "outline",
    disabled: (__VLS_ctx.isSubmitting),
    ...{ class: "h-10 self-start" },
}, ...__VLS_functionalComponentArgsRest(__VLS_10));
let __VLS_13;
let __VLS_14;
let __VLS_15;
const __VLS_16 = {
    onClick: (__VLS_ctx.handleDemoSubmit)
};
__VLS_12.slots.default;
var __VLS_12;
if (__VLS_ctx.urlError) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "text-sm text-destructive" },
        role: "alert",
    });
    (__VLS_ctx.urlError);
}
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:flex-row']} */ ;
/** @type {__VLS_StyleScopedClasses['h-11']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['h-10']} */ ;
/** @type {__VLS_StyleScopedClasses['self-start']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-destructive']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Input: Input,
            Button: Button,
            DEMO_SCAN_URL: DEMO_SCAN_URL,
            urlError: urlError,
            isSubmitting: isSubmitting,
            localUrl: localUrl,
            handleSubmit: handleSubmit,
            handleDemoSubmit: handleDemoSubmit,
            inputClass: inputClass,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
