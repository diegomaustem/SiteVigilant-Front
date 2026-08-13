export interface UserBase {
  name: string;
  email: string;
  roleId: number;
  password?: string;
}

export type InputUser = UserBase & {
  password: string;
};

export interface User extends UserBase {
  id: number;
  createdAt: string;
  updatedAt: string;
}

export type UserApi = {
  id: number;
  name: string;
  email: string;
  password?: string;
  role_id: number;   
  created_at: string;   
  updated_at: string;   
};

export const ROLE_NAMES: Record<number, string> = {
  1: 'Usuário', 
  2: 'Administrador', 
  3: 'Moderador',   
};

export const getRoleName = (roleId: number): string => {
  return ROLE_NAMES[roleId] || `Role ${roleId}`;
};

export const ROLE_OPTIONS = [
  { value: 1, label: 'Usuário' },
  { value: 2, label: 'Administrador' },
  { value: 3, label: 'Moderador' },
];