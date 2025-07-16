/**
 * PrivateRoute component
 * Protects routes that require authentication.
 * Redirects to /login if not authenticated.
 * Usage: <PrivateRoute><ProtectedComponent /></PrivateRoute>
 */
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
  // You may want to check for a valid token or admin here
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
