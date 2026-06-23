# API Contract: Scanner LGPD Educacional

**Version**: 1.0.0
**Base URL**: `/api`
**Content-Type**: `application/json`

## Common Error Responses

All endpoints may return:

| Status | Body                                      | Condition              |
|--------|-------------------------------------------|------------------------|
| 400    | `{ "error": "string" }`                   | Validation error       |
| 404    | `{ "error": "Recurso não encontrado" }`   | Resource not found     |
| 429    | `{ "error": "Limite de requisições excedido" }` | Rate limit exceeded |
| 500    | `{ "error": "Erro interno do servidor" }` | Internal server error  |

---

## POST /scans

Start a new site analysis.

**Request**:
```json
{
  "url": "https://exemplo.com.br"
}
```

**Validation** (Zod):
- `url`: required, must be valid HTTP/HTTPS URL, max 2048 chars

**Response** `202 Accepted`:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "url": "https://exemplo.com.br",
  "status": "pending",
  "score": null,
  "riskLevel": null,
  "createdAt": "2026-06-22T10:00:00.000Z"
}
```

**Errors**:
- `400`: `{ "error": "URL inválida" }` — malformed URL
- `400`: `{ "error": "URL é obrigatória" }` — missing URL

---

## GET /scans/:id

Get scan status and basic data.

**Response** `200 OK`:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "url": "https://exemplo.com.br",
  "status": "completed",
  "score": 65.5,
  "riskLevel": "medium",
  "startedAt": "2026-06-22T10:00:01.000Z",
  "completedAt": "2026-06-22T10:00:45.000Z",
  "errorMessage": null,
  "createdAt": "2026-06-22T10:00:00.000Z"
}
```

**Errors**:
- `404`: `{ "error": "Análise não encontrada" }`

---

## GET /scans/:id/report

Get full analysis report with findings and recommendations.

**Response** `200 OK`:
```json
{
  "scan": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "url": "https://exemplo.com.br",
    "score": 65.5,
    "riskLevel": "medium",
    "completedAt": "2026-06-22T10:00:45.000Z"
  },
  "categories": [
    {
      "category": "privacy_policy",
      "label": "Política de Privacidade",
      "score": 18.75,
      "maxScore": 30,
      "percentage": 62.5,
      "summary": "Política encontrada mas incompleta. Faltam: finalidade, armazenamento, controlador.",
      "findings": [
        {
          "id": "...",
          "criterionCode": "C01",
          "criterionName": "Existência de política de privacidade",
          "status": "found",
          "score": 3.75,
          "maxScore": 3.75,
          "evidence": "Link encontrado no rodapé: '/politica-de-privacidade'",
          "explanation": "A LGPD exige transparência no tratamento de dados...",
          "lgpdReference": "Art. 6º, VI, LGPD (Transparência)",
          "recommendations": []
        },
        {
          "id": "...",
          "criterionCode": "C03",
          "criterionName": "Menção à finalidade",
          "status": "absent",
          "score": 0,
          "maxScore": 3.75,
          "evidence": null,
          "explanation": "O princípio da finalidade (Art. 6º, I, LGPD) determina que...",
          "lgpdReference": "Art. 6º, I, LGPD (Finalidade)",
          "recommendations": [
            {
              "id": "...",
              "title": "Descrever finalidades específicas",
              "priority": "high",
              "description": "A política não especifica para quais finalidades os dados são coletados.",
              "howToImprove": "Listar cada tipo de dado coletado com sua respectiva finalidade de forma clara e específica."
            }
          ]
        }
      ]
    }
  ],
  "cookies": [
    {
      "id": "...",
      "name": "_ga",
      "domain": ".exemplo.com.br",
      "type": "analytics",
      "origin": "first_party",
      "duration": "persistent",
      "loadedBeforeConsent": true,
      "description": "Google Analytics - tracking cookie"
    }
  ],
  "forms": [
    {
      "id": "...",
      "pageUrl": "https://exemplo.com.br/contato",
      "fields": [
        { "name": "nome", "type": "text", "label": "Nome", "isPersonalData": true, "isSensitive": false, "isRequired": true },
        { "name": "email", "type": "email", "label": "E-mail", "isPersonalData": true, "isSensitive": false, "isRequired": true },
        { "name": "cpf", "type": "text", "label": "CPF", "isPersonalData": true, "isSensitive": false, "isRequired": false }
      ],
      "sensitiveFields": [],
      "excessiveFields": ["cpf"],
      "hasSecureAction": true,
      "privacyNotice": false
    }
  ],
  "legalDisclaimer": "Esta análise tem caráter exclusivamente educativo e não constitui parecer jurídico..."
}
```

**Errors**:
- `404`: `{ "error": "Relatório não encontrado" }`
- `409`: `{ "error": "Análise ainda em andamento" }` — status is not COMPLETED

---

## GET /scans

List scan history with pagination.

**Query Parameters**:

| Param | Type   | Default     | Values                     |
|-------|--------|-------------|----------------------------|
| page  | number | 1           | >= 1                       |
| limit | number | 20          | 1-100                      |
| sort  | string | "createdAt" | "createdAt", "score", "url" |
| order | string | "desc"      | "asc", "desc"               |

**Response** `200 OK`:
```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "url": "https://exemplo.com.br",
      "status": "completed",
      "score": 65.5,
      "riskLevel": "medium",
      "createdAt": "2026-06-22T10:00:00.000Z"
    }
  ],
  "total": 42,
  "page": 1,
  "limit": 20,
  "totalPages": 3
}
```

---

## GET /criteria

List analysis criteria, optionally filtered by category.

**Query Parameters**:

| Param    | Type   | Default | Values (ScanCategory)                          |
|----------|--------|---------|------------------------------------------------|
| category | string | (all)   | "privacy_policy", "cookies", "forms", "rights", "controller", "security", "language" |

**Response** `200 OK`:
```json
[
  {
    "id": "...",
    "code": "C01",
    "category": "privacy_policy",
    "name": "Existência de política de privacidade",
    "description": "Verificar se o site possui política ou aviso de privacidade.",
    "riskIfAbsent": "high",
    "weight": 3.75
  }
]
```

---

## GET /glossary

List glossary terms, optionally filtered by search.

**Query Parameters**:

| Param  | Type   | Default | Description                  |
|--------|--------|---------|------------------------------|
| search | string | (none)  | Case-insensitive term search |

**Response** `200 OK`:
```json
[
  {
    "id": "...",
    "term": "Titular",
    "definition": "Pessoa natural a quem se referem os dados pessoais que são objeto de tratamento.",
    "lgpdArticle": "Art. 5º, V",
    "relatedTerms": ["Dado pessoal", "Controlador", "Tratamento"]
  }
]
```

---

## GET /scans/:id/export

Export scan report.

**Query Parameters**:

| Param  | Type   | Default | Values     |
|--------|--------|---------|------------|
| format | string | "json"  | "json", "pdf" |

**Response** `200 OK`:
- `Content-Type`: `application/json` or `application/pdf`
- `Content-Disposition`: `attachment; filename="relatorio-lgpd-<id>.json"`

**Errors**:
- `404`: `{ "error": "Análise não encontrada" }`
- `409`: `{ "error": "Análise ainda em andamento" }`
- `400`: `{ "error": "Formato não suportado" }` — format not in ["json", "pdf"]
