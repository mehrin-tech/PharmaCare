import React from "react";

const OrderInfo = ({ order }) => {

  const orderDate = order?.createdAt
    ? new Date(order.createdAt).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "-";


  const statusLabels = {
    pending: "Processing",
    accepted: "Accepted",
    preparing: "Preparing",
    packed: "Packed",
    out_for_delivery: "Shipped",
    delivered: "Delivered",
    cancelled: "Cancelled",
  };


  const statusLabel =
    statusLabels[order?.orderStatus] ||
    order?.orderStatus ||
    "Processing";


  const getStatusClass = () => {

    if (order?.orderStatus === "cancelled") {
      return "bg-red-50 text-red-500";
    }

    if (order?.orderStatus === "delivered") {
      return "bg-[#DFF6EE] text-[#0F9D74]";
    }

    if (order?.orderStatus === "out_for_delivery") {
      return "bg-blue-50 text-blue-600";
    }

    return "bg-yellow-50 text-yellow-600";
  };


  return (
    <section className="mb-4 rounded-xl border border-gray-200 bg-white p-4">

      {/* ================= HEADER ================= */}

      <div className="mb-4 flex items-center justify-between">

        <div>

          <p className="text-[8px] text-gray-400">
            Order ID
          </p>

          <p className="mt-1 text-[11px] font-semibold text-gray-800">
            #{order?.orderNumber}
          </p>

        </div>


        {/* STATUS */}

        <span
          className={`rounded-full px-3 py-1.5 text-[9px] font-medium ${getStatusClass()}`}
        >
          {statusLabel}
        </span>

      </div>


      {/* ================= INFORMATION ================= */}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">


        {/* ORDER ID */}

        <div>

          <p className="text-[8px] text-gray-400">
            Order ID
          </p>

          <p className="mt-1 text-[9px] font-medium text-gray-700">
            #{order?.orderNumber}
          </p>

        </div>


        {/* ORDER DATE */}

        <div>

          <p className="text-[8px] text-gray-400">
            Order Date
          </p>

          <p className="mt-1 text-[9px] text-gray-700">
            {orderDate}
          </p>

        </div>


        {/* PAYMENT METHOD */}

        <div>

          <p className="text-[8px] text-gray-400">
            Payment Method
          </p>

          <p className="mt-1 text-[9px] font-medium text-gray-700">
            {order?.paymentMethod || "Not available"}
          </p>

        </div>


        {/* PAYMENT STATUS */}

        <div>

          <p className="text-[8px] text-gray-400">
            Payment Status
          </p>

          <span
            className={`mt-1 inline-block rounded-full px-2 py-1 text-[8px] font-medium ${
              order?.paymentStatus === "paid"
                ? "bg-[#DFF6EE] text-[#0F9D74]"
                : order?.paymentStatus === "failed"
                ? "bg-red-50 text-red-500"
                : "bg-yellow-50 text-yellow-600"
            }`}
          >
            {order?.paymentStatus || "pending"}
          </span>

        </div>

      </div>

    </section>
  );
};

export default OrderInfo;