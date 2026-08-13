import { useQuery } from '@tanstack/react-query';
import { userApi } from '../api/userApi';
import type { User } from '../models/user.model';
import { mapUserApiToUser, mapUsersApiToUsers } from '../utils/userMappers';

export const USERS_QUERY_KEY = 'users';

export type UsersResponse = {
  items: User[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasPrevious: boolean;
    hasNext: boolean;
  };
};

export function useUsers(
  page: number = 1,
  limit: number = 10,
  options?: {
    refetchInterval?: number;
    enabled?: boolean;
  }
) {
  return useQuery<UsersResponse>({
    queryKey: [USERS_QUERY_KEY, page, limit],
    queryFn: async () => {
      const response = await userApi.getAllPaginated(page, limit);
      const { data, meta } = response.data;

      const items = mapUsersApiToUsers(data);

      return { items, meta };
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchInterval: options?.refetchInterval,
    enabled: options?.enabled !== undefined ? options.enabled : true,
  });
}

export function useUser(id?: number) {
  return useQuery<User | null>({
    queryKey: [USERS_QUERY_KEY, id],
    queryFn: async () => {
      if (!id) return null;
      const response = await userApi.getById(id);
      return mapUserApiToUser(response.data.data);
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}