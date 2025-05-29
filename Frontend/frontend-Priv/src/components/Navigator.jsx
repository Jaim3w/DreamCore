import React, { useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate
} from "react-router-dom";

import Header from "../components/header/Header";

import { useAuth } from "../context/context";
import { PrivateRoute } from "./components/privateRoute";

import Login from "./pages/Login";
import Dashboard from "./pages/DashBoard";
import Products from "./pages/ManageProducts";
import PrimeUso from "./pages/PrimeUso";
import Categories from "./pages/Categories";
import Orders from "./pages/Orders";
import Home from "./pages/Home";

// ✅ Footer embebido aquí mismo
const Footer = () => (
  <footer className="bg-gray-100 text-center py-4 mt-8">
    <p className="text-sm text-gray-600">© 2025 DreamCore. Todos los derechos reservados.</p>
  </footer>
);

const Navigator = () => {
  const { authCokie } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const noHeaderFooterRoutes = [
    '/', '/recoverpassword', '/checknumber', '/newpassword',
    '/login', '/shoppingcart', '/signup'
  ];
  const currentPath = location.pathname.toLowerCase().replace(/\/+$/, '') || '/';
  const hideHeaderFooter = noHeaderFooterRoutes.includes(currentPath);

  useEffect(() => {
    if (authCokie && location.pathname === "/") {
      navigate("/dashboard");
    }
  }, [authCokie, location.pathname]);

  return (
    <>
      {!hideHeaderFooter && <Header />}

      <div className={`flex ${authCokie ? "ml-64" : ""} w-full min-h-screen flex-col`}>
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            {!authCokie && <Route path="/login" element={<Login />} />}

            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/pedidos" element={<Orders />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/primeuso" element={<PrimeUso />} />
              <Route path="/home" element={<Home />} />
              <Route path="/products" element={<Products />} />
            </Route>

            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </main>

        {!hideHeaderFooter && <Footer />}
      </div>
    </>
  );
};

export default Navigator;