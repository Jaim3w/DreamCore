import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router';
import { useState } from 'react';
import Home from './pages/Home';
import About from './pages/About';
import Terminos from './pages/Terminos';
import Header from './components/Header';
import Footer from './components/Footer';
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

function AppContent() {
  const location = useLocation();

  // Definir rutas sin Header/Footer en minúscula
  const noHeaderFooterRoutes = ['/splash', '/recoverpassword', '/checknumber', '/newpassword', '/login', '/signup'];

  // Normalizar la ruta actual (minúscula y sin slash al final)
  const currentPath = location.pathname.toLowerCase().replace(/\/$/, '');

  // Verificar si está en la lista
  const hideHeaderFooter = noHeaderFooterRoutes.includes(currentPath);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {!hideHeaderFooter && <Header />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/terminos" element={<Terminos />} />
          <Route path="/RecoverPassword" element={<RecoverPassword />} />
          <Route path="/CheckNumber" element={<CheckNumber />} />
          <Route path="/NewPassword" element={<NewPassword />} />
          <Route path="/productos" element={<Categories />} />
          <Route path="/productos/:categoria" element={<Products />} />
          <Route path="/contactanos" element={<Contactanos />} />
          <Route path="/splash" element={<SplashScreen />} />
          <Route path="/contactanos" element={<Contactanos />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          
        </Routes>
      </main>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}


function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
