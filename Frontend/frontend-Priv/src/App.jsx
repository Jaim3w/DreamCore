import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/header/Header';
import Products from './pages/ManageProducts';
import CreateProducts from './pages/CreateProducts';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

// Componente de contenido
function AppContent() {
  const location = useLocation();

  // Rutas donde no deben mostrarse Header/Footer
  const noHeaderFooterRoutes = [
    '/',
    '/recoverpassword',
    '/checknumber',
    '/newpassword',
    '/login',
    '/shoppingcart',
    '/signup'
  ];

  const currentPath = location.pathname.toLowerCase().replace(/\/+$/, '') || '/';
  const hideHeaderFooter = noHeaderFooterRoutes.includes(currentPath);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      {!hideHeaderFooter && <Header />}

      {/* Contenido principal */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/CreateProducts" element={<CreateProducts />} />
        </Routes>
      </main>

      {/* Footer */}
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

export default App;
