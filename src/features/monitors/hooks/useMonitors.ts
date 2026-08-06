import { useQuery } from '@tanstack/react-query';
import { monitorApi } from '../api/monitorApi';
import type { Monitor, MonitorApi } from '../models/monitor.model';
import { usePeriodicitiesOptions } from '../../periodicities/hooks/usePeriodicitiesOptions';

export const MONITORS_QUERY_KEY = 'monitors';

export interface MonitorWithPeriodicity extends Monitor {
  periodicityName: string;
}

type MonitorsResponse = {
  items: MonitorWithPeriodicity[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasPrevious: boolean;
    hasNext: boolean;
  };
};

export function useMonitors(
  page: number = 1,
  limit: number = 10
) {
  const { data: periodicities } = usePeriodicitiesOptions();

  return useQuery<MonitorsResponse>({
    queryKey: [MONITORS_QUERY_KEY, page, limit],
    queryFn: async () => {
      const response = await monitorApi.getAllPaginated(page, limit);
      const { data, meta } = response.data;

      const items = data.map((item: MonitorApi): MonitorWithPeriodicity => {
        const periodicity = periodicities?.find(p => p.id === item.periodicity_id);
        
        return {
          id: item.id,
          userId: item.user_id,
          periodicityId: item.periodicity_id,
          name: item.name,
          description: item.description || '',
          url: item.url,
          createdAt: item.created_at,
          updatedAt: item.updated_at,
          periodicityName: periodicity?.time || 'N/A',
        };
      });

      return { items, meta };
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}