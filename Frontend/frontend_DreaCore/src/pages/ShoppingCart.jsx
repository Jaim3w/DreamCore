import React, { useState } from "react";

function ShoppingCart() {
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

  // Función para incrementar la cantidad
  const incrementQuantity = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  // Función para decrementar la cantidad
  const decrementQuantity = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  return (
    <div className="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div className="pointer-events-auto w-screen max-w-md">
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">
                      Shopping cart
                    </h2>
                  </div>
                  <div className="mt-8">
                    <div className="flow-root">
                      <ul role="list" className="-my-6 divide-y divide-gray-200">
                        {products.map((product) => (
                          <li key={product.id} className="flex py-6">
                            {/* Card en fila */}
                            <div className="flex flex-row items-center bg-gray-100 rounded-lg p-4 shadow-md w-full">
                              {/* Imagen circular en el lado izquierdo */}
                              <div className="w-24 h-24 rounded-full shadow-md bg-white flex items-center justify-center overflow-hidden">
                                <img
                                  src={product.image}
                                  alt={product.description}
                                  className="w-full h-full object-cover"
                                />
                              </div>

                              {/* Contenido en el lado derecho */}
                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <h3 className="text-base font-medium text-gray-900">{product.name}</h3>
                                  <p className="text-sm text-gray-500">{product.description}</p>
                                  <p className="mt-2 text-lg font-semibold text-gray-900">
                                    ${product.price.toFixed(2)}
                                  </p>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm mt-4">
                                  <div className="flex items-center space-x-2">
                                    <button
                                      type="button"
                                      onClick={() => decrementQuantity(product.id)}
                                      className="px-2 py-1 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300"
                                    >
                                      -
                                    </button>
                                    <p className="text-gray-500">Qty: {product.quantity}</p>
                                    <button
                                      type="button"
                                      onClick={() => incrementQuantity(product.id)}
                                      className="px-2 py-1 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300"
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>
                      $
                      {products
                        .reduce((total, product) => total + product.price * product.quantity, 0)
                        .toFixed(2)}
                    </p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className="mt-6">
                    <a
                      href="#"
                      className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                      Checkout
                    </a>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or{" "}
                      <button
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Continue Shopping<span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
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