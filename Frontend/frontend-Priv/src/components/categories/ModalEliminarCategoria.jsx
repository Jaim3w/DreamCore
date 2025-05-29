import React from 'react';
import { toast } from 'react-toastify';

const ModalEliminarCategoria = ({ isOpen, onClose, onConfirm, category }) => {
  if (!isOpen) return null;

  const handleDelete = () => {
    if (!category || !category._id) {
      toast.error("Categoría no válida para eliminar.");
      return;
    }

    onConfirm(); // Acción de eliminar
    toast.success(`Categoría "${category.categoryName}" eliminada correctamente`);
    onClose(); // Cerrar el modal
  };

  return (
    <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-[#1b4d3e] text-white p-8 rounded-2xl shadow-2xl w-[90%] max-w-md relative flex flex-col items-center">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-white text-2xl font-bold hover:text-red-400 transition"
          title="Cerrar"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">¿Eliminar categoría?</h2>

        {category?.imagen && (
          <img
            src={category.image}
            alt={`Imagen de la categoría ${category?.categoryName || ''}`}
            className="w-32 h-32 object-contain rounded-md mb-4"
          />
        )}

        <p className="mb-6 text-center">
          ¿Estás seguro de eliminar la categoría <span className="font-semibold">"{category?.categoryName || 'Sin nombre'}"</span>?
        </p>

        <div className="flex gap-4 mt-2">
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-[#1b4d3e] font-semibold px-6 py-2 rounded-full transition"
          >
            Cancelar
          </button>

          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-full transition flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <circle cx="12" cy="12" r="11" fill="#fff" opacity="0.08" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalEliminarCategoria;
