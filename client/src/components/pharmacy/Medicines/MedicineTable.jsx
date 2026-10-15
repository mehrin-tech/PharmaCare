
import React from "react";
import {
    MoreHorizontal,
    Pencil,
    Trash2,
    Package,
    Eye
} from "lucide-react";

const MedicineTable = ({
    medicines = [],
    onEdit,
    onDelete,
    onView
}) => {
    if (medicines.length === 0) {
        return (
            <div className="mt-5 rounded-xl border border-gray-100 bg-white px-6 py-12 text-center shadow-sm">
                <Package
                    size={38}
                    className="mx-auto mb-3 text-gray-300"
                />

                <h3 className="text-base font-semibold text-gray-800">
                    No medicines found
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                    Try changing your search or filter options.
                </p>
            </div>
        );
    }

    return (
        <div className="mt-5 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[850px] text-left">
                    <thead className="border-b border-gray-100 bg-gray-50">
                        <tr className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                            <th className="px-5 py-4">Medicine</th>
                            <th className="px-5 py-4">Category</th>
                            <th className="px-5 py-4">Price</th>
                            <th className="px-5 py-4">Stock</th>
                            <th className="px-5 py-4">Status</th>
                            <th className="px-5 py-4">Prescription</th>
                            <th className="px-5 py-4 text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                        {medicines.map((medicine) => {
                            const stock = Number(medicine.stock ?? 0);

                            const stockLabel =
                                stock === 0
                                    ? "Out of Stock"
                                    : stock <= 10
                                        ? "Low Stock"
                                        : "In Stock";

                            const active = medicine.isActive === true;

                            return (
                                <tr
                                    key={medicine._id || medicine.id}
                                    className="text-sm hover:bg-gray-50"
                                >
                                    <td className="px-5 py-4">
                                        <p className="font-medium text-gray-900">
                                            {medicine.name || medicine.medicineName || "Unnamed"}
                                        </p>
                                        <p className="mt-1 text-xs text-gray-400">
                                            {medicine.sku || medicine._id || "—"}
                                        </p>
                                    </td>

                                    <td className="px-5 py-4 text-gray-600">
                                        {medicine.category || "—"}
                                    </td>

                                    <td className="px-5 py-4 font-medium text-gray-800">
                                        ₹{Number(medicine.price || 0).toLocaleString("en-IN")}
                                    </td>

                                    <td className="px-5 py-4">
                                        <span className="text-gray-800">{stock}</span>
                                        <p className="mt-1 text-xs text-gray-400">
                                            {stockLabel}
                                        </p>
                                    </td>

                                    <td className="px-5 py-4">
                                        <span
                                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${active
                                                    ? "bg-green-50 text-green-700"
                                                    : "bg-red-100 text-red-600"
                                                }`}
                                        >
                                            {active ? "Active" : "Inactive"}
                                        </span>
                                    </td>

                                    <td className="px-5 py-4">
                                        <span
                                            className={`rounded-full px-2.5 py-1 text-xs font-medium ${medicine.prescriptionRequired
                                                    ? "bg-orange-50 text-orange-700"
                                                    : "bg-gray-100 text-gray-600"
                                                }`}
                                        >
                                            {medicine.prescriptionRequired ? "Required" : "Not Required"}
                                        </span>
                                    </td>

                                    <td className="px-5 py-4">

                                        <div className="flex justify-end gap-2">
                                            <button
                                                type="button"
                                                onClick={() => onView?.(medicine)}
                                                aria-label="View medicine details"
                                                className="rounded-lg p-2 text-gray-500 hover:bg-blue-50 hover:text-blue-600"
                                            >
                                                <Eye size={16} />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => onEdit?.(medicine)}
                                                aria-label="Edit medicine"
                                                className="rounded-lg p-2 text-gray-500 hover:bg-emerald-50 hover:text-emerald-700"
                                            >
                                                <Pencil size={16} />
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => onDelete?.(medicine)}
                                                aria-label="Delete medicine"
                                                className="rounded-lg p-2 text-gray-500 hover:bg-red-50 hover:text-red-600"
                                            >
                                                <Trash2 size={16} />
                                            </button>


                                            {/* <button
                        type="button"
                        aria-label="More options"
                        className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                      >
                        <MoreHorizontal size={16} />
                      </button> */}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="border-t border-gray-100 px-5 py-3 text-sm text-gray-500">
                Showing {medicines.length} medicines
            </div>
        </div>
    );
};

export default MedicineTable;