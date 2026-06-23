# Research: Scanner LGPD Educacional

**Date**: 2026-06-22
**Feature**: Scanner LGPD Educacional

## 1. Web Scraping & HTML Parsing

### Decision: Cheerio + Axios for primary analysis

**Rationale**: The MVP requires analyzing publicly accessible HTML content. Cheerio provides jQuery-like selectors for server-side DOM traversal, which is sufficient for parsing privacy policy pages, detecting forms, and finding cookie banners. Axios is already in the technology stack for HTTP requests. Together they cover the primary use case without the overhead of headless browsers.

**Alternatives considered**:
- **Playwright/Puppeteer**: Full browser automation. Would handle JS-rendered content better but adds significant complexity (browser binary, slower startup, resource usage). **Deferred to Phase 2** for sites where static parsing is insufficient.
- **JSDOM**: More complete DOM emulation than Cheerio but heavier. Not needed for the text/selector-based analysis in MVP.
- **Built-in `fetch`**: Available but lacks the convenience of Axios interceptors and timeout handling.

### Decision: Structured approach to content discovery

**Rationale**: The URL Scanner will:
1. Fetch the target URL
2. Parse links to find privacy policy pages (URLs containing patterns like `/privacy`, `/privacidade`, `/politica`, `/lgpd`, `/cookies`)
3. Follow up to 2 levels of internal links
4. Respect `<meta name="robots">` and robots.txt

**Limitation acknowledged**: JavaScript-rendered content (SPAs, dynamic cookie banners) will have limited detection in MVP. The tool will note this in results.

## 2. Cookie Detection & Classification

### Decision: Heuristic-based approach using Set-Cookie headers + DOM scanning

**Rationale**: Cookies can be detected via:
1. `Set-Cookie` response headers from HTTP responses
2. Inline `<script>` tags containing `document.cookie` or cookie-setting patterns
3. Cookie consent libraries (CookieBot, OneTrust, etc.) detected via script sources

**Classification heuristics** (by name, domain, purpose patterns):

| Type          | Pattern / Heuristic                                                      |
| ------------- | ------------------------------------------------------------------------ |
| Necessário    | `session`, `csrf`, `auth`, security-related names                        |
| Analítico     | `_ga`, `_gid`, `_gat`, `_ym_`, `_pk_`, analytics domains                |
| Funcional     | `pref`, `lang`, `theme`, non-tracking UX cookies                         |
| Marketing     | `_fbp`, `_gcl_`, `ads`, `track`, ad-network domains                      |
| Próprios       | Domain matches site domain                                               |
| Terceiros      | Domain differs from site domain                                          |
| Sessão        | No explicit `Expires` or `Max-Age`, or session-scoped                    |
| Persistentes  | Has explicit `Expires` or `Max-Age` far in the future                    |

The tool will label all classifications as "aproximação educativa" to manage expectations.

## 3. Database Selection

### Decision: SQLite for prototype, PostgreSQL documented for production

**Rationale**: SQLite is:
- Zero-configuration (no separate server process)
- Fully Prisma-compatible
- Sufficient for prototype/low-concurrency educational tool
- Easier for development setup and CI

PostgreSQL is documented as the target for any production deployment and is the primary schema target in Prisma schema design. The Prisma schema will use SQLite-compatible types while maintaining PostgreSQL compatibility.

**Migration path**: Switch to PostgreSQL by changing the Prisma provider and connection string only (no schema changes).

## 4. Text Analysis for Privacy Policy

### Decision: Keyword-based + pattern matching approach

**Rationale**: The analyzers check for presence/absence of specific concepts in the privacy policy text. This can be done with:
1. Portuguese keyword lists for each criterion (e.g., "dados coletados", "finalidade", "compartilhamento")
2. Regex patterns for structured data (emails, CNPJ format)
3. Negative patterns for vague language detection ("melhorar sua experiência", "dados para fins de")

**Vague language detection patterns**:
- "melhorar sua experiência"
- "fins comerciais"
- "parceiros de negócios"
- "conforme necessário"
- "podemos coletar"
- "entre outros"

This is intentionally simple for the MVP and clearly labeled as automated/approximate.

## 5. Rate Limiting

### Decision: In-memory rate limiting with configurable thresholds

**Rationale**: Simple in-memory rate limiting (express-rate-limit) is sufficient for prototype:
- 10 scans per hour per IP
- 3 concurrent scans per IP
- Configurable via environment variables

No Redis or external store needed for MVP scale.

## 6. Scoring Engine Design

### Decision: Weighted multi-criteria scoring per spec Section 8

**Rationale**: The spec already defines a clear scoring model:
- 7 categories with explicit weights (30%, 25%, 15%, 15%, 10%, 5%)
- 33 criteria total
- Each criterion: found (full points), partial (50% points), absent (0 points)
- Risk level classifications: 0-39 (high), 40-69 (medium), 70-89 (low), 90-100 (good)

The scoring engine will be data-driven - criteria and weights stored in the database for future adjustability.

## 7. Frontend-Backend Communication

### Decision: Polling for scan status, REST for everything else

**Rationale**: The scan operation is async (up to 60s). The frontend will:
1. POST `/api/scans` to start the scan (get immediate 202 with scan ID)
2. Poll `GET /api/scans/:id` every 2-3 seconds until status is `completed` or `failed`
3. Once complete, fetch `GET /api/scans/:id/report` for the full report

No WebSockets needed for MVP. SSE could be added later.

## 8. Report Export

### Decision: JSON export in MVP, PDF deferred to Phase 2

**Rationale**: JSON export is trivial (just serve the report data). PDF generation requires additional libraries (e.g., Puppeteer or jsPDF) and formatting logic that adds complexity to the prototype. JSON can be consumed by other tools or printed to PDF by the user's browser.

## 9. Security Considerations

### Decision: Validated input scrubbing

**Rationale**:
- Zod validates URL format and sanitizes input
- HTML content from target sites is parsed but not stored raw (only metadata and findings)
- No personal data from analyzed sites stored in database (RN02)
- CORS restricted to frontend origin
- Helmet.js for security headers
- Content-Security-Policy for the web application
