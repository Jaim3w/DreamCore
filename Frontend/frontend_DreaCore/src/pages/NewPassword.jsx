import React, { useState } from "react";
import { motion } from "framer-motion";
import olvidasteContra from "../assets/olvidasteContra.png";
import BotonRecu from "../components/recuContra/BotonRecu";
import { useNavigate } from "react-router-dom";

const RecoverPassword = () => {
  const navigate = useNavigate();
  
  // Estados para las contraseñas
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Estados de la petición, igual que en tu ejemplo
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleGoToLogin = () => {
    navigate("/");
  };

  const handleResetPassword = async () => {
    // Validaciones antes de empezar
    if (!newPassword || !confirmPassword) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
    
      const url = 'http://localhost:4000/api/passwordRecovery/resetPassword';

      // Obtener el token del localStorage o de donde lo tengas guardado
      const resetToken = localStorage.getItem('resetToken');
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          token: resetToken, // Token de recuperación
          newPassword,
          confirmPassword
        }),
        credentials: "include",
      });

      // Primero, verificamos si la respuesta HTTP no fue exitosa
      if (!response.ok) {
        // Intentamos leer el cuerpo del error para un mensaje más específico
        const errorData = await response.json().catch(() => ({})); // Evita error si el cuerpo no es JSON
        throw new Error(errorData.message || 'No se pudo restablecer la contraseña.');
      }

      // Si la respuesta es exitosa, leemos los datos
      const data = await response.json();
      setSuccessMessage(data.message || 'Contraseña restablecida con éxito. Serás redirigido.');

      // Limpiar el token de localStorage
      localStorage.removeItem('resetToken');
      localStorage.removeItem('recoveryEmail');

      // Navegar al login después de un momento
      setTimeout(() => {
        navigate("/", { 
          state: { message: "Contraseña restablecida exitosamente" }
        });
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
        {/* Lado Izquierdo */}
        <div className="p-4 md:p-12 flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-green-900 mb-4 md:mb-6 text-center md:text-left">
            DreamCore
          </h1>
          <h2 className="text-lg md:text-xl text-black font-semibold mb-6 md:mb-10 text-center md:text-left">
            Crea una nueva contraseña
          </h2>
          <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8 leading-relaxed text-center md:text-left">
            Para restablecer tu contraseña, ingresa una nueva contraseña que tenga más de 8 caracteres y al menos una mayúscula.
          </p>

          {/* Inputs */}
          <div className="flex flex-col gap-4 mb-4">
            <div>
              <p className="text-xs text-gray-600 mb-2 text-center md:text-left">
                Escribe tu nueva contraseña
              </p>
              <input
                type="password"
                placeholder="Escribe tu contraseña"
                className="border border-gray-300 rounded-lg px-4 py-3 text-sm w-full placeholder:text-gray-600 text-black bg-[rgba(196,196,196,0.27)]"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={loading} // Deshabilitar mientras carga
              />
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-2 text-center md:text-left">
                Confirma tu contraseña
              </p>
              <input
                type="password"
                placeholder="Confirma tu contraseña"
                className="border border-gray-300 rounded-lg px-4 py-3 text-sm w-full placeholder:text-gray-600 text-black bg-[rgba(196,196,196,0.27)]"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading} // Deshabilitar mientras carga
              />
            </div>
          </div>

          {/* Mensajes de estado (éxito, error, carga) */}
          <div className="mb-4 h-6">
            {loading && <p className="text-gray-500 text-sm text-center md:text-left">Restableciendo contraseña...</p>}
            {error && <p className="text-red-500 text-sm text-center md:text-left">{error}</p>}
            {successMessage && <p className="text-green-600 text-sm text-center md:text-left">{successMessage}</p>}
          </div>

          {/* Botón */}
          <div className="flex justify-center md:justify-start mt-6 mb-10">
            <BotonRecu 
              onClick={handleResetPassword} 
              className="w-full md:w-auto px-6 py-3 text-sm"
              disabled={loading}
            >
              {/* Cambiar texto del botón si está cargando */}
              {loading ? 'Restableciendo...' : 'Restablecer contraseña'}
            </BotonRecu>
          </div>

          {/* Link para volver al login */}
          <div className="text-center md:text-left mb-8">
            <button
              onClick={handleGoToLogin}
              className="text-green-800 hover:text-green-600 text-sm underline"
              disabled={loading}
            >
              Volver al inicio de sesión
            </button>
          </div>

          {/* Indicadores */}
          <div className="mt-6 md:mt-10 flex gap-3 justify-center md:justify-start">
            <span className="w-4 md:w-5 h-1.5 bg-green-200 rounded-full"></span>
            <span className="w-4 md:w-5 h-1.5 bg-green-200 rounded-full"></span>
            <span className="w-4 md:w-5 h-1.5 bg-green-800 rounded-full"></span>
          </div>
        </div>

        {/* Imagen animada */}
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