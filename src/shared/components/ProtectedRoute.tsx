import { Navigate, Outlet } from 'react-router-dom';

export function ProtectedRoute() {
  const token = localStorage.getItem('token');

  // Se não houver token, redireciona para a página de login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Se houver token, renderiza o conteúdo da rota (Outlet ou children)
  return <Outlet />;
}