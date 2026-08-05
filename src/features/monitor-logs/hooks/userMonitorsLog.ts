import { useQuery, keepPreviousData, type UseQueryResult} from '@tanstack/react-query';
import { monitorLogApi } from '../api/monitorLogApi';
import type { Log } from '../models/monitorLog.model';
import { mapMonitorLogsApiToLogs } from '../utils/logMappers';

export const MONITORS_LOG_QUERY_KEY = 'monitors_log';

type MonitorsLogResponse = {
  items: Log[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasPrevious: boolean;
    hasNext: boolean;
  };
};

export type UseMonitorsLogResult = UseQueryResult<MonitorsLogResponse, Error>;

export function userMonitorsLog(
  page: number = 1,
  limit: number = 10,
  options?: {
    refetchInterval?: number;
    enabled?: boolean;
  }
) {
  return useQuery<MonitorsLogResponse>({
    queryKey: [MONITORS_LOG_QUERY_KEY, page, limit],
    queryFn: async () => {
      const response = await monitorLogApi.getAllPaginated(page, limit);
      const { data, meta } = response.data;
      

      const items = mapMonitorLogsApiToLogs(data);
      
      return { items, meta };
    },
    refetchInterval: options?.refetchInterval || 30000, 
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true, 
    refetchOnReconnect: true, 
    staleTime: 1000 * 10,
    placeholderData: keepPreviousData, 
    enabled: options?.enabled !== undefined ? options.enabled : true,
  });
}