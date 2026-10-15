import React from "react";
import { MapPin, Star, Store } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MedicinePharmacyCard = ({ medicine }) => {

  const navigate = useNavigate();

  const pharmacy = medicine?.pharmacy;

  if (!pharmacy) {
    return null;
  }

  const pharmacyName =
    pharmacy?.pharmacyName || "Pharmacy";

  const rating =
    pharmacy?.rating || medicine?.rating || "4.8";

  const distance =
    medicine?.distance !== undefined
      ? `${Number(medicine.distance).toFixed(2)} km away`
      : "Nearby";

  return (
    <div className="h-full flex flex-col bg-white rounded-xl border border-gray-100 shadow-sm p-5">

      {/* Sold By */}
      <p className="text-xs text-gray-500">
        Sold by
      </p>

      <div className="flex items-center justify-between mt-2">

        <div className="flex items-center gap-2">

          <Store
            size={20}
            className="text-[#0F9D74]"
          />

          <h3 className="font-semibold text-[#102A43]">
            {pharmacyName}
          </h3>

        </div>

        <div className="flex items-center gap-1 text-xs">

          <Star
            size={14}
            className="fill-yellow-400 text-yellow-400"
          />

          {rating}

        </div>

      </div>

      {/* Distance */}
      <div className="flex items-center gap-2 mt-4 text-xs text-gray-500">

        <MapPin size={15} />

        <span>
          {distance}
        </span>

      </div>

      {/* Visit */}
      <button
        onClick={() =>
          pharmacy?._id &&
          navigate(`/pharmacies/${pharmacy._id}`)
        }
        className="w-full mt-auto pt-5 border border-[#0F9D74] text-[#0F9D74] rounded-lg py-2.5 text-sm font-medium hover:bg-[#E8F8F2]"
      >
        Visit Pharmacy
      </button>

    </div>
  );
};

export default MedicinePharmacyCard;
