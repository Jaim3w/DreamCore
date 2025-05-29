import { BrowserRouter as Router, Routes, Route } from 'react-router';
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
import Login from './pages/login';
import ShoppingCart from './pages/ShoppingCart';
import SignUp from './pages/SignUp';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white">
        <Header onOpenCart={() => setIsCartOpen(true)} />
        <main className="flex-grow">
          <Routes>
{/* Definimos cada ruta de la app y qué componente se debe mostrar */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/terminos" element={<Terminos />} />
            <Route path="/RecoverPassword" element={<RecoverPassword />} />
            <Route path="/CheckNumber" element={<CheckNumber />} />
            <Route path="/NewPassword" element={<NewPassword />} />
            <Route path="/productos" element={<Categories />} />
            <Route
              path="/productos/:categoria"
              element={<Products onOpenCart={() => setIsCartOpen(true)} />}
            />
            <Route path="/contactanos" element={<Contactanos />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
         
          </Routes>
          {/* ShoppingCart overlay */}
          {isCartOpen && (
            <ShoppingCart onClose={() => setIsCartOpen(false)} />
          )}
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
