import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const ModalEditarCategoria = ({ isOpen, onClose, onSubmit, categoria }) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (categoria) {
      setValue("nombre", categoria.nombre || "");
      reset({ nombre: categoria.nombre });
    }
  }, [categoria, setValue, reset]);

  const onFormSubmit = (data) => {
    const datosActualizados = {
      _id: categoria._id,
      nombre: data.nombre,
      imagen: data.imagen?.[0] || null, // File o null
    };

    onSubmit(datosActualizados);
    toast.success("¡Categoría actualizada correctamente!");
    onClose();
    reset();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-[#2e7d5c] text-white p-6 rounded-2xl w-[90%] max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white font-bold text-xl"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">
          Editar categoría
        </h2>

        <form onSubmit={handleSubmit(onFormSubmit)} className="flex flex-col gap-4">
          {/* Campo nombre */}
          <label className="bg-white text-black rounded-md px-3 py-2 text-sm">
            <input
              type="text"
              placeholder="Nombre"
              className="w-full bg-transparent outline-none"
              {...register("nombre", {
                required: "El nombre es obligatorio",
              })}
            />
          </label>
          {errors.nombre && (
            <span className="text-red-300 text-sm -mt-2">
              {errors.nombre.message}
            </span>
          )}

          {/* Imagen previa */}
          <div className="flex items-center gap-3">
            {categoria?.imagen && (
              <img
                src={categoria.imagen}
                alt="Actual"
                className="w-16 h-16 object-cover rounded-md"
              />
            )}

            <label className="bg-white text-black rounded-md px-3 py-2 text-sm cursor-pointer">
              Cambiar imagen
              <input
                type="file"
                accept="image/*"
                {...register("imagen")}
                className="hidden"
              />
            </label>
          </div>

          {/* Botón submit */}
          <button
            type="submit"
            className="bg-[#145f44] hover:bg-[#104b38] text-white py-2 rounded-md text-sm"
          >
            Editar categoría
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalEditarCategoria;
