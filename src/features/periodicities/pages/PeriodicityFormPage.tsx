import { useParams, useNavigate } from 'react-router-dom';
import { usePeriodicities } from '../hooks/usePeriodicities';
import { usePeriodicityMutations } from '../hooks/usePeriodicityMutations';
import { PeriodicityForm } from '../components/PeriodicityForm';
import type { InputPeriodicity } from '../models/periodicity.model';
import { Box, Typography, CircularProgress } from '@mui/material';

export function PeriodcityFormPage() {
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;
  const navigate = useNavigate();

  const { data, isLoading } = usePeriodicities(1, 100);
  const { createPeriodicity, updatePeriodicity, deletePeriodicity } = usePeriodicityMutations();

  const items = data?.items ?? [];
  const defaultValues = isEdit
    ? items.find((item) => item.id === Number(id))
    : undefined;

  if (isLoading && isEdit) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  const handleSubmit = (data: InputPeriodicity) => {
    if (isEdit) {
      updatePeriodicity.mutate(
        { id: Number(id), data },
        { onSuccess: () => navigate('/periodicities') }
      );
    } else {
      createPeriodicity.mutate(data, {
        onSuccess: () => navigate('/periodicities'),
      });
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {isEdit ? 'Editar Periodicidade' : 'Nova Periodicidade'}
      </Typography>
      <PeriodicityForm
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        isLoading={createPeriodicity.isPending || updatePeriodicity.isPending}
      />
    </Box>
  );
}