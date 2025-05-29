import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/context";


export const PrivateRoute = () => {
    const { authCokie } = useAuth();
    return authCokie ? <Outlet /> : <Navigate to="/login" />
}