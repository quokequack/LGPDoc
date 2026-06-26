# Tasks: Frontend Mock Demo — Scanner LGPD Educacional

**Input**: Design documents from `specs/002-frontend-mock-demo/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/mock-api.md, quickstart.md

**Tests**: Manual visual validation per quickstart.md. No automated test tasks (frontend demo feature).

**Organization**: Tasks grouped by user story for independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- All tasks include exact file paths

---

## Phase 1: Setup

**Purpose**: Install new dependencies, initialize Tailwind CSS and shadcn-vue configuration.

- [x] T001 Install new npm dependencies (radix-vue, shadcn-vue, Tailwind CSS v3, tailwind-merge, clsx, class-variance-authority, @lucide/vue, tailwindcss-animate, autoprefixer) in `web/package.json`
- [x] T002 Remove `axios` and unused API service dependencies from `web/package.json`
- [x] T003 [P] Configure PostCSS with Tailwind and Autoprefixer in `web/postcss.config.js`
- [x] T004 [P] Create Tailwind CSS configuration with shadcn-vue preset, dark mode class strategy, content paths in `web/tailwind.config.ts`
- [x] T005 [P] Create shadcn-vue configuration file in `web/components.json`
- [x] T006 [P] Create global stylesheet with Tailwind directives (@tailwind base/components/utilities) and shadcn CSS variables for light/dark themes in `web/src/style.css`
- [x] T007 Update Vite config to use path alias `@` pointing to `src/` in `web/vite.config.ts`
- [x] T008 Update `web/src/main.ts` to import `style.css` and remove any old style imports

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Build core infrastructure that all user stories depend on: shadcn base components, theme system, mock data.

**CRITICAL**: No user story implementation can start until this phase is complete.

- [x] T009 Add shadcn-vue base components via CLI to `web/src/components/ui/`: button, card, input, badge, table, progress, dialog, sheet, separator, skeleton, tabs
- [x] T010 [P] Create theme Pinia store with state (`theme`), toggle action, localStorage persistence, and dark class DOM management in `web/src/stores/theme.store.ts`
- [x] T011 [P] Create `useTheme` composable that initializes theme on app mount and exposes reactive `isDark` state in `web/src/composables/useTheme.ts`
- [x] T012 [P] Create mock scan data module with `generateMockScanList()` and `getMockScanProgress()` in `web/src/mock/scans.ts`
- [x] T013 [P] Create mock report data module with `getMockReport()` containing 33 findings, 7 categories, cookies, forms in `web/src/mock/reports.ts`
- [x] T014 [P] Create mock glossary data module with `getMockGlossaryTerms()` (15 terms) and `searchMockGlossary()` in `web/src/mock/glossary.ts`
- [x] T015 Update `App.vue` to apply dark class binding on `<html>`, import `useTheme`, and add Vue Router `<Transition>` wrapper for page fade animations in `web/src/App.vue`

**Checkpoint**: Foundation ready — shadcn components available, theme system working, mock data modules loaded. User story implementation can now begin.

---

## Phase 3: User Story 1 — Navegação completa simulada com dados mockados (Priority: P1) 🎯 MVP

**Goal**: User navigates the full flow (Home → Scan Progress → Report → Glossary → History) using only mock data, with no backend calls.

**Independent Test**: Open the app, type a URL, click "Analisar", wait for simulated progress (~4s), verify a complete report with 33 findings, 7 categories, cookies, forms, glossary terms, and 10 history records — all from hardcoded mocks.

### Implementation for User Story 1

- [x] T016 [P] [US1] Update scan Pinia store to use mock data: `startScan()` calls `getMockScanProgress()`, `fetchScanList()` calls `generateMockScanList()` — remove axios API calls in `web/src/stores/scan.store.ts`
- [x] T017 [P] [US1] Update report Pinia store to use mock data: `fetchReport()` calls `getMockReport()` — remove axios API calls in `web/src/stores/report.store.ts`
- [x] T018 [P] [US1] Update glossary Pinia store to use mock data: `fetchTerms()` calls `getMockGlossaryTerms()` / `searchMockGlossary()` with simulated delay — remove axios API calls in `web/src/stores/glossary.store.ts`
- [x] T019 [US1] Rebuild HomeView with shadcn Card, Input, Button components and mock scan trigger in `web/src/views/HomeView.vue`
- [x] T020 [US1] Rebuild UrlInput component with shadcn Input + Button, enter-key submit, validation feedback in `web/src/components/scan/UrlInput.vue`
- [x] T021 [US1] Rebuild ScanProgressView with shadcn Progress bar, simulated step indicators, auto-redirect after ~4s in `web/src/components/scan/ScanProgress.vue`
- [x] T022 [US1] Rebuild ResultadoView with all sections using a fictional-site mock result, shadcn Card, Badge, Table in `web/src/views/ResultadoView.vue`
- [x] T023 [P] [US1] Rebuild ScoreGauge with SVG circular progress and animated dashoffset in `web/src/components/report/ScoreGauge.vue`
- [x] T024 [P] [US1] Rebuild RiskBadge with shadcn Badge variants (destructive/warning/success) in `web/src/components/report/RiskBadge.vue`
- [x] T025 [P] [US1] Rebuild CategorySummary with shadcn Card, animated progress bars per category in `web/src/components/report/CategorySummary.vue`
- [x] T026 [P] [US1] Rebuild FindingCard with shadcn Card, Badge for status, colored left border in `web/src/components/report/FindingCard.vue`
- [x] T027 [P] [US1] Rebuild RecommendationList with shadcn Card nested inside findings, priority Badges in `web/src/components/report/RecommendationList.vue`
- [x] T028 [US1] Rebuild GlossaryView with shadcn Input for search, simulated delay, GlossaryTerm cards in `web/src/views/GlossaryView.vue`
- [x] T029 [P] [US1] Rebuild GlossarySearch with shadcn Input and debounce in `web/src/components/glossary/GlossarySearch.vue`
- [x] T030 [P] [US1] Rebuild GlossaryTerm with shadcn Card, article badge, related terms tags in `web/src/components/glossary/GlossaryTerm.vue`
- [x] T031 [US1] Rebuild HistoryView with shadcn Table, pagination, RiskBadge, click-to-report in `web/src/views/HistoryView.vue`
- [x] T032 [US1] Rebuild CategoryDetailView with shadcn Card and FindingCard list filtered by category in `web/src/views/CategoryDetailView.vue`
- [x] T033 [US1] Remove all API service files no longer needed: `web/src/services/api.ts`, `web/src/services/scan.service.ts`, `web/src/services/report.service.ts`, `web/src/services/glossary.service.ts`
- [x] T034 [US1] Update Vite config to remove `/api` proxy (no backend needed) in `web/vite.config.ts`

**Checkpoint**: Full mock navigation works. User can complete Home → Scan → Report → Glossary → History flow entirely offline with realistic data.

---

## Phase 4: User Story 2 — Tema claro/escuro com toggle (Priority: P1)

**Goal**: Add theme toggle button in header that switches between light and dark modes with smooth transition, persisted across page reloads.

**Independent Test**: Click theme toggle in header — entire interface transitions to dark theme in ~300ms. Reload page — dark theme persists. Toggle back to light — persists on reload.

### Implementation for User Story 2

- [x] T035 [US2] Add theme toggle button (sun/moon Lucide icon) to AppHeader with `useTheme` composable in `web/src/components/layout/AppHeader.vue`
- [x] T036 [US2] Update all component styles to use Tailwind `dark:` variants instead of hardcoded color values — verify both themes render correctly across all 6 views and ~15 components
- [x] T037 [US2] Add CSS transition for theme changes: `transition-colors duration-300` on body and root elements in `web/src/style.css`
- [x] T038 [US2] Verify localStorage fallback works (private browsing mode) — theme defaults to light without console errors

**Checkpoint**: Theme toggle works from any page. Colors transition smoothly. Preference persisted.

---

## Phase 5: User Story 4 — Animações e micro-interações (Priority: P2)

**Goal**: Add page transitions, staggered card entrances, progress animations, and hover effects throughout the interface.

**Independent Test**: Navigate between pages → fade transition. Watch finding cards load → staggered fade-in-up. Hover cards/rows → smooth background change. Watch scan progress bar → smooth easing animation.

### Implementation for User Story 4

- [x] T039 [US4] Add Vue Router page transition (fade) using `<Transition name="fade">` with `<RouterView v-slot>` in `web/src/App.vue`
- [ ] T040 [US4] Add staggered fade-in-up animation for FindingCards using Intersection Observer with computed animation-delay in `web/src/components/report/FindingCard.vue`
- [ ] T041 [US4] Add smooth CSS transitions to progress bar (width easing) and step checkmarks (scale + opacity) in `web/src/components/scan/ScanProgress.vue`
- [ ] T042 [US4] Add hover transitions to all interactive elements: cards (`hover:shadow-md transition-shadow`), table rows (`hover:bg-accent transition-colors`), buttons (`hover:scale-[1.02] transition-transform`)
- [ ] T043 [US4] Add fade-in animation for glossary search results using `<TransitionGroup name="list">` with staggered children in `web/src/views/GlossaryView.vue`
- [ ] T044 [US4] Add skeleton loading states with shadcn Skeleton component for result and history pages while mock data "loads" in `web/src/views/ResultadoView.vue` and `web/src/views/HistoryView.vue`

**Checkpoint**: All animations work smoothly. No jank or flicker. 60fps during transitions.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final cleanup, accessibility audit, responsive testing, validation against quickstart.md.

- [ ] T045 [P] Add WCAG 2.1 AA audit: verify color contrast ratios in both themes, ensure all interactive elements have focus styles (`focus-visible:ring-2`), add `aria-label` to icon-only buttons in all components
- [ ] T046 [P] Add responsive breakpoints: test and fix layout at 375px (mobile), 768px (tablet), 1920px (desktop) — ensure no horizontal scroll, tables scroll horizontally on mobile
- [ ] T047 [P] Add meta tags, favicon, and page title to `web/index.html` if not already present
- [ ] T048 [P] Create NotFoundView with shadcn Button linking back to home in `web/src/views/NotFoundView.vue`
- [ ] T049 Run quickstart.md validation: execute all 7 validation scenarios and confirm expected outcomes
- [ ] T050 Final cleanup: remove any unused CSS, console.log statements, dead code across all files

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Setup (Phase 1) completion — BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational (Phase 2) — No dependencies on other stories
- **User Story 2 (Phase 4)**: Depends on US1 (Phase 3) — needs rebuilt components to apply theme variants
- **User Story 4 (Phase 5)**: Depends on US1 (Phase 3) — needs rebuilt components to add animations
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **US1 (P1)**: Can start after Phase 2 — Independent. **This is the MVP.**
- **US2 (P1)**: Can start after US1 component rebuild — Theme toggle added to existing components
- **US4 (P2)**: Can start after US1 component rebuild — Animations layer on top of components
- **US2 and US4**: Independent of each other — can be developed in parallel

### Within Each User Story

- Mock data modules before store updates
- Store updates before component rebuilds
- Component rebuilds before view integration
- Views before final checkout

### Parallel Opportunities

- **Phase 1**: T002-T008 all [P] after T001 — can run in parallel (7 tasks)
- **Phase 2**: T010-T014 all [P] after T009 — can run in parallel (5 tasks)
- **Phase 3**: T016-T018 [P] stores can run in parallel; T023-T027 [P] report components can run in parallel; T029-T030 [P] glossary components parallel
- **Phase 4**: T036 can run in parallel with T035
- **Phase 5**: T040-T044 all on different files — can run in parallel
- **Phase 6**: T045-T048 all [P] — can run in parallel

---

## Parallel Example: User Story 1

```bash
# Step 1: Update all stores in parallel:
Task: "Update scan Pinia store to use mock data in web/src/stores/scan.store.ts"
Task: "Update report Pinia store to use mock data in web/src/stores/report.store.ts"
Task: "Update glossary Pinia store to use mock data in web/src/stores/glossary.store.ts"

