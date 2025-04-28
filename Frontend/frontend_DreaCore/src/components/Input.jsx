// src/components/ui/input.jsx
import React from "react";

export const Input = ({ type = "text", placeholder = "", className = "", ...props }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`border border-gray-300 rounded-md px-4 py-2 text-sm w-full ${className}`}
      {...props}
    />
  );
};
//se hizo un cambio en el nombre de la carpeta de input a ui, para que sea mas claro el uso de los componentes, ya que no solo es un input, sino que es un componente de la interfaz de usuario.