import type { ReportResponse, FindingItem, CookieItem, FormItem, FormField } from '@/types/report.types';
import { DEMO_SCAN_URL, DEMO_SITE_NAME, DEMO_SITE_SUMMARY } from '@/mock/scans';

const FINDING_STATUSES: Array<FindingItem['status']> = ['found', 'partial', 'absent'];

const DEMO_PAGES = [
  `${DEMO_SCAN_URL}/politica-de-privacidade`,
  `${DEMO_SCAN_URL}/agendamento`,
  `${DEMO_SCAN_URL}/area-do-paciente`,
  `${DEMO_SCAN_URL}/newsletter`,
  `${DEMO_SCAN_URL}/contato`,
];

function makeFindings(): FindingItem[] {
  const findings: FindingItem[] = [
    // PRIVACY_POLICY C01-C08
    { id: 'f-01', criterionCode: 'C01', criterionName: 'Existencia de politica de privacidade', status: 'found', score: 3.12, maxScore: 3.12, evidence: 'Politica encontrada em /politica-de-privacidade com data de atualizacao e link no rodape.', explanation: 'A LGPD exige transparencia no tratamento de dados. A ausencia de politica impede que o titular saiba como seus dados sao usados.', lgpdReference: 'Art. 6, VI, LGPD (Transparencia)', recommendations: [] },
    { id: 'f-02', criterionCode: 'C02', criterionName: 'Mencao aos dados coletados', status: 'found', score: 3.12, maxScore: 3.12, evidence: 'Politica lista nome, e-mail, telefone, CPF, data de nascimento, convenio e historico de agendamentos.', explanation: 'O principio da transparencia exige que o titular saiba quais dados sao coletados.', lgpdReference: 'Art. 6, VI, LGPD', recommendations: [] },
    { id: 'f-03', criterionCode: 'C03', criterionName: 'Mencao a finalidade', status: 'found', score: 3.12, maxScore: 3.12, evidence: 'Finalidades descritas para agendamento, lembrete de consulta, faturamento e comunicacao de campanhas preventivas.', explanation: 'O principio da finalidade determina que os dados sejam coletados para propositos legitimos e especificos.', lgpdReference: 'Art. 6, I, LGPD (Finalidade)', recommendations: [] },
    { id: 'f-04', criterionCode: 'C04', criterionName: 'Mencao ao tempo de armazenamento', status: 'partial', score: 1.56, maxScore: 3.12, evidence: 'Mencao generica: "pelo tempo necessario"', explanation: 'O principio da necessidade implica que dados nao devem ser mantidos alem do necessario.', lgpdReference: 'Art. 6, III, LGPD (Necessidade)', recommendations: [{ id: 'r-04', title: 'Especificar prazos de retencao', priority: 'medium', description: 'A politica menciona apenas "pelo tempo necessario" sem especificar prazos.', howToImprove: 'Definir prazos claros de retencao para cada tipo de dado ou os criterios usados para defini-los.' }] },
    { id: 'f-05', criterionCode: 'C05', criterionName: 'Mencao ao compartilhamento', status: 'partial', score: 1.56, maxScore: 3.12, evidence: 'Cita "laboratorios, operadoras e parceiros de tecnologia" sem listar categorias de destinatarios por finalidade.', explanation: 'O titular tem direito de saber com quem seus dados sao compartilhados.', lgpdReference: 'Art. 9, LGPD', recommendations: [{ id: 'r-05', title: 'Detalhar compartilhamento', priority: 'high', description: 'A politica usa categorias amplas para terceiros envolvidos em consultas, exames e infraestrutura.', howToImprove: 'Listar categorias de terceiros e finalidades do compartilhamento, separando assistencia, faturamento, suporte tecnico e marketing.' }] },
    { id: 'f-06', criterionCode: 'C06', criterionName: 'Mencao a bases legais', status: 'partial', score: 1.56, maxScore: 3.12, evidence: 'Menciona consentimento para newsletter, mas nao associa execucao de contrato, tutela da saude e obrigacao legal aos demais fluxos.', explanation: 'Toda operacao de tratamento deve ter uma base legal valida.', lgpdReference: 'Art. 7, LGPD', recommendations: [{ id: 'r-06', title: 'Mapear bases legais por finalidade', priority: 'medium', description: 'Bases legais aparecem de forma incompleta para agendamento, prontuario e cobranca.', howToImprove: 'Criar tabela com finalidade, dados utilizados, base legal, prazo de retencao e destinatarios.' }] },
    { id: 'f-07', criterionCode: 'C07', criterionName: 'Identificacao do controlador', status: 'partial', score: 1.56, maxScore: 3.12, evidence: 'Rodape exibe nome fantasia da clinica, mas a politica nao informa razao social completa nem CNPJ.', explanation: 'O titular precisa saber quem e o responsavel pelo tratamento de seus dados.', lgpdReference: 'Art. 6, VII, LGPD', recommendations: [{ id: 'r-07', title: 'Identificar controlador', priority: 'high', description: 'A politica nao informa a pessoa juridica responsavel pelo portal.', howToImprove: 'Incluir razao social, CNPJ, endereco e canal formal do controlador.' }] },
    { id: 'f-08', criterionCode: 'C08', criterionName: 'Canal de contato / DPO', status: 'partial', score: 1.56, maxScore: 3.12, evidence: 'E-mail atendimento@clinica-horizonte.test aparece no rodape, mas nao ha canal dedicado a privacidade.', explanation: 'A LGPD garante ao titular o direito de obter informacoes.', lgpdReference: 'Art. 9, LGPD', recommendations: [{ id: 'r-08', title: 'Criar canal dedicado', priority: 'medium', description: 'Canal atual mistura atendimento clinico, agenda e privacidade.', howToImprove: 'Criar privacidade@clinica-horizonte.test e indicar encarregado ou area responsavel.' }] },

    // COOKIES C09-C14
    { id: 'f-09', criterionCode: 'C09', criterionName: 'Existencia de banner de cookies', status: 'found', score: 4.17, maxScore: 4.17, evidence: 'Banner detectado com informacao sobre cookies', explanation: 'Cookies nao essenciais exigem consentimento previo.', lgpdReference: 'Art. 7, LGPD', recommendations: [] },
    { id: 'f-10', criterionCode: 'C10', criterionName: 'Botao de aceitar cookies', status: 'found', score: 4.17, maxScore: 4.17, evidence: 'Botao "Aceitar todos" presente', explanation: 'O consentimento deve ser livre, informado e inequivoco.', lgpdReference: 'Art. 8, LGPD', recommendations: [] },
    { id: 'f-11', criterionCode: 'C11', criterionName: 'Botao de recusar cookies', status: 'absent', score: 0, maxScore: 4.17, evidence: null, explanation: 'Recusar deve ser tao facil quanto aceitar.', lgpdReference: 'Art. 8, par. 5, LGPD', recommendations: [{ id: 'r-11', title: 'Adicionar botao de recusar', priority: 'high', description: 'Banner possui apenas botao de aceitar.', howToImprove: 'Incluir botao "Recusar cookies nao essenciais" visivel e acessivel.' }] },
    { id: 'f-12', criterionCode: 'C12', criterionName: 'Gerenciar preferencias', status: 'absent', score: 0, maxScore: 4.17, evidence: null, explanation: 'O titular deve poder escolher categorias.', lgpdReference: 'Art. 8, LGPD', recommendations: [{ id: 'r-12', title: 'Oferecer painel de preferencias', priority: 'medium', description: 'Sem opcao de gerenciar preferencias.', howToImprove: 'Implementar painel com categorias de cookies separadas.' }] },
    { id: 'f-13', criterionCode: 'C13', criterionName: 'Link para politica de cookies', status: 'found', score: 4.17, maxScore: 4.17, evidence: 'Link para /politica-de-privacidade no banner', explanation: 'O titular deve ter acesso facil a informacoes completas.', lgpdReference: 'Art. 9, LGPD', recommendations: [] },
    { id: 'f-14', criterionCode: 'C14', criterionName: 'Cookies nao necessarios antes de consentimento', status: 'absent', score: 0, maxScore: 4.15, evidence: '_ga, _fbp e hzt_adsid carregam antes de qualquer escolha no banner.', explanation: 'Carregar cookies nao essenciais antes do consentimento viola o principio do consentimento previo.', lgpdReference: 'Art. 7, LGPD', recommendations: [{ id: 'r-14', title: 'Bloquear cookies antes do consentimento', priority: 'high', description: 'Cookies de analytics e marketing carregam antes do aceite.', howToImprove: 'Configurar GTM e scripts para carregar apenas apos consentimento.' }] },

    // FORMS C15-C18
    { id: 'f-15', criterionCode: 'C15', criterionName: 'Identificacao de campos de dados pessoais', status: 'found', score: 3.75, maxScore: 3.75, evidence: 'Formulario de agendamento coleta nome, CPF, telefone, e-mail, convenio e especialidade desejada.', explanation: 'Identificacao de dados pessoais coletados.', lgpdReference: 'Art. 5, I, LGPD', recommendations: [] },
    { id: 'f-16', criterionCode: 'C16', criterionName: 'Minimizacao de dados', status: 'partial', score: 1.88, maxScore: 3.75, evidence: 'Formulario de newsletter solicita data de nascimento e telefone, embora a finalidade declarada seja envio de conteudo preventivo.', explanation: 'O principio da necessidade limita a coleta ao minimo necessario.', lgpdReference: 'Art. 6, III, LGPD', recommendations: [{ id: 'r-16', title: 'Reduzir campos por finalidade', priority: 'medium', description: 'Campos extras aparecem em fluxos de baixa necessidade.', howToImprove: 'Manter apenas e-mail e consentimento na newsletter; solicitar dados adicionais somente quando indispensaveis ao atendimento.' }] },
    { id: 'f-17', criterionCode: 'C17', criterionName: 'Deteccao de dados sensiveis', status: 'partial', score: 1.88, maxScore: 3.75, evidence: 'Campo "descreva seu sintoma" aparece no pre-agendamento sem aviso destacado sobre dado sensivel.', explanation: 'Dados sensiveis merecem protecao especial.', lgpdReference: 'Art. 5, II e Art. 11, LGPD', recommendations: [{ id: 'r-17', title: 'Tratar dados de saude como sensiveis', priority: 'high', description: 'O formulario pode receber informacoes sobre saude antes de contextualizar o titular.', howToImprove: 'Adicionar aviso especifico, restringir campo livre e explicar base legal e finalidade do tratamento.' }] },
    { id: 'f-18', criterionCode: 'C18', criterionName: 'Aviso de privacidade no formulario', status: 'absent', score: 0, maxScore: 3.75, evidence: 'Botoes "Solicitar consulta" e "Entrar na newsletter" nao exibem aviso curto de privacidade.', explanation: 'O titular deve ser informado sobre o tratamento no momento da coleta.', lgpdReference: 'Art. 9, LGPD', recommendations: [{ id: 'r-18', title: 'Adicionar aviso de privacidade contextual', priority: 'medium', description: 'Formularios sem texto informativo sobre uso dos dados.', howToImprove: 'Adicionar texto curto junto aos botoes, com link para a politica e finalidade especifica de cada formulario.' }] },

    // RIGHTS C19-C24
    { id: 'f-19', criterionCode: 'C19', criterionName: 'Direito de acesso', status: 'found', score: 2.5, maxScore: 2.5, evidence: 'Mencao ao direito de acessar dados', explanation: 'O titular pode solicitar confirmacao e acesso aos seus dados.', lgpdReference: 'Art. 18, I e II, LGPD', recommendations: [] },
    { id: 'f-20', criterionCode: 'C20', criterionName: 'Direito de correcao', status: 'partial', score: 1.25, maxScore: 2.5, evidence: 'Mencao generica a "atualizacao de dados"', explanation: 'O titular pode pedir correcao de dados inexatos.', lgpdReference: 'Art. 18, III, LGPD', recommendations: [{ id: 'r-20', title: 'Detalhar direito de correcao', priority: 'low', description: 'Mencao vaga sobre atualizacao.', howToImprove: 'Descrever claramente como solicitar correcao de dados.' }] },
    { id: 'f-21', criterionCode: 'C21', criterionName: 'Direito de exclusao', status: 'absent', score: 0, maxScore: 2.5, evidence: null, explanation: 'O titular pode pedir eliminacao de dados.', lgpdReference: 'Art. 18, V, LGPD', recommendations: [{ id: 'r-21', title: 'Incluir direito de exclusao', priority: 'high', description: 'Politica nao menciona direito de exclusao.', howToImprove: 'Incluir secao sobre como solicitar exclusao de dados pessoais.' }] },
    { id: 'f-22', criterionCode: 'C22', criterionName: 'Direito de portabilidade', status: 'absent', score: 0, maxScore: 2.5, evidence: null, explanation: 'O titular pode pedir portabilidade a outro fornecedor.', lgpdReference: 'Art. 18, V, LGPD', recommendations: [{ id: 'r-22', title: 'Incluir direito de portabilidade', priority: 'medium', description: 'Politica nao menciona portabilidade.', howToImprove: 'Descrever como o titular pode solicitar a exportacao de seus dados.' }] },
    { id: 'f-23', criterionCode: 'C23', criterionName: 'Direito de revogacao do consentimento', status: 'partial', score: 1.25, maxScore: 2.5, evidence: 'Mencao a "cancelar conta"', explanation: 'O consentimento pode ser revogado a qualquer momento.', lgpdReference: 'Art. 8, par. 5, LGPD', recommendations: [{ id: 'r-23', title: 'Esclarecer revogacao', priority: 'high', description: 'Apenas menciona cancelamento de conta.', howToImprove: 'Explicar como revogar consentimento sem cancelar a conta.' }] },
    { id: 'f-24', criterionCode: 'C24', criterionName: 'Info sobre compartilhamento', status: 'partial', score: 1.25, maxScore: 2.5, evidence: 'Mencao a "terceiros parceiros"', explanation: 'O titular pode solicitar informacoes sobre compartilhamento.', lgpdReference: 'Art. 18, VII, LGPD', recommendations: [{ id: 'r-24', title: 'Detalhar compartilhamento', priority: 'medium', description: 'Termo vago "terceiros parceiros".', howToImprove: 'Listar categorias de destinatarios e finalidades.' }] },

    // CONTROLLER C25-C27
    { id: 'f-25', criterionCode: 'C25', criterionName: 'Identificacao do controlador', status: 'absent', score: 0, maxScore: 3.33, evidence: null, explanation: 'O controlador e o responsavel pelo tratamento.', lgpdReference: 'Art. 5, VI, LGPD', recommendations: [{ id: 'r-25', title: 'Identificar controlador', priority: 'high', description: 'Nao ha razao social ou CNPJ.', howToImprove: 'Incluir nome completo, CNPJ e endereco do controlador.' }] },
    { id: 'f-26', criterionCode: 'C26', criterionName: 'Canal de contato para privacidade', status: 'partial', score: 1.67, maxScore: 3.33, evidence: 'E-mail generico encontrado', explanation: 'E essencial um canal claro para exercer direitos.', lgpdReference: 'Art. 9, LGPD', recommendations: [{ id: 'r-26', title: 'Criar e-mail dedicado', priority: 'high', description: 'E-mail generico, nao especifico para LGPD.', howToImprove: 'Criar privacidade@exemplo.com com link na politica.' }] },
    { id: 'f-27', criterionCode: 'C27', criterionName: 'Indicacao de encarregado (DPO)', status: 'absent', score: 0, maxScore: 3.34, evidence: null, explanation: 'A indicacao de encarregado e boa pratica.', lgpdReference: 'Art. 5, VIII, LGPD', recommendations: [{ id: 'r-27', title: 'Nomear encarregado', priority: 'medium', description: 'Sem indicacao de DPO.', howToImprove: 'Nomear um encarregado de dados e publicar contato na politica.' }] },

    // SECURITY C28-C31
    { id: 'f-28', criterionCode: 'C28', criterionName: 'Uso de HTTPS', status: 'found', score: 2.5, maxScore: 2.5, evidence: 'Certificado SSL valido detectado', explanation: 'HTTPS e o minimo esperado para protecao de dados.', lgpdReference: 'Art. 46, LGPD', recommendations: [] },
    { id: 'f-29', criterionCode: 'C29', criterionName: 'Formularios em paginas seguras', status: 'found', score: 2.5, maxScore: 2.5, evidence: 'Todos os formularios via HTTPS', explanation: 'Formularios devem estar em paginas seguras.', lgpdReference: 'Art. 46, LGPD', recommendations: [] },
    { id: 'f-30', criterionCode: 'C30', criterionName: 'Dados sensiveis expostos', status: 'found', score: 2.5, maxScore: 2.5, evidence: 'Nenhum dado sensivel exposto no codigo-fonte', explanation: 'Dados sensiveis expostos representam risco de violacao.', lgpdReference: 'Art. 46, LGPD', recommendations: [] },
    { id: 'f-31', criterionCode: 'C31', criterionName: 'Scripts externos', status: 'absent', score: 0, maxScore: 2.5, evidence: 'Google Analytics, Facebook Pixel, Hotjar e widget de chat carregados no primeiro acesso.', explanation: 'Scripts de terceiros podem coletar dados dos visitantes.', lgpdReference: 'Art. 46, LGPD', recommendations: [{ id: 'r-31', title: 'Revisar scripts de terceiros', priority: 'low', description: '4 scripts externos detectados em paginas de agendamento e conteudo.', howToImprove: 'Revisar necessidade de cada script, documentar finalidade e condicionar ferramentas nao essenciais ao consentimento.' }] },

    // LANGUAGE C32-C33
    { id: 'f-32', criterionCode: 'C32', criterionName: 'Termos excessivamente genericos', status: 'partial', score: 1.25, maxScore: 2.5, evidence: 'Frases como "melhorar sua jornada de saude" e "pelo periodo necessario" aparecem sem criterio objetivo.', explanation: 'Frases vagas violam o principio de transparencia.', lgpdReference: 'Art. 6, VI, LGPD', recommendations: [{ id: 'r-32', title: 'Substituir termos genericos', priority: 'medium', description: '2 frases vagas detectadas em politica e banner.', howToImprove: 'Substituir por descricoes especificas de dados, finalidades, prazos e procedimentos.' }] },
    { id: 'f-33', criterionCode: 'C33', criterionName: 'Clareza e acessibilidade do texto', status: 'found', score: 2.5, maxScore: 2.5, evidence: 'Texto com linguagem moderadamente acessivel', explanation: 'A LGPD exige que informacoes sejam claras e acessiveis.', lgpdReference: 'Art. 9, par. 1, LGPD', recommendations: [] },
  ];
  return findings;
}

