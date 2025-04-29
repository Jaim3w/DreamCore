import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import cargaLogo from "../assets/Rectangle.png";

const PantallaCarga = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return oldProgress + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      // Cuando la barra llegue al 100%, navegar
      const timeout = setTimeout(() => {
        navigate("/login");
      }, 500); // Pequeña pausa para que se vea bonito

      return () => clearTimeout(timeout);
    }
  }, [progress, navigate]);

  return (
    <div className="w-screen h-screen bg-black flex flex-col items-center justify-center space-y-8">
      
      {/* Logo animado */}
      <img 
        src={cargaLogo} 
        alt="Pantalla de Carga" 
        className="w-48 h-48 object-contain animate-bounce"
      />

      {/* Barra de carga */}
      <div className="w-64 h-3 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#1C4C38] to-white rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Texto de Cargando */}
      <p className="text-white text-sm tracking-widest uppercase animate-pulse">
        Cargando...
      </p>

    </div>
  );
};

export default PantallaCarga;
