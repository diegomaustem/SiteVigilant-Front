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
  Typography,
} from '@mui/material';

const periodicitySchema = z.object({
  time: z.string().min(1, 'A periodicidade é obrigatória.'),
  status: z.boolean(),
});

type PeriodicityFormData = z.infer<typeof periodicitySchema>;

interface MonitorFormProps {
  defaultValues?: Partial<PeriodicityFormData>;
  onSubmit: (data: PeriodicityFormData) => void;
  isLoading?: boolean;
}

export function PeriodicityForm({ defaultValues, onSubmit, isLoading }: MonitorFormProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PeriodicityFormData>({
    resolver: zodResolver(periodicitySchema), 
    defaultValues,
  });

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
        Informe a periodicidade nos formatos - Minuto, Hora ou Dia (ex: 1M, 3H, 5D)
      </Typography>
      <TextField
        fullWidth
        label="Defina a periodicidade"
        margin="normal"
        {...register('time')} 
        error={!!errors.time}
        helperText={errors.time?.message}
      />

      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth margin="normal" error={!!errors.status}>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              label="Status"
              value={field.value ?? ''} 
              onChange={(e) => field.onChange(e.target.value === 'true')}
            >
              <MenuItem value="true">Ativo</MenuItem>
              <MenuItem value="false">Inativo</MenuItem>
            </Select>
            <FormHelperText>{errors.status?.message}</FormHelperText>
          </FormControl>
        )}
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