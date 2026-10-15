import React from "react";
import { useSelector } from "react-redux";
import {
  Package,
  AlertCircle,
  PackageCheck,
  PackageX,
} from "lucide-react";

const InventoryStats = () => {
  const inventory = useSelector(
    (state) => state.inventory.inventory
  );

  const totalMedicines = inventory.length;

  // Minimum stock 10 ennu temporary aayi consider cheyyunnu
  const lowStock = inventory.filter(
    (medicine) =>
      Number(medicine.stock ?? 0) > 0 &&
      Number(medicine.stock ?? 0) <= 10
  ).length;

  const inStock = inventory.filter(
    (medicine) => Number(medicine.stock ?? 0) > 10
  ).length;

  const outOfStock = inventory.filter(
    (medicine) => Number(medicine.stock ?? 0) === 0
  ).length;

  const stats = [
    {
      title: "Total Medicines",
      value: totalMedicines,
      icon: Package,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Low Stock",
      value: lowStock,
      icon: AlertCircle,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-500",
    },
    {
      title: "In Stock",
      value: inStock,
      icon: PackageCheck,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Out of Stock",
      value: outOfStock,
      icon: PackageX,
      iconBg: "bg-red-100",
      iconColor: "text-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${stat.iconBg}`}
              >
                <Icon
                  size={20}
                  className={stat.iconColor}
                />
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

export default InventoryStats;
