import axios from 'axios';

const apiClient = axios.create({
  // Adicionamos /v1/ à URL base
  baseURL: 'https://abitus-api.geia.vip/v1', 
  headers: {
    'Content-Type': 'application/json',
  }
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Erro na requisição:", error);
    return Promise.reject(error);
  }
);

export default apiClient;