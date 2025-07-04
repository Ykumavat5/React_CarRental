import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../../Context/AdminAuthContext';

const AdminPrivateRoute = () => {
  const { token } = useAdminAuth();
  const location = useLocation();

  // If no token, redirect to /admin/login
  if (!token) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  // If authenticated, render child routes
  return <Outlet />;
};

export default AdminPrivateRoute;
