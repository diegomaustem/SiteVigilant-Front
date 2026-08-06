import { apiClient } from '../../../api/apiClient';
import type { InputPeriodicity, PeriodicityApi } from '../models/periodicity.model';
import type { ApiResponse, PaginatedResponse } from '../../../shared/types/api';
export const periodicityApi = {

    getAll: () => apiClient.get<ApiResponse<PeriodicityApi[]>>('/periodicities'),

    getAllPaginated: (page: number = 1, limit: number = 10) => { 
        return apiClient.get<PaginatedResponse<PeriodicityApi>>('/periodicities-paginated', {
            params: { page, limit }
        });
    },

    getById: (id: number) => apiClient.get<ApiResponse<PeriodicityApi>>(`/periodicity/${id}`),

    create: (data: InputPeriodicity) => 
        apiClient.post<ApiResponse<PeriodicityApi>>('/periodicity', data),

    update: (id: number, data: Partial<InputPeriodicity>) =>
        apiClient.put<ApiResponse<PeriodicityApi>>(`/periodicity/${id}`, data),

    delete: (id: number) => 
        apiClient.delete<void>(`/periodicity/${id}`),
};