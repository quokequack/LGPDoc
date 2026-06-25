# Implementation Plan: Frontend Mock Demo — Scanner LGPD Educacional

**Branch**: `002-frontend-mock-demo` | **Date**: 2026-06-23 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/002-frontend-mock-demo/spec.md`

## Summary

Transform the LGPD Scanner frontend into a fully offline demo prototype that simulates the complete user flow using hardcoded mock data. Rebuild all UI components with shadcn-vue (radix-vue + Tailwind CSS), implement dark/light theme toggle with localStorage persistence, and add animations throughout the interface. The backend is disabled — all data comes from TypeScript mock files in the `web/` package.

**Technical approach**: Vue 3 + shadcn-vue + Tailwind CSS + Pinia stores with mock data providers + Vue Router transitions. Zero backend dependencies.

## Technical Context

**Language/Version**: TypeScript 5.x, Vue 3.5+ SFC

**Primary Dependencies**: Vue 3, shadcn-vue (radix-vue), Tailwind CSS, Pinia, Vue Router

**Storage**: localStorage (theme preference only); mock data in TypeScript modules

**Testing**: Vitest + Vue Test Utils (component rendering tests); manual visual validation

**Target Platform**: Web browser (Chrome, Firefox, Safari last 2 versions)

**Project Type**: Web application (frontend-only, existing monorepo `web/` package)

**Performance Goals**: Lighthouse Accessibility > 90; theme toggle < 300ms; scan simulation 4±1s; page transitions 60fps

**Constraints**: Fully offline (no backend calls); WCAG 2.1 AA; responsive 375px–1920px; Tailwind `dark:` class strategy

**Scale/Scope**: Single-user prototype; 6 views; ~20 components; 10 mock scan records; 33 mock findings

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Gate | Status | Notes |
|------|--------|-------|
| Core Principles | N/A | Constitution template not yet filled — no principles to enforce |
| Constraints | N/A | Constitution template not yet filled |
| Governance | N/A | Constitution template not yet filled |

**Verdict**: No gates defined. Proceed with plan.

**Post-Design Re-check**: No violations detected. Architecture stays within existing `web/` directory; no new packages or services introduced.

## Project Structure

### Documentation (this feature)

```text
specs/002-frontend-mock-demo/
├── plan.md              # This file
├── research.md          # Phase 0: technical decisions
├── data-model.md        # Phase 1: mock data structures
├── quickstart.md        # Phase 1: setup and validation guide
├── contracts/
│   └── mock-api.md      # Phase 1: mock data provider contracts
└── tasks.md             # Phase 2: /speckit.tasks output (future)
```

### Source Code (repository root)

This feature modifies only the `web/` package. New directories marked with `+`:

```text
web/
├── src/
│   ├── views/                    # Updated with shadcn components
│   │   ├── HomeView.vue
│   │   ├── ScanProgressView.vue
│   │   ├── ReportView.vue
│   │   ├── CategoryDetailView.vue
│   │   ├── GlossaryView.vue
│   │   └── HistoryView.vue
│   ├── components/
│   │   ├── ui/                   # + shadcn-vue components (button, card, badge, input, table, etc.)
│   │   ├── layout/
│   │   │   ├── AppHeader.vue     # Updated: theme toggle
│   │   │   ├── AppFooter.vue
│   │   │   └── LegalDisclaimer.vue
│   │   ├── scan/
│   │   │   ├── UrlInput.vue
│   │   │   └── ScanProgress.vue
│   │   ├── report/
│   │   │   ├── ScoreGauge.vue
│   │   │   ├── RiskBadge.vue
│   │   │   ├── CategorySummary.vue
│   │   │   ├── FindingCard.vue
│   │   │   └── RecommendationList.vue
│   │   └── glossary/
│   │       ├── GlossarySearch.vue
│   │       └── GlossaryTerm.vue
│   ├── stores/
│   │   ├── scan.store.ts         # Updated: mock data provider
│   │   ├── report.store.ts       # Updated: mock data provider
│   │   ├── glossary.store.ts     # Updated: mock data with simulated delay
│   │   └── theme.store.ts        # + Theme state + localStorage persistence
│   ├── composables/
│   │   ├── useScan.ts            # Updated: mock flow
│   │   ├── useReport.ts
│   │   ├── useScanHistory.ts
│   │   └── useTheme.ts           # + Theme toggle logic
│   ├── mock/                     # + Mock data modules
│   │   ├── scans.ts              # 10 scan records
│   │   ├── reports.ts            # 1 full report with 33 findings
│   │   └── glossary.ts           # 15 glossary terms
│   ├── services/                 # Removed: no API calls needed
│   ├── router/
│   │   └── index.ts
│   ├── types/                    # Existing types reused
│   ├── App.vue                   # Updated: Tailwind dark class, router transitions
│   ├── main.ts                   # Updated: Tailwind CSS import
│   └── style.css                 # + Tailwind directives + theme variables
├── tailwind.config.ts            # + Tailwind config with shadcn preset
├── components.json               # + shadcn-vue config
├── package.json                  # Updated: new dependencies
├── tsconfig.json
└── vite.config.ts
```

**Structure Decision**: Frontend-only modification within existing `web/` monorepo package. The `server/` package is untouched. Mock data lives in a dedicated `src/mock/` directory for clean separation. shadcn-vue components are installed into `src/components/ui/` via CLI.

## Complexity Tracking

No constitution violations. This feature replaces custom CSS with Tailwind + shadcn-vue components, adds a theme store, and introduces mock data modules. All within existing Vue 3 architecture — no new services, databases, or external integrations.
