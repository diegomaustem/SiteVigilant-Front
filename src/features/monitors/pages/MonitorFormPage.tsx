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

  const { data, isLoading } = useMonitors(1, 100);
  const { createMonitor, updateMonitor } = useMonitorMutations();
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