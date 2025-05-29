// src/components/orders/OrderActions.jsx
import React from 'react';


// Componente que muestra el botón de acción para eliminar una orden
const OrderActions = ({ onDelete }) => {
  return (
    <button
      className="bg-red-600 hover:bg-red-700 text-white rounded-full p-2 transition"
      title="Delete"
      onClick={onDelete}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  );
};

export default OrderActions;