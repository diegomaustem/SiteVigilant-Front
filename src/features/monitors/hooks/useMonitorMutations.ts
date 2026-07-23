import { useMutation, useQueryClient } from '@tanstack/react-query';
import { monitorApi } from '../api/monitorApi';
import type { InputMonitor } from '../models/monitor.model';
import { toast } from 'react-hot-toast';

export const MONITORS_QUERY_KEY = 'monitors';

export function useMonitorMutations() {
  const queryClient = useQueryClient();

  // Criar monitor
  const createMonitor = useMutation({
    mutationFn: (data: InputMonitor) => monitorApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MONITORS_QUERY_KEY] });
      toast.success('Monitor criado com sucesso!');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Erro ao criar monitor');
    },
  });

  // Atualizar monitor
  const updateMonitor = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<InputMonitor> }) =>
      monitorApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MONITORS_QUERY_KEY] });
      toast.success('Monitor atualizado!');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Erro ao atualizar monitor');
    },
  });

  // Excluir monitor
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