function makeCookies(): CookieItem[] {
  return [
    { id: 'ck-1', name: 'hzt_session', domain: 'demo.lgpdoc.test', type: 'necessary', origin: 'first_party', duration: 'session', loadedBeforeConsent: false, description: 'Cookie de sessao necessario para area de pacientes.' },
    { id: 'ck-2', name: 'csrf_token', domain: 'demo.lgpdoc.test', type: 'necessary', origin: 'first_party', duration: 'session', loadedBeforeConsent: false, description: 'Token de seguranca CSRF.' },
    { id: 'ck-3', name: '_ga', domain: '.demo.lgpdoc.test', type: 'analytics', origin: 'first_party', duration: 'persistent', loadedBeforeConsent: true, description: 'Google Analytics - rastreamento de visitas.' },
    { id: 'ck-4', name: '_hjSession', domain: '.hotjar.com', type: 'analytics', origin: 'third_party', duration: 'persistent', loadedBeforeConsent: true, description: 'Hotjar - mapas de calor e gravacao de sessao.' },
    { id: 'ck-5', name: '_fbp', domain: '.facebook.com', type: 'marketing', origin: 'third_party', duration: 'persistent', loadedBeforeConsent: true, description: 'Facebook Pixel - rastreamento para publicidade.' },
    { id: 'ck-6', name: 'hzt_adsid', domain: '.demo.lgpdoc.test', type: 'marketing', origin: 'first_party', duration: 'persistent', loadedBeforeConsent: true, description: 'Identificador de campanha de agendamento.' },
    { id: 'ck-7', name: 'pref_specialty', domain: 'demo.lgpdoc.test', type: 'functional', origin: 'first_party', duration: 'persistent', loadedBeforeConsent: false, description: 'Preferencia de especialidade selecionada pelo visitante.' },
  ];
}

