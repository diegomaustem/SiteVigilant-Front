import { useQuery } from '@tanstack/react-query';
import { monitorApi } from '../api/monitorApi';
import type { Monitor } from '../models/monitor.model';

export const MONITORS_QUERY_KEY = 'monitors';

export function useMonitors() {
  return useQuery<Monitor[]>({
    queryKey: [MONITORS_QUERY_KEY],
    queryFn: async () => {
      const response = await monitorApi.getAll();
      // 🔥 A API retorna { success: true, data: [...] }
      const data = response.data?.data; // <-- extrai o array
      return Array.isArray(data) ? data : [];
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}