import axios from 'axios';
import type { HTTPMethod } from '../types';
// import store from '../stores/authStore';
const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api/',
  timeout: 10000,
  withCredentials: true,
});
// apiClient.interceptors.request.use((config) => {
//   const accessToken = store.getState().auth.accessToken;
//   if (accessToken) {
//     config.headers['Authorization'] = `Bearer ${accessToken}`;
//   }
//   return config;
// });
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // const originalRequest = error.config;
    console.log(error);

    if (error.response.status === 401) {
      // window.location.href = '/login';
    }
    // if (error.response.data.code === 401 && originalRequest.url !== 'user/refresh') {
    //   try {
    //     const res = await api('user/refresh', 'get');
    //     if (res.status === 200) {
    //       return apiClient(originalRequest);
    //     } else {
    //       window.location.href = '/login';
    //       return Promise.reject(error);
    //     }
    //   } catch (error) {
    //     return Promise.reject(error);
    //   }
    // }
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
