import { BrowserRouter as Router, Routes, Route } from 'react-router';
import "tailwindcss";

import Home from './pages/Home'
import About from './pages/About'
import Terminos from './pages/Terminos'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {

  return (
    <>
    <Router>
    <Header />
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/terminos" element={<Terminos />} />
    </Routes>
    <Footer />
    </Router>
    </>
  )
}

export default App
