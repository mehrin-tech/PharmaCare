import {
  Clock3,
  MapPin,
  Navigation,
  Star,
  Store,
} from "lucide-react";

import { Link } from "react-router-dom";

export default function PharmacyCard({
  pharmacy,
  isSelected,
  onSelect,
  onDirections,
  logo,
}) {
  return (
    <div
      onClick={() => onSelect(pharmacy)}
      className={`rounded-xl border p-3 cursor-pointer transition-all ${
        isSelected
          ? "border-[#0F9D74] bg-[#F2FBF8] shadow-sm"
          : "border-gray-200 bg-white hover:border-[#A8DDCD] hover:shadow-sm"
      }`}
    >

      {/* Top */}
      <div className="flex gap-3">

        {/* Logo */}
        <div className="w-[58px] h-[58px] rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">

          {logo ? (
            <img
              src={logo}
              alt={pharmacy.pharmacyName}
              className="w-11 h-11 object-contain"
            />
          ) : (
            <Store
              size={22}
              className="text-[#0F9D74]"
            />
          )}

        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">

          <div className="flex items-start justify-between gap-2">

            <div className="min-w-0">

              <h3 className="text-[11px] font-semibold text-[#102A43] truncate">
                {pharmacy.pharmacyName}
              </h3>

              <div className="flex items-center gap-1.5 mt-1">

                <span className="flex items-center gap-1 text-[8px] text-gray-500">

                  <Star
                    size={10}
                    className="fill-[#F59E0B] text-[#F59E0B]"
                  />

                  4.8

                </span>

                <span className="text-gray-300">
                  •
                </span>

                <span className="text-[8px] text-gray-500 capitalize">
                  {pharmacy.pharmacyType || "Pharmacy"}
                </span>

              </div>

            </div>

            {/* Open */}
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#E8F8F2] text-[#0F9D74] text-[7px] font-medium shrink-0">

              <span className="w-1.5 h-1.5 rounded-full bg-[#0F9D74]" />

              Open

            </span>

          </div>

          {/* Address */}
          <p className="text-[8px] text-gray-500 mt-2 truncate">

            {[
              pharmacy.address?.street,
              pharmacy.address?.city,
              pharmacy.address?.state,
            ]
              .filter(Boolean)
              .join(", ") ||
              "Address unavailable"}

          </p>

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-3 mt-2">

            {/* Distance */}
            <div className="flex items-center gap-1">

              <MapPin
                size={11}
                className="text-gray-400"
              />

              <span className="text-[8px] text-[#102A43]">
                {pharmacy.distance !== undefined
                  ? `${Number(
                      pharmacy.distance
                    ).toFixed(2)} km`
                  : "-"}
              </span>

            </div>

            {/* Delivery */}
            <div className="flex items-center gap-1">

              <Clock3
                size={11}
                className="text-gray-400"
              />

              <span className="text-[8px] text-[#102A43]">
                {pharmacy.deliveryTime || "-"}
              </span>

            </div>

            {/* Medicine Count */}
            {pharmacy.medicineCount !== undefined && (
              <div className="flex items-center gap-1">

                <Store
                  size={11}
                  className="text-gray-400"
                />

                <span className="text-[8px] text-[#102A43]">
                  {pharmacy.medicineCount} medicines
                </span>

              </div>
            )}

          </div>

        </div>

      </div>

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-2 mt-3">

        {/* Directions */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDirections(pharmacy);
          }}
          className="h-[30px] rounded-lg border border-gray-200 text-[#102A43] text-[8px] font-medium flex items-center justify-center gap-1.5 hover:border-[#0F9D74] hover:text-[#0F9D74] transition"
        >
          <Navigation size={11} />
          Directions
        </button>

        {/* View Medicines */}
        <Link
          to={`/pharmacies/${pharmacy._id}`}
          onClick={(e) => e.stopPropagation()}
          className="h-[30px] rounded-lg bg-[#0F9D74] text-white text-[8px] font-semibold flex items-center justify-center gap-1.5 hover:bg-[#0C8965] transition"
        >
          View Medicines
        </Link>

      </div>

    </div>
  );
}