# Research: Frontend Mock Demo — Scanner LGPD Educacional

**Date**: 2026-06-23
**Feature**: Frontend Mock Demo (specs/002-frontend-mock-demo)

## 1. shadcn-vue Integration with Existing Vue 3 Project

### Decision: shadcn-vue via CLI with existing project

**Rationale**: shadcn-vue provides a CLI (`npx shadcn-vue@latest init`) that configures Tailwind CSS, `components.json`, and CSS variables. The existing `web/` package already uses Vite + TypeScript + Vue 3, which is the exact stack shadcn-vue targets. Installation is non-destructive — it adds `tailwind.config.ts`, `components.json`, and CSS custom properties, then individual components are added via `npx shadcn-vue@latest add <component>`.

**Alternatives considered**:
- **PrimeVue**: Full component library with theming, but heavier and less customizable per-component. Would require replacing all existing components.
- **Vuetify**: Material Design only; doesn't match the desired modern look and has opinionated styling that conflicts with custom designs.
- **Manually copying radix-vue**: shadcn-vue already wraps radix-vue primitives with Tailwind styling. Manual approach would duplicate effort.

**Components needed**: Button, Card, Input, Badge, Table, Progress, Dialog, Sheet (mobile nav), Separator, Skeleton, Tabs.

## 2. Tailwind CSS Setup

### Decision: Tailwind CSS v3 with `class` dark mode strategy

**Rationale**: Tailwind v3 is stable and well-supported by shadcn-vue. The `class` strategy for dark mode (`darkMode: "class"` in config) allows programmatic toggle via adding/removing `dark` class on `<html>`, which pairs naturally with Vue's reactivity and localStorage persistence.

**Configuration**:
```js
// tailwind.config.ts key settings
darkMode: "class"
content: ["./src/**/*.{vue,ts}"]
theme.extend.colors: shadcn CSS variable mapping
```

**Alternatives considered**:
- **Tailwind v4**: Newer but shadcn-vue docs and community patterns are v3-based. Migration risk.
- **`media` dark mode**: System-preference based; doesn't allow manual toggle, which is a core requirement (FR-002).

## 3. Theme Toggle Architecture

### Decision: Pinia store + localStorage + Tailwind class toggling

**Rationale**: A dedicated `theme.store.ts` manages state. On app mount, `useTheme` composable reads `localStorage.getItem('theme')`, applies the `dark` class to `document.documentElement`, and sets the Pinia state. The toggle function flips state, updates the DOM class, and persists to localStorage. CSS transitions on `body` and `*` handle the color transition (`transition: background-color 0.3s, color 0.3s, border-color 0.3s`).

**Fallback**: If localStorage is unavailable (private browsing), `try/catch` around `setItem`/`getItem` gracefully degrades to light theme default without errors.

## 4. Mock Data Strategy

### Decision: TypeScript module files with factory functions

**Rationale**: Mock data lives in `web/src/mock/*.ts` as plain TypeScript objects and arrays, exported as frozen/readonly. This keeps them tree-shakeable, type-safe, and easy to maintain. Factory functions generate varied data (e.g., different risk levels, scores, dates) for the history list.

**Mock data files**:
- `scans.ts` — `generateMockScanList(count: number)` → `ScanListItem[]` with random scores, risk levels, URLs, dates
- `reports.ts` — `getMockReport()` → `ReportResponse` with full 33 findings
- `glossary.ts` — `getMockGlossaryTerms()` → `GlossaryTerm[]` (15 terms)

Stores use these mocks directly instead of calling API services. The `scan.store.ts` simulates progress by starting a timer that updates status from `pending` → `running` → `completed` over ~4 seconds.

## 5. Animation Approach

### Decision: CSS transitions + Vue `<Transition>` + Intersection Observer

**Rationale**: No external animation library needed. The feature requires:
- **Page transitions**: `<RouterView v-slot>` with `<Transition name="fade">` for opacity fade between routes
- **Staggered card entrance**: Intersection Observer + CSS `animation-delay` computed from index for sequential fade-in-up
- **Progress bar**: CSS `transition: width 3.5s ease-in-out` for smooth progress
- **Hover states**: Tailwind `hover:` variants with `transition-colors duration-200`
- **Theme transition**: `transition-colors duration-300` on root elements

**Alternatives considered**:
- **GSAP / Motion One**: Powerful but adds 30-50KB bundle for features achievable with CSS. Overkill for this scope.
- **VueUse `useTransition`**: Good for numeric transitions but not needed for declarative CSS animations.

## 6. Existing Code Migration Strategy

### Decision: Incremental replacement — keep structure, swap styling

**Rationale**: The existing views, components, stores, and composables have correct logic and structure. The migration:
1. Add Tailwind + shadcn-vue dependencies
2. Create `src/style.css` with Tailwind directives and shadcn CSS variables
3. Replace `src/components/ui/` with shadcn equivalents
4. Update each view/component to use Tailwind classes instead of `<style scoped>` blocks
5. Update stores to use mock data instead of API services
6. Add theme store and toggle

This preserves all existing routing, state management, and component composition while upgrading the visual layer.

## 7. Accessibility with shadcn-vue

### Decision: Leverage radix-vue's built-in accessibility

**Rationale**: shadcn-vue components are built on radix-vue primitives, which implement WAI-ARIA patterns (roles, keyboard navigation, focus management). Combined with Tailwind's `focus-visible:` and `sr-only` utilities, WCAG 2.1 AA compliance is largely built-in. Additional measures: `aria-live` regions for dynamic content, `aria-label` on icon-only buttons, sufficient color contrast in both themes.

## 8. Dependency Changes

### New dependencies (web/package.json)

```json
{
  "dependencies": {
    "radix-vue": "^1.9.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.4.0",
    "lucide-vue-next": "^0.400.0"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.0",
    "tailwindcss-animate": "^1.0.7",
    "autoprefixer": "^10.4.0",
    "@types/node": "^20.0.0"
  }
}
```

**Removed**: `axios` (no API calls), `@vitejs/plugin-vue` stays (already present).

## 9. No Backend Changes

### Decision: Server package untouched

**Rationale**: The feature is frontend-only. The `server/` directory remains as-is for potential future reconnection. The mock data mirrors the exact shapes defined in `src/types/*.ts`, so switching back to real API calls requires only restoring the service layer — no type changes needed.
