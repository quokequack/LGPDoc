import type { GlossaryTerm } from '@/types/glossary.types';

const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: 'g-01', term: 'Titular',
    definition: 'Pessoa natural a quem se referem os dados pessoais que são objeto de tratamento.',
    lgpdArticle: 'Art. 5, V',
    relatedTerms: ['Dado pessoal', 'Controlador', 'Tratamento'],
  },
  {
    id: 'g-02', term: 'Dado pessoal',
    definition: 'Informação relacionada a pessoa natural identificada ou identificável.',
    lgpdArticle: 'Art. 5, I',
    relatedTerms: ['Titular', 'Dado sensível', 'Tratamento'],
  },
  {
    id: 'g-03', term: 'Dado sensível',
    definition: 'Dado pessoal sobre origem racial ou étnica, convicção religiosa, opinião política, filiação sindical, saúde, vida sexual, genética ou biometria.',
    lgpdArticle: 'Art. 5, II',
    relatedTerms: ['Dado pessoal', 'Consentimento', 'Tratamento'],
  },
  {
    id: 'g-04', term: 'Tratamento',
    definition: 'Toda operação realizada com dados pessoais: coleta, produção, recepção, classificação, utilização, acesso, reprodução, transmissão, distribuição, processamento, arquivamento, armazenamento, eliminação, avaliação ou controle.',
    lgpdArticle: 'Art. 5, X',
    relatedTerms: ['Dado pessoal', 'Controlador', 'Operador'],
  },
  {
    id: 'g-05', term: 'Controlador',
    definition: 'Pessoa natural ou jurídica, de direito público ou privado, a quem competem as decisões referentes ao tratamento de dados pessoais.',
    lgpdArticle: 'Art. 5, VI',
    relatedTerms: ['Operador', 'Encarregado', 'Tratamento'],
  },
  {
    id: 'g-06', term: 'Operador',
    definition: 'Pessoa natural ou jurídica que realiza o tratamento de dados pessoais em nome do controlador.',
    lgpdArticle: 'Art. 5, VII',
    relatedTerms: ['Controlador', 'Tratamento', 'Encarregado'],
  },
  {
    id: 'g-07', term: 'Encarregado (DPO)',
    definition: 'Pessoa indicada pelo controlador para atuar como canal de comunicação entre o controlador, os titulares e a ANPD.',
    lgpdArticle: 'Art. 5, VIII',
    relatedTerms: ['Controlador', 'Operador', 'ANPD'],
  },
  {
    id: 'g-08', term: 'Consentimento',
    definition: 'Manifestação livre, informada e inequívoca pela qual o titular concorda com o tratamento de seus dados pessoais para uma finalidade determinada.',
    lgpdArticle: 'Art. 5, XII',
    relatedTerms: ['Titular', 'Tratamento', 'Finalidade'],
  },
  {
    id: 'g-09', term: 'Finalidade',
    definition: 'Propósito legítimo, específico, explícito e informado ao titular para o qual os dados pessoais serão tratados.',
    lgpdArticle: 'Art. 6, I',
    relatedTerms: ['Tratamento', 'Consentimento', 'Necessidade'],
  },
  {
    id: 'g-10', term: 'Necessidade',
    definition: 'Limitação do tratamento ao mínimo necessário para a realização de suas finalidades, com abrangência dos dados pertinentes, proporcionais e não excessivos.',
    lgpdArticle: 'Art. 6, III',
    relatedTerms: ['Finalidade', 'Tratamento', 'Minimização'],
  },
  {
    id: 'g-11', term: 'ANPD',
    definition: 'Autoridade Nacional de Proteção de Dados, órgão responsável por zelar, implementar e fiscalizar o cumprimento da LGPD.',
    lgpdArticle: 'Art. 5, XIX',
    relatedTerms: ['LGPD', 'Sanção', 'Encarregado'],
  },
  {
    id: 'g-12', term: 'LGPD',
    definition: 'Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018) que regula o tratamento de dados pessoais no Brasil.',
    lgpdArticle: 'Art. 1',
    relatedTerms: ['ANPD', 'Dado pessoal', 'Tratamento'],
  },
  {
    id: 'g-13', term: 'Bases legais',
    definition: 'Hipóteses que autorizam o tratamento de dados: consentimento, execução de contrato, obrigação legal, legítimo interesse, entre outras.',
    lgpdArticle: 'Art. 7',
    relatedTerms: ['Consentimento', 'Tratamento', 'Legítimo interesse'],
  },
  {
    id: 'g-14', term: 'Cookie',
    definition: 'Pequeno arquivo armazenado no navegador que permite a um site lembrar informações sobre a visita ou preferências.',
    lgpdArticle: null,
    relatedTerms: ['Consentimento', 'Dado pessoal', 'Banner'],
  },
  {
    id: 'g-15', term: 'Relatório de impacto',
    definition: 'Documentação do controlador com a descrição dos processos de tratamento que podem gerar riscos às liberdades civis e aos direitos fundamentais.',
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
      ? GLOSSARY_TERMS.filter((t) => {
        const searchable = [
          t.term,
          t.definition,
          t.lgpdArticle || '',
          ...t.relatedTerms,
        ].join(' ').toLowerCase();

        return searchable.includes(lower);
      })
      : GLOSSARY_TERMS;

    setTimeout(() => resolve(filtered), delayMs);
  });
}
