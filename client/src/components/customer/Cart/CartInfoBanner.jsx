import React from "react";
import { ShieldCheck } from "lucide-react";

const CartInfoBanner = () => {
  return (
    <div className="bg-[#E8F8F2] border border-[#D5F0E6] rounded-lg px-3 py-2.5">

      <div className="flex items-center gap-2">

        <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0">
          <ShieldCheck
            size={13}
            className="text-[#0F9D74]"
          />
        </div>

        <div>

          <p className="text-[9px] font-semibold text-[#0F9D74]">
            All items are from verified Pharmacies
          </p>

          <p className="text-[7px] text-gray-500 mt-0.5">
            100% genuine medicines • Safe Package • On-time Delivery
          </p>

        </div>

      </div>

    </div>
  );
};

export default CartInfoBanner;