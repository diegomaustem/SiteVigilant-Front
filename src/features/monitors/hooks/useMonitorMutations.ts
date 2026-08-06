import { useMutation, useQueryClient } from '@tanstack/react-query';
import { monitorApi } from '../api/monitorApi';
import type { InputMonitor, MonitorApi } from '../models/monitor.model';
import { toast } from 'react-hot-toast';
import type { AxiosResponse } from 'axios';
import type { ApiResponse } from '../../../shared/types/api';

export const MONITORS_QUERY_KEY = 'monitors';

export function useMonitorMutations() {
  const queryClient = useQueryClient();

  const createMonitor = useMutation({
    mutationFn: (data: InputMonitor) => monitorApi.create(data),
    onSuccess: (response: AxiosResponse<ApiResponse<MonitorApi>>) => {
      const { message, data: monitor } = response.data;
      queryClient.invalidateQueries({ queryKey: [MONITORS_QUERY_KEY] });

      toast.success(message || `"${monitor.name}" criado com sucesso.`);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Erro ao criar monitor');
    },
  });

  const updateMonitor = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<InputMonitor> }) =>
      monitorApi.update(id, data),
    onSuccess: (response: AxiosResponse<ApiResponse<MonitorApi>>) => {
      const { message, data: monitor } = response.data;
      queryClient.invalidateQueries({ queryKey: [MONITORS_QUERY_KEY] });
      
      toast.success(message || `"${monitor.name}" atualizada com sucesso.`);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Erro ao atualizar monitor');
    },
  });

  const deleteMonitor = useMutation({
    mutationFn: (id: number) => monitorApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MONITORS_QUERY_KEY] });
      toast.success('Monitor excluído!');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Erro ao excluir monitor');
    },
  });

  return { createMonitor, updateMonitor, deleteMonitor };
}