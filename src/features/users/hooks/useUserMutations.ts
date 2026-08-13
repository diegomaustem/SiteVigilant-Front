import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { userApi } from '../api/userApi';
import { USERS_QUERY_KEY } from './useUsers';
import type { InputUser, UserApi } from '../models/user.model';
import type { AxiosResponse } from 'axios';
import type { ApiResponse } from '../../../shared/types/api';

export function useUserMutations() {
  const queryClient = useQueryClient();

  const createUser = useMutation({
    mutationFn: (data: InputUser) => userApi.create(data),
    onSuccess: (response: AxiosResponse<ApiResponse<UserApi>>) => {
      const { message, data: user } = response.data;
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });

      toast.success(message || `Usuário "${user.name}" criado com sucesso.`);
    },
    onError: (error: any) => {
       toast.error(error?.response?.data?.message || 'Erro ao criar usuário.');
    },
  });

  const updateUser = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<InputUser> }) =>
      userApi.update(id, data),
    onSuccess: (response) => {
      const { message, data: user } = response.data;
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });

      toast.success(message || `"${user.name}" atualizado com sucesso.`);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Erro ao atualizar usuário.');
    },
  });

  const deleteUser = useMutation({
    mutationFn: (id: number) => userApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
      toast.success('Usuário excluído com sucesso.');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Erro ao excluir usuário.');
    },
  });

  return { createUser, updateUser, deleteUser };
}