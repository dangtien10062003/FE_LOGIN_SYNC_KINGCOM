import axios from 'axios';
import { appConfig } from '../config/appConfig.js';

const api = axios.create({
  baseURL: appConfig.apiBaseUrl,
  timeout: appConfig.apiTimeoutMs
});

api.interceptors.request.use((config) => {
  const token = window.localStorage.getItem(appConfig.authTokenStorageKey);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export async function getCurrentUser() {
  const response = await api.get('/auth/me');
  return response.data;
}

export async function login({ username, password }) {
  const response = await api.post('/auth/login', { username, password });
  return response.data;
}
