// src/features/users/routes.tsx
import { Routes, Route } from 'react-router-dom';
import { UsersPage } from './pages/UsersPage';
import { UserCreatePage } from './pages/UserCreatePage';
import { UserEditPage } from './pages/UserEditPage';

export function UserRoutes() {
  return (
    <Routes>
      <Route index element={<UsersPage />} />
      <Route path="new" element={<UserCreatePage />} />
      <Route path=":id/edit" element={<UserEditPage />} />
    </Routes>
  );
}