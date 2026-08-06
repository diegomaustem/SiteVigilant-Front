import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const authStorage = localStorage.getItem('auth-storage');
 
  if (authStorage) {
    const parsed = JSON.parse(authStorage);
    const token = parsed.state?.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const currentPath = window.location.pathname;
  
      if (!currentPath.includes('/login')) {
        localStorage.removeItem('auth-storage');

        window.location.href = '/login?sessionExpired=true';
      }
    }
    return Promise.reject(error);
  }
);
