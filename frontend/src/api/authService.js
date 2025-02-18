import { apiClient } from '../utils/apiClient';

export const authService = {
  login: async (credentials) => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },
  register: async (userData) => {
    const response = await apiClient.post('/api/insert_user', userData);
    return response.data;
  }
};