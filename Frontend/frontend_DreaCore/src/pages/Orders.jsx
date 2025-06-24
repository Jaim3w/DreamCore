import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

const Orders = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const { user } = useAuth(); 
  const [date, setDate] = useState("");

  const clientId = user?._id;

  const { products, total } = state || { products: [], total: 0 };

  const today = new Date();
  const minDate = today.toISOString().split("T")[0];
  const maxDate = new Date(today.setMonth(today.getMonth() + 2)).toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!clientId) {
      toast.error("Debes iniciar sesión para hacer una reserva.");
      return;
    }

    const orderPayload = {
      idClient: clientId,
      reservationDate: date,
      products: products.map((p) => ({
        idProduct: p._id,
        amount: p.quantity,
        totalPartial: p.quantity * p.price,
      })),
      quantity: products.reduce((acc, p) => acc + p.quantity, 0),
      total,
    };

    try {
      const res = await fetch("http://localhost:4000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      if (!res.ok) throw new Error("Error al crear la orden");

      clearCart();
      toast.success("Reserva creada con éxito!");
      setTimeout(() => navigate("/home"), 1500);
    } catch (err) {
      console.error("Error al crear la orden:", err);
      toast.error(`Hubo un problema al crear la orden: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F9F8] flex items-center justify-center px-6 py-10">
      <Toaster position="top-right" />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-10"
      >
        <h2 className="text-3xl font-bold text-[#1C4C38] mb-8 text-center tracking-wide">
          Confirmar Reserva
        </h2>

        <div className="mb-6">
          <label className="block text-gray-600 font-semibold mb-2">
            Fecha de Reserva
          </label>
          <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={minDate}
            max={maxDate}
            className="w-full px-4 py-2 rounded-lg border-2 border-[#DDE3E1] focus:outline-none focus:ring-2 focus:ring-[#1C4C38]"
          />
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-[#1C4C38] mb-3">
            Productos seleccionados
          </h3>
          <ul className="divide-y divide-gray-200">
            {products.map((p) => (
              <li key={p._id} className="flex justify-between items-center py-3">
                <div>
                  <p className="text-gray-700 font-medium">{p.productName}</p>
                  <p className="text-sm text-gray-500">Cantidad: <strong>{p.quantity}</strong></p>
                </div>
                <p className="text-[#1C4C38] font-semibold">
                  ${(p.price * p.quantity).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6 text-right">
          <p className="text-2xl font-bold text-[#1C4C38]">Total: ${total.toFixed(2)}</p>
        </div>

        <button
          type="submit"
          className="w-full py-3 text-white bg-[#1C4C38] rounded-xl font-semibold text-lg hover:bg-[#143226] transition-all mb-4"
        >
          Reservar Ahora
        </button>

        <button
          type="button"
          onClick={() => navigate("/orderHistory")}
          className="w-full py-3 text-[#ffffff] border border-[#1C4C38] rounded-xl font-semibold text-lg hover:bg-[#E1EDE8] transition-all"
        >
          Ver Historial de Pedidos
        </button>
      </form>
    </div>
  );
};

export default Orders;
