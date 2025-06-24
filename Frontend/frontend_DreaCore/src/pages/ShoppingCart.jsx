import React from "react";
import trashIcon from "../assets/trash(2).png";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ShoppingCart({ onClose }) {
  const { productsInCart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const incrementQuantity = (id) => updateQuantity(id, 1);
  const decrementQuantity = (id) => updateQuantity(id, -1);
  const handleRemove = (id) => removeFromCart(id);

  const buscarMasProductos = () => {
    navigate("/productos");
    onClose();
  };

  const navigateToOrders = () => {
    const total = productsInCart.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );

    navigate("/orders", {
      state: {
        products: productsInCart,
        total,
      },
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
      <div
        className="fixed inset-0 z-50 bg-gray-500/75 transition-opacity"
        aria-hidden="true"
        onClick={onClose}
      ></div>

      <div className="fixed inset-0 overflow-hidden z-50">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div className="pointer-events-auto w-screen max-w-md">
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-start">
                    <button
                      onClick={onClose}
                      className="bg-transparent p-1 hover:opacity-75"
                      aria-label="Close cart"
                    >
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

                  <div className="mt-8">
                    <div className="flow-root">
                      <ul role="list" className="-my-6 divide-y divide-gray-200">
                        {productsInCart.map((product) => (
                          <li key={product.id || product._id} className="relative flex py-6">
                            <div className="relative flex flex-row items-center bg-white rounded-lg p-4 shadow-lg w-full">
                              <div className="w-24 h-24 shadow-md flex items-center justify-center overflow-hidden">
                                <img
                                  src={product.image || product.productImage}
                                  alt={product.description || product.productName}
                                  className="w-full h-full object-contain"
                                />
                              </div>
                              <div className="ml-4 flex flex-1 flex-col">
                                <h3 className="text-base font-medium text-gray-900">
                                  {product.name || product.productName}
                                </h3>
                                <div className="flex items-center justify-between mt-4">
                                  <p className="text-lg font-semibold text-[#1C4C38]">
                                    ${product.price.toFixed(2)}
                                  </p>
                                  <div className="flex items-center border-2 border-[#1C4C38] rounded-xl p-0.5">
                                    <button
                                      onClick={() => decrementQuantity(product.id || product._id)}
                                      className="w-7 h-7 rounded-lg bg-white text-[#1C4C38] border border-[#1C4C38] hover:bg-[#1C4C38] hover:text-white flex items-center justify-center"
                                    >
                                      -
                                    </button>
                                    <p className="mx-2 text-[#1C4C38] font-semibold text-sm">
                                      {product.quantity}
                                    </p>
                                    <button
                                      onClick={() => incrementQuantity(product.id || product._id)}
                                      className="w-7 h-7 rounded-lg bg-white text-[#1C4C38] border border-[#1C4C38] hover:bg-[#1C4C38] hover:text-white flex items-center justify-center"
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <button
                                onClick={() => handleRemove(product.id || product._id)}
                                className="absolute top-2 right-2 bg-transparent"
                              >
                                <img src={trashIcon} alt="Eliminar producto" className="w-5 h-5" />
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 flex justify-center">
                      <button
                        onClick={buscarMasProductos}
                        type="button"
                        className="w-[90%] px-6 py-3 text-base font-medium rounded-lg text-[#1C4C38] bg-white border-2"
                        style={{ borderColor: '#1C4C38' }}
                      >
                        Buscar más productos
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between items-center mb-6">
                    <p className="text-2xl font-semibold text-black">Subtotal</p>
                    <p className="text-2xl font-semibold text-black">
                      ${productsInCart
                        .reduce((total, product) => total + product.price * product.quantity, 0)
                        .toFixed(2)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={navigateToOrders}
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
