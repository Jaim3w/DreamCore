import './App.css'
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";

import Navigator from './components/Navigator';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (      
  <Router>
    <AuthProvider>
      <Navigator />
    </AuthProvider>
  </Router>
  );
}

export default App;