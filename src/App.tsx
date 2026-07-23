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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            {/* Rotas públicas */}
            <Route path="/*" element={<AuthRoutes />} />

            {/* Rotas protegidas com ProtectedRoute usando Outlet */}
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

              <Route path="/users/*" element={<DashboardLayout />}>
                <Route path="*" element={<MonitorRoutes />} />
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