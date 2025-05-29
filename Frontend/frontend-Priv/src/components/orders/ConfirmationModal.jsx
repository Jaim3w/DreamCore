import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;
//toast de confirmacion de eliminacion de pedido
  const handleConfirm = () => {
    toast.success('Pedido eliminado correctamente ');
    onConfirm();
  };
//toast de que huvo un error al eliminar el pedido
  const handleCancel = () => {
    toast.warning('No se puedo completar la eliminacion del pedido ', {
      icon: '⚠️',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-[#1b4d3e] text-white p-8 rounded-2xl shadow-2xl max-w-md w-full flex flex-col items-center relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-white text-2xl font-bold hover:text-red-400 transition"
          title="Cerrar"
        >
          &times;
        </button>
        <h3 className="text-xl font-bold mb-6 text-center">{message}</h3>
        <div className="flex gap-4 mt-2">
          <button
            onClick={handleCancel}
            className="bg-gray-200 hover:bg-gray-300 text-[#1b4d3e] font-semibold px-6 py-2 rounded-full transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-full transition flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <circle cx="12" cy="12" r="11" fill="#fff" opacity="0.08" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Rechazar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