# Step 2: Rebuild report sub-components in parallel:
Task: "Rebuild ScoreGauge in web/src/components/report/ScoreGauge.vue"
Task: "Rebuild RiskBadge in web/src/components/report/RiskBadge.vue"
Task: "Rebuild CategorySummary in web/src/components/report/CategorySummary.vue"
Task: "Rebuild FindingCard in web/src/components/report/FindingCard.vue"
Task: "Rebuild RecommendationList in web/src/components/report/RecommendationList.vue"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (~8 tasks)
2. Complete Phase 2: Foundational (~7 tasks) — **CRITICAL GATE**
3. Complete Phase 3: User Story 1 (~19 tasks)
4. **STOP and VALIDATE**: Test full mock navigation flow per quickstart.md
5. Deploy/demo MVP

**MVP delivers**: Complete offline demo with Home → Scan → Report → Glossary → History flow using shadcn-vue components and realistic mock data.

### Incremental Delivery After MVP

1. MVP (US1) → Test → Demo
2. Add US2 (Theme) → 4 tasks → Demo (visual upgrade)
3. Add US4 (Animations) → 6 tasks → Demo (polish)
4. Polish → 6 tasks → Final demo

### Parallel Team Strategy

With multiple developers:
1. Dev A + Dev B: Setup + Foundational together (Phases 1-2)
2. Once Foundation is done:
   - Dev A: US1 (19 tasks — core MVP)
   - Dev B: Can assist with sub-components in parallel
3. After US1 complete:
   - Dev A: US2 (Theme — 4 tasks)
   - Dev B: US4 (Animations — 6 tasks)
4. Both: Polish (6 tasks)

---

## Notes

- [P] tasks = different files, no dependencies on incomplete [P] tasks
- [US#] label maps task to specific user story for traceability
- Each user story is independently testable per its checkpoints
- All components rebuilt with shadcn-vue (radix-vue + Tailwind)
- No backend or API calls remain — all data from `web/src/mock/`
- Theme uses Tailwind `dark:` class strategy with `darkMode: "class"`
- Commit after each task or logical group
- Stop at any checkpoint to validate independently
- Verify with quickstart.md scenarios after each phase
