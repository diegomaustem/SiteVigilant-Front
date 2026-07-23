import { useMonitors } from '../hooks/useMonitors';
import { useMonitorMutations } from '../hooks/useMonitorMutations';
import type { Monitor } from '../models/monitor.model';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ConfirmDialog } from '../../../shared/components/ConfirmDialog';
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
} from '@mui/material';

export function MonitorList() {
  const navigate = useNavigate();
  const { data: monitors, isLoading, error } = useMonitors();
  const { deleteMonitor } = useMonitorMutations();
  const [monitorToDelete, setMonitorToDelete] = useState<Monitor | null>(null);

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
        Erro ao carregar monitores. Tente novamente.
      </Alert>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Monitores
        </Typography>
        <Button variant="contained" onClick={() => navigate('/monitors/new')}>
          Novo Monitor
        </Button>
      </Box>

      <Grid container spacing={3}>
        {monitors?.map((monitor) => (
           <Grid size={{ xs: 12, sm: 6, md: 4 }} key={monitor.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {monitor.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {monitor.description || 'Sem descrição'}
                </Typography>
                <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
                  <strong>URL:</strong> {monitor.url}
                </Typography>
                <Typography variant="body2">
                  <strong>Periodicidade:</strong> {monitor.periodicityId}
                </Typography>
                <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>
                  Criado em: {new Date(monitor.createdAt).toLocaleDateString('pt-BR')}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => navigate(`/monitors/${monitor.id}/edit`)}
                >
                  Editar
                </Button>
                <Button
                  size="small"
                  color="error"
                  onClick={() => setMonitorToDelete(monitor)}
                >
                  Excluir
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <ConfirmDialog
        open={!!monitorToDelete}
        title="Excluir monitor"
        message={`Deseja realmente excluir o monitor "${monitorToDelete?.name}"?`}
        onConfirm={() => {
          if (monitorToDelete) {
            deleteMonitor.mutate(monitorToDelete.id);
            setMonitorToDelete(null);
          }
        }}
        onCancel={() => setMonitorToDelete(null)}
      />
    </Box>
  );
}