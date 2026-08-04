import { useEffect, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AuthLayout } from '../../../shared/components/Layout/AuthLayout';
import { LoginForm } from '../components/LoginForm';
import { Typography, Link } from '@mui/material';
import { toast } from 'react-hot-toast';
import { useAuthMutations } from '../hooks/useAuthMutations';
import type { LoginCredentials } from '../models/auth.model';

export function LoginPage() {
  const toastShown = useRef(false);
  const { loginMutation } = useAuthMutations();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('sessionExpired') && !toastShown.current) {
      toastShown.current = true;
      toast.error('Sua sessão expirou. Faça login novamente.');
    }
  }, []);

  const handleSubmit = (data: LoginCredentials) => {
    loginMutation.mutate(data);
  };

  return (
    <AuthLayout title="Login">
      <LoginForm 
        onSubmit={handleSubmit} 
        isLoading={loginMutation.isPending} 
        error={loginMutation.error?.message} 
      />
      <Typography variant="body2" sx={{ mt: 2 }}>
        Não tem uma conta?{' '}
        <Link component={RouterLink} to="/register">
          Cadastre-se
        </Link>
      </Typography>
    </AuthLayout>
  );
}