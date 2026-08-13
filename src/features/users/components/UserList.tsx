import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  Chip,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { useUsers } from '../hooks/useUsers';
import { useUserMutations } from '../hooks/useUserMutations';
import { ConfirmDialog } from '../../../shared/components/ConfirmDialog';
import type { User } from '../models/user.model';
import { getRoleName } from '../models/user.model';

export function UserList() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const { data, isLoading, error } = useUsers(page, limit);
  const { deleteUser } = useUserMutations();

  const users = data?.items || [];
  const meta = data?.meta;

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleLimitChange = (event: SelectChangeEvent<number>) => {
    setLimit(Number(event.target.value));
    setPage(1);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        Erro ao carregar usuários. Tente novamente.
      </Alert>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Usuários
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate('/users/new')}
        >
          Novo Usuário
        </Button>
      </Box>

      {users.length === 0 && (
        <Typography variant="body1" color="text.secondary" sx={{ mt: 4, textAlign: 'center' }}>
          Nenhum usuário encontrado.
        </Typography>
      )}

      <Grid container spacing={3}>
        {users.map((user) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={user.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {user.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {user.email}
                </Typography>
                <Chip
                  label={getRoleName(user.roleId)}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
                <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>
                  Criado em: {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  startIcon={<Edit />}
                  onClick={() => navigate(`/users/${user.id}/edit`)}
                >
                  Editar
                </Button>
                <Button
                  size="small"
                  startIcon={<Delete />}
                  color="error"
                  onClick={() => setUserToDelete(user)}
                >
                  Excluir
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {meta && meta.totalPages > 1 && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 4,
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel id="limit-select-label">Por página</InputLabel>
            <Select
              labelId="limit-select-label"
              value={limit}
              label="Por página"
              onChange={handleLimitChange}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
          </FormControl>

          <Pagination
            count={meta.totalPages}
            page={meta.page}
            onChange={handlePageChange}
            color="primary"
            showFirstButton
            showLastButton
          />

          <Typography variant="body2" color="text.secondary">
            Total: {meta.total} usuários
          </Typography>
        </Box>
      )}

      <ConfirmDialog
        open={!!userToDelete}
        title="Excluir usuário"
        message={`Deseja realmente excluir o usuário "${userToDelete?.name}"?`}
        onConfirm={() => {
          if (userToDelete) {
            deleteUser.mutate(userToDelete.id);
            setUserToDelete(null);
          }
        }}
        onCancel={() => setUserToDelete(null)}
      />
    </Box>
  );
}