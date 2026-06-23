# Tasks: Scanner LGPD Educacional

**Input**: Design documents from `specs/001-scanner-lgpd-educacional/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/api.md, quickstart.md

**Tests**: Tests are included per spec Section 17 (test strategy) and SC-010 (80% coverage requirement).

**Organization**: Tasks grouped by user story for independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- All tasks include exact file paths

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize monorepo with backend and frontend projects, install dependencies, configure tooling.

- [x] T001 Create monorepo structure with `server/` and `web/` directories per plan.md
- [x] T002 [P] Initialize backend Node.js/TypeScript project in `server/package.json` with Express, Prisma, Zod, axios, cheerio, cors, helmet, express-rate-limit, uuid dependencies
- [x] T003 [P] Initialize frontend Vue.js project in `web/package.json` with Vue 3, Vue Router, Pinia, Axios, Vite, TypeScript dependencies
- [x] T004 [P] Configure TypeScript for backend in `server/tsconfig.json` (target ES2022, strict mode, paths alias)
- [x] T005 [P] Configure TypeScript for frontend in `web/tsconfig.json` (Vue-appropriate settings)
- [x] T006 [P] Configure Vitest for backend in `server/vitest.config.ts`
- [x] T007 [P] Configure Vite for frontend in `web/vite.config.ts` (proxy to backend port 3000)
- [x] T008 [P] Create backend environment config in `server/.env` with DATABASE_URL, PORT, CORS_ORIGIN, RATE_LIMIT_MAX variables
- [x] T009 [P] Create frontend environment config in `web/.env` with VITE_API_BASE_URL variable

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story work begins.

**CRITICAL**: No user story implementation can start until this phase is complete.

- [ ] T010 Define Prisma schema with all entities (Scan, ScanResult, Finding, Recommendation, Criterion, GlossaryTerm, CookieRecord, FormRecord) in `server/prisma/schema.prisma`
- [ ] T011 Run initial Prisma migration to create SQLite database: `npx prisma migrate dev --name init` in `server/`
- [ ] T012 [P] Create seed script with 33 Criterion records (C01-C33) in `server/prisma/seed.ts`
- [ ] T013 [P] Create seed script entries for 10+ GlossaryTerm records in `server/prisma/seed.ts`
- [ ] T014 [P] Create Express app entry point with middleware (cors, helmet, json parser, rate limiter, error handler) in `server/src/app.ts`
- [ ] T015 [P] Create Prisma client singleton in `server/src/config/database.ts`
- [ ] T016 [P] Create shared HTTP client utility (Axios wrapper with timeout, user-agent, retry) in `server/src/utils/http-client.ts`
- [ ] T017 [P] Create HTML parser utility (Cheerio loader + helper functions) in `server/src/utils/html-parser.ts`
- [ ] T018 [P] Create text analyzer utility (keyword matching, regex patterns, Portuguese text analysis) in `server/src/utils/text-analyzer.ts`
- [ ] T019 [P] Create URL validator schema with Zod in `server/src/validators/url.validator.ts`
- [ ] T020 [P] Create scan validator schema with Zod in `server/src/validators/scan.validator.ts`
- [ ] T021 [P] Create generic error handler middleware in `server/src/middleware/error-handler.ts`
- [ ] T022 [P] Configure Vue Router with all route definitions in `web/src/router/index.ts`
- [ ] T023 [P] Create Axios API client instance with base URL config in `web/src/services/api.ts`
- [ ] T024 [P] Create shared TypeScript types/enums for frontend in `web/src/types/scan.types.ts`, `web/src/types/report.types.ts`, `web/src/types/glossary.types.ts`
- [ ] T025 [P] Create AppLayout shell component with header, footer, and router-view in `web/src/App.vue`
- [ ] T026 [P] Create AppHeader component with navigation in `web/src/components/layout/AppHeader.vue`
- [ ] T027 [P] Create AppFooter component with legal disclaimer in `web/src/components/layout/AppFooter.vue`
- [ ] T028 [P] Create LegalDisclaimer shared component in `web/src/components/layout/LegalDisclaimer.vue`

**Checkpoint**: Foundation ready — user story implementation can now begin. Database seeded. API server runs on port 3000. Frontend shell renders with routing.

---

## Phase 3: User Story 1 — Análise Completa de Site (Priority: P1) 🎯 MVP

**Goal**: User submits a URL, the system scans the site (privacy policy, cookies, forms, security), calculates a score, and displays a full didactic report with findings and recommendations.

**Independent Test**: Submit `https://exemplo.gov.br` → receive report with score (0-100), risk level, privacy policy findings (C01-C08), cookies list with classification, form fields analysis, security indicators, and educational recommendations.

