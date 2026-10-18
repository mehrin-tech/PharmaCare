
import React from "react";

const currency = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN")}`;

const RecentOrders = ({ orders = [], loading = false }) => {
  return (
    <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
        <h2 className="text-lg font-bold text-gray-900">
          Recent Orders
        </h2>
        <span className="text-sm font-medium text-emerald-600">
          Latest 5
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-xs text-gray-500">
            <tr>
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Payment Method</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date & Time</th>
            </tr>
          </thead>

       <tbody className="divide-y divide-gray-100">
  {loading ? (
    <tr>
      <td colSpan="6" className="p-6 text-center">
        Loading orders...
      </td>
    </tr>
  ) : orders.length === 0 ? (
    <tr>
      <td colSpan="6" className="p-6 text-center">
        No recent orders found
      </td>
    </tr>
  ) : (
    orders.map((order) => (
      <tr key={order._id} className="hover:bg-gray-50">
        <td className="whitespace-nowrap px-4 py-3 font-medium">
          #{order.orderNumber || order._id}
        </td>

        <td className="whitespace-nowrap px-4 py-3">
          {order.user?.name || "Customer"}
        </td>

        <td className="whitespace-nowrap px-4 py-3">
          ₹{Number(order.totalAmount || 0).toLocaleString("en-IN")}
        </td>

       <td className="whitespace-nowrap px-4 py-3">
  {order.paymentMethod === "cod"
    ? "Cash on Delivery"
    : order.paymentMethod === "razorpay"
    ? "Razorpay"
    : "N/A"}
</td>

        {/* <td className="whitespace-nowrap px-4 py-3">
          <span className="rounded-full bg-gray-100 px-2 py-1 text-xs">
            {order.orderStatus || "N/A"}
          </span>
        </td> */}
        <td className="whitespace-nowrap px-4 py-3">
  <span
    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
      order.orderStatus === "cancelled"
        ? "bg-red-100 text-red-700"
        : order.orderStatus === "delivered"
        ? "bg-green-100 text-green-700"
        : order.orderStatus === "pending"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-gray-100 text-gray-700"
    }`}
  >
    {order.orderStatus
      ? order.orderStatus.charAt(0).toUpperCase() +
        order.orderStatus.slice(1)
      : "N/A"}
  </span>
</td>

        <td className="whitespace-nowrap px-4 py-3">
          {order.createdAt
            ? new Date(order.createdAt).toLocaleString("en-IN")
            : "N/A"}
        </td>
      </tr>
    ))
  )}
</tbody>
        </table>
      </div>
    </section>
  );
};

export default RecentOrders;
