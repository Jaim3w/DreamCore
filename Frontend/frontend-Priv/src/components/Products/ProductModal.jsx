import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Dialog } from "@headlessui/react";
import { useForm, Controller } from "react-hook-form";

const ModalCreateProduct = ({ isOpen, onClose, onSubmit, initialData = null }) => {
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
    reset
  } = useForm();

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Fetch de marcas y categorías
      fetch("http://localhost:4000/api/brands")
        .then((res) => res.json())
        .then(setBrands)
        .catch(console.error);

      fetch("http://localhost:4000/api/categories")
        .then((res) => res.json())
        .then(setCategories)
        .catch(console.error);

      if (initialData) {
        // Si hay datos iniciales, pre-llenamos los campos
        setValue("productName", initialData.productName);
        setValue("description", initialData.description);
        setValue("price", initialData.price);
        setValue("stock", initialData.stock);
        setValue("idCategory", initialData.idCategory);
        setValue("idBrand", initialData.idBrand);
        setPreviewImage(initialData.productImage);  // Previsualizar la imagen
      } else {
        reset();  // Limpiar los campos si no hay producto
      }
    }
  }, [isOpen, initialData, setValue, reset]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setValue("image", file);  
      clearErrors("image"); 
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    setValue("image", null); 
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  const handleFormSubmit = async (data) => {
    if (!data.image) {
      return alert("Por favor selecciona una imagen.");
    }

    // Enviar los datos al manejador de submit
    onSubmit(data);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel
          as={motion.div}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-xl"
        >
          <Dialog.Title className="text-2xl font-bold text-center mb-6">
            {initialData ? "Editar Producto" : "Crear Producto"}
          </Dialog.Title>

          <form onSubmit={handleSubmit(handleFormSubmit)} className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <input
                type="text"
                {...register("productName", { required: "Nombre requerido" })}
                placeholder="Nombre"
                className="input"
              />
              {errors.productName && <p className="text-red-500 text-sm">{errors.productName.message}</p>}
            </div>

            <div className="flex flex-col">
              <input
                type="text"
                {...register("description", { required: "Descripción requerida" })}
                placeholder="Descripción"
                className="input"
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
            </div>

            <div className="flex flex-col">
              <input
                type="number"
                {...register("price", { required: "Precio requerido" })}
                placeholder="Precio"
                className="input"
              />
              {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
            </div>

            <div className="flex flex-col">
              <input
                type="number"
                {...register("stock", { required: "Stock requerido" })}
                placeholder="Stock"
                className="input"
              />
              {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message}</p>}
            </div>

            <div className="flex flex-col">
              <select {...register("idCategory", { required: "Categoría requerida" })} className="input">
                <option value="">Seleccionar categoría</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.categoryName}
                  </option>
                ))}
              </select>
              {errors.idCategory && <p className="text-red-500 text-sm">{errors.idCategory.message}</p>}
            </div>

            <div className="flex flex-col">
              <select {...register("idBrand", { required: "Marca requerida" })} className="input">
                <option value="">Seleccionar marca</option>
                {brands.map((brand) => (
                  <option key={brand._id} value={brand._id}>
                    {brand.brandName}
                  </option>
                ))}
              </select>
              {errors.idBrand && <p className="text-red-500 text-sm">{errors.idBrand.message}</p>}
            </div>

            <div className="col-span-2 border-2 border-dashed border-gray-300 rounded-xl p-6 text-center text-gray-500 cursor-pointer hover:border-gray-400 transition">
              <label htmlFor="image" className="block cursor-pointer">
                Haz clic para seleccionar una imagen
                <input
                  type="file"
                  id="image"
                  ref={fileInputRef}
                  {...register("image", { required: "Por favor selecciona una imagen" })}
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

              {previewImage && (
                <div className="mt-4">
                  <img
                    src={previewImage}
                    alt="Previsualización"
                    className="mx-auto max-h-40 object-contain rounded-lg shadow"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="mt-2 text-red-500 hover:underline text-sm"
                  >
                    Eliminar imagen
                  </button>
                </div>
              )}
              {errors.image && <p className="col-span-2 text-red-500 text-sm">{errors.image.message}</p>}
            </div>

            <div className="col-span-2 flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700"
              >
                {initialData ? "Actualizar" : "Crear"}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ModalCreateProduct;  