import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
} from '@mui/material';
import { Add, MonitorHeart, PlayArrow, Schedule } from '@mui/icons-material';
// import { useMonitors } from '../../monitors/hooks/useMonitors';
import type { Monitor } from '../../monitors/models/monitor.model';

import { useMonitors } from '../../monitors/hooks/useMonitors';

export function DashboardPage() {
  const navigate = useNavigate();
  const { data: monitors, isLoading, error } = useMonitors();

  // Estatísticas
  const totalMonitors = monitors?.length || 0;
  const activeMonitors = monitors?.filter((m) => m.url?.trim()).length || 0;
  const lastUpdated = monitors?.length
    ? new Date(Math.max(...monitors.map((m) => new Date(m.updatedAt).getTime())))
    : null;

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography sx={{ color: 'error.main', textAlign: 'center', mt: 5 }}>
        Erro ao carregar monitores. Tente novamente.
      </Typography>
    );
  }

  return (
    <Box>
      {/* Cabeçalho */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Dashboard
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate('/monitors/new')}
        >
          Novo Monitor
        </Button>
      </Box>

      {/* Cards de Estatísticas */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <MonitorHeart color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Total de Monitores</Typography>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                {totalMonitors}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PlayArrow color="success" sx={{ mr: 1 }} />
                <Typography variant="h6">Ativos</Typography>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                {activeMonitors}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Schedule color="info" sx={{ mr: 1 }} />
                <Typography variant="h6">Última Atualização</Typography>
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {lastUpdated ? lastUpdated.toLocaleDateString('pt-BR') : 'N/A'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Lista de Monitores */}
      <Typography variant="h5" gutterBottom>
        Monitores Recentes
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>URL</TableCell>
              <TableCell>Periodicidade</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {monitors && monitors.length > 0 ? (
              monitors.slice(0, 5).map((monitor: Monitor) => (
                <TableRow key={monitor.id}>
                  <TableCell>{monitor.name}</TableCell>
                  <TableCell>{monitor.url}</TableCell>
                  <TableCell>{monitor.periodicityId}</TableCell>
                  <TableCell>
                    <Chip
                      label={monitor.url ? 'Ativo' : 'Inativo'}
                      color={monitor.url ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => navigate(`/monitors/${monitor.id}/edit`)}
                    >
                      Editar
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  Nenhum monitor cadastrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {monitors && monitors.length > 5 && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={() => navigate('/monitors')}>
            Ver todos os monitores
          </Button>
        </Box>
      )}
    </Box>
  );
}