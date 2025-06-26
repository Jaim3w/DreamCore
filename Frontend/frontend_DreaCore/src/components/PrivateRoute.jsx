import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'

const PrivateRoute = ({ element }) => {
  const { user } = useAuth(); // Accedemos al usuario desde el contexto

  if (!user) {
    // Si no hay usuario, redirigimos al login
    return <Navigate to="/" />;
  }

  // Si hay usuario, mostramos el componente protegido
  return element;
};

export default PrivateRoute;
