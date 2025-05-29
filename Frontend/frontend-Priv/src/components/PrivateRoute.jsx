import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = () => {
  const { authCokie } = useAuth();
  return authCokie ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute; // 
