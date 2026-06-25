# Mock Data Provider Contracts: Frontend Mock Demo

**Version**: 1.0.0
**Feature**: Frontend Mock Demo (specs/002-frontend-mock-demo)

These contracts define the TypeScript function signatures for mock data providers. They replace the HTTP-based service layer in `web/src/services/`.

## Mock Provider: Scans

### `generateMockScanList(count: number): ScanListItem[]`

Generates a list of simulated scan records for the history view.

**Parameters**:
- `count` — number of records to generate (1–50)

**Returns**: `ScanListItem[]` — array with shape matching `web/src/types/scan.types.ts`

**Behavior**:
- Each call produces randomized data (different scores, URLs, dates)
- At least 80% of records have `status: "completed"`
- Scores are uniformly distributed 15–98
- `riskLevel` is derived from score
- Dates span the last 30 days, most recent first

**Example**:
```typescript
import { generateMockScanList } from '@/mock/scans';
const scans = generateMockScanList(10);
// scans[0] = { id: "uuid", url: "https://...", status: "completed", score: 72.3, riskLevel: "low", createdAt: "2026-06-22T..." }
```

---

### `getMockScanProgress(delayMs?: number): Promise<ScanResponse>`

Simulates a scan in progress that completes after a delay.

**Parameters**:
- `delayMs` — milliseconds until completion (default: 4000)

**Returns**: `Promise<ScanResponse>` that resolves after `delayMs` with `status: "completed"`

**Behavior**:
- The store updates status progressively: `pending` → (immediate) → `running` → (after delayMs) → `completed`
- Score and riskLevel are set at completion
- If called with very short delay (<500ms), still respects minimum 3-step sequence

---

## Mock Provider: Reports

### `getMockReport(scanId: string, url: string): ReportResponse`

Returns a complete, pre-built report for a given scan.

**Parameters**:
- `scanId` — UUID to use in the report's scan metadata
- `url` — URL to use in the report's scan metadata

**Returns**: `ReportResponse` matching `web/src/types/report.types.ts`

**Behavior**:
- Returns the same base report structure every time (deterministic findings)
- Uses the provided `scanId` and `url` in the scan metadata wrapper
- All 33 findings are present with realistic statuses, evidence, and recommendations
- Cookie and form lists are deterministic (same data each call)

**Guaranteed contents**:
- 7 categories with non-zero scores
- 33 findings (C01-C33), at least 5 `found`, 10 `partial`, remainder `absent`
- 6-8 cookies of mixed types
- 2 forms with 3-5 fields each

---

## Mock Provider: Glossary

### `getMockGlossaryTerms(): GlossaryTerm[]`

Returns the full glossary.

**Returns**: `GlossaryTerm[]` — 15 terms matching `web/src/types/glossary.types.ts`

**Behavior**:
- Deterministic — always returns the same 15 terms
- Terms sorted alphabetically

---

### `searchMockGlossary(query: string, delayMs?: number): Promise<GlossaryTerm[]>`

Simulates a glossary search with artificial delay.

**Parameters**:
- `query` — case-insensitive search string
- `delayMs` — simulated network delay (default: 300ms)

**Returns**: `Promise<GlossaryTerm[]>` that resolves after `delayMs` with filtered results

**Behavior**:
- Filters `getMockGlossaryTerms()` by case-insensitive substring match on `term` field
- Returns empty array if no matches
- Resolves after simulated delay for realistic UX feedback

---

## Runtime Contract: Theme

### Theme Store Interface

```typescript
interface ThemeStore {
  theme: Ref<'light' | 'dark'>;
  isDark: ComputedRef<boolean>;
  toggle(): void;
  init(): void;  // Called on app mount
}
```

**Behavior**:
- `init()` reads `localStorage.getItem('theme')`, applies `dark` class to `document.documentElement`
- `toggle()` flips theme, updates DOM class, persists to localStorage
- Fallback to `"light"` if localStorage unavailable or value invalid
- CSS transition: `transition-colors duration-300` on body for smooth color change