### Tests for User Story 1

> **NOTE**: Write these tests FIRST, ensure they FAIL before implementation.

- [ ] T029 [P] [US1] Unit test for URL validator (valid/invalid/empty/malformed URLs) in `server/tests/unit/validators/url.validator.test.ts`
- [ ] T030 [P] [US1] Unit test for URL Scanner (fetch HTML, detect links, handle errors) in `server/tests/unit/scanners/url-scanner.test.ts`
- [ ] T031 [P] [US1] Unit test for Privacy Policy Analyzer (detect policy presence, section extraction, keyword matching) in `server/tests/unit/scanners/privacy-policy-analyzer.test.ts`
- [ ] T032 [P] [US1] Unit test for Cookie Analyzer (detect cookies from headers, classify by type, detect banner) in `server/tests/unit/scanners/cookie-analyzer.test.ts`
- [ ] T033 [P] [US1] Unit test for Form Analyzer (detect form fields, classify personal/sensitive data, minimize check) in `server/tests/unit/scanners/form-analyzer.test.ts`
- [ ] T034 [P] [US1] Unit test for Risk Scoring Engine (score per criterion, category totals, risk level classification) in `server/tests/unit/scanners/risk-scoring-engine.test.ts`
- [ ] T035 [P] [US1] Unit test for Report Generator (structured output, all sections present, LGPD references) in `server/tests/unit/scanners/report-generator.test.ts`
- [ ] T036 [US1] Integration test for full scan flow (POST /scans → poll GET /scans/:id → GET /scans/:id/report) in `server/tests/integration/scan.integration.test.ts`

### Backend Implementation for User Story 1

