import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  CircularProgress,
  Alert
} from '@mui/material';
import { useRoleOptions } from '../hooks/useRoles';

const userSchema = z
  .object({
    name: z.string().min(3, 'Mínimo 3 caracteres').max(100),
    email: z.string().email('E-mail inválido'),
    roleId: z.number().min(1, 'Selecione uma role'),
    password: z.string().min(6, 'Mínimo 6 caracteres').or(z.literal('')).optional(),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.password) {
        return data.password === data.confirmPassword;
      }
      return true;
    },
    {
      message: 'As senhas não coincidem',
      path: ['confirmPassword'],
    }
  );

type UserFormData = z.infer<typeof userSchema>;

interface UserFormProps {
  defaultValues?: Partial<UserFormData>;
  onSubmit: (data: UserFormData) => void;
  isLoading?: boolean;
  isEdit?: boolean;
}

export function UserForm({
  defaultValues,
  onSubmit,
  isLoading,
  isEdit = false,
}: UserFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues,
  });

  const { options: roleOptions, isLoading: isLoadingRoles, isError: isErrorRoles } = useRoleOptions();

  if (isLoadingRoles) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isErrorRoles) {
    return (
      <Alert severity="warning" sx={{ my: 2 }}>
        Erro ao carregar roles. Tente novamente.
      </Alert>
    );
  }

  const password = watch('password');

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
      <TextField
        fullWidth
        label="Nome"
        margin="normal"
        {...register('name')}
        error={!!errors.name}
        helperText={errors.name?.message}
      />

      <TextField
        fullWidth
        label="E-mail"
        margin="normal"
        type="email"
        {...register('email')}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <Controller
        name="roleId"
        control={control}
        defaultValue={defaultValues?.roleId || undefined}
        rules={{ required: 'Selecione uma role' }}
        render={({ field, fieldState: { error } }) => (
          <FormControl fullWidth margin="normal" error={!!error}>
            <InputLabel id="role-select-label">Role</InputLabel>
            <Select
              {...field}
              labelId="role-select-label"
              label="Role"
              value={field.value || ''}
            >
              <MenuItem value="">
                <em>Selecione uma role</em>
              </MenuItem>
              {roleOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {error && (
              <FormHelperText>{error.message}</FormHelperText>
            )}
          </FormControl>
        )}
      />

      <TextField
        fullWidth
        label={isEdit ? 'Nova senha (opcional)' : 'Senha'}
        margin="normal"
        type="password"
        {...register('password')}
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      {password && (
        <TextField
          fullWidth
          label="Confirmar senha"
          margin="normal"
          type="password"
          {...register('confirmPassword')}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
        />
      )}

      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 3 }}
        disabled={isLoading}
      >
        {isLoading ? 'Salvando...' : isEdit ? 'Atualizar' : 'Criar'}
      </Button>
    </Box>
  );
}