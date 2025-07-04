import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '../../Context/AdminAuthContext';

const PublicAdminRoute = ({ children }) => {
  const { token } = useAdminAuth();

  if (token) {
    // If already logged in, redirect to admin dashboard
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};

export default PublicAdminRoute;
