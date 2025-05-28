import React from 'react';
import OrderActions from "./OrdersActions";

const OrderList = ({ orders, onDelete }) => {
  if (orders.length === 0) {
    return (
      <tr>
        <td colSpan={6} className="text-center py-8 text-gray-400">
          No orders found
        </td>
      </tr>
    );
  }

  return orders.map((order) => (
    <tr key={order._id} className="border-b last:border-b-0 hover:bg-[#e6f4ef]">
      <td className="py-3 px-4">
        {order.idClient?.name || 'Sin cliente'}
      </td>
      <td className="py-3 px-4">
        {order.products && order.products.length > 0
  ? order.products.map(p => p.idproduct?.name || 'Sin nombre').join(', ')
  : 'Sin producto'}
      </td>
      <td className="py-3 px-4">
        {order.reservationDate
          ? new Date(order.reservationDate).toLocaleDateString('es-ES')
          : 'Sin fecha'}
      </td>
      <td className="py-3 px-4">{order.quantity}</td>
      <td className="py-3 px-4">${order.total?.toFixed(2) || 0}</td>
      <td className="py-3 px-4 flex justify-center">
        <OrderActions onDelete={() => onDelete(order._id)} />
      </td>
    </tr>
  ));
};

export default OrderList;