- [ ] T037 [P] [US1] Create Scan repository (create, findById, findAll, updateStatus, updateScore) in `server/src/repositories/scan.repository.ts`
- [ ] T038 [P] [US1] Create ScanResult repository (create, findByScanId) in `server/src/repositories/scan-result.repository.ts`
- [ ] T039 [P] [US1] Create Finding repository (create, findByScanResultId) in `server/src/repositories/finding.repository.ts`
- [ ] T040 [P] [US1] Create Recommendation repository (create, findByFindingId) in `server/src/repositories/recommendation.repository.ts`
- [ ] T041 [P] [US1] Create CookieRecord repository (create, findByScanId) in `server/src/repositories/cookie-record.repository.ts`
- [ ] T042 [P] [US1] Create FormRecord repository (create, findByScanId) in `server/src/repositories/form-record.repository.ts`
- [ ] T043 [US1] Implement URL Scanner — fetch page HTML, extract links, detect privacy policy link candidates, check HTTPS status in `server/src/scanners/url-scanner.ts`
- [ ] T044 [US1] Implement Privacy Policy Analyzer — locate policy page, extract text, check criteria C01-C08 (data collected, purpose, retention, sharing, legal basis, controller, contact) using keyword/pattern matching in `server/src/scanners/privacy-policy-analyzer.ts`
- [ ] T045 [US1] Implement Cookie Analyzer — extract cookies from Set-Cookie headers and inline scripts, classify by type (necessary/analytics/functional/marketing), detect consent banner and buttons, check criteria C09-C14 in `server/src/scanners/cookie-analyzer.ts`
- [ ] T046 [US1] Implement Form Analyzer — detect `<form>` elements, classify input fields as personal/sensitive data, evaluate minimization, check criteria C15-C18 in `server/src/scanners/form-analyzer.ts`
- [ ] T047 [US1] Implement Security Checker — verify HTTPS, form action security, exposed sensitive data in HTML/scripts, list external `<script>` tags, check criteria C28-C31 in `server/src/scanners/security-checker.ts`
- [ ] T048 [US1] Implement Rights Analyzer — check privacy policy text for rights of access, correction, deletion, portability, consent revocation, sharing info (criteria C19-C24) in `server/src/scanners/rights-analyzer.ts`
- [ ] T049 [US1] Implement Controller & Contact Analyzer — check for company name, CNPJ, privacy email, DPO mention (criteria C25-C27) in `server/src/scanners/controller-analyzer.ts`
- [ ] T050 [US1] Implement Language Clarity Analyzer — detect vague/generic phrases, assess text complexity (criteria C32-C33) in `server/src/scanners/language-analyzer.ts`
- [ ] T051 [US1] Implement Risk Scoring Engine — calculate per-criterion score (full/partial/zero), aggregate by category weight, compute total score, classify risk level in `server/src/scanners/risk-scoring-engine.ts`
- [ ] T052 [US1] Implement Report Generator — compile all scanner outputs into structured report JSON with findings, recommendations, cookie list, form list, legal disclaimer in `server/src/scanners/report-generator.ts`
- [ ] T053 [US1] Implement Scan Service — orchestrate full scan pipeline (validate URL → create scan record → run all scanners in parallel → score → generate report → persist) in `server/src/services/scan.service.ts`
- [ ] T054 [US1] Implement Report Service — retrieve full report with all related data from database in `server/src/services/report.service.ts`
- [ ] T055 [US1] Implement Scan Controller (POST /scans, GET /scans/:id, GET /scans) in `server/src/controllers/scan.controller.ts`
- [ ] T056 [US1] Implement Report Controller (GET /scans/:id/report) in `server/src/controllers/report.controller.ts`
- [ ] T057 [US1] Create scan routes and register with Express app in `server/src/routes/scan.routes.ts` and `server/src/routes/report.routes.ts`
- [ ] T058 [US1] Create scan DTOs (CreateScanInput, ScanResponse, ScanListQuery) in `server/src/dto/scan.dto.ts`
- [ ] T059 [US1] Create report DTOs (ReportResponse, CategoryResult, FindingResponse) in `server/src/dto/report.dto.ts`

### Frontend Implementation for User Story 1

- [ ] T060 [P] [US1] Create Pinia scan store (state: scanId, status, progress, startScan action, pollStatus action) in `web/src/stores/scan.store.ts`
- [ ] T061 [P] [US1] Create Pinia report store (state: report data, loading, error, fetchReport action) in `web/src/stores/report.store.ts`
- [ ] T062 [P] [US1] Create scan composable (useScan) with URL validation, submit, and polling logic in `web/src/composables/useScan.ts`
- [ ] T063 [P] [US1] Create report composable (useReport) with report fetching and formatting in `web/src/composables/useReport.ts`
- [ ] T064 [P] [US1] Create scan service (API calls to POST /scans, GET /scans/:id) in `web/src/services/scan.service.ts`
- [ ] T065 [P] [US1] Create report service (API calls to GET /scans/:id/report) in `web/src/services/report.service.ts`
- [ ] T066 [US1] Create HomeView with URL input field, validation feedback, and "Analisar" button in `web/src/views/HomeView.vue`
- [ ] T067 [US1] Create UrlInput component with real-time URL validation visual feedback in `web/src/components/scan/UrlInput.vue`
- [ ] T068 [US1] Create ScanProgress component showing scanning steps with animated progress bar in `web/src/components/scan/ScanProgress.vue`
- [ ] T069 [US1] Create ScoreGauge component (0-100 score with color-coded arc/bar visualization) in `web/src/components/report/ScoreGauge.vue`
- [ ] T070 [US1] Create RiskBadge component (risk level badge with color: red/yellow/green) in `web/src/components/report/RiskBadge.vue`
- [ ] T071 [US1] Create CategorySummary component (list of 7 categories with scores and status icons) in `web/src/components/report/CategorySummary.vue`
- [ ] T072 [US1] Create FindingCard component (criterion result: found/partial/absent, evidence, explanation, LGPD reference) in `web/src/components/report/FindingCard.vue`
- [ ] T073 [US1] Create RecommendationList component (prioritized recommendations with how-to-improve) in `web/src/components/report/RecommendationList.vue`
- [ ] T074 [US1] Create ReportView — full report page composing ScoreGauge, RiskBadge, CategorySummary, FindingCard list, RecommendationList, CookiePreferenceSimulation, cookie list, form list, legal disclaimer in `web/src/views/ReportView.vue`
- [ ] T075 [US1] Create CategoryDetailView — detailed view for one category with all findings and recommendations in `web/src/views/CategoryDetailView.vue`

