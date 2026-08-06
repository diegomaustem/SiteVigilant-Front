import { useEffect, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AuthLayout } from '../../../shared/components/Layout/AuthLayout';
import { LoginForm } from '../components/LoginForm';
import { Typography, Link , Box} from '@mui/material';
import { toast } from 'react-hot-toast';
import { useAuthMutations } from '../hooks/useAuthMutations';
import type { LoginCredentials } from '../models/auth.model';
import logo from '/img/logo.png';
import { getErrorMessage } from '../../../utils/errorHandler';

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
    <AuthLayout title="">
       <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <img 
          src={logo} 
          alt="Vigilant Logo"
          style={{ 
            height: 75, 
            width: 'auto',
          }}
        />
      </Box>
      <LoginForm 
        onSubmit={handleSubmit} 
        isLoading={loginMutation.isPending} 
        error={loginMutation.error ? getErrorMessage(loginMutation.error) : null} 
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