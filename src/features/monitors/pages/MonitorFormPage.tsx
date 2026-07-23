import { useParams, useNavigate } from 'react-router-dom';
import { useMonitors } from '../hooks/useMonitors';
import { useMonitorMutations } from '../hooks/useMonitorMutations';
import { MonitorForm } from '../components/MonitorForm';
import type { InputMonitor } from '../models/monitor.model';
import { Box, Typography, CircularProgress } from '@mui/material';

export function MonitorFormPage() {
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;
  const navigate = useNavigate();

  // Busca a lista de monitores (ou poderia usar um hook específico getById)
  const { data: monitors, isLoading } = useMonitors();
  const { createMonitor, updateMonitor } = useMonitorMutations();

  const defaultValues = isEdit
    ? monitors?.find((m) => m.id === Number(id))
    : undefined;

  if (isLoading && isEdit) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  const handleSubmit = (data: InputMonitor) => {
    if (isEdit) {
      updateMonitor.mutate(
        { id: Number(id), data },
        {
          onSuccess: () => navigate('/monitors'),
        }
      );
    } else {
      createMonitor.mutate(data, {
        onSuccess: () => navigate('/monitors'),
      });
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {isEdit ? 'Editar Monitor' : 'Novo Monitor'}
      </Typography>
      <MonitorForm
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        isLoading={createMonitor.isPending || updateMonitor.isPending}
      />
    </Box>
  );
}