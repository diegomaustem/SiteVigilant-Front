import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '../api/authApi';
import type { LoginCredentials, RegisterData } from '../models/auth.model';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useAuthMutations() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Login
   const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => authApi.login(credentials),
    onSuccess: (response) => {
      // 🔥 A resposta tem um data aninhado
      const { token, user } = response.data.data;

      // Salva o token no localStorage
      localStorage.setItem('token', token);
      
      // Salva os dados do usuário no cache do React Query
      queryClient.setQueryData(['user'], user);
      
      toast.success('Login realizado com sucesso!');
      navigate('/dashboard');
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message 
        || error?.response?.data?.error 
        || error?.message 
        || 'Erro ao fazer login';
      toast.error(message);
    },
  });

  // Registro
  const registerMutation = useMutation({
    mutationFn: (data: RegisterData) => authApi.register(data),
    onSuccess: () => {
      toast.success('Conta criada com sucesso! Faça login.');
      navigate('/login');
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Erro ao criar conta';
      toast.error(message);
    },
  });

  // Logout
  const logoutMutation = useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      localStorage.removeItem('token');
      queryClient.clear();
      toast.success('Logout realizado');
      navigate('/login');
    },
    onError: (error: any) => {
        console.log(error)
      toast.error('Erro ao fazer logout');
    },
  });

  return {
    loginMutation,
    registerMutation,
    logoutMutation,
  };
}