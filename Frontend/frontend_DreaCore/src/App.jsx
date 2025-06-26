import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext'; 
import { toast, ToastContainer } from "react-toastify";
import PrivateRoute from './components/PrivateRoute';

import Home from './pages/Home';
import About from './pages/About';
import Terminos from './pages/Terminos';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import RecoverPassword from './pages/RecoverPassword';
import Products from './pages/Products';
import CheckNumber from './pages/CheckNumber';
import NewPassword from './pages/NewPassword';
import Contactanos from './pages/Contactanos';
import Categorias from './pages/Categories';
import Perfil from './pages/Perfil';
import Login from './pages/login';
import ShoppingCart from './pages/ShoppingCart';
import SignUp from './pages/SignUp';
import VerificarAccount from './pages/VerifyAccount';
import SplashScreen from './pages/splashScreen';
import Orders from './pages/Orders';
import OrderHistory from './pages/OrderHistory';
import DetalleProducto from './pages/DetalleProducto';

const AppContent = () => {
  const location = useLocation();
  const [mostrarHeader, setMostrarHeader] = useState(true);

  const rutasSinHeader = ['/', '/login', '/signup', '/RecoverPassword', '/CheckNumber', '/NewPassword'];
  const hideLayout = location.pathname === '/signup';
  const mostrarHeaderReal = mostrarHeader && !rutasSinHeader.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {mostrarHeaderReal && <Header />}
      <main className="flex-grow">
        <Routes>
          {/* Rutas públicas - No requieren autenticación */}
          <Route path="/" element={<SplashScreen />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/RecoverPassword" element={<RecoverPassword />} />
          <Route path="/CheckNumber" element={<CheckNumber />} />
          <Route path="/NewPassword" element={<NewPassword />} />
          <Route path="/verificar" element={<VerificarAccount />} />

          {/* Rutas privadas - Requieren autenticación */}
          <Route path="/home" element={<PrivateRoute element={<Home />} />} />
          <Route path="/about" element={<PrivateRoute element={<About />} />} />
          <Route path="/terminos" element={<PrivateRoute element={<Terminos />} />} />
          <Route path="/productos" element={<PrivateRoute element={<Products setMostrarHeader={setMostrarHeader} />} />} />
          <Route path="/productos/:categoria" element={<PrivateRoute element={<Products setMostrarHeader={setMostrarHeader} />} />} />
          <Route path="/contactanos" element={<PrivateRoute element={<Contactanos />} />} />
          <Route path="/carrito" element={<PrivateRoute element={<ShoppingCart />} />} />
          <Route path="/orders" element={<PrivateRoute element={<Orders />} />} />
          <Route path="/orderHistory" element={<PrivateRoute element={<OrderHistory />} />} />
          <Route path="/perfil" element={<PrivateRoute element={<Perfil />} />} />
          <Route path="/producto/:id" element={<PrivateRoute element={<DetalleProducto />} />} />
        </Routes>
      </main>
      {!hideLayout && <Footer />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider> 
      <CartProvider>
        <Router>
          <ToastContainer/>
          <AppContent />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;