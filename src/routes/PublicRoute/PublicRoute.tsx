import { ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export function PublicRoute(): ReactElement {
  const isAuthorized = localStorage.getItem('token') !== null;

  return isAuthorized ? <Navigate to="/" replace /> : <Outlet />;
}
