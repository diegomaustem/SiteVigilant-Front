import { useMutation, useQueryClient } from '@tanstack/react-query';
import { periodicityApi } from '../api/periodicityApi';
import type { InputPeriodicity, PeriodicityApi } from '../models/periodicity.model';
import { toast } from 'react-hot-toast';
import type { AxiosResponse } from 'axios';
import type { ApiResponse } from '../../../shared/types/api';

export const PERIODICITIES_QUERY_KEY = 'periodicities';

export function usePeriodicityMutations() {
  const queryClient = useQueryClient();

  const createPeriodicity = useMutation({
    mutationFn: (data: InputPeriodicity) => periodicityApi.create(data),
    onSuccess: (response: AxiosResponse<ApiResponse<PeriodicityApi>>) => {
      const { message, data: periodicity } = response.data;
      queryClient.invalidateQueries({ queryKey: [PERIODICITIES_QUERY_KEY] });
      
      toast.success(message || `"${periodicity.time}" criada com sucesso.`);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Erro ao criar periodicidade.');
    },
  });

  const updatePeriodicity = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<InputPeriodicity> }) =>
      periodicityApi.update(id, data),
    onSuccess: (response: AxiosResponse<ApiResponse<PeriodicityApi>>) => {
      const { message, data: periodicity } = response.data;
      queryClient.invalidateQueries({ queryKey: [PERIODICITIES_QUERY_KEY] });

      toast.success(message || `"${periodicity.time}" atualizada com sucesso.`);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Erro ao atualizar periodicidade');
    },
  });

  const deletePeriodicity = useMutation({
    mutationFn: (id: number) => periodicityApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PERIODICITIES_QUERY_KEY] });
      toast.success('Periodicidade excluída com sucesso.');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Erro ao excluir periodicidade');
    },
  });

  return { createPeriodicity, updatePeriodicity, deletePeriodicity};
}