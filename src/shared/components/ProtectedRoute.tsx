// src/shared/components/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useIsAuthenticated, useAuthLoading } from '../../stores';
import { CircularProgress, Box } from '@mui/material';
import { useEffect } from 'react';

export function ProtectedRoute() {
  const isAuthenticated = useIsAuthenticated();
  const isLoading = useAuthLoading();

  useEffect(() => {
  }, [isAuthenticated, isLoading]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

    if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}