import { apiClient } from '../../../api/apiClient';
import type { Periodicity, InputPeriodicity, PeriodicityApi } from '../models/periodicity.model';
import type { PaginatedResponse } from '../../../shared/types/pagination';
export const periodicityApi = {
    getAll: (page: number = 1, limit: number = 10) => { 
        return apiClient.get<PaginatedResponse<PeriodicityApi>>('/periodicities-paginated', {
            params: { page, limit }
        });
    },
    
    getById: (id: number) => apiClient.get<Periodicity>(`/periodicity/${id}`),

    create: (data: InputPeriodicity) => apiClient.post<Periodicity>('/periodicity', data),

    update: (id: number, data: Partial<InputPeriodicity>) =>
        apiClient.put<Periodicity>(`/periodicity/${id}`, data),

    delete: (id: number) => apiClient.delete<void>(`/periodicity/${id}`),
};