**Checkpoint**: At this point, a user can submit a URL, wait for the scan, and view a complete educational report with score, risk level, findings across all 7 categories, cookie list, form analysis, security indicators, and prioritized recommendations. This is the MVP.

---

## Phase 4: User Story 2 — Consulta ao Glossário LGPD (Priority: P1)

**Goal**: User accesses a glossary of LGPD terms with searchable, accessible definitions to understand concepts used in the report.

**Independent Test**: Navigate to glossary page → see list of 10+ terms → search for "consentimento" → see matching terms with definitions and related LGPD articles.

### Tests for User Story 2

- [ ] T076 [P] [US2] Unit test for Glossary Service (search, list all, term not found) in `server/tests/unit/services/glossary.service.test.ts`
- [ ] T077 [US2] Integration test for glossary endpoints (GET /glossary, GET /glossary?search=X) in `server/tests/integration/glossary.integration.test.ts`

### Backend Implementation for User Story 2

- [ ] T078 [P] [US2] Create Glossary repository (findAll, search, findById) in `server/src/repositories/glossary.repository.ts`
- [ ] T079 [US2] Implement Glossary Service (list all terms, search by term name) in `server/src/services/glossary.service.ts`
- [ ] T080 [US2] Implement Glossary Controller (GET /glossary) in `server/src/controllers/glossary.controller.ts`
- [ ] T081 [US2] Create glossary routes and register with Express app in `server/src/routes/glossary.routes.ts`

### Frontend Implementation for User Story 2

- [ ] T082 [P] [US2] Create glossary service (API calls to GET /glossary) in `web/src/services/glossary.service.ts`
- [ ] T083 [P] [US2] Create Pinia glossary store (state: terms, loading, search action) in `web/src/stores/glossary.store.ts`
- [ ] T084 [P] [US2] Create GlossarySearch component (search input with debounce) in `web/src/components/glossary/GlossarySearch.vue`
- [ ] T085 [US2] Create GlossaryTerm component (term card with definition, LGPD article, related terms links) in `web/src/components/glossary/GlossaryTerm.vue`
- [ ] T086 [US2] Create GlossaryView — full glossary page with search, alphabetical list, term definitions in `web/src/views/GlossaryView.vue`

**Checkpoint**: Glossary is accessible from the navigation bar. Terms link to LGPD articles and related terms. Content supports report comprehension.

---

## Phase 5: User Story 3 — Histórico de Análises (Priority: P3)

**Goal**: User can view a history of previous scans and access past reports.

**Independent Test**: Perform 2+ scans → navigate to history page → see list with URL, date, score → click a scan → view its report.

### Tests for User Story 3

- [ ] T087 [US3] Integration test for scan list endpoint (GET /scans with pagination) in `server/tests/integration/scan-list.integration.test.ts`

### Backend Implementation for User Story 3

- [ ] T088 [US3] Implement paginated scan list query in Scan repository in `server/src/repositories/scan.repository.ts`
- [ ] T089 [US3] Add GET /scans handler with pagination, sorting, filtering to Scan Controller in `server/src/controllers/scan.controller.ts`

### Frontend Implementation for User Story 3

