
import React from "react";
import { Pill, ShoppingBag, IndianRupee, AlertTriangle } from "lucide-react";

const stats = [
  {
    title: "Total Medicines",
    value: "120",
    icon: Pill,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Total Orders",
    value: "85",
    icon: ShoppingBag,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Total Revenue",
    value: "₹12,500",
    icon: IndianRupee,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Low Stock Items",
    value: "8",
    icon: AlertTriangle,
    color: "bg-orange-100 text-orange-600",
  },
];

const MedicineStats = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="min-w-0 rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${stat.color}`}
              >
                <Icon size={20} />
              </div>

              <p className="text-sm text-gray-500">
                {stat.title}
              </p>
            </div>

            <h2 className="mt-4 text-2xl font-bold text-gray-900">
              {stat.value}
            </h2>
          </div>
        );
      })}
    </div>
  );
};

export default MedicineStats;