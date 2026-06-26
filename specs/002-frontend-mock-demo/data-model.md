# Data Model: Frontend Mock Demo

**Date**: 2026-06-23
**Feature**: Frontend Mock Demo (specs/002-frontend-mock-demo)

## Overview

All data is hardcoded in TypeScript modules under `web/src/mock/`. The structures mirror the existing type definitions in `web/src/types/` exactly — no new entities are introduced. This feature adds mock data providers and one new runtime entity: theme preference.

## Runtime Entity: Theme Preference

| Field  | Type   | Storage      | Default | Description                |
|--------|--------|--------------|---------|----------------------------|
| theme  | String | localStorage | "light" | One of `"light"` or `"dark"` |

**State transitions**: `"light"` ↔ `"dark"` via toggle button. Persisted on every change. Read on app mount.

**Validation**: If localStorage value is not `"light"` or `"dark"`, default to `"light"`.

## Mock Data Entities

These reuse the existing `web/src/types/*.ts` interfaces exactly.

### Mock Scan List

Source: `web/src/mock/scans.ts` — `generateMockScanList(n: number): ScanListItem[]`

Generates `n` records with randomized but realistic values:

| Field      | Example values                                      |
|------------|-----------------------------------------------------|
| id         | UUID v4                                            |
| url        | Random from pool of 8 realistic Brazilian domains   |
| status     | `"completed"` (most), occasional `"failed"`         |
| score      | Random float 15–98                                  |
| riskLevel  | Mapped from score: <40→high, <70→medium, <90→low, ≥90→good |
| createdAt  | Random date within last 30 days                     |

### Mock Report

Source: `web/src/mock/reports.ts` — `getMockReport(): ReportResponse`

A single comprehensive report with:

- **Scan metadata**: id, url, score (65.5), riskLevel ("medium"), completedAt
- **7 categories**: One `CategoryResult` per `ScanCategory` with:
  - Realistic score distribution (privacy_policy: 18.75/25, cookies: 16/20, forms: 11.25/15, rights: 7.5/15, controller: 6.67/10, security: 7.5/10, language: 5/5)
  - Summary text in Portuguese
  - 31–33 findings total (C01-C33)
- **Findings**: Each `FindingItem` includes:
  - Criterion code (C01-C33) and name
  - Status: mix of `found`, `partial`, `absent` across categories
  - Score, evidence text (Portuguese), explanation, LGPD reference
  - 0–2 recommendations per finding with priorities
- **Cookies**: 6-8 `CookieItem` records with varied types (necessary, analytics, functional, marketing), origins, durations
- **Forms**: 2 `FormItem` records with realistic field arrays including personal data fields and one with sensitive data flag

### Mock Glossary

Source: `web/src/mock/glossary.ts` — `getMockGlossaryTerms(): GlossaryTerm[]`

15 terms matching the existing seed data from `server/prisma/seed.ts`:
Titular, Dado pessoal, Dado sensível, Tratamento, Controlador, Operador, Encarregado (DPO), Consentimento, Finalidade, Necessidade, ANPD, LGPD, Bases legais, Cookie, Relatório de impacto.

Each with `term`, `definition`, `lgpdArticle`, and `relatedTerms` (string array).

## Relationships

```
Mock Scan List ──(click)──▶ Mock Report
                                  ├── 7 Categories
                                  │     └── 33 Findings
                                  │           └── 0-2 Recommendations
                                  ├── 6-8 Cookies
                                  └── 2 Forms

Mock Glossary ──(search)──▶ Filtered Glossary Terms

Theme Store ──(toggle)──▶ localStorage (key: "theme")
```

## Data Flow (Offline Mode)

```
User Action → Pinia Store → Mock Data Module → Component Render
                                    ↑
                         No network calls
                         No backend dependency
```

Stores import mock functions directly and expose them through the same reactive interface used by the real API services. Composables (`useScan`, `useReport`, `useScanHistory`) are updated to call store actions that use mocks instead of HTTP services.
