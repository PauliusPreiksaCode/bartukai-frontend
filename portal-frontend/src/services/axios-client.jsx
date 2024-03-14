import axios from 'axios';
import authService from './auth';

const token = authService.getToken();

const instance = axios.create({
  baseURL: 'https://api-vcvs.azurewebsites.net/',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
});

// Add a request interceptor
instance.interceptors.request.use(
  async (config) => {
    const token = await authService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    // Do something with response data
    return response;
  },
  async (error) => {

    // Do something with response error
    if (error.response && error.response.status === 401) {
      // Handle session expiration
      await handleSessionExpired(error.response);
    }
    return Promise.reject(error);
  }
);

const handleSessionExpired = async (response) => {
  authService.renewToken();
};

export default instance;