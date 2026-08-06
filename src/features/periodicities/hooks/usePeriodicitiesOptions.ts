import { useQuery } from '@tanstack/react-query';
import { periodicityApi } from '../api/periodicityApi';
import type { Periodicity, PeriodicityApi } from '../models/periodicity.model';
import { useMemo } from 'react';

export const PERIODICITIES_OPTIONS_QUERY_KEY = 'periodicities-options';

export function usePeriodicitiesOptions() {
  const query = useQuery<Periodicity[]>({
    queryKey: [PERIODICITIES_OPTIONS_QUERY_KEY],
    queryFn: async () => {
      const response = await periodicityApi.getAll();
      const items = response.data.data || [];
      
      return items.map((item: PeriodicityApi): Periodicity => ({
        id: item.id,
        time: item.time,
        status: item.status,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
      }));
    },
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 1,
  });

  const options = useMemo(() => {
    if (!query.data) return [];
    return query.data.map((item: Periodicity): { value: number; label: string } => ({
      value: item.id,
      label: item.time,
    }));
  }, [query.data]);

  return {
    ...query,
    options,
  };
}