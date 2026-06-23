# Quickstart: Scanner LGPD Educacional

**Date**: 2026-06-22
**Feature**: Scanner LGPD Educacional

## Prerequisites

- Node.js 20+
- npm 9+
- Git

## Project Setup

```bash
# Clone and enter project
git clone <repo-url> lgpdoc
cd lgpdoc

# Install backend dependencies
cd server
npm install

# Set up database and seed criteria/glossary
npx prisma migrate dev --name init
npx prisma db seed

# Start backend (port 3000)
npm run dev
```

```bash
# In a separate terminal, install frontend dependencies
cd web
npm install

# Start frontend (port 5173)
npm run dev
```

## Quick Validation

### 1. Verify backend health

```bash
curl http://localhost:3000/api/criteria
# Should return array of 33 criteria (C01-C33)
```

### 2. Verify glossary data

```bash
curl http://localhost:3000/api/glossary
# Should return at least 10 LGPD terms with definitions
```

### 3. Run a sample scan

```bash
# Start a scan
curl -X POST http://localhost:3000/api/scans \
  -H "Content-Type: application/json" \
  -d '{"url": "https://exemplo.gov.br"}'

# Response: { "id": "<uuid>", "status": "pending", ... }

# Poll until completed
curl http://localhost:3000/api/scans/<uuid>

# Get full report
curl http://localhost:3000/api/scans/<uuid>/report
```

### 4. Verify scoring engine

```bash
# Run the unit tests for the scoring engine
cd server
npx vitest run tests/unit/scanners/risk-scoring-engine.test.ts
```

## Expected Outcomes

| Test Case                                    | Expected Behavior                              |
|----------------------------------------------|------------------------------------------------|
| Submit valid HTTPS URL                       | 202 Accepted, scan starts                      |
| Submit invalid URL (no protocol)             | 400 Bad Request, "URL inválida"                |
| Poll scan status before completion           | Returns pending/running with null score        |
| Poll scan after completion                   | Returns completed with score and riskLevel     |
| Fetch report for completed scan              | Full JSON with categories, findings, recs      |
| Fetch report for running scan                | 409 Conflict, "Análise ainda em andamento"     |
| Fetch non-existent scan                      | 404 Not Found                                  |
| Scan site with no privacy policy             | Report shows C01 absent, score reflects gap    |
| Scan site with cookie banner                 | Report detects banner and buttons              |
| Scan site with contact form                  | Report lists form fields with classification   |
| Request glossary terms                       | Returns array with term, definition, article   |
| Search glossary for "consentimento"          | Returns matching terms                         |
| Export report as JSON                        | Downloads JSON file with full report           |

## Database Verification (SQLite)

```bash
cd server
npx prisma studio
# Opens browser at localhost:5555 - inspect Scan, Criterion, Glossary data
```

## Running Tests

```bash
# All tests
cd server && npx vitest run

# With coverage
cd server && npx vitest run --coverage

# Specific module
npx vitest run tests/unit/scanners/
```
