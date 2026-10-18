
import React from "react";

const currency = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN")}`;

const TopSellingMedicines = ({
  medicines = [],
  loading = false,
}) => {
  return (
    <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
        <h2 className="text-base font-bold text-gray-900">
          Top Selling Medicines
        </h2>

        <span className="text-xs text-gray-500">
          Top 5
        </span>
      </div>

      {loading ? (
        <div className="space-y-3 p-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-8 animate-pulse rounded bg-gray-100"
            />
          ))}
        </div>
      ) : medicines.length === 0 ? (
        <div className="p-6 text-center text-sm text-gray-500">
          No medicine sales data available
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-xs text-gray-500">
              <tr>
                <th className="px-4 py-3 font-medium">
                  Medicine Name
                </th>
                <th className="px-4 py-3 font-medium">
                  Category
                </th>
                <th className="px-4 py-3 text-right font-medium">
                  Units Sold
                </th>
                <th className="px-4 py-3 text-right font-medium">
                  Revenue
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {medicines.map((medicine) => (
                <tr
                  key={medicine.medicineId}
                  className="hover:bg-gray-50"
                >
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {medicine.medicineName}
                  </td>

                  <td className="px-4 py-3 text-gray-600">
                    {medicine.category}
                  </td>

                  <td className="px-4 py-3 text-right text-gray-700">
                    {medicine.unitsSold}
                  </td>

                  <td className="px-4 py-3 text-right font-medium text-gray-900">
                    {currency(medicine.revenue)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default TopSellingMedicines;
