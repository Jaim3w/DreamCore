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
