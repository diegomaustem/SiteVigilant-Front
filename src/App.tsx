import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import { Toaster } from 'react-hot-toast';
import { theme } from './shared/theme/theme';
import { AuthRoutes } from './features/auth/routes';
import { DashboardLayout } from './features/dashboard/components/DashboardLayout';
import { DashboardPage } from './features/dashboard/pages/DashboardPage';
import { MonitorRoutes } from './features/monitors/routes';
import { ProtectedRoute } from './shared/components/ProtectedRoute';
import { CssBaseline } from '@mui/material';
import { PeriodicityRoutes } from './features/periodicities/routes';
import { UserRoutes } from './features/users/routes';

import { useEffect } from 'react';
import { useAuthStore } from './stores/authStore';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const { isAuthenticated, user } = useAuthStore();
  
  useEffect(() => {
  }, [isAuthenticated, user]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            {/* Rotas públicas */}
            <Route path="/*" element={<AuthRoutes />} />

            {/* Rotas protegidas */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<DashboardLayout />}>
                <Route index element={<DashboardPage />} />
              </Route>

              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<DashboardPage />} />
              </Route>

              <Route path="/monitors/*" element={<DashboardLayout />}>
                <Route path="*" element={<MonitorRoutes />} />
              </Route>

              <Route path="/periodicities/*" element={<DashboardLayout />}>
                <Route path="*" element={<PeriodicityRoutes />} />
              </Route>

              <Route path="/users/*" element={<DashboardLayout />}>
                <Route path="*" element={<UserRoutes />} />
              </Route>
            </Route>
          </Routes>
          <Toaster position="top-right" />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;