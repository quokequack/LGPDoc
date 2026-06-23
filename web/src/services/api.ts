import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const message = error.response.data?.error || 'Erro inesperado do servidor.';
      return Promise.reject(new Error(message));
    }
    if (error.request) {
      return Promise.reject(new Error('Nao foi possivel conectar ao servidor. Verifique sua conexao.'));
    }
    return Promise.reject(error);
  }
);

export default api;
