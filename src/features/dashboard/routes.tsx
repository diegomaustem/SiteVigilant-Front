import { Routes, Route } from 'react-router-dom';
import { DashboardPage } from './pages/DashboardPage';

export function DashboardRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
    </Routes>
  );
}