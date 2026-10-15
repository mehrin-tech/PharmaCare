import { Link } from "react-router-dom";
import { MapPin, Clock3 } from "lucide-react";

function NearbyPharmacies({
  pharmacies = [],
  loading,
  error,
}) {
  return (
    <section className="bg-white rounded-xl border border-gray-100 p-3 h-[170px] overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between mb-2">

        <h2 className="text-[9px] font-bold text-[#102A43]">
          Nearby Pharmacies
        </h2>

        <Link
          to="/pharmacies"
          className="text-[7px] text-[#0F9D74] cursor-pointer"
        >
          View all
        </Link>

      </div>


      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center h-[120px]">
          <p className="text-[7px] text-gray-400">
            Finding nearby pharmacies...
          </p>
        </div>
      )}


      {/* Error */}
      {!loading && error && (
        <div className="flex items-center justify-center h-[120px]">
          <p className="text-[7px] text-red-500 text-center">
            {error}
          </p>
        </div>
      )}


      {/* Empty */}
      {!loading &&
        !error &&
        pharmacies.length === 0 && (
          <div className="flex items-center justify-center h-[120px]">
            <p className="text-[7px] text-gray-400">
              No nearby pharmacies found
            </p>
          </div>
        )}


      {/* Pharmacy List */}
      {!loading &&
        !error &&
        pharmacies.length > 0 && (
          <div className="space-y-1.5">

            {pharmacies
              .slice(0, 3)
              .map((pharmacy) => (
                <div
                  key={pharmacy._id}
                  className="
                    h-[37px]
                    bg-white
                    border border-gray-100
                    rounded-lg
                    shadow-sm
                    flex
                    items-center
                    px-2
                    gap-2
                    overflow-hidden
                  "
                >

                  {/* Logo */}
                  <div
                    className="
                      w-[28px]
                      h-[28px]
                      rounded-md
                      overflow-hidden
                      bg-gray-50
                      flex
                      items-center
                      justify-center
                      shrink-0
                    "
                  >

                    {pharmacy.image ? (
                      <img
                        src={pharmacy.image}
                        alt={pharmacy.pharmacyName}
                        className="w-full h-full object-contain rounded-md"
                      />
                    ) : (
                      <span className="text-[5px] text-gray-400">
                        No image
                      </span>
                    )}

                  </div>


                  {/* Details */}
                  <div className="flex-1 min-w-0">

                    <p
                      className="
                        text-[7px]
                        font-semibold
                        text-[#102A43]
                        truncate
                      "
                    >
                      {pharmacy.pharmacyName}
                    </p>


                    <div className="flex items-center gap-2 mt-0.5">

                      {/* Distance */}
                      <span
                        className="
                          flex
                          items-center
                          gap-0.5
                          text-[6px]
                          text-gray-500
                        "
                      >
                        <MapPin
                          size={7}
                          strokeWidth={1.8}
                        />

                        {pharmacy.distance != null
                          ? `${pharmacy.distance} km`
                          : "-"}
                      </span>


                      {/* Delivery Time */}
                      <span
                        className="
                          flex
                          items-center
                          gap-0.5
                          text-[6px]
                          text-gray-500
                        "
                      >
                        <Clock3
                          size={7}
                          strokeWidth={1.8}
                        />

                        {pharmacy.deliveryTime || "-"}
                      </span>

                    </div>

                  </div>

                </div>
              ))}

          </div>
        )}

    </section>
  );
}

export default NearbyPharmacies;