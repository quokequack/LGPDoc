# Data Model: Scanner LGPD Educacional

**Date**: 2026-06-22
**Feature**: Scanner LGPD Educacional

## Entity-Relationship Diagram

```
┌─────────┐       ┌──────────────┐       ┌──────────┐       ┌──────────────────┐
│   Scan  │──1:N─→│ ScanResult   │──1:N─→│ Finding  │──1:N─→│ Recommendation   │
└─────────┘       └──────────────┘       └──────────┘       └──────────────────┘
                       │                      │
                       │ N:1                  │ N:1
                       ▼                      ▼
                ┌──────────────┐       ┌──────────────┐
                │  Criterion   │       │  Criterion   │
                └──────────────┘       └──────────────┘

┌─────────────────┐
│  GlossaryTerm   │   (independent)
└─────────────────┘

┌─────────────────┐
│  CookieRecord   │──N:1─→ Scan
└─────────────────┘

┌─────────────────┐
│  FormRecord     │──N:1─→ Scan
└─────────────────┘
```

## Enums

```typescript
// Scan status
enum ScanStatus {
  PENDING    // Created, waiting to start
  RUNNING    // Analysis in progress
  COMPLETED  // Analysis finished successfully
  FAILED     // Analysis failed (site unreachable, error)
}

// Risk levels (from spec Section 8.3)
enum RiskLevel {
  HIGH      // 0-39 points
  MEDIUM    // 40-69 points
  LOW       // 70-89 points
  GOOD      // 90-100 points (Boas Práticas Aparentes)
}

// Analysis categories (from spec Section 7)
enum ScanCategory {
  PRIVACY_POLICY   // Política de Privacidade
  COOKIES          // Cookies
  FORMS            // Formulários
  RIGHTS           // Direitos do Titular
  CONTROLLER       // Controlador e Contato
  SECURITY         // Segurança Básica
  LANGUAGE         // Linguagem Clara
}

// Finding status
enum FindingStatus {
  FOUND     // Evidence found completely
  PARTIAL   // Evidence partially found
  ABSENT    // Evidence not found
}

// Criterion risk if absent
enum CriterionRisk {
  HIGH
  MEDIUM
  LOW
  INFO       // Informativo
}

// Recommendation priority
enum Priority {
  HIGH
  MEDIUM
  LOW
}

// Cookie type (from spec item 4)
enum CookieType {
  NECESSARY    // Necessários
  ANALYTICS    // Analíticos
  FUNCTIONAL   // Funcionais
  MARKETING    // Publicidade/Marketing
}

// Cookie origin
enum CookieOrigin {
  FIRST_PARTY  // Próprios
  THIRD_PARTY  // Terceiros
}

// Cookie duration
enum CookieDuration {
  SESSION      // Sessão
  PERSISTENT   // Persistentes
}
```

## Entity Definitions

### Scan

| Field         | Type          | Required | Default    | Description                                  |
|---------------|---------------|----------|------------|----------------------------------------------|
| id            | String (UUID) | yes      | generated  | Primary key                                  |
| url           | String        | yes      |            | URL of analyzed site                         |
| status        | ScanStatus    | yes      | PENDING    | Current status                               |
| score         | Float         | no       | null       | Final score (0-100), null until completed    |
| riskLevel     | RiskLevel     | no       | null       | Risk classification, null until completed    |
| startedAt     | DateTime      | no       | now()      | When analysis started                        |
| completedAt   | DateTime      | no       | null       | When analysis finished                       |
| errorMessage  | String        | no       | null       | Error details if failed                      |
| createdAt     | DateTime      | yes      | now()      | Record creation timestamp                    |

**Validation rules**:
- `url` must be a valid HTTP/HTTPS URL (Zod validation)
- `status` transitions: PENDING → RUNNING → COMPLETED | FAILED
- `score` must be 0-100 when status is COMPLETED
- `riskLevel` must be present when status is COMPLETED
- `completedAt` must be set when status is COMPLETED or FAILED

### ScanResult

| Field         | Type          | Required | Default    | Description                                  |
|---------------|---------------|----------|------------|----------------------------------------------|
| id            | String (UUID) | yes      | generated  | Primary key                                  |
| scanId        | String (UUID) | yes      |            | FK → Scan.id                                 |
| category      | ScanCategory  | yes      |            | Analysis category                            |
| score         | Float         | yes      |            | Category score                               |
| maxScore      | Float         | yes      |            | Maximum possible score for this category     |
| summary       | String        | yes      |            | Human-readable summary of category results   |
| createdAt     | DateTime      | yes      | now()      | Record creation timestamp                    |

**Validation rules**:
- `score` must be >= 0 and <= `maxScore`
- `category` must be unique per scanId (one ScanResult per category per scan)

### Finding

| Field            | Type           | Required | Default    | Description                               |
|------------------|----------------|----------|------------|-------------------------------------------|
| id               | String (UUID)  | yes      | generated  | Primary key                               |
| scanResultId     | String (UUID)  | yes      |            | FK → ScanResult.id                        |
| criterionId      | String (UUID)  | yes      |            | FK → Criterion.id                         |
| status           | FindingStatus  | yes      |            | Found / Partial / Absent                  |
| score            | Float          | yes      |            | Points obtained (0 to criterion weight)   |
| evidence         | String         | no       | null       | Text/description of what was found        |
| explanation      | String         | yes      |            | Educational explanation (from Criterion or custom) |
| lgpdReference    | String         | yes      |            | Reference to LGPD principle/article       |
| createdAt        | DateTime       | yes      | now()      | Record creation timestamp                 |

