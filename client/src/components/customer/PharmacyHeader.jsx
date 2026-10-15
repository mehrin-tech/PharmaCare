import { Store } from "lucide-react";

export default function PharmacyHeader() {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2">

        <div className="w-8 h-8 rounded-lg bg-[#DDF7EE] flex items-center justify-center">
          <Store
            size={17}
            className="text-[#0F9D74]"
          />
        </div>

        <div>
          <h1 className="text-[18px] font-bold text-[#102A43]">
            Nearby Pharmacies
          </h1>

          <p className="text-[10px] text-gray-500">
            Find trusted pharmacies near your delivery location
          </p>
        </div>

      </div>
    </div>
  );
}