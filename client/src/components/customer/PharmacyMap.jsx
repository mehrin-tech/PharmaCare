import { Store } from "lucide-react";

export default function PharmacyMap({
  selectedPharmacy,
  userLocation,
  getPharmacyLogo,
}) {
  const mapLatitude =
    selectedPharmacy?.location?.latitude ||
    userLocation?.latitude ||
    11.7481;

  const mapLongitude =
    selectedPharmacy?.location?.longitude ||
    userLocation?.longitude ||
    75.4929;

  const mapUrl =
    `https://www.google.com/maps?q=${mapLatitude},${mapLongitude}&z=14&output=embed`;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">

      <div className="h-[420px] lg:h-[540px] relative">

        {/* Google Map */}
        <iframe
          title="Pharmacy Map"
          src={mapUrl}
          className="absolute inset-0 w-full h-full border-0"
          loading="lazy"
          allowFullScreen
        />

        {/* Selected Pharmacy */}
        {selectedPharmacy && (
          <div className="absolute left-4 bottom-4 right-4 sm:right-auto sm:w-[310px]">

            <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-3">

              <div className="flex items-center gap-2">

                {/* Logo */}
                <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">

                  {getPharmacyLogo(
                    selectedPharmacy.pharmacyName
                  ) ? (
                    <img
                      src={getPharmacyLogo(
                        selectedPharmacy.pharmacyName
                      )}
                      alt=""
                      className="w-8 h-8 object-contain"
                    />
                  ) : (
                    <Store
                      size={18}
                      className="text-[#0F9D74]"
                    />
                  )}

                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">

                  <h3 className="text-[11px] font-semibold truncate">
                    {selectedPharmacy.pharmacyName}
                  </h3>

                  <div className="flex items-center gap-2 mt-1">

                    <span className="text-[8px] text-gray-500">
                      {selectedPharmacy.distance !== undefined
                        ? `${Number(
                            selectedPharmacy.distance
                          ).toFixed(2)} km`
                        : "-"}
                    </span>

                    <span className="text-gray-300">
                      •
                    </span>

                    <span className="text-[8px] text-[#0F9D74] font-medium">
                      {selectedPharmacy.deliveryTime || "-"}
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}