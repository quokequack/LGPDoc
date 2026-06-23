-- CreateTable
CREATE TABLE "Scan" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "score" REAL,
    "riskLevel" TEXT,
    "startedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" DATETIME,
    "errorMessage" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "ScanResult" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "scanId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "score" REAL NOT NULL,
    "maxScore" REAL NOT NULL,
    "summary" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ScanResult_scanId_fkey" FOREIGN KEY ("scanId") REFERENCES "Scan" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Finding" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "scanResultId" TEXT NOT NULL,
    "criterionId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "score" REAL NOT NULL,
    "evidence" TEXT,
    "explanation" TEXT NOT NULL,
    "lgpdReference" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Finding_scanResultId_fkey" FOREIGN KEY ("scanResultId") REFERENCES "ScanResult" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Finding_criterionId_fkey" FOREIGN KEY ("criterionId") REFERENCES "Criterion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Recommendation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "findingId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "howToImprove" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Recommendation_findingId_fkey" FOREIGN KEY ("findingId") REFERENCES "Finding" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Criterion" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "expectedEvidence" TEXT NOT NULL,
    "riskIfAbsent" TEXT NOT NULL,
    "educationalExplanation" TEXT NOT NULL,
    "improvementSuggestion" TEXT NOT NULL,
    "weight" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "GlossaryTerm" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "term" TEXT NOT NULL,
    "definition" TEXT NOT NULL,
    "lgpdArticle" TEXT,
    "relatedTerms" TEXT NOT NULL DEFAULT '[]',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "CookieRecord" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "scanId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "loadedBeforeConsent" BOOLEAN NOT NULL DEFAULT false,
    "source" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "CookieRecord_scanId_fkey" FOREIGN KEY ("scanId") REFERENCES "Scan" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FormRecord" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "scanId" TEXT NOT NULL,
    "pageUrl" TEXT NOT NULL,
    "action" TEXT,
    "method" TEXT NOT NULL DEFAULT 'GET',
    "fields" TEXT NOT NULL,
    "sensitiveFields" TEXT NOT NULL DEFAULT '[]',
    "excessiveFields" TEXT NOT NULL DEFAULT '[]',
    "hasSecureAction" BOOLEAN NOT NULL DEFAULT false,
    "privacyNotice" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "FormRecord_scanId_fkey" FOREIGN KEY ("scanId") REFERENCES "Scan" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "ScanResult_scanId_category_key" ON "ScanResult"("scanId", "category");

-- CreateIndex
CREATE UNIQUE INDEX "Criterion_code_key" ON "Criterion"("code");

-- CreateIndex
CREATE UNIQUE INDEX "GlossaryTerm_term_key" ON "GlossaryTerm"("term");
