import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import olvidasteContra from "../assets/olvidasteContra.png";
import BotonRecu from "../components/recuContra/BotonRecu";
import BotonRecuW from "../components/recuContra/BotonRecuW";

const RecoverPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleGoToLogin = () => {
    navigate("/");
  };

  const handleRequestCode = async () => {
    // Validar que el email no esté vacío antes de empezar
    if (!email) {
      setError("Por favor, ingrese su correo electrónico.");
      return;
    }

  
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      // Definimos la URL completa, como en tu ejemplo
      const url = 'http://localhost:4000/api/passwordRecovery/requestCode';

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
         credentials: "include",
      });

      // Primero, verificamos si la respuesta HTTP no fue exitosa
      if (!response.ok) {
        // Intentamos leer el cuerpo del error para un mensaje más específico
        const errorData = await response.json().catch(() => ({})); // Evita error si el cuerpo no es JSON
        throw new Error(errorData.message || 'No se pudo enviar el correo de recuperación.');
      }

      // Si la respuesta es exitosa, leemos los datos
      const data = await response.json();
      setSuccessMessage(data.message || 'Correo enviado con éxito. Serás redirigido.');

      // Opcional: Guardar el email para usarlo en la siguiente pantalla
      localStorage.setItem('recoveryEmail', email);

      // Navegar a la siguiente pantalla después de un momento
      setTimeout(() => {
        navigate("/CheckNumber");
      }, 2000);

    } catch (err) {
      // El error puede venir del "throw new Error" o de un fallo de red
      setError(err.message);
    } finally {
      // Esto se ejecuta siempre, tanto si hubo éxito como si hubo error
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
            ¿Olvidaste tu contraseña?
          </h2>
          <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8 leading-relaxed text-center md:text-left">
            Para restablecer su contraseña, ingrese su correo electrónico...
          </p>
          <input
            type="email"
            placeholder="Correo electrónico"
            className="mb-4 border border-gray-300 rounded-md px-4 py-3 text-sm md:text-base w-full placeholder:text-gray-500 bg-gray-100 text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading} // Deshabilitar mientras carga
          />

          {/* Mensajes de estado (éxito, error, carga) */}
          <div className="mb-4 h-6">
            {loading && <p className="text-gray-500 text-sm text-center md:text-left">Enviando...</p>}
            {error && <p className="text-red-500 text-sm text-center md:text-left">{error}</p>}
            {successMessage && <p className="text-green-600 text-sm text-center md:text-left">{successMessage}</p>}
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-8 md:mb-10">
            <BotonRecuW onClick={handleGoToLogin} disabled={loading}>
              Volver al inicio de sesión
            </BotonRecuW>
            <BotonRecu onClick={handleRequestCode} disabled={loading}>
              {/* Cambiar texto del botón si está cargando */}
              {loading ? 'Enviando...' : 'Restablecer contraseña'}
            </BotonRecu>
          </div>
          
          <div className="mt-6 md:mt-10 flex gap-3 justify-center md:justify-start">
            <span className="w-4 md:w-5 h-1.5 bg-green-800 rounded-full"></span>
            <span className="w-4 md:w-5 h-1.5 bg-green-200 rounded-full"></span>
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
            alt="Grupo de personas hablando"
            className="w-full max-w-xs md:max-w-md object-contain"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default RecoverPassword;