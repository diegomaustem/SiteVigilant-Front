import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { AuthLayout } from '../../../shared/components/Layout/AuthLayout';
import { RegisterForm } from '../components/RegisterForm';
import { authApi } from '../api/authApi';
import { Typography, Link } from '@mui/material';
import { toast } from 'react-hot-toast';

export function RegisterPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    setError(null);
    try {
      await authApi.register(data);
      toast.success('Registro realizado! Faça login.');
      navigate('/login');
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || err?.response?.data?.error || 'Erro ao registrar usuário.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Cadastro">
      <RegisterForm onSubmit={handleSubmit} isLoading={isLoading} error={error} />
      <Typography variant="body2" sx={{ mt: 2 }}>
        Já tem uma conta?{' '}
        <Link component={RouterLink} to="/login">
          Faça login
        </Link>
      </Typography>
    </AuthLayout>
  );
}