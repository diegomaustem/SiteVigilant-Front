import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { authApi } from '../api/authApi';
import { useAuthStore } from '../../../stores/authStore';
import type { LoginCredentials, RegisterData } from '../models/auth.model';

export function useAuthMutations() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { login, logout } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => authApi.login(credentials),
    onSuccess: (response) => {
      const { token, user } = response.data.data;

      login(user, token);
      queryClient.setQueryData(['user'], user);
      
      toast.success('Login realizado com sucesso!');
      navigate('/dashboard');
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Erro ao fazer login';
      toast.error(message);
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterData) => authApi.register(data),
    onSuccess: (response) => {
      const message = response.data?.message || 'Conta criada com sucesso!';
      toast.success(message);
      navigate('/login');
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Erro ao criar conta';
      toast.error(message);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      logout();

      queryClient.clear();

      toast.success('Logout realizado');
      navigate('/login');
    },
    onError: (error: any) => {
      console.log(error);
      logout();
      queryClient.clear();
      toast.error('Erro ao fazer logout');
    },
  });

  return {
    loginMutation,
    registerMutation,
    logoutMutation,
  };
}