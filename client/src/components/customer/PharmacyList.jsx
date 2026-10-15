import { AlertCircle, Store } from "lucide-react";

import PharmacyCard from "./PharmacyCard";
import PharmacyLoading from "./PharmacyLoading";

export default function PharmacyList({
  loading,
  error,
  filteredPharmacies,
  selectedPharmacy,
  onSelectPharmacy,
  onDirections,
  getPharmacyLogo,
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">

      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">

        <div>

          <h2 className="text-[12px] font-semibold text-[#102A43]">
            Pharmacies near you
          </h2>

          <p className="text-[8px] text-gray-500 mt-0.5">
            Select a pharmacy to view its location
          </p>

        </div>

        <span className="text-[9px] text-[#0F9D74] font-semibold">
          {filteredPharmacies.length} results
        </span>

      </div>

      {/* Loading */}
      {loading && <PharmacyLoading />}

      {/* Error */}
      {!loading && error && (
        <div className="p-6 text-center">

          <AlertCircle
            size={24}
            className="mx-auto text-red-400 mb-2"
          />

          <p className="text-[10px] text-red-500">
            {error}
          </p>

          <button
            onClick={() =>
              window.location.reload()
            }
            className="mt-3 px-4 py-2 bg-[#0F9D74] text-white rounded-lg text-[9px]"
          >
            Try Again
          </button>

        </div>
      )}

      {/* Empty */}
      {!loading &&
        !error &&
        filteredPharmacies.length === 0 && (
          <div className="p-8 text-center">

            <Store
              size={30}
              className="mx-auto text-gray-300 mb-2"
            />

            <p className="text-[10px] text-gray-500">
              No pharmacies found
            </p>

            <p className="text-[8px] text-gray-400 mt-1">
              Try changing your search or filter
            </p>

          </div>
        )}

      {/* Cards */}
      {!loading &&
        !error &&
        filteredPharmacies.length > 0 && (
          <div className="p-3 space-y-2.5 max-h-[540px] overflow-y-auto">

            {filteredPharmacies.map((pharmacy) => (

              <PharmacyCard
                key={pharmacy._id}
                pharmacy={pharmacy}
                isSelected={
                  selectedPharmacy?._id ===
                  pharmacy._id
                }
                onSelect={onSelectPharmacy}
                onDirections={onDirections}
                logo={getPharmacyLogo(
                  pharmacy.pharmacyName
                )}
              />

            ))}

          </div>
        )}

    </div>
  );
}