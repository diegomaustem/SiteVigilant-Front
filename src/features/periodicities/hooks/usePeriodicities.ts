import { useQuery } from '@tanstack/react-query';
import { periodicityApi } from '../api/periodicityApi';
import type { Periodicity, PeriodicityApi } from '../models/periodicity.model';

export const PERIODICITIES_QUERY_KEY = 'periodicities';

type PeriodicitiesResponse = {
  items: Periodicity[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasPrevious: boolean;
    hasNext: boolean;
  };
};

export function usePeriodicities(
  page: number = 1,
  limit: number = 10
) {
    return useQuery<PeriodicitiesResponse>({
    queryKey: [PERIODICITIES_QUERY_KEY, page, limit],
    queryFn: async () => {
      const response = await periodicityApi.getAllPaginated(page, limit);
      const { data, meta } = response.data;

      const items = data.map((item: PeriodicityApi): Periodicity => ({
        id: item.id,
        time: item.time,
        status: item.status,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
      }));
      return { items, meta };
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}