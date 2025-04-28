import React, { useState } from "react";
import trashIcon from "../assets/trash(2).png";

// Componente principal del carrito de compras
function ShoppingCart({ onClose }) {
  // Estado local para los productos en el carrito
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Throwback Hip Bag",
      price: 90.0,
      image:
        "https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
      description: "Salmon orange fabric pouch with match zipper.",
      quantity: 1,
    },
    {
      id: 2,
      name: "Medium Stuff Satchel",
      price: 32.0,
      image:
        "https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
      description: "Blue canvas body with black straps.",
      quantity: 1,
    },
  ]);

  // Función para incrementar la cantidad de un producto
  const incrementQuantity = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  // Función para decrementar la cantidad de un producto (mínimo 1)
  const decrementQuantity = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  // Función para eliminar un producto del carrito
  const removeProduct = (id) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
  };

  // Renderizado del componente
  return (
    // Fondo y contenedor principal del modal del carrito
    <div className="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      {/* Fondo oscuro semitransparente */}
      <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          {/* Panel lateral derecho */}
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div className="pointer-events-auto w-screen max-w-md">
              {/* Contenedor blanco con sombra */}
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                {/* Sección superior del carrito */}
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  {/* Botón para cerrar el carrito */}
                  <div className="flex items-start justify-start">
                    <button onClick={() => onClose()} className="bg-transparent p-1 hover:opacity-75" aria-label="Close cart">
                      {/* X */}
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-6 w-6 text-[#1C4C38]" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M6 18L18 6M6 6l12 12" 
                        />
                      </svg>
                    </button>
                  </div>
                  {/* Lista de productos */}
                  <div className="mt-8">
                    <div className="flow-root">
                      <ul role="list" className="-my-6 divide-y divide-gray-200">
                        {products.map((product) => (
                          <li key={product.id} className="relative flex py-6">
                            {/* Card del producto */}
                            <div className="relative flex flex-row items-center bg-white rounded-lg p-4 shadow-lg w-full">
                              {/* Imagen del producto */}
                              <div className="w-24 h-24 shadow-md bg-white flex items-center justify-center overflow-hidden">
                                <img
                                  src={product.image}
                                  alt={product.description}
                                  className="w-full h-full object-contain"
                                />
                              </div>
                              {/* Contenido: nombre, precio y contador */}
                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <h3 className="text-base font-medium text-gray-900">{product.name}</h3>
                                </div>
                                {/* Precio y contador */}
                                <div className="flex items-center justify-between mt-4">
                                  {/* Precio */}
                                  <p className="text-lg font-semibold text-[#1C4C38]">${product.price.toFixed(2)}</p>
                                  {/* Contador de cantidad */}
                                  <div className="flex items-center border-2 border-[#1C4C38] rounded-xl p-0.5">
                                    <button
                                      type="button"
                                      onClick={() => decrementQuantity(product.id)}
                                      className="w-7 h-7 rounded-lg text-[#1C4C38] font-semibold bg-transparent hover:bg-[#1C4C38] hover:text-white flex items-center justify-center"
                                    >
                                      -
                                    </button>
                                    <p className="mx-2 text-[#1C4C38] font-semibold text-sm">{product.quantity}</p>
                                    <button
                                      type="button"
                                      onClick={() => incrementQuantity(product.id)}
                                      className="w-7 h-7 rounded-lg text-[#1C4C38] font-semibold bg-transparent hover:bg-[#1C4C38] hover:text-white flex items-center justify-center"
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                              </div>
                              {/* Botón para eliminar producto */}
                              <button
                                onClick={() => removeProduct(product.id)}
                                className="absolute top-2 right-2 bg-transparent"
                                aria-label="Remove product"
                              >
                                <img
                                  src={trashIcon}
                                  alt="Eliminar producto"
                                  className="w-5 h-5"
                                />
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* Botón para buscar más productos */}
                    <div className="mt-6 flex justify-center">
                      <button
                        type="button"
                        className="w-[90%] px-6 py-3 text-base font-medium rounded-lg text-[#1C4C38] bg-white border-2 border-solid text-center"
                        style={{ borderColor: '#1C4C38' }}
                      >
                        Buscar más productos
                      </button>
                    </div>
                  </div>
                </div>
                {/* Sección inferior: subtotal y botón de reservar */}
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between items-center mb-6">
                    <p className="text-2xl font-semibold text-black">Subtotal</p>
                    <p className="text-2xl font-semibold text-black">
                      ${products.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2)}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="w-full px-6 py-3 text-base font-medium rounded-lg bg-[#1C4C38] text-white text-center"
                  >
                    Ir a reservar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;