import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Carga inmediata desde localStorage
  const storedUser = localStorage.getItem("userData");
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);

  const login = (userData) => {
    localStorage.setItem("userData", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("userData");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
