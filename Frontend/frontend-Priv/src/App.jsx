import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/header/Header";
import Products from "./pages/ManageProducts";
import CreateProducts from "./pages/CreateProducts";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Navigator />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  const noHeaderFooterRoutes = [
    "/",
    "/recoverpassword",
    "/checknumber",
    "/newpassword",
    "/login",
    "/shoppingcart",
    "/signup"
  ];

  const currentPath = location.pathname.toLowerCase().replace(/\/+$/, "") || "/";
  const hideHeaderFooter = noHeaderFooterRoutes.includes(currentPath);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {!hideHeaderFooter && <Header />}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/CreateProducts" element={<CreateProducts />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>

      {!hideHeaderFooter && <Footer />}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;