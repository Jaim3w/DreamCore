import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import olvidasteContra from "../assets/olvidasteContra.png"; // Puedes cambiar la imagen si quieres
import BotonRecu from "../components/recuContra/BotonRecu";
import BotonRecuW from "../components/recuContra/BotonRecuW";

const CheckNumber = () => {
  const navigate = useNavigate();

  // Estados para el email (recuperado) y el código (del input)
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  
  // Estados de la petición, idénticos al componente anterior
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // --- NUEVO: useEffect para recuperar el email de localStorage ---
  useEffect(() => {
    const storedEmail = localStorage.getItem('recoveryEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      // Si el usuario llega aquí sin haber pasado por el paso anterior
      setError("No se pudo encontrar un correo. Por favor, vuelva a empezar.");
      setTimeout(() => {
        navigate('/'); // Redirigir al inicio si no hay email
      }, 3000);
    }
  }, [navigate]);

  const handleGoBack = () => {
    navigate("/recover-password"); // Ruta para volver a pedir el código
  };

  // --- Función fetch para el endpoint /verifyCode ---
  const handleVerifyCode = async () => {
    if (!code) {
      setError("Por favor, ingrese el código de verificación.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const url = 'http://localhost:4000/api/passwordRecovery/verifyCode';

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          
        },
        // Enviamos tanto el email como el código
        body: JSON.stringify({ email, code }),
         credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'El código de verificación es incorrecto o ha expirado.');
      }

      const data = await response.json();
      setSuccessMessage(data.message || 'Código verificado correctamente. Redirigiendo...');

      // Si el código es correcto, navegamos al siguiente paso
      setTimeout(() => {
        navigate("/NewPassword"); // Ruta para crear la nueva contraseña
      }, 2000);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Texto e Inputs */}
        <div className="p-4 md:p-12 flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-green-900 mb-4 md:mb-6 text-center md:text-left">DreamCore</h1>
          <h2 className="text-lg md:text-xl text-black font-semibold mb-6 md:mb-10 text-center md:text-left">
            Verifica tu correo electrónico
          </h2>
          <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8 leading-relaxed text-center md:text-left">
            Hemos enviado un código de verificación a <strong>{email}</strong>. 
            Por favor, ingrésalo a continuación para continuar.
          </p>
          <input
            type="text"
            placeholder="Código de verificación"
            className="mb-4 border border-gray-300 rounded-md px-4 py-3 text-sm md:text-base w-full placeholder:text-gray-500 bg-gray-100 text-black"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            disabled={loading}
          />

          {/* Mensajes de estado */}
          <div className="mb-4 h-6">
            {loading && <p className="text-gray-500 text-sm text-center md:text-left">Verificando...</p>}
            {error && <p className="text-red-500 text-sm text-center md:text-left">{error}</p>}
            {successMessage && <p className="text-green-600 text-sm text-center md:text-left">{successMessage}</p>}
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-8 md:mb-10">
            <BotonRecuW onClick={handleGoBack} disabled={loading}>
              Volver
            </BotonRecuW>
            <BotonRecu onClick={handleVerifyCode} disabled={loading}>
              {loading ? 'Verificando...' : 'Verificar código'}
            </BotonRecu>
          </div>
          
          {/* Indicadores de progreso (actualizado) */}
          <div className="mt-6 md:mt-10 flex gap-3 justify-center md:justify-start">
            <span className="w-4 md:w-5 h-1.5 bg-green-200 rounded-full"></span>
            <span className="w-4 md:w-5 h-1.5 bg-green-800 rounded-full"></span>
            <span className="w-4 md:w-5 h-1.5 bg-green-200 rounded-full"></span>
          </div>
        </div>

        {/* Imagen */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="p-4 md:p-10 flex items-center justify-center"
        >
          <img
            src={olvidasteContra}
            alt="Persona verificando código"
            className="w-full max-w-xs md:max-w-md object-contain"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default CheckNumber;