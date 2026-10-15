import React from "react";
import { Phone, Store } from "lucide-react";

const OrderPharmacyDetails = ({ pharmacy }) => {

  if (!pharmacy) return null;

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4">

      {/* HEADER */}
      <div className="mb-4">
        <h2 className="text-xs font-semibold text-gray-800">
          Pharmacy Details
        </h2>
      </div>

      {/* PHARMACY */}
      <div className="flex items-center justify-between gap-4">

        {/* LEFT */}
        <div className="flex items-center gap-3">

          {/* IMAGE */}
          <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#F0FBF7]">

            {pharmacy.image ? (
              <img
                src={pharmacy.image}
                alt={pharmacy.pharmacyName || "Pharmacy"}
                className="h-full w-full object-contain"
              />
            ) : (
              <Store
                size={22}
                className="text-[#0F9D74]"
              />
            )}

          </div>

          {/* DETAILS */}
          <div>

            <h3 className="text-[11px] font-semibold text-gray-800">
              {pharmacy.pharmacyName || "Pharmacy"}
            </h3>

            <p className="mt-1 text-[9px] text-gray-400 capitalize">
              {pharmacy.pharmacyType || "Pharmacy"}
            </p>

            {pharmacy.phone && (
              <p className="mt-1 text-[9px] text-gray-500">
                {pharmacy.phone}
              </p>
            )}

          </div>

        </div>

        {/* CONTACT */}
        {/* {pharmacy.phone && (
          <a
            href={`tel:${pharmacy.phone}`}
            className="flex items-center gap-1 rounded-md border border-[#0F9D74] px-3 py-2 text-[8px] font-medium text-[#0F9D74] hover:bg-[#F0FBF7]"
          >
            <Phone size={10} />
            Contact
          </a>
        )} */}

      </div>

    </section>
  );
};

export default OrderPharmacyDetails;