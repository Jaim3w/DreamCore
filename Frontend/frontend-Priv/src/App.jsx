import React, { Fragment } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Header from "./components/header/Header";
import Login from "./pages/Login";
import Dashboard from "./pages/DashBoard";
import Products from "./pages/ManageProducts";
import Categories from "./pages/Categories";
import Orders from "./pages/Orders";
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import { toast, ToastContainer } from "react-toastify";


const AppWrapper = () => {
  const location = useLocation();
  const hideHeader = location.pathname === "/"; // Ocultar el header solo en la página de login


  return (
    <Fragment>
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/" element={<Login />} />
        {/* Rutas privadas protegidas con PrivateRoute */}
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/pedidos" element={<PrivateRoute element={<Orders />} />} />
        <Route path="/categories" element={<PrivateRoute element={<Categories />} />} />
        <Route path="/productos" element={<PrivateRoute element={<Products />} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Fragment>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppWrapper />
      </BrowserRouter>
      <ToastContainer/>
    </AuthProvider>
  );
}

export default App;
