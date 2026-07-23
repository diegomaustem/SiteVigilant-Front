import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TextField, Button, Box } from '@mui/material';

const monitorSchema = z.object({
  userId: z.number().min(1, 'Obrigatório'),
  periodicityId: z.number().min(1, 'Selecione uma periodicidade'),
  name: z.string().min(3, 'Mínimo 3 caracteres').max(100),
  description: z.string().optional(),
  url: z.string().url('URL inválida'),
});

type MonitorFormData = z.infer<typeof monitorSchema>;

interface MonitorFormProps {
  defaultValues?: Partial<MonitorFormData>;
  onSubmit: (data: MonitorFormData) => void;
  isLoading?: boolean;
}

export function MonitorForm({ defaultValues, onSubmit, isLoading }: MonitorFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MonitorFormData>({
    resolver: zodResolver(monitorSchema),
    defaultValues,
  });

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
      <TextField
        fullWidth
        label="ID do Usuário"
        type="number"
        margin="normal"
        {...register('userId', { valueAsNumber: true })}
        error={!!errors.userId}
        helperText={errors.userId?.message}
      />
      <TextField
        fullWidth
        label="ID da Periodicidade"
        type="number"
        margin="normal"
        {...register('periodicityId', { valueAsNumber: true })}
        error={!!errors.periodicityId}
        helperText={errors.periodicityId?.message}
      />
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
        label="Descrição"
        margin="normal"
        multiline
        rows={3}
        {...register('description')}
        error={!!errors.description}
        helperText={errors.description?.message}
      />
      <TextField
        fullWidth
        label="URL"
        margin="normal"
        {...register('url')}
        error={!!errors.url}
        helperText={errors.url?.message}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 3 }}
        disabled={isLoading}
      >
        {isLoading ? 'Salvando...' : 'Salvar'}
      </Button>
    </Box>
  );
}