const ModalEliminarCategoria = ({ isOpen, onClose, onConfirm, categoria }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-[#2e7d5c] text-white p-6 rounded-2xl w-[90%] max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white font-bold text-xl"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">¿Eliminar categoría?</h2>
        
        {categoria?.imagen && (
          <img
            src={categoria.imagen}
            alt="Imagen de la categoría"
            className="w-full h-auto rounded-md mb-4"
          />
        )}
        
        <p className="mb-6">¿Estás seguro de eliminar "{categoria?.name}"?</p>
        
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalEliminarCategoria;
