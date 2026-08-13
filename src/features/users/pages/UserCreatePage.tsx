import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { UserForm } from '../components/UserForm';
import { useUserMutations } from '../hooks/useUserMutations';
import type { InputUser } from '../models/user.model';

export function UserCreatePage() {
  const navigate = useNavigate();
  const { createUser } = useUserMutations();

  const handleSubmit = (data: any) => {
    createUser.mutate(data as InputUser, {
      onSuccess: () => navigate('/users'),
    });
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Novo Usuário
      </Typography>
      <UserForm onSubmit={handleSubmit} isLoading={createUser.isPending} />
    </Box>
  );
}