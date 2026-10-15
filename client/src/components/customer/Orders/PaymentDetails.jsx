import React from "react";
import { CreditCard } from "lucide-react";

const PaymentDetails = ({
  paymentStatus,
  deliveryMethod,
}) => {
  const status =
    paymentStatus === "paid"
      ? "Paid"
      : paymentStatus === "failed"
      ? "Failed"
      : "Pending";

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4">

      {/* HEADER */}
      <div className="mb-4 flex items-center gap-2">
        <CreditCard
          size={14}
          className="text-[#0F9D74]"
        />

        <h2 className="text-xs font-semibold text-gray-800">
          Payment Details
        </h2>
      </div>

      {/* PAYMENT METHOD */}
      <div>
        <p className="text-[8px] text-gray-400">
          Payment Method
        </p>

        <p className="mt-1 text-[10px] font-medium text-gray-700">
          UPI / PhonePe
        </p>
      </div>

      {/* PAYMENT STATUS */}
      <div className="mt-4">
        <p className="text-[8px] text-gray-400">
          Payment Status
        </p>

        <p
          className={`mt-1 text-[10px] font-medium ${
            paymentStatus === "paid"
              ? "text-[#0F9D74]"
              : paymentStatus === "failed"
              ? "text-red-500"
              : "text-yellow-600"
          }`}
        >
          {status}
        </p>
      </div>

      {/* DELIVERY METHOD */}
      <div className="mt-4">
        <p className="text-[8px] text-gray-400">
          Delivery Method
        </p>

        <p className="mt-1 text-[10px] capitalize text-gray-700">
          {deliveryMethod || "-"}
        </p>
      </div>

    </section>
  );
};

export default PaymentDetails;