import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const CreateSale = () => {
  const navigate = useNavigate();
  const { state } = useLocation(); // Recibe `idOrder` desde la navegación

  const [payMentmethod, setPayMentmethod] = useState("Tarjeta");
  const [address, setAddress] = useState("");
  const stateOrder = "Pendiente"; // Siempre 'Pendiente'
  const idOrder = state?.idOrder;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!idOrder) {
      toast.error("No se encontró la orden asociada.");
      return;
    }

    const payload = { idOrder, payMentmethod, address, state: stateOrder };

    try {
      const res = await fetch("http://localhost:4000/api/sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Error al registrar la venta");

      toast.success("Venta registrada con éxito!");
      setTimeout(() => navigate("/sales"), 1500);
    } catch (err) {
      console.error(err);
      toast.error("Hubo un problema al registrar la venta");
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F9F8] flex items-center justify-center px-6 py-10">
      <Toaster position="top-right" />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-10"
      >
        <h2 className="text-3xl font-bold text-[#1C4C38] mb-8 text-center tracking-wide">
          Registrar Venta
        </h2>

        <div className="mb-6">
          <label className="block text-gray-600 font-semibold mb-2">Método de Pago</label>
          <select
            value={payMentmethod}
            onChange={(e) => setPayMentmethod(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border-2 border-[#DDE3E1] focus:outline-none focus:ring-2 focus:ring-[#1C4C38]"
          >
            <option>Tarjeta</option>
            <option>Efectivo</option>
            <option>Transferencia</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-600 font-semibold mb-2">Dirección de Envío</label>
          <input
            type="text"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Dirección completa..."
            className="w-full px-4 py-2 rounded-lg border-2 border-[#DDE3E1] focus:outline-none focus:ring-2 focus:ring-[#1C4C38]"
          />
        </div>

        {/* Estado fijo: Pendiente */}
        <div className="mb-6">
          <label className="block text-gray-600 font-semibold mb-2">Estado de la Venta</label>
          <p className="px-4 py-2 rounded-lg border-2 border-[#DDE3E1] bg-gray-100 text-gray-700">
            Pendiente
          </p>
        </div>

        <button
          type="submit"
          className="w-full py-3 text-white bg-[#1C4C38] rounded-xl font-semibold text-lg hover:bg-[#143226] transition-all mb-4"
        >
          Registrar Venta
        </button>

        <button
          type="button"
          onClick={() => navigate("/sales")}
          className="w-full py-3 text-[#ffffff] border border-[#1C4C38] rounded-xl font-semibold text-lg hover:bg-[#E1EDE8] transition-all"
        >
          Ver Historial de Ventas
        </button>
      </form>
    </div>
  );
};

export default CreateSale;
