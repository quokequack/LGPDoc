import type { ScanListItem, ScanResponse, RiskLevel } from '@/types/scan.types';

export const DEMO_SCAN_URL = 'https://demo.lgpdoc.test';
export const DEMO_SITE_NAME = 'Clínica Horizonte Bem-Estar';
export const DEMO_SITE_SUMMARY = 'Portal fictício de agendamento médico, newsletter de saúde e área de pacientes.';

const URL_POOL = [
  DEMO_SCAN_URL,
  'https://clinica-horizonte.test',
  'https://escolaexemplo.edu.br',
  'https://lojavirtual.com.br',
  'https://clinica.saude.gov.br',
  'https://prefeitura-municipio.sp.gov.br',
  'https://portaltransparencia.org.br',
  'https://blog-pessoal.com.br',
  'https://ecommerce-loja.com.br',
  'https://site-instituicao.edu.br',
];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomScore(): number {
  return Math.round((15 + Math.random() * 83) * 10) / 10;
}

function scoreToRisk(score: number): RiskLevel {
  if (score >= 90) return 'good';
  if (score >= 70) return 'low';
  if (score >= 40) return 'medium';
  return 'high';
}

function randomDate(daysBack: number): string {
  const now = Date.now();
  const past = now - Math.floor(Math.random() * daysBack * 24 * 60 * 60 * 1000);
  return new Date(past).toISOString();
}

export function generateMockScanList(count: number): ScanListItem[] {
  const list: ScanListItem[] = [];
  const used = new Set<string>();

  for (let i = 0; i < count; i++) {
    let url: string;
    do {
      url = randomItem(URL_POOL);
    } while (used.has(url) && used.size < URL_POOL.length);
    used.add(url);

    const score = randomScore();
    const status = Math.random() > 0.15 ? 'completed' : 'failed';

    list.push({
      id: crypto.randomUUID(),
      url,
      status: status as ScanListItem['status'],
      score: status === 'completed' ? score : null,
      riskLevel: status === 'completed' ? scoreToRisk(score) : null,
      createdAt: randomDate(30),
    });
  }

  list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return list;
}

export function getMockScanProgress(url = DEMO_SCAN_URL, delayMs = 4000): Promise<ScanResponse> {
  return new Promise((resolve) => {
    const scanId = crypto.randomUUID();
    const score = 48.8;

    setTimeout(() => {
      resolve({
        id: scanId,
        url: DEMO_SCAN_URL,
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
