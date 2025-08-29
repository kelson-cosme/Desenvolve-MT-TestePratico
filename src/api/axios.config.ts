import axios from 'axios';

// A documentação está em: https://abitus-api.geia.vip/swagger-ui/index.html [cite: 10, 11]
const apiClient = axios.create({
  baseURL: 'https://abitus-api.geia.vip', // URL base da API
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor para tratamento de erros (opcional, mas recomendado) 
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Aqui você pode tratar erros de forma global
    console.error("Erro na requisição:", error);
    return Promise.reject(error);
  }
);

export default apiClient;