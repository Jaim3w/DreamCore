import React, { createContext, useState, useEffect, useContext } from "react";

const API = import.meta.env.VITE_API_URL;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authCokie, setAuthCokie] = useState(null);
  const [loading, setLoading] = useState(true); // 🔸 NUEVO

  const Login = async (email, password) => {
    try {
      const response = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en la autenticación");
      }

      const data = await response.json();
      localStorage.setItem("authToken", data.token);
      const userInfo = { email };
      localStorage.setItem("user", JSON.stringify(userInfo));

      setAuthCokie(data.token);
      setUser(userInfo);
      return { success: true, message: data.message };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = async () => {
    try {
      await fetch(`${API}/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Error durante el logout:", error);
    } finally {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      setAuthCokie(null);
      setUser(null);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const savedUser = localStorage.getItem("user");

    if (token) {
      setAuthCokie(token);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    }

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
      } finally {
        setLoading(false); // 🔸 FINALIZA LOADING
      }
    };

    checkServer();
  }, []);

  return (
    <AuthContext.Provider value={{ user, Login, logout, authCokie, setAuthCokie, API, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para acceder al contexto
export const useAuth = () => useContext(AuthContext);
export { AuthContext };