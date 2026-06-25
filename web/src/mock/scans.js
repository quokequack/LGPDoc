export const DEMO_SCAN_URL = 'https://demo.lgpdoc.test';
const URL_POOL = [
    DEMO_SCAN_URL,
    'https://escolaexemplo.edu.br',
    'https://lojavirtual.com.br',
    'https://clinica.saude.gov.br',
    'https://prefeitura-municipio.sp.gov.br',
    'https://portaltransparencia.org.br',
    'https://blog-pessoal.com.br',
    'https://ecommerce-loja.com.br',
    'https://site-instituicao.edu.br',
];
function randomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
function randomScore() {
    return Math.round((15 + Math.random() * 83) * 10) / 10;
}
function scoreToRisk(score) {
    if (score >= 90)
        return 'good';
    if (score >= 70)
        return 'low';
    if (score >= 40)
        return 'medium';
    return 'high';
}
function randomDate(daysBack) {
    const now = Date.now();
    const past = now - Math.floor(Math.random() * daysBack * 24 * 60 * 60 * 1000);
    return new Date(past).toISOString();
}
export function generateMockScanList(count) {
    const list = [];
    const used = new Set();
    for (let i = 0; i < count; i++) {
        let url;
        do {
            url = randomItem(URL_POOL);
        } while (used.has(url) && used.size < URL_POOL.length);
        used.add(url);
        const score = randomScore();
        const status = Math.random() > 0.15 ? 'completed' : 'failed';
        list.push({
            id: crypto.randomUUID(),
            url,
            status: status,
            score: status === 'completed' ? score : null,
            riskLevel: status === 'completed' ? scoreToRisk(score) : null,
            createdAt: randomDate(30),
        });
    }
    list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return list;
}
export function getMockScanProgress(url = DEMO_SCAN_URL, delayMs = 4000) {
    return new Promise((resolve) => {
        const scanId = crypto.randomUUID();
        const score = url === DEMO_SCAN_URL ? 52.4 : randomScore();
        setTimeout(() => {
            resolve({
                id: scanId,
                url,
                status: 'completed',
                score,
                riskLevel: scoreToRisk(score),
                startedAt: new Date(Date.now() - delayMs).toISOString(),
                completedAt: new Date().toISOString(),
                errorMessage: null,
                createdAt: new Date(Date.now() - delayMs).toISOString(),
            });
        }, delayMs);
    });
}
