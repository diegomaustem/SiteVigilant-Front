import { apiClient } from '../../../api/apiClient';
import type { PaginatedResponse } from '../../../shared/types/api';
import type { MonitorLogApi } from '../models/monitorLog.model';

export const monitorLogApi = {

  getAllPaginated: (page: number = 1, limit: number = 10) => { 
    return apiClient.get<PaginatedResponse<MonitorLogApi>>('/monitors-log-paginated', {
      params: { page, limit }
    });
  }
};