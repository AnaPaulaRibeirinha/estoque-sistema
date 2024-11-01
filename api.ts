import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Substitua pela URL da sua API
});

// Interceptor para incluir o token em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Busca o token do localStorage
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default api;