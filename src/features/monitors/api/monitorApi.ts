import { apiClient } from '../../../api/apiClient';
import type { Monitor, InputMonitor } from '../models/monitor.model';

export const monitorApi = {
  // Buscar todos os monitores
  // getAll: () => apiClient.get<Monitor[]>('/monitors'),

   getAll: () => apiClient.get<Monitor[]>('/monitors-log'),

  // Buscar um monitor por ID
  getById: (id: number) => apiClient.get<Monitor>(`/monitors/${id}`),

  // Criar um novo monitor
  create: (data: InputMonitor) => apiClient.post<Monitor>('/monitor', data),

  // Atualizar um monitor existente (PATCH)
  update: (id: number, data: Partial<InputMonitor>) =>
    apiClient.patch<Monitor>(`/monitors/${id}`, data),

  // Excluir um monitor
  delete: (id: number) => apiClient.delete<void>(`/monitors/${id}`),
};