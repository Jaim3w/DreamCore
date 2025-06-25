import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!user?._id) return;
        const res = await fetch(`http://localhost:4000/api/orders/client/${user._id}`);
        if (!res.ok) throw new Error("No se pudo obtener el historial");
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <div className="min-h-screen bg-[#F7F9F8] p-8">
      <h1 className="text-3xl font-bold text-[#1C4C38] mb-6 text-center">
        Historial de Pedidos
      </h1>
      <div className="max-w-4xl mx-auto space-y-6">
        {orders.length === 0 ? (
          <p className="text-gray-500 text-center">No hay pedidos realizados.</p>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-lg rounded-2xl p-6 border border-[#DDE3E1]"
            >
              <p className="text-lg font-semibold text-[#1C4C38]">
                Fecha: {new Date(order.reservationDate).toLocaleDateString()}
              </p>
              <ul className="mt-2 space-y-1">
                {order.products.map((p, idx) => (
                  <li key={idx} className="text-gray-700">
                    {p.productName} × {p.amount} = ${p.totalPartial.toFixed(2)}
                  </li>
                ))}
              </ul>
              <p className="mt-3 font-bold text-[#1C4C38]">
                Total: ${order.total.toFixed(2)}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
