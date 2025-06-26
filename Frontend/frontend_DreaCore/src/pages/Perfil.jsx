import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { FaUser, FaEnvelope, FaCalendarAlt, FaPhone, FaLock, FaEye, FaSignOutAlt } from "react-icons/fa";

const Perfil = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const obtenerPerfilUsuario = async () => {
      console.log("=== OBTENIENDO PERFIL DE USUARIO ===");
      
      const allCookies = document.cookie;
      console.log("🍪 Todas las cookies:", allCookies);
      
      // Buscar diferentes nombres posibles de token
      const possibleTokenNames = ['authToken', 'token', 'jwt', 'accessToken', 'verificationToken'];
      let token = null;

      // 🔍 Primero revisar en localStorage
      for (const name of possibleTokenNames) {
        const storedToken = localStorage.getItem(name);
        if (storedToken) {
          token = storedToken;
          console.log(`🔑 Token encontrado en localStorage: ${name}`);
          break;
        }
      }

      // 🔍 Si no está en localStorage, revisar cookies (por compatibilidad)
      if (!token) {
        for (const name of possibleTokenNames) {
          const cookieToken = document.cookie
            .split(";")
            .find((c) => c.trim().startsWith(`${name}=`))?.split("=")[1];
          if (cookieToken) {
            token = cookieToken;
            console.log(`🔑 Token encontrado en cookies: ${name}`);
            break;
          }
        }
      }

      console.log("🔑 Token encontrado:", token ? "SÍ" : "NO");
      
      if (token) {
        console.log("🔑 Token completo:", token);
        
        try {
          const decoded = jwtDecode(token);
          console.log("📝 Token decodificado completo:", decoded);
          
          // Buscar diferentes campos posibles para el identificador del usuario
          const possibleEmailFields = ['email', 'user', 'username', 'userEmail'];
          const possibleIdFields = ['id', 'userId', '_id', 'clientId'];
          
          let userIdentifier = null;
          let identifierType = null;
          
          // Primero buscar email
          for (const field of possibleEmailFields) {
            if (decoded[field]) {
              userIdentifier = decoded[field];
              identifierType = 'email';
              console.log(`📧 ${field} encontrado:`, userIdentifier);
              break;
            }
          }
          
          // Si no hay email, buscar ID directo
          if (!userIdentifier) {
            for (const field of possibleIdFields) {
              if (decoded[field]) {
                userIdentifier = decoded[field];
                identifierType = 'id';
                console.log(`🆔 ${field} encontrado:`, userIdentifier);
                break;
              }
            }
          }
          
          if (userIdentifier) {
            if (identifierType === 'email') {
              console.log("🔍 Buscando usuario por email...");
              
              try {
                const res = await fetch(`http://localhost:4000/api/clients/email/${userIdentifier}`);
                console.log("👤 Respuesta búsqueda usuario - Status:", res.status);
                
                if (!res.ok) {
                  throw new Error('Error al obtener usuario');
                }
                
                const data = await res.json();
                console.log("👤 Datos del usuario obtenidos:", data);
                setUsuario(data);
                console.log("✅ Usuario establecido correctamente");
                
              } catch (error) {
                console.error("❌ Error al obtener usuario por email:", error);
                setError("Error al cargar el perfil del usuario");
              }
            } else {
              // Si ya tenemos el ID directamente, hacer GET por ID
              console.log("👤 Buscando usuario por ID directo");
              
              try {
                const res = await fetch(`http://localhost:4000/api/clients/${userIdentifier}`);
                console.log("👤 Respuesta búsqueda usuario - Status:", res.status);
                
                if (!res.ok) {
                  throw new Error('Error al obtener usuario');
                }
                
                const data = await res.json();
                console.log("👤 Datos del usuario obtenidos:", data);
                setUsuario(data);
                console.log("✅ Usuario establecido correctamente");
                
              } catch (error) {
                console.error("❌ Error al obtener usuario por ID:", error);
                setError("Error al cargar el perfil del usuario");
              }
            }
          } else {
            console.log("❌ No se encontró identificador de usuario en el token");
            console.log("🔍 Campos disponibles en el token:", Object.keys(decoded));
            setError("No se pudo identificar al usuario");
          }
        } catch (error) {
          console.error("❌ Error al decodificar token:", error);
          setError("Token de autenticación inválido");
        }
      } else {
        console.log("❌ No se encontró ningún token de autenticación");
        console.log("🔍 Nombres buscados:", possibleTokenNames);
        setError("No se encontró token de autenticación");
      }
      
      setLoading(false);
      console.log("=== FIN OBTENER PERFIL DE USUARIO ===");
    };

    obtenerPerfilUsuario();
  }, []);

  // Función para cerrar sesión
  const handleCerrarSesion = () => {
    // Confirmar antes de cerrar sesión
    if (window.confirm("¿Estás seguro de que quieres cerrar sesión?")) {
      // Limpiar localStorage
      const possibleTokenNames = ['authToken', 'token', 'jwt', 'accessToken', 'verificationToken'];
      possibleTokenNames.forEach(name => {
        localStorage.removeItem(name);
      });

      // Limpiar cookies
      possibleTokenNames.forEach(name => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      });

      console.log("✅ Sesión cerrada correctamente");
      
      // Redirigir al login
      navigate("/login");
    }
  };

  if (loading) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <p className="text-gray-500">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  if (!usuario) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <p className="text-gray-500">No se pudo cargar la información del usuario</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      {/* Título */}
      <h1 className="text-xl font-semibold text-center text-gray-800 mb-6">
        Tu perfil
      </h1>

      {/* Información del usuario */}
      <div className="space-y-4">
        {/* Nombre */}
        <div className="flex items-center p-3 bg-gray-100 rounded-lg">
          <FaUser className="text-gray-500 mr-3" />
          <span className="text-gray-700">{usuario.name || "Sin nombre"}</span>
        </div>

        {/* Email */}
        <div className="flex items-center p-3 bg-gray-100 rounded-lg">
          <FaEnvelope className="text-gray-500 mr-3" />
          <span className="text-gray-700">{usuario.email || "Sin email"}</span>
        </div>

        {/* Fecha de nacimiento */}
        <div className="flex items-center p-3 bg-gray-100 rounded-lg">
          <FaCalendarAlt className="text-gray-500 mr-3" />
          <span className="text-gray-700">
            {usuario.birthDate 
              ? new Date(usuario.birthDate).toLocaleDateString('es-ES')
              : "Sin fecha de nacimiento"
            }
          </span>
        </div>

        {/* Teléfono */}
        <div className="flex items-center p-3 bg-gray-100 rounded-lg">
          <FaPhone className="text-gray-500 mr-3" />
          <span className="text-gray-700">{usuario.phone || "Sin teléfono"}</span>
        </div>

        {/* Contraseña (oculta) */}
        <div className="flex items-center p-3 bg-gray-100 rounded-lg">
          <FaLock className="text-gray-500 mr-3" />
          <span className="text-gray-700">••••••••••</span>
          <FaEye className="ml-auto text-gray-400 cursor-pointer hover:text-gray-600 transition-colors" />
        </div>
      </div>

      {/* Botón de cerrar sesión */}
      <div className="mt-6">
        <button
          onClick={handleCerrarSesion}
          className="w-full flex items-center justify-center p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
        >
          <FaSignOutAlt className="mr-2" />
          Cerrar sesión
        </button>
      </div>

      {/* Información adicional si está disponible */}
      {usuario._id && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-400">
            ID de usuario: {usuario._id}
          </p>
        </div>
      )}
    </div>
  );
};

export default Perfil;