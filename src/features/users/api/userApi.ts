import { apiClient } from '../../../api/apiClient';
import type { ApiResponse, PaginatedResponse } from '../../../shared/types/api';
import type { UserApi, InputUser } from '../models/user.model';

export const userApi = {

    getAll: () => apiClient.get<PaginatedResponse<UserApi>>('/users'),
  
    getAllPaginated: (page: number = 1, limit: number = 10) => { 
      return apiClient.get<PaginatedResponse<UserApi>>('/users-paginated', {
        params: { page, limit }
      });
    }, 
  
    getById: (id: number) =>
        apiClient.get<ApiResponse<UserApi>>(`/user/${id}`),

    create: (data: InputUser) =>
        apiClient.post<ApiResponse<UserApi>>('/user', data),

    update: (id: number, data: Partial<InputUser>) =>
        apiClient.put<ApiResponse<UserApi>>(`/user/${id}`, data),

    delete: (id: number) => 
        apiClient.delete<void>(`/user/${id}`),
};