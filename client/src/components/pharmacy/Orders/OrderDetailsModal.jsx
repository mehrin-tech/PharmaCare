
import React from "react";
import { X } from "lucide-react";

const OrderDetailsModal = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b p-5">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Order Details
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {order.orderNumber || order._id}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
            aria-label="Close order details"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-5 p-5">
          <section>
            <h3 className="mb-2 font-semibold text-gray-800">
              Customer Information
            </h3>
            <p className="text-sm text-gray-600">
              Name: {order.user?.name || "—"}
            </p>
            <p className="text-sm text-gray-600">
              Email: {order.user?.email || "—"}
            </p>
            <p className="text-sm text-gray-600">
              Phone: {order.user?.phone || "—"}
            </p>
          </section>

          <section>
            <h3 className="mb-3 font-semibold text-gray-800">
              Ordered Items
            </h3>

            <div className="space-y-3">
              {order.items?.length ? (
                order.items.map((item, index) => (
                  <div
                    key={item._id || item.medicine?._id || index}
                    className="flex items-center justify-between gap-4 rounded-lg border p-3"
                  >
                    <div>
                      <p className="font-medium text-gray-800">
                        {item.name || item.medicine?.name || "Medicine"}
                      </p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity || 0}
                      </p>
                    </div>

                    <p className="whitespace-nowrap font-medium">
                      ₹{Number(item.total ?? (
                        Number(item.price || 0) *
                        Number(item.quantity || 0)
                      )).toFixed(2)}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">
                  No item details available.
                </p>
              )}
            </div>
          </section>

          <section className="rounded-lg bg-gray-50 p-4">
            <h3 className="mb-3 font-semibold text-gray-800">
              Payment & Status
            </h3>

            <div className="flex justify-between gap-4 text-sm">
              <span className="text-gray-500">Payment Status</span>
              <span className="font-medium capitalize">
                {order.paymentStatus || "pending"}
              </span>
            </div>

            <div className="mt-2 flex justify-between gap-4 text-sm">
              <span className="text-gray-500">Order Status</span>
              <span className="font-medium">
                {(order.orderStatus || "pending").replaceAll("_", " ")}
              </span>
            </div>

            <div className="mt-2 flex justify-between gap-4 text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span>₹{Number(order.subtotal || 0).toFixed(2)}</span>
            </div>

            <div className="mt-2 flex justify-between gap-4 text-sm">
              <span className="text-gray-500">Delivery Fee</span>
              <span>₹{Number(order.deliveryFee || 0).toFixed(2)}</span>
            </div>

            <div className="mt-3 flex justify-between gap-4 border-t pt-3 font-bold">
              <span>Total Amount</span>
              <span>₹{Number(order.totalAmount || 0).toFixed(2)}</span>
            </div>
          </section>

          <p className="text-xs text-gray-500">
            Order Date:{" "}
            {order.createdAt
              ? new Date(order.createdAt).toLocaleString("en-IN")
              : "—"}
          </p>
        </div>

        <div className="flex justify-end border-t p-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
