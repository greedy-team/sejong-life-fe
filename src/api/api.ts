import axios from 'axios';
import type { AxiosError, InternalAxiosRequestConfig } from 'axios';
import type { ReissueResponse } from '../types/type';

const BASE_URL = import.meta.env.VITE_API_URL;

interface RetriableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

export const authApi = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

let isRefreshing = false;
let refreshSubscribers: ((accessToken: string) => void)[] = [];

const subscribeTokenRefresh = (callback: (accessToken: string) => void) => {
  refreshSubscribers.push(callback);
};

const onTokenRefreshed = (accessToken: string) => {
  refreshSubscribers.forEach((callback) => callback(accessToken));
  refreshSubscribers = [];
};

const handleRefreshFailure = () => {
  refreshSubscribers = [];
  localStorage.removeItem('accessToken');
  window.location.href = '/';
};

authApi.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetriableRequestConfig | undefined;

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve) => {
        subscribeTokenRefresh((accessToken) => {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          resolve(authApi(originalRequest));
        });
      });
    }

    isRefreshing = true;

    try {
      const { data } = await api.post<ReissueResponse>('/api/auth/reissue');
      const newAccessToken = data.data.accessToken;

      localStorage.setItem('accessToken', newAccessToken);
      onTokenRefreshed(newAccessToken);

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return authApi(originalRequest);
    } catch (refreshError) {
      handleRefreshFailure();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export const meetingAuthApi = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

meetingAuthApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('meetingAccessToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
