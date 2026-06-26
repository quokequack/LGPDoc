import { DEMO_SCAN_URL } from '@/mock/scans';
const FINDING_STATUSES = ['found', 'partial', 'absent'];
function makeFindings() {
    const findings = [
        // PRIVACY_POLICY C01-C08
        { id: 'f-01', criterionCode: 'C01', criterionName: 'Existência de política de privacidade', status: 'found', score: 3.12, maxScore: 3.12, evidence: 'Política encontrada em /politica-de-privacidade', explanation: 'A LGPD exige transparência no tratamento de dados. A ausência de política impede que o titular saiba como seus dados são usados.', lgpdReference: 'Art. 6, VI, LGPD (Transparência)', recommendations: [] },
        { id: 'f-02', criterionCode: 'C02', criterionName: 'Menção aos dados coletados', status: 'found', score: 3.12, maxScore: 3.12, evidence: 'Lista de dados: nome, e-mail, telefone, CPF', explanation: 'O princípio da transparência exige que o titular saiba quais dados são coletados.', lgpdReference: 'Art. 6, VI, LGPD', recommendations: [] },
        { id: 'f-03', criterionCode: 'C03', criterionName: 'Menção à finalidade', status: 'found', score: 3.12, maxScore: 3.12, evidence: 'Finalidades descritas por categoria de dado', explanation: 'O princípio da finalidade determina que os dados sejam coletados para propósitos legítimos e específicos.', lgpdReference: 'Art. 6, I, LGPD (Finalidade)', recommendations: [] },
        { id: 'f-04', criterionCode: 'C04', criterionName: 'Menção ao tempo de armazenamento', status: 'partial', score: 1.56, maxScore: 3.12, evidence: 'Menção genérica: "pelo tempo necessário"', explanation: 'O princípio da necessidade implica que dados não devem ser mantidos além do necessário.', lgpdReference: 'Art. 6, III, LGPD (Necessidade)', recommendations: [{ id: 'r-04', title: 'Especificar prazos de retenção', priority: 'medium', description: 'A política menciona apenas "pelo tempo necessário" sem especificar prazos.', howToImprove: 'Definir prazos claros de retenção para cada tipo de dado ou os critérios usados para defini-los.' }] },
        { id: 'f-05', criterionCode: 'C05', criterionName: 'Menção ao compartilhamento', status: 'partial', score: 1.56, maxScore: 3.12, evidence: 'Cita "parceiros" sem especificar', explanation: 'O titular tem direito de saber com quem seus dados são compartilhados.', lgpdReference: 'Art. 9, LGPD', recommendations: [{ id: 'r-05', title: 'Detalhar compartilhamento', priority: 'high', description: 'A política usa termo genérico "parceiros".', howToImprove: 'Listar categorias de terceiros e finalidades do compartilhamento.' }] },
        { id: 'f-06', criterionCode: 'C06', criterionName: 'Menção a bases legais', status: 'partial', score: 1.56, maxScore: 3.12, evidence: 'Menciona apenas consentimento', explanation: 'Toda operação de tratamento deve ter uma base legal válida.', lgpdReference: 'Art. 7, LGPD', recommendations: [{ id: 'r-06', title: 'Listar todas as bases legais', priority: 'medium', description: 'Apenas consentimento e mencionado.', howToImprove: 'Incluir outras bases como execução de contrato, obrigação legal e legítimo interesse.' }] },
        { id: 'f-07', criterionCode: 'C07', criterionName: 'Identificação do controlador', status: 'absent', score: 0, maxScore: 3.12, evidence: null, explanation: 'O titular precisa saber quem é o responsável pelo tratamento de seus dados.', lgpdReference: 'Art. 6, VII, LGPD', recommendations: [{ id: 'r-07', title: 'Identificar controlador', priority: 'high', description: 'Não há identificação do controlador na política.', howToImprove: 'Incluir nome da empresa, CNPJ e razão social.' }] },
        { id: 'f-08', criterionCode: 'C08', criterionName: 'Canal de contato / DPO', status: 'partial', score: 1.56, maxScore: 3.12, evidence: 'E-mail genérico contato@exemplo.com', explanation: 'A LGPD garante ao titular o direito de obter informações.', lgpdReference: 'Art. 9, LGPD', recommendations: [{ id: 'r-08', title: 'Criar canal dedicado', priority: 'medium', description: 'E-mail genérico, não dedicado a privacidade.', howToImprove: 'Criar e-mail privacidade@exemplo.com e indicar encarregado.' }] },
        // COOKIES C09-C14
        { id: 'f-09', criterionCode: 'C09', criterionName: 'Existência de banner de cookies', status: 'found', score: 4.17, maxScore: 4.17, evidence: 'Banner detectado com informação sobre cookies', explanation: 'Cookies não essenciais exigem consentimento prévio.', lgpdReference: 'Art. 7, LGPD', recommendations: [] },
        { id: 'f-10', criterionCode: 'C10', criterionName: 'Botão de aceitar cookies', status: 'found', score: 4.17, maxScore: 4.17, evidence: 'Botão "Aceitar todos" presente', explanation: 'O consentimento deve ser livre, informado e inequívoco.', lgpdReference: 'Art. 8, LGPD', recommendations: [] },
        { id: 'f-11', criterionCode: 'C11', criterionName: 'Botão de recusar cookies', status: 'absent', score: 0, maxScore: 4.17, evidence: null, explanation: 'Recusar deve ser tão fácil quanto aceitar.', lgpdReference: 'Art. 8, par. 5, LGPD', recommendations: [{ id: 'r-11', title: 'Adicionar botão de recusar', priority: 'high', description: 'Banner possui apenas botão de aceitar.', howToImprove: 'Incluir botão "Recusar cookies não essenciais" visível e acessível.' }] },
        { id: 'f-12', criterionCode: 'C12', criterionName: 'Gerenciar preferências', status: 'absent', score: 0, maxScore: 4.17, evidence: null, explanation: 'O titular deve poder escolher categorias.', lgpdReference: 'Art. 8, LGPD', recommendations: [{ id: 'r-12', title: 'Oferecer painel de preferências', priority: 'medium', description: 'Sem opção de gerenciar preferências.', howToImprove: 'Implementar painel com categorias de cookies separadas.' }] },
        { id: 'f-13', criterionCode: 'C13', criterionName: 'Link para política de cookies', status: 'found', score: 4.17, maxScore: 4.17, evidence: 'Link para /politica-de-privacidade no banner', explanation: 'O titular deve ter acesso fácil a informações completas.', lgpdReference: 'Art. 9, LGPD', recommendations: [] },
        { id: 'f-14', criterionCode: 'C14', criterionName: 'Cookies não necessários antes de consentimento', status: 'absent', score: 0, maxScore: 4.15, evidence: '_ga e _fbp carregados antes do consentimento', explanation: 'Carregar cookies não essenciais antes do consentimento viola o princípio do consentimento prévio.', lgpdReference: 'Art. 7, LGPD', recommendations: [{ id: 'r-14', title: 'Bloquear cookies antes do consentimento', priority: 'high', description: 'Cookies de analytics e marketing carregam antes do aceite.', howToImprove: 'Configurar GTM e scripts para carregar apenas após consentimento.' }] },
        // FORMS C15-C18
        { id: 'f-15', criterionCode: 'C15', criterionName: 'Identificação de campos de dados pessoais', status: 'found', score: 3.75, maxScore: 3.75, evidence: 'Formulário com nome, e-mail, telefone', explanation: 'Identificação de dados pessoais coletados.', lgpdReference: 'Art. 5, I, LGPD', recommendations: [] },
        { id: 'f-16', criterionCode: 'C16', criterionName: 'Minimização de dados', status: 'partial', score: 1.88, maxScore: 3.75, evidence: 'Campo CPF presente no formulário de contato', explanation: 'O princípio da necessidade limita a coleta ao mínimo necessário.', lgpdReference: 'Art. 6, III, LGPD', recommendations: [{ id: 'r-16', title: 'Revisar necessidade do CPF', priority: 'medium', description: 'CPF em formulário de contato parece excessivo.', howToImprove: 'Avaliar se o CPF e realmente necessário para a finalidade do formulário.' }] },
        { id: 'f-17', criterionCode: 'C17', criterionName: 'Detecção de dados sensíveis', status: 'found', score: 3.75, maxScore: 3.75, evidence: 'Nenhum dado sensível detectado nos formulários', explanation: 'Dados sensíveis merecem proteção especial.', lgpdReference: 'Art. 5, II e Art. 11, LGPD', recommendations: [] },
        { id: 'f-18', criterionCode: 'C18', criterionName: 'Aviso de privacidade no formulário', status: 'absent', score: 0, maxScore: 3.75, evidence: null, explanation: 'O titular deve ser informado sobre o tratamento no momento da coleta.', lgpdReference: 'Art. 9, LGPD', recommendations: [{ id: 'r-18', title: 'Adicionar aviso de privacidade', priority: 'medium', description: 'Formulários sem texto informativo sobre uso dos dados.', howToImprove: 'Adicionar texto "Seus dados serão usados apenas para..." próximo ao botão de envio.' }] },
        // RIGHTS C19-C24
        { id: 'f-19', criterionCode: 'C19', criterionName: 'Direito de acesso', status: 'found', score: 2.5, maxScore: 2.5, evidence: 'Menção ao direito de acessar dados', explanation: 'O titular pode solicitar confirmação e acesso aos seus dados.', lgpdReference: 'Art. 18, I e II, LGPD', recommendations: [] },
        { id: 'f-20', criterionCode: 'C20', criterionName: 'Direito de correção', status: 'partial', score: 1.25, maxScore: 2.5, evidence: 'Menção genérica a "atualização de dados"', explanation: 'O titular pode pedir correção de dados inexatos.', lgpdReference: 'Art. 18, III, LGPD', recommendations: [{ id: 'r-20', title: 'Detalhar direito de correção', priority: 'low', description: 'Menção vaga sobre atualização.', howToImprove: 'Descrever claramente como solicitar correção de dados.' }] },
        { id: 'f-21', criterionCode: 'C21', criterionName: 'Direito de exclusão', status: 'absent', score: 0, maxScore: 2.5, evidence: null, explanation: 'O titular pode pedir eliminação de dados.', lgpdReference: 'Art. 18, V, LGPD', recommendations: [{ id: 'r-21', title: 'Incluir direito de exclusão', priority: 'high', description: 'Política não menciona direito de exclusão.', howToImprove: 'Incluir seção sobre como solicitar exclusão de dados pessoais.' }] },
        { id: 'f-22', criterionCode: 'C22', criterionName: 'Direito de portabilidade', status: 'absent', score: 0, maxScore: 2.5, evidence: null, explanation: 'O titular pode pedir portabilidade a outro fornecedor.', lgpdReference: 'Art. 18, V, LGPD', recommendations: [{ id: 'r-22', title: 'Incluir direito de portabilidade', priority: 'medium', description: 'Política não menciona portabilidade.', howToImprove: 'Descrever como o titular pode solicitar a exportação de seus dados.' }] },
        { id: 'f-23', criterionCode: 'C23', criterionName: 'Direito de revogação do consentimento', status: 'partial', score: 1.25, maxScore: 2.5, evidence: 'Menção a "cancelar conta"', explanation: 'O consentimento pode ser revogado a qualquer momento.', lgpdReference: 'Art. 8, par. 5, LGPD', recommendations: [{ id: 'r-23', title: 'Esclarecer revogação', priority: 'high', description: 'Apenas menciona cancelamento de conta.', howToImprove: 'Explicar como revogar consentimento sem cancelar a conta.' }] },
        { id: 'f-24', criterionCode: 'C24', criterionName: 'Info sobre compartilhamento', status: 'partial', score: 1.25, maxScore: 2.5, evidence: 'Menção a "terceiros parceiros"', explanation: 'O titular pode solicitar informações sobre compartilhamento.', lgpdReference: 'Art. 18, VII, LGPD', recommendations: [{ id: 'r-24', title: 'Detalhar compartilhamento', priority: 'medium', description: 'Termo vago "terceiros parceiros".', howToImprove: 'Listar categorias de destinatários e finalidades.' }] },
        // CONTROLLER C25-C27
        { id: 'f-25', criterionCode: 'C25', criterionName: 'Identificação do controlador', status: 'absent', score: 0, maxScore: 3.33, evidence: null, explanation: 'O controlador é o responsável pelo tratamento.', lgpdReference: 'Art. 5, VI, LGPD', recommendations: [{ id: 'r-25', title: 'Identificar controlador', priority: 'high', description: 'Não há razão social ou CNPJ.', howToImprove: 'Incluir nome completo, CNPJ e endereço do controlador.' }] },
        { id: 'f-26', criterionCode: 'C26', criterionName: 'Canal de contato para privacidade', status: 'partial', score: 1.67, maxScore: 3.33, evidence: 'E-mail genérico encontrado', explanation: 'É essencial um canal claro para exercer direitos.', lgpdReference: 'Art. 9, LGPD', recommendations: [{ id: 'r-26', title: 'Criar e-mail dedicado', priority: 'high', description: 'E-mail genérico, não específico para LGPD.', howToImprove: 'Criar privacidade@exemplo.com com link na política.' }] },
        { id: 'f-27', criterionCode: 'C27', criterionName: 'Indicação de encarregado (DPO)', status: 'absent', score: 0, maxScore: 3.34, evidence: null, explanation: 'A indicação de encarregado é boa prática.', lgpdReference: 'Art. 5, VIII, LGPD', recommendations: [{ id: 'r-27', title: 'Nomear encarregado', priority: 'medium', description: 'Sem indicação de DPO.', howToImprove: 'Nomear um encarregado de dados e publicar contato na política.' }] },
        // SECURITY C28-C31
        { id: 'f-28', criterionCode: 'C28', criterionName: 'Uso de HTTPS', status: 'found', score: 2.5, maxScore: 2.5, evidence: 'Certificado SSL válido detectado', explanation: 'HTTPS é o mínimo esperado para proteção de dados.', lgpdReference: 'Art. 46, LGPD', recommendations: [] },
        { id: 'f-29', criterionCode: 'C29', criterionName: 'Formulários em páginas seguras', status: 'found', score: 2.5, maxScore: 2.5, evidence: 'Todos os formulários via HTTPS', explanation: 'Formulários devem estar em páginas seguras.', lgpdReference: 'Art. 46, LGPD', recommendations: [] },
        { id: 'f-30', criterionCode: 'C30', criterionName: 'Dados sensíveis expostos', status: 'found', score: 2.5, maxScore: 2.5, evidence: 'Nenhum dado sensível exposto no código-fonte', explanation: 'Dados sensíveis expostos representam risco de violação.', lgpdReference: 'Art. 46, LGPD', recommendations: [] },
        { id: 'f-31', criterionCode: 'C31', criterionName: 'Scripts externos', status: 'absent', score: 0, maxScore: 2.5, evidence: 'Google Analytics, Facebook Pixel, Google Fonts', explanation: 'Scripts de terceiros podem coletar dados dos visitantes.', lgpdReference: 'Art. 46, LGPD', recommendations: [{ id: 'r-31', title: 'Revisar scripts de terceiros', priority: 'low', description: '3 scripts externos detectados.', howToImprove: 'Revisar necessidade de cada script e documentar a finalidade de cada um.' }] },
        // LANGUAGE C32-C33
        { id: 'f-32', criterionCode: 'C32', criterionName: 'Termos excessivamente genéricos', status: 'partial', score: 1.25, maxScore: 2.5, evidence: 'Frases como "melhorar sua experiencia" e "conforme necessário"', explanation: 'Frases vagas violam o princípio de transparência.', lgpdReference: 'Art. 6, VI, LGPD', recommendations: [{ id: 'r-32', title: 'Substituir termos genéricos', priority: 'medium', description: '2 frases vagas detectadas.', howToImprove: 'Substituir por descrições específicas de dados, finalidades e procedimentos.' }] },
        { id: 'f-33', criterionCode: 'C33', criterionName: 'Clareza e acessibilidade do texto', status: 'found', score: 2.5, maxScore: 2.5, evidence: 'Texto com linguagem moderadamente acessível', explanation: 'A LGPD exige que informações sejam claras e acessíveis.', lgpdReference: 'Art. 9, par. 1, LGPD', recommendations: [] },
    ];
    return findings;
}
function makeCookies() {
    return [
        { id: 'ck-1', name: 'sessionid', domain: 'demo.lgpdoc.test', type: 'necessary', origin: 'first_party', duration: 'session', loadedBeforeConsent: false, description: 'Cookie de sessão necessário para funcionamento do site.' },
        { id: 'ck-2', name: 'csrftoken', domain: 'demo.lgpdoc.test', type: 'necessary', origin: 'first_party', duration: 'session', loadedBeforeConsent: false, description: 'Token de segurança CSRF.' },
        { id: 'ck-3', name: '_ga', domain: '.demo.lgpdoc.test', type: 'analytics', origin: 'first_party', duration: 'persistent', loadedBeforeConsent: true, description: 'Google Analytics - rastreamento de visitas.' },
        { id: 'ck-4', name: '_gid', domain: '.demo.lgpdoc.test', type: 'analytics', origin: 'first_party', duration: 'persistent', loadedBeforeConsent: true, description: 'Google Analytics - identificador de sessão.' },
        { id: 'ck-5', name: '_fbp', domain: '.facebook.com', type: 'marketing', origin: 'third_party', duration: 'persistent', loadedBeforeConsent: true, description: 'Facebook Pixel - rastreamento para publicidade.' },
        { id: 'ck-6', name: '_gcl_au', domain: '.demo.lgpdoc.test', type: 'marketing', origin: 'first_party', duration: 'persistent', loadedBeforeConsent: true, description: 'Google Ads - conversão de anuncios.' },
        { id: 'ck-7', name: 'pref_lang', domain: 'demo.lgpdoc.test', type: 'functional', origin: 'first_party', duration: 'persistent', loadedBeforeConsent: false, description: 'Preferência de idioma do usuario.' },
    ];
}
function makeForms() {
    return [
        {
            id: 'fm-1',
            pageUrl: `${DEMO_SCAN_URL}/contato`,
            fields: [
                { name: 'nome', type: 'text', label: 'Nome completo', isPersonalData: true, isSensitive: false, isRequired: true },
                { name: 'email', type: 'email', label: 'E-mail', isPersonalData: true, isSensitive: false, isRequired: true },
                { name: 'telefone', type: 'tel', label: 'Telefone', isPersonalData: true, isSensitive: false, isRequired: false },
                { name: 'cpf', type: 'text', label: 'CPF', isPersonalData: true, isSensitive: false, isRequired: false },
                { name: 'mensagem', type: 'textarea', label: 'Mensagem', isPersonalData: false, isSensitive: false, isRequired: true },
            ],
            sensitiveFields: [],
            excessiveFields: ['cpf'],
            hasSecureAction: true,
            privacyNotice: false,
        },
        {
            id: 'fm-2',
            pageUrl: `${DEMO_SCAN_URL}/newsletter`,
            fields: [
                { name: 'nome', type: 'text', label: 'Nome', isPersonalData: true, isSensitive: false, isRequired: true },
                { name: 'email', type: 'email', label: 'E-mail', isPersonalData: true, isSensitive: false, isRequired: true },
            ],
            sensitiveFields: [],
            excessiveFields: [],
            hasSecureAction: true,
            privacyNotice: true,
        },
    ];
}
const CATEGORY_DATA = [
    { category: 'privacy_policy', label: 'Política de Privacidade', codes: ['C01', 'C02', 'C03', 'C04', 'C05', 'C06', 'C07', 'C08'], maxScore: 25 },
    { category: 'cookies', label: 'Cookies', codes: ['C09', 'C10', 'C11', 'C12', 'C13', 'C14'], maxScore: 25 },
    { category: 'forms', label: 'Formulários', codes: ['C15', 'C16', 'C17', 'C18'], maxScore: 15 },
    { category: 'rights', label: 'Direitos do Titular', codes: ['C19', 'C20', 'C21', 'C22', 'C23', 'C24'], maxScore: 15 },
    { category: 'controller', label: 'Controlador e Contato', codes: ['C25', 'C26', 'C27'], maxScore: 10 },
    { category: 'security', label: 'Segurança Básica', codes: ['C28', 'C29', 'C30', 'C31'], maxScore: 10 },
    { category: 'language', label: 'Linguagem Clara', codes: ['C32', 'C33'], maxScore: 5 },
];
export function getMockReport(scanId, url) {
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
            summary: `${findings.filter(f => f.status === 'found').length} critérios atendidos, ${findings.filter(f => f.status === 'partial').length} parciais, ${findings.filter(f => f.status === 'absent').length} ausentes.`,
            findings,
        };
    });
    const totalScore = categories.reduce((sum, c) => sum + c.score, 0);
    const totalMax = categories.reduce((sum, c) => sum + c.maxScore, 0);
    const normalizedScore = Math.round((totalScore / totalMax) * 100 * 10) / 10;
    return {
        scan: {
            id: scanId,
            url,
            score: normalizedScore,
            riskLevel: normalizedScore >= 90 ? 'good' : normalizedScore >= 70 ? 'low' : normalizedScore >= 40 ? 'medium' : 'high',
            completedAt: new Date().toISOString(),
        },
        categories,
        cookies: makeCookies(),
        forms: makeForms(),
        legalDisclaimer: 'Esta análise tem caráter exclusivamente educativo e não constitui parecer jurídico. A pontuação gerada não representa certificação de conformidade com a LGPD. Para avaliação jurídica completa, consulte um profissional especializado em proteção de dados.',
    };
}
