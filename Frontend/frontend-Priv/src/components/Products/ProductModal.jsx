import React, { useState, useEffect, useRef } from "react";
import { Dialog } from "@headlessui/react";
import { useForm, Controller } from "react-hook-form";
import { motion } from "framer-motion";

const ModalCreateProduct = ({ isOpen, onClose, onSubmit, initialData = null }) => {
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
    reset,
    control,
  } = useForm();

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  // ✅ Reiniciar el modal cada vez que se abre
  useEffect(() => {
    if (isOpen) {
      fetch("http://localhost:4000/api/brands")
        .then((res) => res.json())
        .then(setBrands)
        .catch(console.error);

      fetch("http://localhost:4000/api/categories")
        .then((res) => res.json())
        .then(setCategories)
        .catch(console.error);

      if (initialData) {
        setValue("productName", initialData.productName);
        setValue("description", initialData.description);
        setValue("price", initialData.price);
        setValue("stock", initialData.stock);
        setValue("idCategory", initialData.idCategory);
        setValue("idBrand", initialData.idBrand);
        setPreviewImage(initialData.productImage);
      } else {
        reset();
        setPreviewImage(null);
      }
    }
  }, [isOpen, initialData, setValue, reset]);

  const handleRemoveImage = () => {
    setPreviewImage(null);
    setValue("image", null);
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  const handleFormSubmit = (data) => {
  // Si no hay imagen nueva Y no hay imagen previa, mostrar alerta
  if (!data.image && !previewImage) {
    alert("Por favor selecciona una imagen.");
    return;
  }

  // Si no hay imagen nueva pero sí hay previa, reutiliza la imagen anterior
  if (!data.image && previewImage) {
    data.image = previewImage;
  }

  onSubmit(data);
};


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 pt-20 sm:pt-24 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-[#2e7d5c] text-white px-6 py-5 rounded-2xl w-[380px] relative shadow-lg max-h-[95vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-white text-lg hover:text-gray-300"
        >
          ✕
        </button>

        <h2 className="text-center text-lg font-semibold mb-4">
          {initialData ? "Editar producto" : "Crear producto"}
        </h2>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
  <div className="sm:col-span-2">
    <label className="bg-white text-black rounded-md text-sm px-3 py-1.5 block">
      <input
        type="text"
        placeholder="Nombre"
        {...register("productName", { required: "Nombre requerido" })}
        className="w-full bg-transparent outline-none"
      />
    </label>
    {errors.productName && <span className="text-red-200 text-xs px-1">{errors.productName.message}</span>}
  </div>

  <div>
    <label className="bg-white text-black rounded-md text-sm px-3 py-1.5 block">
      <input
        type="number"
        placeholder="Precio"
        {...register("price", { required: "Precio requerido" })}
        className="w-full bg-transparent outline-none"
      />
    </label>
    {errors.price && <span className="text-red-200 text-xs px-1">{errors.price.message}</span>}
  </div>

  <div>
    <label className="bg-white text-black rounded-md text-sm px-3 py-1.5 block">
      <input
        type="number"
        placeholder="Stock"
        {...register("stock", { required: "Stock requerido" })}
        className="w-full bg-transparent outline-none"
      />
    </label>
    {errors.stock && <span className="text-red-200 text-xs px-1">{errors.stock.message}</span>}
  </div>

  <div className="sm:col-span-2">
    <label className="bg-white text-black rounded-md text-sm px-3 py-1.5 block">
      <input
        type="text"
        placeholder="Descripción"
        {...register("description", { required: "Descripción requerida" })}
        className="w-full bg-transparent outline-none"
      />
    </label>
    {errors.description && <span className="text-red-200 text-xs px-1">{errors.description.message}</span>}
  </div>

  <div>
    <label className="bg-white text-black rounded-md text-sm px-3 py-1.5 block">
      <select {...register("idCategory", { required: "Categoría requerida" })} className="w-full bg-transparent outline-none">
        <option value="">Categoría</option>
        {categories.map(cat => (
          <option key={cat._id} value={cat._id}>{cat.categoryName}</option>
        ))}
      </select>
    </label>
    {errors.idCategory && <span className="text-red-200 text-xs px-1">{errors.idCategory.message}</span>}
  </div>

  <div>
    <label className="bg-white text-black rounded-md text-sm px-3 py-1.5 block">
      <select {...register("idBrand", { required: "Marca requerida" })} className="w-full bg-transparent outline-none">
        <option value="">Marca</option>
        {brands.map(brand => (
          <option key={brand._id} value={brand._id}>{brand.brandName}</option>
        ))}
      </select>
    </label>
    {errors.idBrand && <span className="text-red-200 text-xs px-1">{errors.idBrand.message}</span>}
  </div>

  <div className="sm:col-span-2 flex flex-col items-center mt-2">
    <label className="bg-white text-black rounded-md text-sm px-3 py-1.5 flex items-center justify-between w-full sm:w-1/2 cursor-pointer">
      Subir imagen <span>📎</span>
      <Controller
        name="image"
        control={control}
        render={({ field }) => (
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setPreviewImage(URL.createObjectURL(file));
                field.onChange(file);
                clearErrors("image");
              }
            }}
            className="hidden"
          />
        )}
      />
    </label>
    {errors.image && <span className="text-red-200 text-xs px-1 mt-1">{errors.image.message}</span>}

    {previewImage && (
      <div className="flex flex-col items-center mt-2">
        <img src={previewImage} alt="Vista previa" className="w-32 h-32 object-cover rounded-md shadow" />
        <button type="button" onClick={handleRemoveImage} className="text-red-200 text-xs mt-1 hover:underline">
          Eliminar imagen
        </button>
      </div>
    )}
  </div>

  <div className="sm:col-span-2 flex justify-center mt-2">
    <button
      type="submit"
      className="bg-[#17604e] hover:bg-[#145f44] text-white py-1.5 px-8 rounded-md text-sm shadow-md transition"
    >
      {initialData ? "Actualizar" : "Crear"}
    </button>
  </div>
</form>
      </motion.div>
    </div>
  );
};

export default ModalCreateProduct;
