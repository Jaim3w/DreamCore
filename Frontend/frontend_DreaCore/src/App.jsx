import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
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
import Login from './pages/login';
import ShoppingCart from './pages/ShoppingCart';
import SignUp from './pages/SignUp';

function Layout() {
  const location = useLocation();
  const hideLayout = location.pathname === '/signup';

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {!hideLayout && <Header />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/terminos" element={<Terminos />} />
          <Route path="/RecoverPassword" element={<RecoverPassword />} />
          <Route path="/CheckNumber" element={<CheckNumber />} />
          <Route path="/NewPassword" element={<NewPassword />} />
          <Route path="/productos" element={<Products />} />
          <Route path="/productos/:categoria" element={<Products />} />
          <Route path="/contactanos" element={<Contactanos />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/carrito" element={<ShoppingCart />} />
        </Routes>
      </main>
      {!hideLayout && <Footer />}
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <Layout />
      </Router>
    </CartProvider>
  );
}

export default App;
