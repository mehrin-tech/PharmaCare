import { Link } from "react-router-dom";
import { MapPin, Clock3, Star } from "lucide-react";


export default function NearbyPharmacyCards({pharmacies=[],loading,error}) {
 

 

  return (
    <section className="w-full bg-white rounded-xl border border-gray-100 p-3 mt-3">

      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[13px] font-bold text-[#102A43]">
          Nearby Pharmacies
        </h2>

        <Link
          to="/pharmacies"
          className="text-[8px] text-[#0F9D74] font-medium hover:underline cursor-pointer"
        >
          View All
        </Link>
      </div>

      {/* Loading */}
      {loading && (
        <div className="py-8 text-center">
          <p className="text-[9px] text-gray-500">
            Finding nearby pharmacies...
          </p>
        </div>
      )}

      {/* Empty */}
      {!loading && pharmacies.length === 0 && (
        <div className="py-8 text-center">
          <p className="text-[9px] text-gray-500">
            No nearby pharmacies found.
          </p>
        </div>
      )}

      {/* Pharmacy Cards */}
      {!loading && pharmacies.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">

          {pharmacies.slice(0,3).map((pharmacy) => (
            <div
              key={pharmacy._id}
              className="
                bg-white
                border border-gray-100
                rounded-lg
                shadow-sm
                p-2
                hover:shadow-md
                transition
              "
            >

              {/* Pharmacy Logo */}
              <div className="w-full h-[65px] flex items-center justify-center mb-2">

                {pharmacy.image ? (
                  <img
                    src={pharmacy.image}
                    alt={pharmacy.pharmacyName}
                    className="w-[90px] h-[60px] object-contain"
                  />
                ) : (
                  <div className="w-[90px] h-[60px] flex items-center justify-center bg-gray-50 rounded-md">
                    <span className="text-[7px] text-gray-400">
                      No image
                    </span>
                  </div>
                )}

              </div>

              {/* Pharmacy Name */}
              <h3 className="text-[9px] font-medium text-[#102A43] truncate">
                {pharmacy.pharmacyName}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-1 mt-2">
                <Star
                  size={10}
                  className="text-yellow-500"
                  fill="currentColor"
                />

                <span className="text-[8px] text-gray-600">
                  {pharmacy.rating ?? "-"}
                </span>
              </div>

              {/* Distance */}
              <div className="flex items-center gap-1 mt-1">
                <MapPin
                  size={10}
                  className="text-gray-500"
                />

                <span className="text-[8px] text-gray-500">
                  {pharmacy.distance != null
                    ? `${pharmacy.distance} km`
                    : "-"}
                </span>
              </div>

              {/* Delivery Time */}
              <div className="flex items-center gap-1 mt-1">
                <Clock3
                  size={10}
                  className="text-gray-500"
                />

                <span className="text-[8px] text-gray-500">
                  {pharmacy.deliveryTime || "-"}
                </span>
              </div>

              {/* Button */}
              <Link
                to={`/pharmacies/${pharmacy._id}`}
                className="
                  block
                  text-center
                  w-full
                  h-[22px]
                  leading-[22px]
                  mt-2
                  border
                  border-[#0F9D74]
                  text-[#0F9D74]
                  rounded-md
                  text-[7px]
                  font-medium
                  hover:bg-[#0F9D74]
                  hover:text-white
                  transition
                  cursor-pointer
                "
              >
                View Medicines
              </Link>

            </div>
          ))}

        </div>
      )}

    </section>
  );
}