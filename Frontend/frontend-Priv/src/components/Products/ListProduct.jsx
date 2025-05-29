import React from "react";
import BasuraSvg from "../../assets/Basura.svg";
import EditarSvg from "../../assets/editar.svg";

const ListProduct = ({ products, deleteProduct, onEdit }) => {
  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full bg-white border border-gray-200 text-sm sm:text-base">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left whitespace-nowrap">Imagen</th>
            <th className="px-4 py-2 text-left whitespace-nowrap">Nombre</th>
            <th className="px-4 py-2 text-left whitespace-nowrap">Descripción</th>
            <th className="px-4 py-2 text-left whitespace-nowrap">Precio</th>
            <th className="px-4 py-2 text-left whitespace-nowrap">Stock</th>
            <th className="px-4 py-2 text-left whitespace-nowrap">Categoría</th>
            <th className="px-4 py-2 text-left whitespace-nowrap">Marca</th>
            <th className="px-4 py-2 text-left whitespace-nowrap">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-center py-4 text-gray-400">
                No hay productos disponibles.
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product._id} className="border-t hover:bg-gray-50 transition">
                <td className="px-4 py-2">
                  {product.productImage ? (
                    <img
                      src={product.productImage}
                      alt={product.productName}
                      className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded"
                    />
                  ) : (
                    <span className="text-gray-400">Sin imagen</span>
                  )}
                </td>

                <td className="px-4 py-2">{product.productName}</td>
                <td className="px-4 py-2">{product.description}</td>
                <td className="px-4 py-2">${product.price}</td>
                <td className="px-4 py-2">Disponible ({product.stock})</td>
                <td className="px-4 py-2">
                  {product.idCategory?.categoryName || "Sin categoría"}
                </td>
                <td className="px-4 py-2">
                  {product.idBrand?.brandName || "Sin marca"}
                </td>
                <td className="px-4 py-2">
                  <div className="flex items-center gap-3">
                    <button
                      className="hover:scale-110 transition-transform"
                      onClick={() => deleteProduct(product._id)}
                    >
                      <img src={BasuraSvg} alt="Eliminar" className="w-6 h-6 sm:w-8 sm:h-8" />
                    </button>
                    <button
                      className="hover:scale-110 transition-transform"
                      onClick={() => onEdit(product)}
                    >
                      <img src={EditarSvg} alt="Editar" className="w-6 h-6 sm:w-8 sm:h-8" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListProduct;