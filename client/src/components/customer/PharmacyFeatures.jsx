import {
  CheckCircle2,
  MapPin,
  Truck,
} from "lucide-react";

export default function PharmacyFeatures() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">

      {/* Fast Delivery */}
      <div className="bg-white border border-gray-200 rounded-xl p-3 flex items-center gap-3">

        <div className="w-9 h-9 rounded-lg bg-[#E8F8F2] flex items-center justify-center">

          <Truck
            size={17}
            className="text-[#0F9D74]"
          />

        </div>

        <div>

          <p className="text-[10px] font-semibold">
            Fast Delivery
          </p>

          <p className="text-[8px] text-gray-500">
            Delivery estimates based on distance
          </p>

        </div>

      </div>

      {/* Verified */}
      <div className="bg-white border border-gray-200 rounded-xl p-3 flex items-center gap-3">

        <div className="w-9 h-9 rounded-lg bg-[#E8F8F2] flex items-center justify-center">

          <CheckCircle2
            size={17}
            className="text-[#0F9D74]"
          />

        </div>

        <div>

          <p className="text-[10px] font-semibold">
            Verified Pharmacies
          </p>

          <p className="text-[8px] text-gray-500">
            Approved pharmacy partners
          </p>

        </div>

      </div>

      {/* Nearby */}
      <div className="bg-white border border-gray-200 rounded-xl p-3 flex items-center gap-3">

        <div className="w-9 h-9 rounded-lg bg-[#E8F8F2] flex items-center justify-center">

          <MapPin
            size={17}
            className="text-[#0F9D74]"
          />

        </div>

        <div>

          <p className="text-[10px] font-semibold">
            Nearby Selection
          </p>

          <p className="text-[8px] text-gray-500">
            Compare pharmacies by distance
          </p>

        </div>

      </div>

    </div>
  );
}