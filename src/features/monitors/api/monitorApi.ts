import { apiClient } from '../../../api/apiClient';
import type { ApiResponse, PaginatedResponse } from '../../../shared/types/api';
import type { Monitor, InputMonitor, MonitorApi } from '../models/monitor.model';

export const monitorApi = {
  getAll: () => apiClient.get<Monitor[]>('/monitors'),

  getAllPaginated: (page: number = 1, limit: number = 10) => { 
    return apiClient.get<PaginatedResponse<MonitorApi>>('/monitors-paginated', {
      params: { page, limit }
    });
  }, 

  getById: (id: number) => apiClient.get<Monitor>(`/monitors/${id}`),

  create: (data: InputMonitor) => apiClient.post<ApiResponse<MonitorApi>>('/monitor', data),

  update: (id: number, data: Partial<InputMonitor>) =>
    apiClient.put<ApiResponse<MonitorApi>>(`/monitor/${id}`, data),

  delete: (id: number) => apiClient.delete<void>(`/monitor/${id}`),
};