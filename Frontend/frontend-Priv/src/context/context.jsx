import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";


const SERVER_URL = "http://localhost:4000/api/login";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authCokie, setAuthCokie] = useState(null);
    const navigate = useNavigate();


const Login = async (email, password) => {
try {
    const response = await fetch(SERVER_URL, {
      method: "POST",
      credentials: "include", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!data.token) {
      return { success: false, message: data.message || "Login fallido" };
    }
   
    localStorage.setItem("authToken", data.token);
    setAuthCokie(data.token);
    console.log("Token recibido:", data.token);
    navigate("/Home")
    return { success: true };
    
  } catch (error) {
    console.error("Error en Login:", error);
    return { success: false, message: "Error de conexión con el servidor" };
  }
};

    const logout = async () => {

    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setAuthCokie(null);
    setUser(null);
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
  }, []);

  useEffect(() => {
  console.log("Token en authCokie cambió:", authCokie);
  }, [authCokie]);

  return (
    <AuthContext.Provider
      value={{ user, Login, logout, authCokie, setAuthCokie }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);