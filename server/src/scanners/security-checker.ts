import type { ScanCategory } from '@prisma/client';
import getPrisma from '../config/database.js';

export interface SecurityAnalysis {
  category: ScanCategory;
  criteriaResults: CriterionResult[];
  summary: string;
}

interface CriterionResult {
  criterionCode: string;
  criterionName: string;
  status: 'FOUND' | 'PARTIAL' | 'ABSENT';
  score: number;
  maxScore: number;
  evidence: string | null;
  explanation: string;
  lgpdReference: string;
  recommendation?: {
    title: string;
    description: string;
    priority: 'HIGH' | 'MEDIUM' | 'LOW';
    howToImprove: string;
  };
}

const category: ScanCategory = 'SECURITY';

export async function analyzeSecurity(
  isHttps: boolean,
  htmlContent: string,
  baseUrl: string,
  forms: Array<{ pageUrl: string; action?: string; hasSecureAction: boolean }>,
  scripts: Array<{ src: string; isExternal: boolean }>
): Promise<SecurityAnalysis> {
  const prisma = getPrisma();
  const criteria = await prisma.criterion.findMany({
    where: { category },
    orderBy: { code: 'asc' },
  });

  const allFormsSecure = forms.length === 0 || forms.every((f) => f.hasSecureAction);
  const hasExposedData = detectExposedSensitiveData(htmlContent);
  const externalScripts = scripts.filter((s) => s.isExternal);

  const results: CriterionResult[] = [];

  for (const criterion of criteria) {
    let status: 'FOUND' | 'PARTIAL' | 'ABSENT' = 'ABSENT';
    let score = 0;
    let evidence: string | null = null;

    switch (criterion.code) {
      case 'C28':
        status = isHttps ? 'FOUND' : 'ABSENT';
        score = isHttps ? criterion.weight : 0;
        evidence = isHttps
          ? 'Site utiliza HTTPS com certificado SSL/TLS ativo.'
          : 'Site NAO utiliza HTTPS. Isso representa risco elevado de interceptacao de dados.';
        break;

      case 'C29':
        if (forms.length === 0) {
          status = 'FOUND';
          score = criterion.weight;
          evidence = 'Nenhum formulario encontrado na pagina.';
        } else if (allFormsSecure) {
          status = 'FOUND';
          score = criterion.weight;
          evidence = 'Todos os formularios estao em paginas seguras (HTTPS).';
        } else {
          status = 'ABSENT';
          score = 0;
          const insecureForms = forms.filter((f) => !f.hasSecureAction);
          evidence = `${insecureForms.length} formulario(s) em paginas nao seguras.`;
        }
        break;

      case 'C30':
        status = hasExposedData ? 'ABSENT' : 'FOUND';
        score = hasExposedData ? 0 : criterion.weight;
        evidence = hasExposedData
          ? 'Possiveis dados sensiveis expostos no codigo-fonte ou conteudo publico detectados.'
          : 'Nao foram detectados dados sensiveis expostos no codigo-fonte.';
        break;

      case 'C31':
        if (externalScripts.length === 0) {
          status = 'FOUND';
          score = criterion.weight;
          evidence = 'Nenhum script externo de terceiros detectado.';
        } else {
          status = 'ABSENT';
          score = 0;
          evidence = `${externalScripts.length} script(s) externo(s) detectado(s): ${externalScripts.map((s) => s.src).join(', ')}`;
        }
        break;

      default:
        status = 'ABSENT';
        score = 0;
    }

    const recommendation = status !== 'FOUND' ? {
      title: criterion.name,
      description: criterion.description,
      priority: mapRiskToPriority(criterion.riskIfAbsent),
      howToImprove: criterion.improvementSuggestion,
    } : undefined;

    results.push({
      criterionCode: criterion.code,
      criterionName: criterion.name,
      status,
      score: Math.round(score * 100) / 100,
      maxScore: criterion.weight,
      evidence,
      explanation: criterion.educationalExplanation,
      lgpdReference: getLgpdReference(criterion.code),
      recommendation,
    });
  }

  const foundCount = results.filter((r) => r.status === 'FOUND').length;
  const summary = `Seguranca analisada: HTTPS ${isHttps ? 'ativo' : 'ausente'}. ${foundCount} criterios atendidos. ${externalScripts.length} scripts externos detectados.`;

  return {
    category,
    criteriaResults: results,
    summary,
  };
}

function detectExposedSensitiveData(html: string): boolean {
  const lowerHtml = html.toLowerCase();
  const sensitivePatterns = [
    /cpf\s*[:=]\s*\d{3}\.\d{3}\.\d{3}-\d{2}/,
    /cnpj\s*[:=]\s*\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}/,
    /senha\s*[:=]\s*['"]?\w+['"]?/i,
    /password\s*[:=]\s*['"]?\w+['"]?/i,
    /token\s*[:=]\s*['"]?[\w-]+['"]?/i,
    /api[_-]?key\s*[:=]\s*['"]?[\w-]+['"]?/i,
    /secret\s*[:=]\s*['"]?[\w-]+['"]?/i,
  ];

  return sensitivePatterns.some((pattern) => pattern.test(lowerHtml));
}

function mapRiskToPriority(risk: string): 'HIGH' | 'MEDIUM' | 'LOW' {
  if (risk === 'HIGH') return 'HIGH';
  if (risk === 'MEDIUM') return 'MEDIUM';
  return 'LOW';
}

function getLgpdReference(code: string): string {
  const refs: Record<string, string> = {
    'C28': 'Art. 46, LGPD (Seguranca)',
    'C29': 'Art. 46, LGPD (Seguranca na Transmissao)',
    'C30': 'Art. 46, LGPD (Protecao de Dados)',
    'C31': 'Art. 46, LGPD (Conhecimento de Terceiros)',
  };
  return refs[code] || 'LGPD';
}
