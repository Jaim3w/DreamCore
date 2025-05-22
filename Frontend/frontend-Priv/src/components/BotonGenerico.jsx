import React from "react";

const BotonGenerico = ({ onClick, label = "", className = "" }) => {
  const baseStyle = "px-8 py-2 text-sm rounded-lg font-medium bg-green-800 text-white hover:bg-green-900 transition-colors duration-300";

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${className}`}
    >
      {label}
    </button>
  );
};

export default BotonGenerico;