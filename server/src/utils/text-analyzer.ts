export interface KeywordResult {
  found: boolean;
  partial: boolean;
  matches: string[];
  context: string[];
}

export function matchKeywords(text: string, keywords: string[]): KeywordResult {
  const lowerText = text.toLowerCase();
  const matches: string[] = [];
  const context: string[] = [];

  for (const keyword of keywords) {
    const lowerKeyword = keyword.toLowerCase();
    if (lowerText.includes(lowerKeyword)) {
      matches.push(keyword);
      const idx = lowerText.indexOf(lowerKeyword);
      const start = Math.max(0, idx - 60);
      const end = Math.min(lowerText.length, idx + lowerKeyword.length + 60);
      context.push(text.slice(start, end).trim());
    }
  }

  const found = matches.length >= keywords.length * 0.7;
  const partial = matches.length > 0 && matches.length < keywords.length * 0.7;

  return { found, partial, matches, context };
}

export function matchRegexPatterns(text: string, patterns: RegExp[]): KeywordResult {
  const matches: string[] = [];
  const context: string[] = [];

  for (const pattern of patterns) {
    const match = pattern.exec(text);
    if (match) {
      matches.push(match[0]);
      const idx = match.index || 0;
      const start = Math.max(0, idx - 40);
      const end = Math.min(text.length, idx + match[0].length + 40);
      context.push(text.slice(start, end).trim());
    }
  }

  const found = matches.length >= patterns.length * 0.7;
  const partial = matches.length > 0 && matches.length < patterns.length * 0.7;

  return { found, partial, matches, context };
}

export const LGPD_KEYWORDS = {
  dataCollected: ['dados coletados', 'coletamos', 'dados pessoais coletados', 'informacoes coletadas', 'dados que coletamos', 'tipos de dados'],
  purpose: ['finalidade', 'para que', 'utilizamos', 'usamos seus dados para', 'tratamento de dados', 'uso de dados'],
  retention: ['armazenamento', 'retencao', 'prazo', 'conservacao', 'periodo de armazenamento', 'manteremos seus dados', 'por quanto tempo'],
  sharing: ['compartilhamento', 'terceiros', 'compartilhamos', 'parceiros', 'divulgacao', 'transferencia'],
  legalBasis: ['base legal', 'fundamento legal', 'hipotese legal', 'consentimento', 'legitimo interesse', 'obrigacao legal', 'execucao de contrato', 'art. 7'],
  controller: ['controlador', 'responsavel', 'razao social', 'cnpj', 'empresa responsavel', 'quem somos'],
  contact: ['contato', 'encarregado', 'dpo', 'e-mail', '@', 'privacidade@', 'lgpd@', 'duvidas'],
  rights: {
    access: ['acesso aos dados', 'confirmacao de tratamento', 'acesso as informacoes', 'consultar dados'],
    correction: ['correcao', 'retificacao', 'dados incorretos', 'atualizacao de dados', 'incompletos'],
    deletion: ['exclusao', 'eliminacao', 'apagar dados', 'remover dados', 'cancelamento'],
    portability: ['portabilidade', 'transferencia de dados', 'migracao de dados'],
    revocation: ['revogacao', 'revogar consentimento', 'retirar consentimento', 'cancelar consentimento'],
    sharingInfo: ['informacao sobre compartilhamento', 'quem recebe', 'com quem compartilhamos', 'entidades'],
  },
};

export const VAGUE_PHRASES = [
  'melhorar sua experiencia',
  'melhorar nossos servicos',
  'fins comerciais',
  'parceiros de negocios',
  'conforme necessario',
  'podemos coletar',
  'entre outros',
  'e outros',
  'etc',
  'dados para fins de',
  'informacoes adicionais',
  'quando necessario',
  'a criterio',
  'eventualmente',
];

export const SENSITIVE_FIELD_PATTERNS = [
  { pattern: /saude|health|medic/i, label: 'Dados de saude' },
  { pattern: /religiao|religion|crenca/i, label: 'Dados de religiao/crenca' },
  { pattern: /politic|partido|filiacao/i, label: 'Dados de opiniao/filiacao politica' },
  { pattern: /biometri|digital|facial|iris/i, label: 'Dados biometricos' },
  { pattern: /raca|etnia|cor|origem.racial/i, label: 'Dados de raca/etnia' },
];

export const PERSONAL_DATA_PATTERNS = [
  { pattern: /nome|name|fullname/i, label: 'Nome' },
  { pattern: /e-?mail|email/i, label: 'E-mail' },
  { pattern: /telefone|phone|celular|tel/i, label: 'Telefone' },
  { pattern: /cpf/i, label: 'CPF' },
  { pattern: /cnpj/i, label: 'CNPJ' },
  { pattern: /endereco|address|rua|cep/i, label: 'Endereco' },
  { pattern: /rg|identidade|documento/i, label: 'Documento de identidade' },
  { pattern: /data.*nasc|nascimento|birth/i, label: 'Data de nascimento' },
  { pattern: /genero|sexo/i, label: 'Genero/Sexo' },
  { pattern: /nacionalidade/i, label: 'Nacionalidade' },
];

export function classifyPersonalDataField(name: string, type: string, label: string): {
  isPersonalData: boolean;
  isSensitive: boolean;
  personalDataType: string | null;
  sensitiveType: string | null;
} {
  const combined = `${name} ${type} ${label}`.toLowerCase();
  let isPersonalData = false;
  let isSensitive = false;
  let personalDataType: string | null = null;
  let sensitiveType: string | null = null;

  for (const pd of PERSONAL_DATA_PATTERNS) {
    if (pd.pattern.test(combined)) {
      isPersonalData = true;
      personalDataType = pd.label;
      break;
    }
  }

  for (const sd of SENSITIVE_FIELD_PATTERNS) {
    if (sd.pattern.test(combined)) {
      isSensitive = true;
      sensitiveType = sd.label;
      break;
    }
  }

  return { isPersonalData, isSensitive, personalDataType, sensitiveType };
}

export function detectVagueLanguage(text: string): { count: number; phrases: string[]; contexts: string[] } {
  const lowerText = text.toLowerCase();
  const found: string[] = [];
  const contexts: string[] = [];

  for (const phrase of VAGUE_PHRASES) {
    if (lowerText.includes(phrase)) {
      found.push(phrase);
      const idx = lowerText.indexOf(phrase);
      const start = Math.max(0, idx - 50);
      const end = Math.min(lowerText.length, idx + phrase.length + 50);
      contexts.push(text.slice(start, end).trim());
    }
  }

  return { count: found.length, phrases: found, contexts };
}

export function extractEmailAddresses(text: string): string[] {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  return [...new Set(text.match(emailRegex) || [])];
}

export function extractCNPJ(text: string): string[] {
  const cnpjRegex = /\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}/g;
  return [...new Set(text.match(cnpjRegex) || [])];
}

export function assessTextComplexity(text: string): { wordCount: number; avgSentenceLength: number; complexity: 'simple' | 'moderate' | 'complex' } {
  const words = text.split(/\s+/).filter(w => w.length > 0);
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const avgSentenceLength = sentences.length > 0 ? words.length / sentences.length : 0;

  let complexity: 'simple' | 'moderate' | 'complex';
  if (avgSentenceLength <= 20) {
    complexity = 'simple';
  } else if (avgSentenceLength <= 35) {
    complexity = 'moderate';
  } else {
    complexity = 'complex';
  }

  return { wordCount: words.length, avgSentenceLength: Math.round(avgSentenceLength * 10) / 10, complexity };
}
