import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/header/Header';
import Products from './pages/ManageProducts';
import CreateProducts from './pages/CreateProducts';
import PrimeUso from './pages/PrimeUso';
import Dashboard from './pages/DashBoard';

// ----- Definimos un Footer sencillo aquí mismo -----
const Footer = () => (
  <footer className="bg-gray-100 text-center py-4 mt-8">
    <p className="text-sm text-gray-600">© 2025 DreamCore. Todos los derechos reservados.</p>
  </footer>
);

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const noHeaderFooterRoutes = [
    '/', '/recoverpassword', '/checknumber', '/newpassword',
    '/login', '/shoppingcart', '/signup', '/dashboard'
  ];
  const currentPath = location.pathname.toLowerCase().replace(/\/+$/, '') || '/';
  const hideHeaderFooter = noHeaderFooterRoutes.includes(currentPath);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {!hideHeaderFooter && <Header />}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/primeuso" element={<PrimeUso />} />
          <Route path="/productos" element={<Products />} />
          <Route path="/createproducts" element={<CreateProducts />} />
        </Routes>
      </main>

      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

export default App;
