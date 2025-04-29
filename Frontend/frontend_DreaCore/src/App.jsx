import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Terminos from './pages/Terminos';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import RecoverPassword from './pages/RecoverPassword';
import Categories from './pages/Categories';
import Products from './pages/Products';
import CheckNumber from './pages/CheckNumber';
import NewPassword from './pages/NewPassword';
import Contactanos from './pages/Contactanos';
import SplashScreen from './pages/SplashScreen';
import Login from './pages/login';
import ShoppingCart from './pages/ShoppingCart';
import SignUp from './pages/SignUp';

// Componente principal
function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <Router>
      <AppContent isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
    </Router>
  );
}

// Componente de contenido
function AppContent({ isCartOpen, setIsCartOpen }) {
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
  const hideHeaderFooter = noHeaderFooterRoutes.includes(currentPath) || isCartOpen;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      {!hideHeaderFooter && <Header onOpenCart={() => setIsCartOpen(true)} />}

      {/* Contenido principal */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/terminos" element={<Terminos />} />
          <Route path="/recoverpassword" element={<RecoverPassword />} />
          <Route path="/checknumber" element={<CheckNumber />} />
          <Route path="/newpassword" element={<NewPassword />} />
          <Route path="/productos" element={<Categories />} />
          <Route path="/productos/:categoria" element={<Products onOpenCart={() => setIsCartOpen(true)} />} />
          <Route path="/contactanos" element={<Contactanos />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/shoppingcart" element={<ShoppingCart />} />
        </Routes>

        {/* Modal del carrito */}
        {isCartOpen && <ShoppingCart onClose={() => setIsCartOpen(false)} />}
      </main>

      {/* Footer */}
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

export default App;