**Validation rules**:
- `score` must be >= 0 and <= corresponding Criterion.weight
- `status`: FOUND → score = weight; PARTIAL → score > 0 and < weight; ABSENT → score = 0
- `evidence` must be present when status is FOUND or PARTIAL

### Recommendation

| Field         | Type           | Required | Default    | Description                               |
|---------------|----------------|----------|------------|-------------------------------------------|
| id            | String (UUID)  | yes      | generated  | Primary key                               |
| findingId     | String (UUID)  | yes      |            | FK → Finding.id                           |
| title         | String         | yes      |            | Recommendation title                      |
| description   | String         | yes      |            | Detailed description                      |
| priority      | Priority       | yes      |            | Priority level                            |
| howToImprove  | String         | yes      |            | Actionable improvement instructions       |
| createdAt     | DateTime       | yes      | now()      | Record creation timestamp                 |

### Criterion

| Field                    | Type           | Required | Default    | Description                               |
|--------------------------|----------------|----------|------------|-------------------------------------------|
| id                       | String (UUID)  | yes      | generated  | Primary key                               |
| code                     | String         | yes      |            | Unique code (e.g., "C01")                 |
| category                 | ScanCategory   | yes      |            | Category this criterion belongs to         |
| name                     | String         | yes      |            | Short name                                |
| description              | String         | yes      |            | What this criterion verifies              |
| expectedEvidence         | String         | yes      |            | Expected evidence on the site             |
| riskIfAbsent             | CriterionRisk  | yes      |            | Risk level if evidence absent             |
| educationalExplanation   | String         | yes      |            | Educational context                       |
| improvementSuggestion    | String         | yes      |            | How to improve                            |
| weight                   | Float          | yes      |            | Points this criterion is worth            |
| createdAt                | DateTime       | yes      | now()      | Record creation timestamp                 |

**Validation rules**:
- `code` must be unique
- `weight` must be > 0
- `category` must reference a valid ScanCategory

### GlossaryTerm

| Field         | Type           | Required | Default    | Description                               |
|---------------|----------------|----------|------------|-------------------------------------------|
| id            | String (UUID)  | yes      | generated  | Primary key                               |
| term          | String         | yes      |            | LGPD term (unique)                        |
| definition    | String         | yes      |            | Clear, accessible definition              |
| lgpdArticle   | String         | no       | null       | Related LGPD article                      |
| relatedTerms  | String         | no       | "[]"       | JSON array of related term strings        |
| createdAt     | DateTime       | yes      | now()      | Record creation timestamp                 |
| updatedAt     | DateTime       | yes      | now()      | Last update timestamp                     |

**Validation rules**:
- `term` must be unique
- `relatedTerms` stored as JSON string (SQLite) or native JSON (PostgreSQL)

### CookieRecord

| Field         | Type           | Required | Default    | Description                               |
|---------------|----------------|----------|------------|-------------------------------------------|
| id            | String (UUID)  | yes      | generated  | Primary key                               |
| scanId        | String (UUID)  | yes      |            | FK → Scan.id                              |
| name          | String         | yes      |            | Cookie name                               |
| domain        | String         | yes      |            | Cookie domain                             |
| type          | CookieType     | yes      |            | Cookie category (heuristic)               |
| origin        | CookieOrigin   | yes      |            | First-party or third-party                |
| duration      | CookieDuration | yes      |            | Session or persistent                     |
| loadedBeforeConsent | Boolean  | yes      | false      | Was loaded before consent mechanism?      |
| source        | String         | yes      |            | Where it was detected (header, script)    |
| description   | String         | no       | null       | Known purpose description                 |
| createdAt     | DateTime       | yes      | now()      | Record creation timestamp                 |

### FormRecord

| Field         | Type           | Required | Default    | Description                               |
|---------------|----------------|----------|------------|-------------------------------------------|
| id            | String (UUID)  | yes      | generated  | Primary key                               |
| scanId        | String (UUID)  | yes      |            | FK → Scan.id                              |
| pageUrl       | String         | yes      |            | Page where form was found                 |
| action        | String         | no       | null       | Form action/target                        |
| method        | String         | no       | "GET"      | Form method (GET, POST)                   |
| fields        | String         | yes      |            | JSON array of detected fields             |
| sensitiveFields | String       | no       | "[]"       | JSON array of fields flagged as sensitive |
| excessiveFields  | String     | no       | "[]"       | JSON array of potentially excessive fields|
| hasSecureAction  | Boolean    | yes      | false      | Whether form submits via HTTPS            |
| privacyNotice | Boolean        | yes      | false      | Whether form has nearby privacy notice    |
| createdAt     | DateTime       | yes      | now()      | Record creation timestamp                 |

**Field JSON structure**:
```json
[
  {
    "name": "email",
    "type": "email",
    "label": "E-mail",
    "isPersonalData": true,
    "isSensitive": false,
    "isRequired": true
  }
]
```

## Prisma Schema Design Notes

- **Provider**: SQLite for prototype, PostgreSQL-compatible schema
- **ID strategy**: `@id @default(uuid())` for all entities
- **Relations**: Explicit `@relation` with `onDelete: Cascade` for Scan → ScanResult → Finding → Recommendation
- **JSON fields**: Stored as `String` in SQLite with JSON.parse/JSON.stringify in application layer, or use native `Json` type if using PostgreSQL
- **Seed data**: 33 Criterion records and 10+ GlossaryTerm records loaded via `prisma/seed.ts`
