// Importamos los componentes necesarios desde la librería react-router
import { BrowserRouter as Router, Routes, Route } from 'react-router';

// Importación las páginas y componentes de nuestra aplicación
import Home from './pages/Home';
import About from './pages/About';
import Terminos from './pages/Terminos';
import Header from './components/Header';
import Footer from './components/Footer';
import RecoverPassword from './pages/RecoverPassword';
import Categories from './pages/Categories';
import Products from './pages/Products'
import CheckNumber from './pages/CheckNumber'
import NewPassword from './pages/NewPassword'
import Contactanos from './pages/Contactanos'
import Login from './pages/login';
import SingUp from './pages/SignUp';
import SignUp from './pages/SignUp';

// Componente principal de la aplicación
function App() {
  return (
    // Envolvemos toda la app con el router para habilitar el enrutamiento
    <Router>
      {/* Contenedor principal con diseño de columna y altura mínima de pantalla */}
      <div className="flex flex-col min-h-screen bg-white">
        <Header />
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
            <Route path="/productos/:categoria" element={<Products />} />
            <Route path="/contactanos" element={<Contactanos />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            {/* Ruta por defecto que redirige a la página de inicio */}
            

          </Routes>
        </main>
         {/* Pie de página que también se muestra en todas las páginas */}
        <Footer />
      </div>
    </Router>
  );
}

// Exportamos el componente App para que pueda ser usado en otras partes del proyecto
export default App;
