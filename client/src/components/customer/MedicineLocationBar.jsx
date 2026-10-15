import { MapPin, ShieldCheck, BadgeCheck, Truck } from "lucide-react";

export default function MedicineLocationBar() {
  return (
    <section className="w-full bg-[#DDF7EE] rounded-lg px-4 py-3 mt-3">

      <div className="flex items-center justify-between gap-4">

        {/* Location */}
        <div className="flex items-center gap-3">

          <MapPin
            size={18}
            className="text-gray-500"
            strokeWidth={1.8}
          />

          <div>
            <div className="flex items-center gap-2">

              <span className="text-[8px] font-semibold text-[#102A43]">
                Deliver to
              </span>

              <span className="text-[8px] font-medium text-[#102A43]">
                Kochi, Kerala
              </span>

            </div>
          </div>

          <button
            className="
              h-[28px]
              px-3
              border
              border-[#0F9D74]
              bg-white
              rounded-md
              text-[8px]
              text-[#0F9D74]
              font-medium
              hover:bg-[#0F9D74]
              hover:text-white
              transition
            "
          >
            Change Location
          </button>

        </div>


        {/* Benefits */}
        <div className="flex items-center gap-5">

          {/* Secure Payments */}
          <div className="flex items-center gap-1">

            <ShieldCheck
              size={11}
              className="text-[#0F9D74]"
            />

            <span className="text-[7px] text-[#102A43]">
              Secure Payments
            </span>

          </div>


          {/* Genuine */}
          <div className="flex items-center gap-1">

            <BadgeCheck
              size={11}
              className="text-[#0F9D74]"
            />

            <span className="text-[7px] text-[#102A43]">
              100% Genuine Medicines
            </span>

          </div>


          {/* Fast Delivery */}
          <div className="flex items-center gap-1">

            <Truck
              size={11}
              className="text-[#0F9D74]"
            />

            <span className="text-[7px] text-[#102A43]">
              Fast Delivery
            </span>

          </div>

        </div>

      </div>

    </section>
  );
}