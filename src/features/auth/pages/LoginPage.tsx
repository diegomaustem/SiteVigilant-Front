import { useEffect, useRef, useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { AuthLayout } from '../../../shared/components/Layout/AuthLayout';
import { LoginForm } from '../components/LoginForm';
import { authApi } from '../api/authApi';
import { Typography, Link } from '@mui/material';
import { toast } from 'react-hot-toast';

export function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const toastShown = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('sessionExpired') && !toastShown.current) {
      toastShown.current = true;
      toast.error('Sua sessão expirou. Faça login novamente.');
    }
  }, []);

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authApi.login(data);
      const token = response.data?.data?.token;

       if (!token) {
        throw new Error('Token não encontrado na resposta');
      }

      localStorage.setItem('token', token);
      toast.success('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || err?.response?.data?.error || 'Erro ao fazer login.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Login">
      <LoginForm onSubmit={handleSubmit} isLoading={isLoading} error={error} />
      <Typography variant="body2" sx={{ mt: 2 }}>
        Não tem uma conta?{' '}
        <Link component={RouterLink} to="/register">
          Cadastre-se
        </Link>
      </Typography>
    </AuthLayout>
  );
}