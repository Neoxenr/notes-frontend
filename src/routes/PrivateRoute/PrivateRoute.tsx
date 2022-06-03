import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export function PrivateRoute(): ReactElement {
  const isAuthorized = useSelector(
    (state: { authorize: { isAuthorized: boolean } }) =>
      state.authorize.isAuthorized,
  );

  return isAuthorized || localStorage.getItem('token') !== null ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
}
