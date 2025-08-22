import axios from 'axios';
import type { HTTPMethod } from '../types';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.code === 'ERR_NETWORK' || error?.response?.status === 401) {
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

const api = async (url: string, method: HTTPMethod, data: any = {}, header: any = {}) => {
  try {
    const res = await apiClient({
      url,
      method: method.toUpperCase(),
      data,
      headers: {
        ...header,
        'Content-Type': header['Content-Type'] ?? 'application/json',
      },
    });
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default api;
