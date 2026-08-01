import { usePeriodicities } from '../hooks/usePeriodicities';
import { usePeriodicityMutations } from '../hooks/usePeriodicityMutations';
import type { Periodicity } from '../models/periodicity.model';
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';

export function PeriodicityList() {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const { data, isLoading, error } = usePeriodicities(page, limit);
    const { deletePeriodicity } = usePeriodicityMutations();
    const [periodicityToDelete, setPeriodicityToDelete] = useState<Periodicity | null>(null);

    const items = data?.items ?? [];
    const meta = data?.meta;

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handleLimitChange = (event: SelectChangeEvent<number>) => {
        const newLimit = Number(event.target.value);
        setLimit(newLimit);
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
            Erro ao carregar periodicidades. Tente novamente.
        </Alert>
        );
    }

    return (
        <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4" component="h1">
            Periodicidades
            </Typography>
            <Button variant="contained" onClick={() => navigate('/periodicities/new')}>
            Nova Periodicidade
            </Button>
        </Box>

        {items?.length === 0 && (
            <Typography variant="body1" color="text.secondary" sx={{ mt: 4, textAlign: 'center' }}>
                Nenhuma periodicidade encontrada.
            </Typography>
        )}

        <Grid container spacing={3}>
            {items?.map((perioditicy) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={perioditicy.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom>
                    {perioditicy.time} - Tempo
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {perioditicy.status}
                    </Typography>
                    <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>
                    Criado em: {new Date(perioditicy.createdAt).toLocaleDateString('pt-BR')}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                    size="small"
                    onClick={() => navigate(`/periodicities/${perioditicy.id}/edit`)}
                    >
                    Editar
                    </Button>
                    <Button
                    size="small"
                    color="error"
                    onClick={() => setPeriodicityToDelete(perioditicy)}
                    >
                    Excluir
                    </Button>
                </CardActions>
                </Card>
            </Grid>
            ))}
        </Grid>

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

        <ConfirmDialog
            open={!!periodicityToDelete}
            title="Excluir periodicidade"
            message={`Deseja realmente excluir a periodicidade "${periodicityToDelete?.time}"?`}
            onConfirm={() => {
            if (periodicityToDelete) {
                deletePeriodicity.mutate(periodicityToDelete.id);
                setPeriodicityToDelete(null);
            }
            }}
            onCancel={() => setPeriodicityToDelete(null)}
        />
        </Box>
    );
}