import React from "react";
import BasuraSvg from "../../assets/basura.svg";
import EditarSvg from "../../assets/editar.svg";

const ListProduct = ({ products, deleteProduct }) => {
  return (
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
            <th className="px-4 py-2 text-left">Marca</th>
            <th className="px-4 py-2 text-left"></th>
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
              <tr key={product._id} className="border-t">
                <td className="px-4 py-2">
                  {product.productImage ? (
                    <img
                      src={product.productImage}
                      alt={product.productName}
                      className="w-16 h-16 object-cover rounded"
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
                <td className="px-4 py-2 flex gap-2">
                  <button
                    className="text-green-700 hover:text-green-900"
                    onClick={() => deleteProduct(product._id)}
                  >
                    <img src={BasuraSvg} alt="Eliminar" className="w-7 h-7" />
                  </button>
                  <button className="text-green-700 hover:text-green-900">
                    <img src={EditarSvg} alt="Editar" className="w-12 h-12" />
                  </button>
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
