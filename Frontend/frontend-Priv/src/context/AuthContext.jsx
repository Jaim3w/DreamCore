import React, { createContext, useState, useEffect, useContext } from "react";

// Traemos la URL base del backend desde el archivo .env
const API = import.meta.env.VITE_API_URL;



// Creamos el contexto que vamos a usar en toda la app
const AuthContext = createContext();

// Este componente va a envolver toda la app para compartir el estado de autenticación
export const AuthProvider = ({ children }) => {
  // Estado para guardar el usuario logueado
  const [user, setUser] = useState(null);

  // Estado para guardar el token (o cookie) de autenticación
  const [authCokie, setAuthCokie] = useState(null);

  // Función para iniciar sesión
  const Login = async (email, password) => {
    try {
      // Hacemos la petición al backend para loguearse
      const response = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", // Muy importante si el backend usa cookies
      });

      // Si la respuesta no fue exitosa, tiramos un error
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en la autenticación");
      }

      // Si todo va bien, guardamos el token que manda el backend
      const data = await response.json();
      localStorage.setItem("authToken", data.token);

      // También guardamos el email como "usuario"
      const userInfo = { email };
      localStorage.setItem("user", JSON.stringify(userInfo));

      // Actualizamos los estados de React
      setAuthCokie(data.token);
      setUser(userInfo);

      // Devolvemos success para usar en el componente login
      return { success: true, message: data.message };
    } catch (error) {
      // Si algo falla, devolvemos el error
      return { success: false, message: error.message };
    }
  };

  // Función para cerrar sesión
  const logout = async () => {
    try {
      // Le avisamos al backend que queremos cerrar sesión
      await fetch(`${API}/logout`, {
        method: "POST",
        credentials: "include", // Por si el backend necesita limpiar cookies
      });
    } catch (error) {
      console.error("Error durante el logout:", error);
    } finally {
      // Limpiamos todo: localStorage y estados
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      setAuthCokie(null);
      setUser(null);
    }
  };

  // Este useEffect corre una sola vez cuando se monta la app
  useEffect(() => {
    // Intentamos recuperar sesión desde localStorage
    const token = localStorage.getItem("authToken");
    const savedUser = localStorage.getItem("user");

    if (token) {
      setAuthCokie(token);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    }

    // Verificamos si el servidor está vivo
   const checkServer = async () => {
  try {
    const res = await fetch(`${API}/login/status`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) throw new Error("Backend no responde correctamente");

  } catch (error) {
    console.log("Servidor no disponible, cerrando sesión", error.message);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setAuthCokie(null);
    setUser(null);
  }
};

    // Llamamos a la función para chequear el servidor
    checkServer();
  }, []);

  // Hacemos accesible todo esto desde cualquier componente que use el contexto
  return (
    <AuthContext.Provider
      value={{ user, Login, logout, authCokie, setAuthCokie, API }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Exportamos el contexto para poder usarlo en otros archivos
export { AuthContext };