function makeForms(): FormItem[] {
  return [
    {
      id: 'fm-1',
      pageUrl: `${DEMO_SCAN_URL}/agendamento`,
      fields: [
        { name: 'nome', type: 'text', label: 'Nome completo', isPersonalData: true, isSensitive: false, isRequired: true },
        { name: 'email', type: 'email', label: 'E-mail', isPersonalData: true, isSensitive: false, isRequired: true },
        { name: 'telefone', type: 'tel', label: 'Telefone', isPersonalData: true, isSensitive: false, isRequired: false },
        { name: 'cpf', type: 'text', label: 'CPF', isPersonalData: true, isSensitive: false, isRequired: false },
        { name: 'sintomas', type: 'textarea', label: 'Descreva seus sintomas', isPersonalData: true, isSensitive: true, isRequired: false },
      ],
      sensitiveFields: ['sintomas'],
      excessiveFields: ['cpf', 'sintomas'],
      hasSecureAction: true,
      privacyNotice: false,
    },
    {
      id: 'fm-2',
      pageUrl: `${DEMO_SCAN_URL}/newsletter`,
      fields: [
        { name: 'nome', type: 'text', label: 'Nome', isPersonalData: true, isSensitive: false, isRequired: true },
        { name: 'email', type: 'email', label: 'E-mail', isPersonalData: true, isSensitive: false, isRequired: true },
        { name: 'data_nascimento', type: 'date', label: 'Data de nascimento', isPersonalData: true, isSensitive: false, isRequired: false },
      ],
      sensitiveFields: [],
      excessiveFields: ['data_nascimento'],
      hasSecureAction: true,
      privacyNotice: true,
    },
  ];
}

