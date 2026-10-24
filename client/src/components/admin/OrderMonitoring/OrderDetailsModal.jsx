
import React from "react";
import {
  X,
  Package,
  UserRound,
  MapPin,
  CreditCard,
  CalendarDays,
  Phone,
  Mail,
} from "lucide-react";

const formatCurrency = (amount) =>
  `₹${Number(amount || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const formatDate = (date) => {
  if (!date) return "—";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "—";

  return parsedDate.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatStatus = (status) =>
  String(status || "Pending")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

const OrderDetailsModal = ({ order, onClose }) => {
  if (!order) return null;

  const customer =
    order.user || order.customer || {};

  const address =
    order.address ||
    order.shippingAddress ||
    order.deliveryAddress ||
    {};

  const items = Array.isArray(order.items)
    ? order.items
    : [];

  const orderId = order._id || order.orderId;

  const orderStatus =
    order.orderStatus || order.status || "pending";

  const paymentStatus =
    order.paymentStatus ||
    order.payment?.status ||
    "—";

  const paymentMethod =
    order.paymentMethod ||
    order.payment?.method ||
    "—";

  const totalAmount =
    order.totalAmount ??
    order.total ??
    order.grandTotal ??
    order.subtotal ??
    0;

  const statusColors = {
    pending: "bg-amber-50 text-amber-700",
    processing: "bg-blue-50 text-blue-700",
    confirmed: "bg-indigo-50 text-indigo-700",
    shipped: "bg-purple-50 text-purple-700",
    delivered: "bg-emerald-50 text-emerald-700",
    completed: "bg-emerald-50 text-emerald-700",
    cancelled: "bg-red-50 text-red-700",
    canceled: "bg-red-50 text-red-700",
  };

  const statusKey = String(orderStatus)
    .toLowerCase()
    .replace(/[\s_-]/g, "");

  const statusClass =
    statusColors[statusKey] ||
    "bg-gray-100 text-gray-700";

  const customerName =
    customer.name ||
    customer.fullName ||
    order.customerName ||
    "Unknown Customer";

  const customerEmail =
    customer.email ||
    order.email ||
    "—";

  const customerPhone =
    customer.phone ||
    order.phone ||
    "—";

  const addressText = [
    address.addressLine1 || address.street || address.address,
    address.addressLine2,
    address.city,
    address.state,
    address.pincode || address.postalCode || address.zipCode,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-5"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-details-title"
        className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-start justify-between border-b border-gray-100 bg-white p-5 sm:p-6">
          <div>
            <h2
              id="order-details-title"
              className="text-xl font-bold text-slate-800"
            >
              Order Details
            </h2>

            <p className="mt-1 break-all text-sm text-gray-500">
              Order ID: {orderId || "—"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close order details"
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
          >
            <X size={21} />
          </button>
        </div>

        <div className="space-y-6 p-5 sm:p-6">
          {/* Order status */}
          <section className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4">
            <div>
              <p className="text-sm text-gray-500">
                Current Order Status
              </p>

              <span
                className={`mt-2 inline-flex rounded-full px-3 py-1 text-sm font-medium ${statusClass}`}
              >
                {formatStatus(orderStatus)}
              </span>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Order Date
              </p>

              <p className="mt-1 flex items-center gap-2 text-sm font-medium text-slate-700">
                <CalendarDays size={16} />
                {formatDate(
                  order.createdAt ||
                    order.orderDate ||
                    order.date
                )}
              </p>
            </div>
          </section>

          {/* Customer and delivery details */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <section className="rounded-xl border border-gray-200 p-4">
              <h3 className="mb-4 flex items-center gap-2 font-semibold text-slate-800">
                <UserRound size={18} className="text-emerald-600" />
                Customer Information
              </h3>

              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-500">Name</p>
                  <p className="mt-1 font-medium text-slate-700">
                    {customerName}
                  </p>
                </div>

                <div className="flex items-start gap-2">
                  <Mail
                    size={16}
                    className="mt-0.5 shrink-0 text-gray-400"
                  />
                  <span className="break-all text-slate-700">
                    {customerEmail}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Phone
                    size={16}
                    className="shrink-0 text-gray-400"
                  />
                  <span className="text-slate-700">
                    {customerPhone}
                  </span>
                </div>
              </div>
            </section>

            <section className="rounded-xl border border-gray-200 p-4">
              <h3 className="mb-4 flex items-center gap-2 font-semibold text-slate-800">
                <MapPin size={18} className="text-emerald-600" />
                Delivery Address
              </h3>

              {addressText ? (
                <p className="text-sm leading-6 text-slate-600">
                  {addressText}
                </p>
              ) : (
                <p className="text-sm text-gray-400">
                  Address information unavailable.
                </p>
              )}
            </section>
          </div>

          {/* Items */}
          <section className="overflow-hidden rounded-xl border border-gray-200">
            <div className="flex items-center gap-2 border-b border-gray-100 p-4">
              <Package size={19} className="text-emerald-600" />
              <h3 className="font-semibold text-slate-800">
                Order Items ({items.length})
              </h3>
            </div>

            {items.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[520px] text-left text-sm">
                  <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                    <tr>
                      <th className="px-4 py-3 font-medium">
                        Product
                      </th>
                      <th className="px-4 py-3 font-medium">
                        Quantity
                      </th>
                      <th className="px-4 py-3 font-medium">
                        Price
                      </th>
                      <th className="px-4 py-3 text-right font-medium">
                        Total
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {items.map((item, index) => {
                      const product =
                        item.medicine ||
                        item.product ||
                        item;

                      const quantity = Number(
                        item.quantity || 1
                      );

                      const price = Number(
                        item.price ??
                          item.unitPrice ??
                          product.price ??
                          0
                      );

                      return (
                        <tr key={item._id || index}>
                          <td className="px-4 py-3 font-medium text-slate-700">
                            {product.name ||
                              product.medicineName ||
                              item.name ||
                              "Medicine"}
                          </td>

                          <td className="px-4 py-3 text-gray-600">
                            {quantity}
                          </td>

                          <td className="px-4 py-3 text-gray-600">
                            {formatCurrency(price)}
                          </td>

                          <td className="px-4 py-3 text-right font-medium text-slate-700">
                            {formatCurrency(
                              item.totalPrice ??
                                price * quantity
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="p-5 text-sm text-gray-500">
                No order items available.
              </p>
            )}
          </section>

          {/* Payment and total */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <section className="rounded-xl border border-gray-200 p-4">
              <h3 className="mb-4 flex items-center gap-2 font-semibold text-slate-800">
                <CreditCard
                  size={18}
                  className="text-emerald-600"
                />
                Payment Information
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between gap-3">
                  <span className="text-gray-500">
                    Payment Method
                  </span>
                  <span className="text-right font-medium text-slate-700">
                    {formatStatus(paymentMethod)}
                  </span>
                </div>

                <div className="flex justify-between gap-3">
                  <span className="text-gray-500">
                    Payment Status
                  </span>
                  <span className="text-right font-medium text-slate-700">
                    {formatStatus(paymentStatus)}
                  </span>
                </div>
              </div>
            </section>

            <section className="rounded-xl bg-emerald-50 p-5">
              <p className="text-sm text-emerald-800">
                Total Order Amount
              </p>

              <p className="mt-2 text-2xl font-bold text-emerald-700">
                {formatCurrency(totalAmount)}
              </p>

              {order.subtotal != null && (
                <div className="mt-3 flex justify-between gap-3 text-sm text-emerald-800">
                  <span>Subtotal</span>
                  <span>{formatCurrency(order.subtotal)}</span>
                </div>
              )}

              {order.deliveryCharge != null && (
                <div className="mt-2 flex justify-between gap-3 text-sm text-emerald-800">
                  <span>Delivery Charge</span>
                  <span>
                    {formatCurrency(order.deliveryCharge)}
                  </span>
                </div>
              )}
            </section>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-gray-100 bg-gray-50 p-4 sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
