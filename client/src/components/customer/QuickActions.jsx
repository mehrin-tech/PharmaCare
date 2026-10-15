import { Link } from "react-router-dom";
import {
  FileUp,
  MapPin,
  Package,
  ShoppingCart,
} from "lucide-react";

export default function QuickActions() {
  const actions = [
    {
      name: "Upload Prescription",
      path: "/prescription",
      icon: FileUp,
      bg: "bg-[#E8F8F2]",
      text: "text-[#0F9D74]",
    },
    {
      name: "Search Nearby Pharmacy",
      path: "/pharmacies",
      icon: MapPin,
      bg: "bg-orange-50",
      text: "text-orange-500",
    },
    {
      name: "Track Order",
      path: "/orders",
      icon: Package,
      bg: "bg-blue-50",
      text: "text-blue-500",
    },
    {
      name: "View Cart",
      path: "/cart",
      icon: ShoppingCart,
      bg: "bg-gray-50",
      text: "text-gray-700",
    },
  ];

  return (
    <section className="w-full bg-white rounded-xl border border-gray-100 p-3 mt-3 h-[220px]">

      {/* Header */}
      <h2 className="text-[13px] font-bold text-[#102A43] mb-3">
        Quick Actions
      </h2>

      {/* Actions */}
      <div className="space-y-2">

        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.name}
              to={action.path}
              className="
                flex
                items-center
                gap-2
                w-full
                min-h-[35px]
                rounded-lg
                hover:bg-gray-50
                transition
              "
            >

              {/* Icon */}
              <div
                className={`
                  w-[27px]
                  h-[27px]
                  rounded-full
                  ${action.bg}
                  flex
                  items-center
                  justify-center
                  shrink-0
                `}
              >
                <Icon
                  size={14}
                  className={action.text}
                  strokeWidth={1.8}
                />
              </div>

              {/* Text */}
              <span className="text-[8px] font-medium text-[#102A43]">
                {action.name}
              </span>

            </Link>
          );
        })}

      </div>

    </section>
  );
}