const CATEGORY_DATA = [
  { category: 'privacy_policy' as const, label: 'Politica de Privacidade', codes: ['C01','C02','C03','C04','C05','C06','C07','C08'], maxScore: 25 },
  { category: 'cookies' as const, label: 'Cookies', codes: ['C09','C10','C11','C12','C13','C14'], maxScore: 25 },
  { category: 'forms' as const, label: 'Formularios', codes: ['C15','C16','C17','C18'], maxScore: 15 },
  { category: 'rights' as const, label: 'Direitos do Titular', codes: ['C19','C20','C21','C22','C23','C24'], maxScore: 15 },
  { category: 'controller' as const, label: 'Controlador e Contato', codes: ['C25','C26','C27'], maxScore: 10 },
  { category: 'security' as const, label: 'Seguranca Basica', codes: ['C28','C29','C30','C31'], maxScore: 10 },
  { category: 'language' as const, label: 'Linguagem Clara', codes: ['C32','C33'], maxScore: 5 },
];

export function getMockReport(scanId: string, url: string): ReportResponse {
  const allFindings = makeFindings();

  const categories = CATEGORY_DATA.map((cat) => {
    const findings = allFindings.filter((f) => cat.codes.includes(f.criterionCode));
    const score = findings.reduce((sum, f) => sum + f.score, 0);
    return {
      category: cat.category,
      label: cat.label,
      score: Math.round(score * 100) / 100,
      maxScore: cat.maxScore,
      percentage: Math.round((score / cat.maxScore) * 100),
      summary: `${findings.filter(f => f.status === 'found').length} criterios atendidos, ${findings.filter(f => f.status === 'partial').length} parciais, ${findings.filter(f => f.status === 'absent').length} ausentes.`,
      findings,
    };
  });

  const totalScore = categories.reduce((sum, c) => sum + c.score, 0);
  const totalMax = categories.reduce((sum, c) => sum + c.maxScore, 0);
  const normalizedScore = Math.round((totalScore / totalMax) * 100 * 10) / 10;

  return {
    scan: {
      id: scanId,
      url: DEMO_SCAN_URL,
      siteName: DEMO_SITE_NAME,
      siteSummary: DEMO_SITE_SUMMARY,
      detectedPages: DEMO_PAGES,
      score: normalizedScore,
      riskLevel: normalizedScore >= 90 ? 'good' : normalizedScore >= 70 ? 'low' : normalizedScore >= 40 ? 'medium' : 'high',
      completedAt: new Date().toISOString(),
    },
    categories,
    cookies: makeCookies(),
    forms: makeForms(),
    legalDisclaimer: 'Esta analise usa dados simulados de um site ficticio para demonstracao do LGPDoc. O resultado tem carater exclusivamente educativo e nao constitui parecer juridico, certificacao de conformidade ou avaliacao real da LGPD.',
  };
}
