import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


export const PrivateRoute = () => {
    const { authCokie } = AuthContext();
    return authCokie ? <Outlet /> : <Navigate to="/login" />
}