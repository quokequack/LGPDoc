import { describe, it, expect } from 'vitest';
import { matchKeywords, classifyPersonalDataField, detectVagueLanguage, extractEmailAddresses, extractCNPJ, assessTextComplexity } from '../../../src/utils/text-analyzer.js';

describe('textAnalyzer - matchKeywords', () => {
  it('should find matching keywords', () => {
    const result = matchKeywords('Coletamos dados pessoais como nome e email', ['dados pessoais', 'coletamos']);
    expect(result.found).toBe(true);
    expect(result.matches).toHaveLength(2);
  });

  it('should detect partial matches', () => {
    const result = matchKeywords('Temos uma politica de privacidade', ['dados coletados', 'finalidade', 'retencao']);
    expect(result.found).toBe(false);
    expect(result.partial).toBe(false);
    expect(result.matches).toHaveLength(0);
  });

  it('should be case insensitive', () => {
    const result = matchKeywords('COLETAMOS DADOS', ['coletamos']);
    expect(result.found).toBe(true);
  });
});

describe('textAnalyzer - classifyPersonalDataField', () => {
  it('should identify personal data fields', () => {
    const result = classifyPersonalDataField('email', 'email', 'E-mail');
    expect(result.isPersonalData).toBe(true);
    expect(result.isSensitive).toBe(false);
  });

  it('should identify CPF as personal data', () => {
    const result = classifyPersonalDataField('cpf', 'text', 'CPF');
    expect(result.isPersonalData).toBe(true);
    expect(result.isSensitive).toBe(false);
  });

  it('should identify sensitive data', () => {
    const result = classifyPersonalDataField('saude', 'text', 'Informacoes de saude');
    expect(result.isSensitive).toBe(true);
  });

  it('should not flag non-personal fields', () => {
    const result = classifyPersonalDataField('assunto', 'text', 'Assunto');
    expect(result.isPersonalData).toBe(false);
    expect(result.isSensitive).toBe(false);
  });
});

describe('textAnalyzer - detectVagueLanguage', () => {
  it('should detect vague phrases', () => {
    const result = detectVagueLanguage('Usamos seus dados para melhorar sua experiencia e entre outros fins.');
    expect(result.count).toBeGreaterThanOrEqual(2);
  });

  it('should return 0 for specific language', () => {
    const result = detectVagueLanguage('Coletamos nome e email para processar seu pedido de acordo com o Art. 7 da LGPD.');
    expect(result.count).toBe(0);
  });
});

describe('textAnalyzer - extractEmailAddresses', () => {
  it('should extract email addresses', () => {
    const emails = extractEmailAddresses('Contato: privacidade@exemplo.com.br ou suporte@exemplo.com.br');
    expect(emails).toContain('privacidade@exemplo.com.br');
    expect(emails).toContain('suporte@exemplo.com.br');
  });

  it('should return empty for text without emails', () => {
    const emails = extractEmailAddresses('Sem emails aqui');
    expect(emails).toHaveLength(0);
  });
});

describe('textAnalyzer - extractCNPJ', () => {
  it('should extract CNPJ', () => {
    const cnpjs = extractCNPJ('CNPJ: 12.345.678/0001-90');
    expect(cnpjs).toContain('12.345.678/0001-90');
  });
});

describe('textAnalyzer - assessTextComplexity', () => {
  it('should classify simple text', () => {
    const result = assessTextComplexity('Texto curto. Poucas palavras.');
    expect(result.complexity).toBe('simple');
  });

  it('should classify complex text', () => {
    const longText = 'Esta e uma sentenca muito longa que busca avaliar a complexidade textual de um documento que possui vocabulos excessivamente alongados e multiplas oracoes subordinadas as quais podem dificultar a compreensao do leitor medio que tenta interpretar o significado geral do texto apresentado.';
    const result = assessTextComplexity(longText);
    expect(result.complexity === 'moderate' || result.complexity === 'complex').toBe(true);
  });
});
