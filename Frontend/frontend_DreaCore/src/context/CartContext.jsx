// src/context/CartContext.js
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [productsInCart, setProductsInCart] = useState([]);

  const addToCart = (product) => {
    setProductsInCart((prev) => {
      const existing = prev.find((p) => (p.id || p._id) === (product.id || product._id));
      if (existing) {
        return prev.map((p) =>
          (p.id || p._id) === (product.id || product._id)
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setProductsInCart((prev) => prev.filter((p) => (p.id || p._id) !== id));
  };

  const updateQuantity = (id, delta) => {
    setProductsInCart((prev) =>
      prev.map((p) =>
        (p.id || p._id) === id
          ? { ...p, quantity: Math.max(1, p.quantity + delta) }
          : p
      )
    );
  };

  const clearCart = () => {
    setProductsInCart([]); // ✅ Vaciar el carrito
  };

  return (
    <CartContext.Provider
      value={{ productsInCart, addToCart, removeFromCart, updateQuantity, clearCart }} // ✅ Agregado aquí
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
