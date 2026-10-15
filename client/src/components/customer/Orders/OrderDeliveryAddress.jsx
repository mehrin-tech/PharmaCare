import React from "react";
import { MapPin } from "lucide-react";

const OrderDeliveryAddress = ({ address }) => {
  if (!address) return null;

  const fullAddress = [
    address.street,
    address.city,
    address.state,
    address.pincode,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4">
      {/* HEADER */}
      <div className="mb-4 flex items-center gap-2">
        <MapPin
          size={14}
          className="text-[#0F9D74]"
        />

        <h2 className="text-xs font-semibold text-gray-800">
          Delivery Address
        </h2>
      </div>

      {/* NAME */}
      <p className="text-[10px] font-semibold text-gray-700">
        {address.fullName || address.name || "Customer"}
      </p>

      {/* ADDRESS */}
      {fullAddress && (
        <p className="mt-2 text-[9px] leading-4 text-gray-500">
          {fullAddress}
        </p>
      )}

      {/* LANDMARK */}
      {address.landmark && (
        <p className="mt-1 text-[9px] text-gray-500">
          Landmark: {address.landmark}
        </p>
      )}

      {/* PHONE */}
      {address.phone && (
        <p className="mt-2 text-[9px] text-gray-500">
          Ph: {address.phone}
        </p>
      )}
    </section>
  );
};

export default OrderDeliveryAddress;