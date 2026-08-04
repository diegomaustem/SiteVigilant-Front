import { Link as RouterLink } from 'react-router-dom';
import { AuthLayout } from '../../../shared/components/Layout/AuthLayout';
import { RegisterForm } from '../components/RegisterForm';
import { Typography, Link } from '@mui/material';
import { useAuthMutations } from '../hooks/useAuthMutations';

export function RegisterPage() {
  const { registerMutation } = useAuthMutations();

  const handleSubmit = (data: any) => {
    registerMutation.mutate(data);
  };
  
  return (
    <AuthLayout title="Cadastro">
      <RegisterForm 
        onSubmit={handleSubmit} 
        isLoading={registerMutation.isPending} 
        error={registerMutation.error?.message} 
      />
      <Typography variant="body2" sx={{ mt: 2 }}>
        Já tem uma conta?{' '}
        <Link component={RouterLink} to="/login">
          Faça login
        </Link>
      </Typography>
    </AuthLayout>
  );
}