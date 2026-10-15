

import React from "react";
import { useNavigate } from "react-router-dom";

const OrderSuccessModal = ({
  onClose,
  order,
  paymentMethod,
}) => {
  const navigate = useNavigate();

  // const handleViewOrder = () => {
  //   onClose();
  //   navigate("/orders");
  // };

  // const handleContinueShopping = () => {
  //   onClose();
  //   navigate("/medicines");
  // };

  // Payment display name
  const paymentLabel =
    paymentMethod === "cod"
      ? "Cash on Delivery"
      : "Razorpay";

  // Delivery display
  const deliveryLabel =
    order?.deliveryMethod === "express"
      ? "15–25 minutes"
      : "30–45 minutes";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">

      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

        {/* SUCCESS ICON */}
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#DFF6EE]">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0F9D74]">
              <span className="text-2xl font-bold text-white">
                ✓
              </span>
            </div>
          </div>
        </div>

        {/* TITLE */}
        <div className="mt-4 text-center">
          <h2 className="text-lg font-semibold text-gray-800">
            Order Placed Successfully!
          </h2>

          <p className="mt-2 text-xs leading-5 text-gray-500">
            Your order has been placed successfully and is being
            processed by the pharmacy.
          </p>
        </div>

        {/* ORDER INFO */}
        <div className="mt-5 rounded-xl bg-[#F0FBF7] p-4">

          {/* ORDER ID */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">
              Order ID
            </span>

            <span className="text-xs font-semibold text-gray-800">
              #{order?.orderNumber || order?._id || "N/A"}
            </span>
          </div>

          {/* DELIVERY */}
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs text-gray-500">
              Estimated Delivery
            </span>

            <span className="text-xs font-semibold text-[#0F9D74]">
              {deliveryLabel}
            </span>
          </div>

          {/* PAYMENT */}
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs text-gray-500">
              Payment
            </span>

            <span className="text-xs font-semibold text-gray-800">
              {paymentLabel}
            </span>
          </div>

        </div>

        {/* BUTTONS */}
        <div className="mt-5 flex gap-3">

          <button
            type="button"
            onClick={()=>navigate('/medicines')}
            className="flex-1 rounded-lg border border-[#0F9D74] py-2.5 text-xs font-semibold text-[#0F9D74] transition hover:bg-[#F0FBF7]"
          >
            Continue Shopping
          </button>

          <button
            type="button"
            onClick={()=>navigate('/orders')}
            className="flex-1 rounded-lg bg-[#0F9D74] py-2.5 text-xs font-semibold text-white transition hover:bg-[#0C8C68]"
          >
            View Order
          </button>

        </div>

      </div>
    </div>
  );
};

export default OrderSuccessModal;