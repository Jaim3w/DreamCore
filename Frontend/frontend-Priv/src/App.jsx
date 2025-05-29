import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navigator from "./components/Navigator"; // el nuevo archivo donde moveremos las rutas

function App() {
  return (
    <Router>
      <Navigator />
    </Router>
  );
}

export default App;