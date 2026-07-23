import { apiClient } from '../../../api/apiClient';
import type { LoginCredentials, RegisterData, AuthResponse } from '../models/auth.model';

export const authApi = {
  login: (credentials: LoginCredentials) =>
    apiClient.post<AuthResponse>('/login', credentials),

  register: (data: RegisterData) =>
    apiClient.post<AuthResponse>('/register', data),

  logout: () =>
    apiClient.post<void>('/logout'),

  getCurrentUser: () =>
    apiClient.get<AuthResponse>('/me'),
};