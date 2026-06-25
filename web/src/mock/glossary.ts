import type { GlossaryTerm } from '@/types/glossary.types';

const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: 'g-01', term: 'Titular',
    definition: 'Pessoa natural a quem se referem os dados pessoais que sao objeto de tratamento.',
    lgpdArticle: 'Art. 5, V',
    relatedTerms: ['Dado pessoal', 'Controlador', 'Tratamento'],
  },
  {
    id: 'g-02', term: 'Dado pessoal',
    definition: 'Informacao relacionada a pessoa natural identificada ou identificavel.',
    lgpdArticle: 'Art. 5, I',
    relatedTerms: ['Titular', 'Dado sensivel', 'Tratamento'],
  },
  {
    id: 'g-03', term: 'Dado sensivel',
    definition: 'Dado pessoal sobre origem racial ou etnica, conviccao religiosa, opiniao politica, filiacao sindical, saude, vida sexual, genetica ou biometria.',
    lgpdArticle: 'Art. 5, II',
    relatedTerms: ['Dado pessoal', 'Consentimento', 'Tratamento'],
  },
  {
    id: 'g-04', term: 'Tratamento',
    definition: 'Toda operacao realizada com dados pessoais: coleta, producao, recepcao, classificacao, utilizacao, acesso, reproducao, transmissao, distribuicao, processamento, arquivamento, armazenamento, eliminacao, avaliacao ou controle.',
    lgpdArticle: 'Art. 5, X',
    relatedTerms: ['Dado pessoal', 'Controlador', 'Operador'],
  },
  {
    id: 'g-05', term: 'Controlador',
    definition: 'Pessoa natural ou juridica, de direito publico ou privado, a quem competem as decisoes referentes ao tratamento de dados pessoais.',
    lgpdArticle: 'Art. 5, VI',
    relatedTerms: ['Operador', 'Encarregado', 'Tratamento'],
  },
  {
    id: 'g-06', term: 'Operador',
    definition: 'Pessoa natural ou juridica que realiza o tratamento de dados pessoais em nome do controlador.',
    lgpdArticle: 'Art. 5, VII',
    relatedTerms: ['Controlador', 'Tratamento', 'Encarregado'],
  },
  {
    id: 'g-07', term: 'Encarregado (DPO)',
    definition: 'Pessoa indicada pelo controlador para atuar como canal de comunicacao entre o controlador, os titulares e a ANPD.',
    lgpdArticle: 'Art. 5, VIII',
    relatedTerms: ['Controlador', 'Operador', 'ANPD'],
  },
  {
    id: 'g-08', term: 'Consentimento',
    definition: 'Manifestacao livre, informada e inequivoca pela qual o titular concorda com o tratamento de seus dados pessoais para uma finalidade determinada.',
    lgpdArticle: 'Art. 5, XII',
    relatedTerms: ['Titular', 'Tratamento', 'Finalidade'],
  },
  {
    id: 'g-09', term: 'Finalidade',
    definition: 'Proposito legitimo, especifico, explicito e informado ao titular para o qual os dados pessoais serao tratados.',
    lgpdArticle: 'Art. 6, I',
    relatedTerms: ['Tratamento', 'Consentimento', 'Necessidade'],
  },
  {
    id: 'g-10', term: 'Necessidade',
    definition: 'Limitacao do tratamento ao minimo necessario para a realizacao de suas finalidades, com abrangencia dos dados pertinentes, proporcionais e nao excessivos.',
    lgpdArticle: 'Art. 6, III',
    relatedTerms: ['Finalidade', 'Tratamento', 'Minimizacao'],
  },
  {
    id: 'g-11', term: 'ANPD',
    definition: 'Autoridade Nacional de Protecao de Dados, orgao responsavel por zelar, implementar e fiscalizar o cumprimento da LGPD.',
    lgpdArticle: 'Art. 5, XIX',
    relatedTerms: ['LGPD', 'Sancao', 'Encarregado'],
  },
  {
    id: 'g-12', term: 'LGPD',
    definition: 'Lei Geral de Protecao de Dados Pessoais (Lei no 13.709/2018) que regula o tratamento de dados pessoais no Brasil.',
    lgpdArticle: 'Art. 1',
    relatedTerms: ['ANPD', 'Dado pessoal', 'Tratamento'],
  },
  {
    id: 'g-13', term: 'Bases legais',
    definition: 'Hipoteses que autorizam o tratamento de dados: consentimento, execucao de contrato, obrigacao legal, legitimo interesse, entre outras.',
    lgpdArticle: 'Art. 7',
    relatedTerms: ['Consentimento', 'Tratamento', 'Legitimo interesse'],
  },
  {
    id: 'g-14', term: 'Cookie',
    definition: 'Pequeno arquivo armazenado no navegador que permite a um site lembrar informacoes sobre a visita ou preferencias.',
    lgpdArticle: null,
    relatedTerms: ['Consentimento', 'Dado pessoal', 'Banner'],
  },
  {
    id: 'g-15', term: 'Relatorio de impacto',
    definition: 'Documentacao do controlador com a descricao dos processos de tratamento que podem gerar riscos as liberdades civis e aos direitos fundamentais.',
    lgpdArticle: 'Art. 5, XVII',
    relatedTerms: ['Controlador', 'Tratamento', 'Risco'],
  },
];

export function getMockGlossaryTerms(): GlossaryTerm[] {
  return GLOSSARY_TERMS;
}

export function searchMockGlossary(query: string, delayMs = 300): Promise<GlossaryTerm[]> {
  return new Promise((resolve) => {
    const lower = query.toLowerCase().trim();
    const filtered = lower
      ? GLOSSARY_TERMS.filter((t) => t.term.toLowerCase().includes(lower))
      : GLOSSARY_TERMS;

    setTimeout(() => resolve(filtered), delayMs);
  });
}
