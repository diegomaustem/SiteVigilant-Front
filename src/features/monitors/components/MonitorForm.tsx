import { useForm } from 'react-hook-form';
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
  Alert,
  Skeleton 
} from '@mui/material';
import { usePeriodicitiesOptions } from '../../periodicities/hooks/usePeriodicitiesOptions';
import { useAuthUser } from '../../../stores';

const monitorSchema = z.object({
  periodicityId: z.number().min(1, 'Selecione uma periodicidade'),
  name: z.string().min(3, 'Mínimo 3 caracteres').max(100),
  description: z.string().optional(),
  url: z.string().url('URL inválida'),
});

type MonitorFormData = z.infer<typeof monitorSchema>;
type MonitorPayload = MonitorFormData & { userId: number };

interface MonitorFormProps {
  defaultValues?: Partial<MonitorFormData>;
  onSubmit: (data: MonitorPayload) => void;
  isLoading?: boolean;
}

export function MonitorForm({ defaultValues, onSubmit, isLoading }: MonitorFormProps) {
  const loggedUser = useAuthUser();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<MonitorFormData>({
    resolver: zodResolver(monitorSchema),
    defaultValues,
  });

  const { 
    data: periodicities,
    isLoading: isLoadingPeriodicities, 
    isError
  } = usePeriodicitiesOptions();

  const periodicityId = watch('periodicityId');
  const handleFormSubmit = (data: MonitorFormData) => {
    onSubmit({
      ...data,
      userId: loggedUser!.id,
    });
  };

  if (isLoadingPeriodicities) {
    return (
      <Box sx={{ mt: 2 }}>
        <Skeleton variant="rectangular" height={56} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" height={56} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" height={56} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" height={56} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" height={56} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" height={36} sx={{ mt: 3 }} />
      </Box>
    );
  }

  if (isError) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        Erro ao carregar periodicidades. Tente novamente.
      </Alert>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} sx={{ mt: 2 }}>
      <FormControl fullWidth margin="normal" error={!!errors.periodicityId}>
        <InputLabel id="periodicity-select-label">Periodicidade</InputLabel>
        <Select
          labelId="periodicity-select-label"
          label="Periodicidade"
          value={periodicityId || ''}
          onChange={(e) => setValue('periodicityId', Number(e.target.value))}
          disabled={isLoading || isLoadingPeriodicities}
          MenuProps={{
            sx: {
              '& .MuiPaper-root': {
                maxHeight: 250,
              },
            },
          }}
        >
          <MenuItem value="">
            <em>Selecione uma periodicidade</em>
          </MenuItem>
          {periodicities?.map((periodicity) => (
            <MenuItem key={periodicity.id} value={periodicity.id}>
              {periodicity.time}
            </MenuItem>
          ))}
        </Select>
        {errors.periodicityId && (
          <FormHelperText>{errors.periodicityId.message}</FormHelperText>
        )}
      </FormControl>

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