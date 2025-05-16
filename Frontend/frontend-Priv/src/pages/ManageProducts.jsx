import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header/Header";
import BotonGenerico from "../components/BotonGenerico.jsx";
import BasuraSvg from "../assets/basura.svg";
import EditarSvg from "../assets/editar.svg"; 




function Products() {

  const navigate = useNavigate(); // Usamos el hook useNavigate

  const handleGoToCreateProducts = () => {
    navigate("/CreateProducts"); // Navegamos a la página de login
  };
  const [products, setProducts] = useState([]);
 const GetData = async () => {
 const response = await fetch("http://localhost:4000/api/products");
 const data = await response.json();
 console.log(data);
 if (!response.ok) {
    throw new Error("Error al obtener los productos");
  }
  setProducts(data);

  
  
 } 
  useEffect(() => {
    GetData();
  }, []);
 

  return (
    <div>
      <Header />

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
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full bg-white border border-gray-100">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Imagen</th>
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">Descripción</th>
              <th className="px-4 py-2 text-left">Precio</th>
              <th className="px-4 py-2 text-left">Stock</th>
              <th className="px-4 py-2 text-left">Categoría</th>
              <th className="px-4 py-2 text-left">Marcas</th>
              <th className="px-4 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-400">
                  No hay productos disponibles.
                </td>
              </tr>
            ) : (
              products.map((product, index) => (
                <tr key={product._id} className="border-t">
                  <td className="px-4 py-2">
                    
                    <img
                      src={product.productImage[0]}
                      alt={product.productName}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-2">{product.productName}</td>
                  <td className="px-4 py-2">{product.description}</td>
                  <td className="px-4 py-2">${product.price}</td>
                  <td className="px-4 py-2">Disponible({product.stock})</td>
                  <td className="px-4 py-2">{product.idCategory.categoryName}</td>
                  <td className="px-4 py-2">{product.idBrand.brandName}</td>
                  <td className="px-4 py-2 flex gap-2">
                    {/* Aquí puedes poner los iconos de editar/eliminar */}
                    <button className="text-green-700 hover:text-green-900">
                        <img src={BasuraSvg} 
                      alt="Eliminar"
                       className="w-7 h-7" />
                    </button>
                    <button className="text-green-700 hover:text-green-900">
                      <img
                        src={EditarSvg}
                        alt="Editar"
                        className="w-12 h-12"
                      />
                   
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Products;