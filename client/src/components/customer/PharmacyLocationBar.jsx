import { CheckCircle2, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function PharmacyLocationBar({
  pharmacyCount,
}) {
  return (
    <div className="bg-[#DDF7EE] border border-[#BDECDD] rounded-xl px-4 py-3 mb-4">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">

        {/* Location */}
        <div className="flex items-center gap-2">

          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
            <MapPin
              size={16}
              className="text-[#0F9D74]"
            />
          </div>

          <div>
            <p className="text-[9px] text-gray-500">
              Showing pharmacies near
            </p>

            <p className="text-[11px] font-semibold text-[#102A43]">
              Your default delivery location
            </p>
          </div>

        </div>

        {/* Count + Change */}
        <div className="flex items-center gap-4 text-[9px]">

          <div className="flex items-center gap-1">

            <CheckCircle2
              size={12}
              className="text-[#0F9D74]"
            />

            <span>
              {pharmacyCount} pharmacies found
            </span>

          </div>

          <Link
            to="/profile"
            className="text-[#0F9D74] font-semibold hover:underline"
          >
            Change location
          </Link>

        </div>

      </div>

    </div>
  );
}