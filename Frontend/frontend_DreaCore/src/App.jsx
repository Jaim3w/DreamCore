import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Home from './pages/Home';
import About from './pages/About';
import Terminos from './pages/Terminos';
import Header from './components/Header';
import Footer from './components/Footer';
import RecoverPassword from './pages/RecoverPassword';
import Categories from './pages/Categories';
import Products from './pages/Products'

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white">
        <Header />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/terminos" element={<Terminos />} />
            <Route path="/RecoverPassword" element={<RecoverPassword />} />
            <Route path="/productos" element={<Categories />} />
            <Route path="/productos/:categoria" element={<Products />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
