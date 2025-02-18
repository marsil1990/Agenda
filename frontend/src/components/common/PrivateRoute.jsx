import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PrivateRoute = ({ adminOnly = false }) => {
  const { user } = useAuth();
  
  if (!user) return <Navigate to="/" />;
  if (adminOnly && user.email !== 'pruebaEspecial@gmail.com') return <Navigate to="/" />;
  
  return <Outlet />;
};

export default PrivateRoute;