import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // ✅ asegúrate de importar los estilos

import useDataProducts from "../components/Products/hooks/useDataProducts";
import ListProduct from "../components/Products/ListProduct";
import BotonGenerico from "../components/BotonGenerico";
import ProductModal from "../components/Products/ProductModal";
import "../components/styles/ManageProducts.css";

const Products = () => {
  const {
    products,
    deleteProduct,
    addProduct,
    updateProduct,
    searchQuery,
    handleSearch,
  } = useDataProducts();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpenModal = (product = null) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleSubmitProduct = async (productData) => {
  const formattedData = {
    ...productData,
    price: parseFloat(productData.price),
    stock: parseInt(productData.stock),
  };

  const formData = new FormData();
  formData.append("productName", formattedData.productName);
  formData.append("description", formattedData.description);
  formData.append("price", formattedData.price);
  formData.append("stock", formattedData.stock);
  formData.append("idCategory", formattedData.idCategory);
  formData.append("idBrand", formattedData.idBrand);
  formData.append("productImage", formattedData.image);

  try {
    if (selectedProduct) {
      await updateProduct(formData, selectedProduct._id);
      toast.success("Producto actualizado correctamente");
    } else {
      await addProduct(formData);
      toast.success("Producto registrado correctamente");
    }

    setSelectedProduct(null);
    handleCloseModal();

    return { success: true };
  } catch (error) {
    toast.error("Hubo un error al guardar el producto");
    return { success: false, message: error.message };
  }
};

  return (
    <div className="p-4 sm:p-6 md:p-9">
      {/* ✅ Aquí el contenedor de los toasts */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header de productos con búsqueda y botón */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-8 mb-6">
        <h2 className="font-bold text-xl sm:text-2xl">Ingresa Productos:</h2>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full md:w-auto">
          <BotonGenerico
            label="Agregar Producto"
            onClick={() => handleOpenModal(null)}
            className="w-full sm:w-auto"
          />

          <div className="flex items-center border rounded px-2 py-1 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="outline-none border-none bg-transparent w-full sm:w-48"
            />
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4-4m0 0A7 7 0 104 4a7 7 0 0013 13z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Lista de productos */}
      <ListProduct
        products={products}
        deleteProduct={deleteProduct}
        onEdit={handleOpenModal}
      />

      {/* Modal para agregar/editar productos */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitProduct}
        initialData={selectedProduct}
      />
    </div>
  );
};

export default Products;
