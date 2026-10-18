
import React, { useState } from "react";
import { MoreVertical, Package } from "lucide-react";

const InventoryTable = ({
  medicines = [],
  onView,
  onEdit,
  // onAdjustStock,
  // onAddStock,
  // onStockHistory,
  onDelete,
}) => {
  const [activeMenu, setActiveMenu] = useState(null);

  const getStockStatus = (stock) => {
    if (stock === 0) {
      return {
        label: "Out of Stock",
        className: "bg-red-100 text-red-600",
      };
    }

    if (stock <= 10) {
      return {
        label: "Low Stock",
        className: "bg-orange-50 text-orange-600",
      };
    }

    return {
      label: "In Stock",
      className: "bg-emerald-50 text-emerald-700",
    };
  };

  const formatExpiryDate = (date) => {
    if (!date) return "—";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return "—";

    return parsedDate.toLocaleDateString("en-GB", {
      month: "short",
      year: "numeric",
    });
  };

  if (!medicines.length) {
    return (
      <div className="mt-4 rounded-xl border border-gray-100 bg-white px-6 py-12 text-center">
        <Package
          size={36}
          className="mx-auto mb-3 text-gray-300"
        />
        <h3 className="font-semibold text-gray-800">
          No medicines found
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Try changing your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-4 overflow-visible rounded-xl border border-gray-100 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] table-fixed text-left">
          <thead>
            <tr className="h-12 bg-gray-100 text-[11px] font-medium text-gray-500">
              <th className="w-[23%] rounded-l-lg px-5">
                Medicine
              </th>
              <th className="w-[15%] px-3">
                Category
              </th>
              <th className="w-[12%] px-3">
                Curr.Stock
              </th>
              <th className="w-[12%] px-3">
                Min.Stock
              </th>
              <th className="w-[14%] px-3">
                Expiry Date
              </th>
              <th className="w-[15%] px-3">
                Status
              </th>
              <th className="w-[9%] rounded-r-lg px-3 text-center">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {medicines.map((medicine) => {
              const stock = Number(medicine.stock ?? 0);
              const minimumStock = Number(
                medicine.minimumStock ?? medicine.minStock ?? 20
              );
              const stockStatus = getStockStatus(stock);

              return (
                <tr
                  key={medicine._id || medicine.id}
                  className="h-[66px] border-b border-gray-100 last:border-b-0 hover:bg-gray-50/70"
                >
                  {/* Medicine */}
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <div className="flex h-10 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-100 bg-white">
                        {medicine.image ? (
                          <img
                            src={medicine.image}
                            alt={medicine.name}
                            className="h-full w-full object-contain"
                          />
                        ) : (
                          <Package
                            size={20}
                            className="text-emerald-600"
                          />
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-[11px] font-semibold text-gray-900">
                          {medicine.name || "Unnamed medicine"}
                        </p>
                        <p className="mt-1 truncate text-[10px] text-gray-500">
                          {medicine.packSize || "Pack size N/A"}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-3 py-2">
                    <p className="truncate text-[11px] text-gray-600">
                      {medicine.category || "—"}
                    </p>
                  </td>

                  {/* Current Stock */}
                  <td className="px-3 py-2">
                    <span
                      className={`text-[11px] font-semibold ${
                        stock === 0
                          ? "text-red-600"
                          : stock <= 10
                          ? "text-orange-500"
                          : "text-emerald-600"
                      }`}
                    >
                      {stock}
                    </span>
                  </td>

                  {/* Minimum Stock */}
                  <td className="px-3 py-2">
                    <span className="text-[11px] font-semibold text-gray-800">
                      {minimumStock}
                    </span>
                  </td>

                  {/* Expiry Date */}
                  <td className="px-3 py-2">
                    <span className="text-[11px] font-semibold text-gray-800">
                      {formatExpiryDate(medicine.expiryDate)}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-3 py-2">
                    <span
                      className={`inline-flex whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-[10px] font-medium ${stockStatus.className}`}
                    >
                      {stockStatus.label}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="relative px-3 py-2 text-center">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveMenu(
                          activeMenu === medicine._id
                            ? null
                            : medicine._id
                        )
                      }
                      className="rounded-md p-1.5 text-gray-600 hover:bg-gray-100"
                      aria-label="Inventory actions"
                    >
                      <MoreVertical size={17} />
                    </button>

                    {activeMenu === medicine._id && (
                      <div className="absolute right-8 top-8 z-30 w-40 rounded-lg border border-gray-100 bg-white py-1 text-left shadow-lg">
                        {[
                          ["View Details", onView],
                          ["Edit Medicine", onEdit],
                          // ["Adjust Stock", onAdjustStock],
                          // ["Add Stock", onAddStock],
                          // ["Stock History", onStockHistory],
                          ["Delete Medicine", onDelete],
                        ].map(([label, handler]) => (
                          <button
                            key={label}
                            type="button"
                            onClick={() => {
                              setActiveMenu(null);
                              handler?.(medicine);
                            }}
                            className={`block w-full px-3 py-2 text-left text-[11px] hover:bg-gray-50 ${
                              label === "Delete Medicine"
                                ? "text-red-600"
                                : "text-gray-700"
                            }`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="border-t border-gray-100 px-4 py-3 text-xs text-gray-500">
        Showing {medicines.length} medicines
      </div>
    </div>
  );
};

export default InventoryTable;
