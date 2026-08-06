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
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';

export function MonitorList() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data, isLoading, error } = useMonitors(page, limit);
  const { deleteMonitor } = useMonitorMutations();
  const [monitorToDelete, setMonitorToDelete] = useState<Monitor | null>(null);
  
  const monitors = data?.items || [];
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
        Erro ao carregar monitores. Tente novamente.
      </Alert>
    );
  }

  return (
    <Box>
      {/* Cabeçalho */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Monitores
        </Typography>
        <Button variant="contained" onClick={() => navigate('/monitors/new')}>
          Novo Monitor
        </Button>
      </Box>

      {/* Lista vazia */}
      {monitors.length === 0 && (
        <Typography variant="body1" color="text.secondary" sx={{ mt: 4, textAlign: 'center' }}>
          Nenhum monitor encontrado.
        </Typography>
      )}

      {/* Grid de cards */}
      <Grid container spacing={3}>
        {monitors.map((monitor) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={monitor.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  <strong>Título:</strong> {monitor.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {monitor.description || 'Sem descrição'}
                </Typography>
                <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
                  <strong>URL:</strong> {monitor.url}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  <strong>Periodicidade:</strong> {monitor.periodicityName}
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

      {/* 🔹 Paginação */}
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
            Total: {meta.total} registros
          </Typography>
        </Box>
      )}

      {/* ConfirmDialog */}
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