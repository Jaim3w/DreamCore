import React from "react";
import { Toaster } from "react-hot-toast";
import useDataProducts from "../components/Products/hooks/useDataProducts";
import ListProduct from "../components/Products/ListProduct";
import BotonGenerico from "../components/BotonGenerico";
import { useNavigate } from "react-router-dom";
import "../components/styles/ManageProducts.css";

const Products = () => {
  const navigate = useNavigate();
  const { products, deleteProduct, loading } = useDataProducts();

  const handleGoToCreateProducts = () => {
    navigate("/CreateProducts");
  };

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex items-center justify-between gap-8 p-9">
        <h2 className="font-bold text-2xl mb-1">Ingresa Productos:</h2>
        <div className="flex items-center gap-6">
          <BotonGenerico
            label="Agregar Producto"
            className="px-10 py-5 text-2xl rounded-xl font-bold shadow-lg"
            onClick={handleGoToCreateProducts}
          />
          <div className="flex items-center border rounded px-2 py-1">
            <input
              type="text"
              placeholder="Search..."
              className="outline-none border-none bg-transparent"
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
      <ListProduct products={products} deleteProduct={deleteProduct} />
    </div>
  );
};

export default Products;
