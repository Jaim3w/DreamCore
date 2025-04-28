import React from "react";
 
 const BotonRecuW = ({ children, onClick, className = "" }) => {
   const style =
     "px-3 py-3 text-sm rounded-lg font-medium bg-white text-gray-800 border border-gray-300 hover:bg-green-800 hover:text-white transition-colors duration-300";
 
   return (
     <button
       onClick={onClick}
       className={`${style} ${className}`}
     >
       {children}
     </button>
   );
 };
 
 export default BotonRecuW;