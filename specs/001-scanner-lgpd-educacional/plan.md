# Implementation Plan: Scanner LGPD Educacional

**Branch**: `001-scanner-lgpd-educacional` | **Date**: 2026-06-22 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/001-scanner-lgpd-educacional/spec.md`

## Summary

Build a web-based educational scanner tool that analyzes public-facing elements of websites for LGPD compliance indicators. The system examines privacy policies, cookie banners, forms, and security basics, then generates a didactic report with risk scoring, findings, and improvement recommendations. The tool is explicitly educational — it does not provide legal certification or compliance guarantees.

**Technical approach**: Monorepo with Node.js/Express/TypeScript backend performing web scraping and analysis, Vue.js/shadcn-vue frontend for the user interface, Prisma ORM with SQLite for data persistence, and Vitest for testing.

## Technical Context

**Language/Version**: TypeScript 5.x (Node.js 20+ for backend, Vue 3 SFC for frontend)

**Primary Dependencies**: Express, Zod, Prisma, axios, cheerio (backend); Vue.js, shadcn-vue, Axios, Pinia, Vue Router (frontend)

**Storage**: SQLite via Prisma (prototype), PostgreSQL-compatible schema

**Testing**: Vitest (unit + integration)

**Target Platform**: Web browser (frontend), Linux/macOS server (backend)

**Project Type**: Web application (monorepo with `server/` and `web/`)

**Performance Goals**: Scan completion under 60s per site (SC-001); single-user prototype

**Constraints**: No personal data storage (RN02); rate limiting 10 scans/hour/IP (RN10); WCAG 2.1 AA (RNF05)

**Scale/Scope**: Prototype, educational tool, low concurrency, ~33 criteria, 6 entities

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Gate | Status | Notes |
|------|--------|-------|
| Core Principles | N/A | Constitution template not yet filled — no principles to enforce |
| Constraints | N/A | Constitution template not yet filled |
| Governance | N/A | Constitution template not yet filled |

**Verdict**: No gates defined. Proceed with plan.

**Post-Design Re-check**: No violations detected. Architecture follows spec-defined modular structure with clear separation of concerns.

## Project Structure

### Documentation (this feature)

```text
specs/001-scanner-lgpd-educacional/
├── plan.md              # This file
├── research.md          # Phase 0: technical decisions
├── data-model.md        # Phase 1: entities, enums, relationships
├── quickstart.md        # Phase 1: setup and validation guide
├── contracts/
│   └── api.md           # Phase 1: REST API contract
└── tasks.md             # Phase 2: /speckit.tasks output (future)
```

### Source Code (repository root)

```text
server/                       # Backend (Node.js/Express)
├── src/
│   ├── controllers/          # Route handlers
│   │   ├── scan.controller.ts
│   │   ├── report.controller.ts
│   │   ├── glossary.controller.ts
│   │   └── criterion.controller.ts
│   ├── services/             # Business logic
│   │   ├── scan.service.ts
│   │   ├── report.service.ts
│   │   └── glossary.service.ts
│   ├── scanners/             # Analysis modules
│   │   ├── url-scanner.ts
│   │   ├── privacy-policy-analyzer.ts
│   │   ├── cookie-analyzer.ts
│   │   ├── form-analyzer.ts
│   │   ├── risk-scoring-engine.ts
│   │   └── report-generator.ts
│   ├── repositories/         # Data access (Prisma)
│   │   ├── scan.repository.ts
│   │   ├── finding.repository.ts
│   │   └── glossary.repository.ts
│   ├── validators/           # Zod schemas
│   │   ├── scan.validator.ts
│   │   └── url.validator.ts
│   ├── routes/               # Express route definitions
│   │   ├── scan.routes.ts
│   │   ├── report.routes.ts
│   │   ├── glossary.routes.ts
│   │   └── criterion.routes.ts
│   ├── config/               # App configuration
│   │   ├── database.ts
│   │   └── app.ts
│   ├── utils/                # Shared utilities
│   │   ├── http-client.ts
│   │   ├── html-parser.ts
│   │   └── text-analyzer.ts
│   └── app.ts                # Express app entry
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── seed.ts               # Seed data (criteria, glossary)
├── tests/
│   ├── unit/scanners/        # Isolated scanner tests
│   └── integration/          # API + DB tests
├── package.json
├── tsconfig.json
└── vitest.config.ts

web/                          # Frontend (Vue.js/shadcn-vue)
├── src/
│   ├── views/                # Page-level components
│   │   ├── HomeView.vue
│   │   ├── ScanView.vue
│   │   ├── ReportView.vue
│   │   ├── CategoryDetailView.vue
│   │   ├── GlossaryView.vue
│   │   └── HistoryView.vue
│   ├── components/           # Reusable components
│   │   ├── layout/           # Header, Footer, LegalDisclaimer
│   │   ├── scan/             # UrlInput, ScanProgress
│   │   ├── report/           # ScoreGauge, RiskBadge, FindingCard, etc.
│   │   └── glossary/         # GlossarySearch, GlossaryTerm
│   ├── stores/               # Pinia state
│   │   ├── scan.store.ts
│   │   ├── report.store.ts
│   │   └── glossary.store.ts
│   ├── services/             # API clients
│   │   ├── api.ts
│   │   ├── scan.service.ts
│   │   ├── report.service.ts
│   │   └── glossary.service.ts
│   ├── composables/          # Vue composables
│   │   ├── useScan.ts
│   │   └── useReport.ts
│   ├── router/               # Vue Router config
│   │   └── index.ts
│   ├── types/                # TypeScript interfaces
│   │   ├── scan.types.ts
│   │   ├── report.types.ts
│   │   └── glossary.types.ts
│   ├── App.vue
│   └── main.ts
├── package.json
├── tsconfig.json
└── vite.config.ts
```

**Structure Decision**: Web application monorepo with two packages (`server/` and `web/`). This matches the spec-defined architecture with clean separation between backend analysis modules and frontend UI. Single root `package.json` with workspaces or two independent packages.

## Complexity Tracking

No constitution violations. Architecture is minimal for a web app (single backend + single frontend). No unnecessary abstractions.
