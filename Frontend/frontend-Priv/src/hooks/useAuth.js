// useAuth.js
import { useContext } from 'react';
import AuthContext from '../context/AuthContext'; // Importamos el contexto como default

export const useAuth = () => {
  return useContext(AuthContext); // Devuelve el valor del contexto
};
