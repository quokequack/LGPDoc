import axios, { AxiosInstance } from 'axios';
import { v4 as uuid } from 'uuid';

let httpClient: AxiosInstance | null = null;

export function getHttpClient(): AxiosInstance {
  if (!httpClient) {
    httpClient = axios.create({
      timeout: 30000,
      headers: {
        'User-Agent': 'LGPD-Educational-Scanner/1.0 (educational tool; no personal data collected)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.8',
      },
      maxRedirects: 5,
      validateStatus: (status) => status < 500,
    });

    httpClient.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.code === 'ECONNABORTED') {
          return Promise.reject(new Error('A requisicao excedeu o tempo limite. O site pode estar indisponivel.'));
        }
        if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
          return Promise.reject(new Error('Nao foi possivel conectar ao site informado. Verifique a URL.'));
        }
        return Promise.reject(error);
      }
    );
  }
  return httpClient;
}

export function createRequestId(): string {
  return uuid();
}