- [ ] T090 [P] [US3] Create scan list composable (useScanHistory) with pagination logic in `web/src/composables/useScanHistory.ts`
- [ ] T091 [US3] Create HistoryView — table/list of past scans with URL, date, score badge, risk level, clickable to view report in `web/src/views/HistoryView.vue`

**Checkpoint**: History page shows all past scans with scores and links to full reports.

---

## Phase 6: User Story 4 — Exportação de Relatório (Priority: P3)

**Goal**: User can export the analysis report as a downloadable file.

**Independent Test**: View a completed report → click "Exportar" → download starts → verify file content matches report.

### Tests for User Story 4

- [ ] T092 [US4] Integration test for export endpoint (GET /scans/:id/export?format=json) in `server/tests/integration/export.integration.test.ts`

### Backend Implementation for User Story 4

- [ ] T093 [US4] Implement report export endpoint (GET /scans/:id/export) with JSON format, Content-Disposition header in `server/src/controllers/export.controller.ts`
- [ ] T094 [US4] Create export routes and register with Express app in `server/src/routes/export.routes.ts`

### Frontend Implementation for User Story 4

- [ ] T095 [US4] Add "Exportar Relatório" button to ReportView that triggers file download in `web/src/views/ReportView.vue`

**Checkpoint**: User can download reports as JSON files from the report view.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories and ensure production readiness.

- [ ] T096 [P] Implement rate limiting middleware (express-rate-limit: 10 scans/hour per IP) in `server/src/middleware/rate-limiter.ts`
- [ ] T097 [P] Add input sanitization to all endpoints (prevent injection attacks) in `server/src/middleware/sanitize.ts`
- [ ] T098 [P] Add CORS configuration for frontend origin in `server/src/config/app.ts`
- [ ] T099 [P] Add request timeout handling (60s max) for scan operations in `server/src/services/scan.service.ts`
- [ ] T100 [P] Implement graceful error handling for site unreachable, blocked scraping, timeouts in `server/src/scanners/url-scanner.ts`
- [ ] T101 [P] Add aria-labels, aria-live regions, and keyboard navigation to all frontend components for WCAG 2.1 AA
- [ ] T102 [P] Add responsive layout breakpoints for mobile/tablet in frontend styles
- [ ] T103 [P] Add loading skeletons to ReportView and GlossaryView
- [ ] T104 [P] Add favicon, page title, and meta description to `web/index.html`
- [ ] T105 [P] Create 404 Not Found page view in `web/src/views/NotFoundView.vue`
- [ ] T106 Run quickstart.md validation scenarios to verify all functionality
- [ ] T107 Verify all 10 success criteria (SC-001 to SC-010) from spec Section "Success Criteria"
- [ ] T108 Code review: ensure no personal data from analyzed sites is stored (RN02), all legal disclaimers visible (RN07)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Setup (Phase 1) completion — BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational (Phase 2) — No dependencies on other stories
- **User Story 2 (Phase 4)**: Depends on Foundational (Phase 2) — Independent of US1
- **User Story 3 (Phase 5)**: Depends on Foundational (Phase 2) and US1 backend (Scan model, GET /scans endpoint) — Requires US1 scan completion
- **User Story 4 (Phase 6)**: Depends on US1 (report data available) — Requires report data from US1
- **Polish (Phase 7)**: Depends on all user stories being complete

### User Story Dependencies

- **US1 (P1)**: Can start after Phase 2 — No dependencies on other user stories. **This is the MVP.**
- **US2 (P1)**: Can start after Phase 2 — Completely independent of US1. Can be developed in parallel with US1.
- **US3 (P3)**: Can start after Phase 2 + US1 backend (scan model, GET /scans endpoint). Depends on US1 for scan records.
- **US4 (P3)**: Can start after US1 (report data). Depends on US1 for report generation.

### Within Each User Story

- Tests MUST be written first and FAIL before implementation
- Repositories before scanners/services
- Scanners before scoring engine
- Scoring engine before report generator
- Services before controllers
- Controllers before routes
- Backend complete before frontend integration (or parallel if different developers)
- Story complete and validated before moving to next priority

