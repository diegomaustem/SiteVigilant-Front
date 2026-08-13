import type { User } from '../models/user.model';

export const mapUserApiToUser = (item: any): User => ({
  id: item.id,
  name: item.name,
  email: item.email,
  roleId: item.roleId ?? item.role_id ?? 0,
  createdAt: item.createdAt ?? item.created_at ?? '',
  updatedAt: item.updatedAt ?? item.updated_at ?? '',
});

export const mapUsersApiToUsers = (items: any[]): User[] =>
  items.map(mapUserApiToUser);