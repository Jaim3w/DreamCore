import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

const SalesHistory = () => {
  const { user } = useAuth();
  const clientId = user?._id;
  const [sales, setSales] = useState([]);

  const fetchSales = async () => {
    if (!clientId) {
      toast.error("Debes iniciar sesión para ver tu historial de ventas");
      return;
    }
    try {
      const res = await fetch(`http://localhost:4000/api/sales/client/${clientId}`);
      if (!res.ok) throw new Error("Error al cargar las ventas");
      const data = await res.json();
      setSales(data);
    } catch (error) {
      console.error(error);
      toast.error("No se pudieron cargar las ventas");
    }
  };

  useEffect(() => {
    fetchSales();
  }, [clientId]);

  return (
    <div className="min-h-screen bg-[#F7F9F8] p-6">
      <Toaster position="top-right" />
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-3xl p-6">
        <h2 className="text-3xl font-bold text-[#1C4C38] mb-6 text-center">Mi Historial de Ventas</h2>

        {sales.length === 0 ? (
          <p className="text-center text-gray-600">Todavía no tienes ventas registradas.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead className="bg-[#1C4C38] text-white">
                <tr>
                  <th className="py-3 px-4">ID Venta</th>
                  <th className="py-3 px-4">Método de Pago</th>
                  <th className="py-3 px-4">Dirección</th>
                  <th className="py-3 px-4">Estado</th>
                  <th className="py-3 px-4">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale) => (
                  <tr key={sale._id} className="border-b text-center">
                    <td className="py-3 px-4">{sale._id}</td>
                    <td className="py-3 px-4">{sale.payMentmethod}</td>
                    <td className="py-3 px-4">{sale.address}</td>
                    <td className="py-3 px-4">{sale.state}</td>
                    <td className="py-3 px-4">
                      {new Date(sale.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesHistory;
