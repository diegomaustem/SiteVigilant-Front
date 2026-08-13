import { useNavigate, useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import { UserForm } from '../components/UserForm';
import { useUser } from '../hooks/useUsers';
import { useUserMutations } from '../hooks/useUserMutations';
import type { InputUser } from '../models/user.model';

export function UserEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const userId = Number(id);

  const { data: user, isLoading, error } = useUser(userId);
  const { updateUser } = useUserMutations();

  const handleSubmit = (data: any) => {
    const updateData: Partial<InputUser> = {
      name: data.name,
      email: data.email,
      roleId: data.roleId,
      password: data.password || undefined,
    };
    updateUser.mutate(
      { id: userId, data: updateData },
      { onSuccess: () => navigate('/users') }
    );
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !user) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        Usuário não encontrado.
      </Alert>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Editar Usuário
      </Typography>
      <UserForm
        defaultValues={{
          name: user.name,
          email: user.email,
          roleId: user.roleId,
        }}
        onSubmit={handleSubmit}
        isLoading={updateUser.isPending}
        isEdit
      />
    </Box>
  );
}