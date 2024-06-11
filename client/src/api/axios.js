import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';

const instance = axios.create({
  baseURL: `${baseURL}/api`,
});

// Añadir un interceptor de solicitud para adjuntar el token
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;