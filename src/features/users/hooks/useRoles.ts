import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../../api/apiClient';

export const ROLES_QUERY_KEY = 'roles';

export interface Role {
  id: number;
  name: string;
  description: string;
}

export function useRoles() {
  return useQuery<Role[]>({
    queryKey: [ROLES_QUERY_KEY],
    queryFn: async () => {
      const response = await apiClient.get<{ data: Role[] }>('/roles');
      return response.data.data;
    },
    staleTime: 1000 * 60 * 60, 
    refetchOnWindowFocus: false,
    retry: 1,
  });
}

export function useRoleOptions() {
  const { 
    data: roles, 
    isLoading,
    isError,
    error,
    refetch,
  } = useRoles();
  
  const options = roles?.map((role) => ({
    value: role.id,
    label: role.name.charAt(0).toUpperCase() + role.name.slice(1),
  })) || [];

  return { 
    options, 
    isLoading,
    isError,
    error,
    refetch,
    hasData: options.length > 0,
  };
}