### Parallel Opportunities

- **Phase 1**: T002-T009 all [P] — can run in parallel (8 tasks)
- **Phase 2**: T012-T028 all [P] after T010-T011 (16 tasks parallel)
- **Phase 3 Tests**: T029-T035 all [P] — can run in parallel (7 tasks)
- **Phase 3 Repositories**: T037-T042 all [P] — can run in parallel (6 tasks)
- **Phase 3 Scanners**: T043-T052 after repositories, many can be parallel
- **Phase 3 Frontend**: T060-T065 all [P] — can run in parallel (6 tasks)
- **Phase 3 Components**: T067-T073 all [P] — can run in parallel (7 tasks)
- **US1 and US2** can be developed in parallel by different team members once Phase 2 finishes

---

## Parallel Example: User Story 1

```bash
# Step 1: Launch all tests for US1 in parallel:
Task: "Unit test for URL validator in server/tests/unit/validators/url.validator.test.ts"
Task: "Unit test for Privacy Policy Analyzer in server/tests/unit/scanners/privacy-policy-analyzer.test.ts"
Task: "Unit test for Cookie Analyzer in server/tests/unit/scanners/cookie-analyzer.test.ts"
Task: "Unit test for Form Analyzer in server/tests/unit/scanners/form-analyzer.test.ts"
Task: "Unit test for Risk Scoring Engine in server/tests/unit/scanners/risk-scoring-engine.test.ts"
Task: "Unit test for Report Generator in server/tests/unit/scanners/report-generator.test.ts"

# Step 2: All repositories in parallel:
Task: "Create Scan repository in server/src/repositories/scan.repository.ts"
Task: "Create Finding repository in server/src/repositories/finding.repository.ts"
Task: "Create Recommendation repository in server/src/repositories/recommendation.repository.ts"
Task: "Create CookieRecord repository in server/src/repositories/cookie-record.repository.ts"
Task: "Create FormRecord repository in server/src/repositories/form-record.repository.ts"

# Step 3: Frontend stores and services in parallel:
Task: "Create scan store in web/src/stores/scan.store.ts"
Task: "Create report store in web/src/stores/report.store.ts"
Task: "Create scan service in web/src/services/scan.service.ts"
Task: "Create report service in web/src/services/report.service.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (~9 tasks)
2. Complete Phase 2: Foundational (~19 tasks) — **CRITICAL GATE**
3. Complete Phase 3: User Story 1 (~47 tasks)
4. **STOP and VALIDATE**: Test full scan flow independently per quickstart.md
5. Deploy/demo MVP

**MVP delivers**: Complete site analysis with URL input → report (score, risk, privacy policy, cookies, forms, security, recommendations). This is 90% of the value.

### Incremental Delivery After MVP

1. MVP (US1) → Test → Deploy
2. Add US2 (Glossary) → Independent → Deploy (educational value add)
3. Add US3 (History) → Links to US1 → Deploy (convenience)
4. Add US4 (Export) → Links to US1 → Deploy (convenience)
5. Polish → Final deploy

### Parallel Team Strategy

With multiple developers:
1. Dev A + Dev B: Complete Setup + Foundational together (Phases 1-2)
2. Once Foundation is done:
   - Dev A: User Story 1 (core scan flow, 47 tasks)
   - Dev B: User Story 2 (glossary, 11 tasks) — completely independent
3. After US1 complete:
   - Dev B: User Story 3 (history, 5 tasks)
   - Dev B: User Story 4 (export, 4 tasks)
4. Dev A + Dev B: Polish (13 tasks)

---

## Notes

- [P] tasks = different files, no dependencies on incomplete [P] tasks
- [US#] label maps task to specific user story for traceability
- Each user story is independently testable per its checkpoints
- Tests written first, must FAIL before implementation (TDD approach for Phase 3)
- Commit after each task or logical group (e.g., all repositories together)
- Stop at any checkpoint to validate independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- Legal disclaimers must be visible at all times (RN07, RN05)
- No personal data from analyzed sites stored in database (RN02)
