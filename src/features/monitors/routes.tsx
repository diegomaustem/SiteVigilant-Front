import { Routes, Route } from 'react-router-dom';
import { MonitorList } from './pages/MonitorList';
import { MonitorFormPage } from './pages/MonitorFormPage';

export function MonitorRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MonitorList />} />
      <Route path="new" element={<MonitorFormPage />} />
      <Route path=":id/edit" element={<MonitorFormPage />} />
    </Routes>
  );
}