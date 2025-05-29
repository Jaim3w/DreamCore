import './App.css';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Header from "./components/header/Header";
import Login from "./pages/Login";
import Dashboard from "./pages/DashBoard";
import Products from "./pages/ManageProducts";
import Categories from "./pages/Categories";
import Orders from "./pages/Orders";
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/privateRoute';
import { Fragment } from "react";

// Este componente te permite usar hooks como useLocation fuera del nivel de BrowserRouter
const AppWrapper = () => {
  const location = useLocation();
  const hideHeader = location.pathname === "/"; // ocultar header solo en login

  return (
    <Fragment>
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pedidos" element={<Orders />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/productos" element={<Products />} />
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
    </AuthProvider>
  );
}

export default App;