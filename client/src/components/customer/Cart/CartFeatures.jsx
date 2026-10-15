import React from "react";
import {
  ShieldCheck,
  Truck,
  LockKeyhole,
  RotateCcw,
  UserRound,
  Headphones,
} from "lucide-react";

const CartFeatures = () => {
  const features = [
    {
      icon: ShieldCheck,
      text: "100% Genuine Medicines",
    },
    {
      icon: Truck,
      text: "Fast Delivery in 30 Mins",
    },
    {
      icon: LockKeyhole,
      text: "Secure Payments",
    },
    {
      icon: RotateCcw,
      text: "Easy Returns",
    },
    {
      icon: UserRound,
      text: "Pharmacist Support",
    },
    {
      icon: Headphones,
      text: "24/7 Support",
    },
  ];

  return (
    <div className="bg-white border border-gray-100 rounded-lg p-4 mt-4">

      <h2 className="text-sm font-semibold text-[#102A43] mb-4">
        Why Shop With Us?
      </h2>

      <div className="space-y-3">

        {features.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <div
              key={index}
              className="flex items-center gap-3"
            >
              <div className="w-7 h-7 rounded-full bg-[#DFF6EE] flex items-center justify-center">
                <Icon
                  size={14}
                  className="text-[#0F9D74]"
                />
              </div>

              <p className="text-xs text-gray-600">
                {feature.text}
              </p>
            </div>
          );
        })}

      </div>
    </div>
  );
};

export default CartFeatures;