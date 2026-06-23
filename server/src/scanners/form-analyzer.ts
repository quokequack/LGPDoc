import { parseHtml, detectForms } from '../utils/html-parser.js';
import { classifyPersonalDataField } from '../utils/text-analyzer.js';
import type { ScanCategory } from '@prisma/client';
import type { CheerioAPI } from 'cheerio';
import getPrisma from '../config/database.js';

export interface FormAnalysis {
  category: ScanCategory;
  criteriaResults: CriterionResult[];
  forms: FormDetection[];
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

export interface FormDetection {
  pageUrl: string;
  action: string | undefined;
  method: string;
  fields: FormField[];
  sensitiveFields: string[];
  excessiveFields: string[];
  hasSecureAction: boolean;
  privacyNotice: boolean;
}

export interface FormField {
  name: string;
  type: string;
  label: string;
  isPersonalData: boolean;
  isSensitive: boolean;
  isRequired: boolean;
}

const category: ScanCategory = 'FORMS';

// Campos que podem ser considerados excessivos para a maioria dos formulários simples
const POTENTIALLY_EXCESSIVE_FIELDS = ['cpf', 'cnpj', 'rg', 'passaporte', 'nacionalidade', 'data_nascimento', 'genero', 'estado_civil', 'profissao', 'renda', 'salario'];

export async function analyzeForms(
  htmlContent: string,
  baseUrl: string
): Promise<FormAnalysis> {
  const prisma = getPrisma();
  const criteria = await prisma.criterion.findMany({
    where: { category },
    orderBy: { code: 'asc' },
  });

  const $ = parseHtml(htmlContent);
  const rawForms = detectForms($);
  const isHttps = baseUrl.startsWith('https://');

  const forms: FormDetection[] = rawForms.map((f) => {
    const classifiedFields: FormField[] = f.fields.map((field) => {
      const classification = classifyPersonalDataField(field.name, field.type, field.label);
      return {
        name: field.name,
        type: field.type,
        label: field.label,
        isPersonalData: classification.isPersonalData,
        isSensitive: classification.isSensitive,
        isRequired: field.required,
      };
    });

    const sensitiveFields = classifiedFields
      .filter((cf) => cf.isSensitive)
      .map((cf) => cf.name || cf.label);

    const excessiveFields = classifiedFields
      .filter((cf) =>
        POTENTIALLY_EXCESSIVE_FIELDS.some(
          (ef) => cf.name.toLowerCase().includes(ef) || cf.label.toLowerCase().includes(ef)
        )
      )
      .map((cf) => cf.name || cf.label);

    const action = f.action || '';
    const hasSecureAction = !action || action.startsWith('https://') || action.startsWith('/');

    // Check for privacy notice near form
    const privacyNotice = checkPrivacyNotice($, htmlContent);

    return {
      pageUrl: baseUrl,
      action: f.action,
      method: f.method,
      fields: classifiedFields,
      sensitiveFields,
      excessiveFields,
      hasSecureAction: isHttps && hasSecureAction,
      privacyNotice,
    };
  });

  const hasForms = forms.length > 0;
  const hasPersonalData = forms.some((f) => f.fields.some((fd) => fd.isPersonalData));
  const hasSensitiveData = forms.some((f) => f.sensitiveFields.length > 0);
  const hasExcessiveData = forms.some((f) => f.excessiveFields.length > 0);
  const allFormsSecure = forms.every((f) => f.hasSecureAction);
  const allHavePrivacyNotice = forms.length > 0 && forms.every((f) => f.privacyNotice);

  const results: CriterionResult[] = [];

  for (const criterion of criteria) {
    let status: 'FOUND' | 'PARTIAL' | 'ABSENT' = 'ABSENT';
    let score = 0;
    let evidence: string | null = null;

    switch (criterion.code) {
      case 'C15':
        if (!hasForms) {
          status = 'FOUND';
          score = criterion.weight;
          evidence = 'Nenhum formulario encontrado na pagina.';
        } else if (hasPersonalData) {
          status = 'FOUND';
          score = criterion.weight;
          const pdFields = forms.flatMap((f) => f.fields.filter((fd) => fd.isPersonalData).map((fd) => fd.label || fd.name));
          evidence = `Formularios com dados pessoais detectados: ${pdFields.join(', ')}`;
        } else {
          status = 'ABSENT';
          score = 0;
          evidence = 'Formularios encontrados, mas sem campos identificados como dados pessoais.';
        }
        break;

      case 'C16':
        if (!hasForms) {
          status = 'FOUND';
          score = criterion.weight;
          evidence = 'Sem formularios na pagina.';
        } else if (!hasExcessiveData) {
          status = 'FOUND';
          score = criterion.weight;
          evidence = 'Nao foram identificados campos excessivos nos formularios.';
        } else {
          status = 'ABSENT';
          score = 0;
          const exFields = forms.flatMap((f) => f.excessiveFields);
          evidence = `Campos potencialmente excessivos: ${exFields.join(', ')}`;
        }
        break;

      case 'C17':
        if (!hasSensitiveData) {
          status = 'FOUND';
          score = criterion.weight;
          evidence = 'Nenhum dado sensivel detectado nos formularios.';
        } else {
          status = 'ABSENT';
          score = 0;
          const sensFields = forms.flatMap((f) => f.sensitiveFields);
          evidence = `Dados sensiveis detectados: ${sensFields.join(', ')}. Atencao redobrada necessaria.`;
        }
        break;

      case 'C18':
        if (!hasForms) {
          status = 'FOUND';
          score = criterion.weight;
          evidence = 'Sem formularios na pagina.';
        } else if (allHavePrivacyNotice) {
          status = 'FOUND';
          score = criterion.weight;
          evidence = 'Aviso de privacidade encontrado proximo aos formularios.';
        } else {
          status = 'ABSENT';
          score = 0;
          evidence = 'Nenhum aviso de privacidade encontrado proximo aos formularios.';
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

  const totalScore = results.reduce((sum, r) => sum + r.score, 0);
  const foundCount = results.filter((r) => r.status === 'FOUND').length;

  const summary = `Formularios analisados: ${forms.length} encontrados. ${foundCount} criterios atendidos.`;

  return {
    category,
    criteriaResults: results,
    forms,
    summary,
  };
}

function checkPrivacyNotice($: CheerioAPI, html: string): boolean {
  const text = html.toLowerCase();
  const privacyPhrases = [
    'seus dados', 'privacidade', 'lgpd', 'protecao de dados',
    'nao compartilhamos', 'politica de privacidade',
  ];
  return privacyPhrases.some((phrase) => text.includes(phrase));
}

function mapRiskToPriority(risk: string): 'HIGH' | 'MEDIUM' | 'LOW' {
  if (risk === 'HIGH') return 'HIGH';
  if (risk === 'MEDIUM') return 'MEDIUM';
  return 'LOW';
}

function getLgpdReference(code: string): string {
  const refs: Record<string, string> = {
    'C15': 'Art. 5, I, LGPD (Dados Pessoais)',
    'C16': 'Art. 6, III, LGPD (Minimizacao)',
    'C17': 'Art. 5, II e Art. 11, LGPD (Dados Sensiveis)',
    'C18': 'Art. 9, LGPD (Transparencia na Coleta)',
  };
  return refs[code] || 'LGPD';
}
