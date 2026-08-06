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
  Alert
} from '@mui/material';
import { MonitorHeart, PlayArrow, Schedule } from '@mui/icons-material';
import { userMonitorsLog } from '../../monitor-logs/hooks/userMonitorsLog';

export function DashboardPage() {
  const navigate = useNavigate();
  const { 
    data, 
    isLoading, 
    error,
    refetch  
  } = userMonitorsLog(1, 10, {
    refetchInterval: 30000,
  });
  
  const monitorsLog = data?.items || [];
  const meta = data?.meta;

  const totalMonitorsLog = meta?.total || 0;
  const logsUp = monitorsLog?.filter((log) => log.isUp === true).length || 0;
  const logsDown = monitorsLog?.filter((log) => log.isUp === false).length || 0;
  const lastChecked = monitorsLog?.length
    ? new Date(Math.max(...monitorsLog.map((log) => new Date(log.checkedAt).getTime())))
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
      <Alert 
        severity="error" 
        sx={{ mt: 2 }}
        action={
          <Button color="inherit" size="small" onClick={() => refetch()}>
            Tentar novamente
          </Button>
        }
      >
        Erro ao carregar monitores log. Tente novamente.
      </Alert>
    );
  }

  return (
    <Box>
      {/* Cabeçalho */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Monitor Logs
        </Typography>
      </Box>

      {/* Cards de Estatísticas */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <MonitorHeart color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Total de Verificações</Typography>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {totalMonitorsLog}
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
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                {logsUp}
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
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {lastChecked ? lastChecked.toLocaleDateString('pt-BR') : 'N/A'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Lista de Monitores */}
      <Typography variant="h5" gutterBottom>
        Logs Recentes
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Status link</TableCell>
              <TableCell>URL</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Status Code</TableCell>
              <TableCell>Tempo (ms)</TableCell>
              <TableCell>Data/Hora - Verificação</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {monitorsLog && monitorsLog.length > 0 ? (
              monitorsLog.slice(0, 5).map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    <Chip
                      label={log.isUp ? 'Operacional' : 'Fora do ar'}
                      color={log.isUp ? 'info' : 'error'}
                      size="small"
                      sx={{ fontWeight: 'medium' }}
                    />
                  </TableCell>
                  <TableCell>{log.url}</TableCell>
                  <TableCell>
                    <Chip
                      label={log.isUp ? 'Online' : 'Offline'}
                      color={log.isUp ? 'success' : 'error'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{log.statusCode || 'N/A'}</TableCell>
                  <TableCell>{log.responseTimeMs || 'N/A'}</TableCell>
                  <TableCell>
                    {new Date(log.checkedAt).toLocaleString('pt-BR')}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Nenhum monitor log encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {monitorsLog && monitorsLog.length > 5 && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={() => navigate('/logs')}>
            Ver todos os monitores log
          </Button>
        </Box>
      )}
    </Box>
  );
}