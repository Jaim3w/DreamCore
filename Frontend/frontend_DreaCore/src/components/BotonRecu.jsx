import React from "react";

const BotonRecu = ({ children, onClick, className = "" }) => {
  const style = "px-3 py-3 text-sm rounded-lg font-medium bg-green-800 text-white hover:bg-green-900 transition-colors duration-300";

  return (
    <button
      onClick={onClick}
      className={`${style} ${className}`}
    >
      {children}
    </button>
  );
};

export default BotonRecu;
