import { Routes, Route } from 'react-router-dom';
import { PeriodicityList } from './pages/PeriodicityList';
import { PeriodcityFormPage } from './pages/PeriodicityFormPage';

export function PeriodicityRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PeriodicityList />} />
      <Route path="new" element={<PeriodcityFormPage />} />
      <Route path=":id/edit" element={<PeriodcityFormPage />} />
    </Routes>
  );
}