import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const ModalAgregarCategoria = ({ isOpen, onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = (data) => {
    const file = data.imagen?.[0];
    if (!file) {
      toast.error("Debes seleccionar una imagen");
      return;
    }

    onSubmit({ nombre: data.nombre, imagen: file });
    toast.success("¡Categoría agregada con éxito!");
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-[#2e7d5c] text-white px-5 py-4 rounded-2xl w-[350px] relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-white text-lg hover:text-gray-300"
        >
          ✕
        </button>

        <h2 className="text-center text-lg font-semibold mb-4">
          Agregar categoría
        </h2>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex flex-col gap-3"
        >
          {/* Campo nombre */}
          <label className="bg-white text-black rounded-md text-sm px-3 py-1.5">
            <input
              type="text"
              placeholder="Nombre"
              {...register("nombre", { required: "El nombre es obligatorio" })}
              className="w-full bg-transparent outline-none"
            />
          </label>
          {errors.nombre && (
            <span className="text-red-200 text-xs -mt-2 px-1">
              {errors.nombre.message}
            </span>
          )}

          {/* Campo imagen */}
          <label className="bg-white text-black rounded-md text-sm px-3 py-1.5 flex items-center justify-between cursor-pointer">
            Subir imagen
            <span>📎</span>
            <input
              type="file"
              accept="image/*"
              {...register("imagen", { required: "La imagen es obligatoria" })}
              className="hidden"
            />
          </label>
          {errors.imagen && (
            <span className="text-red-200 text-xs -mt-2 px-1">
              {errors.imagen.message}
            </span>
          )}

          <button
            type="submit"
            className="bg-[#17604e] hover:bg-[#145f44] text-white py-1.5 rounded-md text-sm"
          >
            Agregar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalAgregarCategoria;
