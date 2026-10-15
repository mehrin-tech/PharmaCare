
import React from "react";

const OrderSummary = ({
  items = [],
  subtotal,
  deliveryFee,
  totalAmount,
}) => {

  // Calculate savings
  const savings = items.reduce((total, item) => {
    const mrp = Number(item.medicine?.mrp || 0);
    const price = Number(item.price || item.medicine?.price || 0);
    const quantity = Number(item.quantity || 0);

    const discount = Math.max(mrp - price, 0);

    return total + discount * quantity;
  }, 0);

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4">

      {/* HEADER */}
      <h2 className="mb-4 text-xs font-semibold text-gray-800">
        Price Summary
      </h2>

      {/* SUBTOTAL */}
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[9px] text-gray-500">
          Subtotal
        </span>

        <span className="text-[9px] text-gray-700">
          ₹{Number(subtotal || 0).toFixed(2)}
        </span>
      </div>

      {/* DELIVERY */}
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[9px] text-gray-500">
          Delivery Charges
        </span>

        <span className="text-[9px] text-gray-700">
          {Number(deliveryFee || 0) === 0
            ? "FREE"
            : `₹${Number(deliveryFee).toFixed(2)}`}
        </span>
      </div>

      {/* SAVINGS */}
      <div className="mb-4 flex items-center justify-between">
        <span className="text-[9px] text-gray-500">
          You Saved
        </span>

        <span className="text-[9px] font-medium text-[#0F9D74]">
          ₹{savings.toFixed(2)}
        </span>
      </div>

      {/* TOTAL */}
      <div className="border-t border-gray-100 pt-3">

        <div className="flex items-center justify-between">

          <span className="text-xs font-semibold text-gray-800">
            Total Amount
          </span>

          <span className="text-sm font-bold text-[#0F9D74]">
            ₹{Number(totalAmount || 0).toFixed(2)}
          </span>

        </div>

      </div>

    </section>
  );
};

export default OrderSummary;