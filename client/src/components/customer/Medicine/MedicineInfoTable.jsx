import React from "react";

const MedicineInfoTable = ({ medicine }) => {
  const rows = [
    {
      leftLabel: "Generic Name",
      leftValue: medicine?.genericName || "-",

      rightLabel: "Pack Size",
      rightValue: medicine?.packSize || "-",
    },

    {
      leftLabel: "Brand",
      leftValue: medicine?.brandName || "-",

      rightLabel: "Prescription Required",
      rightValue: medicine?.prescriptionRequired ? "Yes" : "No",
    },

    {
      leftLabel: "Manufacturer",
      leftValue: medicine?.manufacturer || "-",

      rightLabel: "Available Stock",
      rightValue:
        medicine?.stock !== undefined
          ? `${medicine.stock} Packs`
          : "-",
    },

    {
      leftLabel: "Category",
      leftValue: medicine?.category || "-",

      rightLabel: "Expiry Date",
      rightValue: medicine?.expiryDate
        ? new Date(medicine.expiryDate).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : "-",
    },

    {
      leftLabel: "Dosage",
      leftValue: medicine?.dosage || "-",

      rightLabel: "Country of Origin",
      rightValue: medicine?.countryOfOrigin || "India",
    },

    {
      leftLabel: "Form",
      leftValue: medicine?.form || "-",

      rightLabel: "Drug Type",
      rightValue: medicine?.drugType || "Allopathic",
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      {rows.map((row, index) => (
        <div
          key={index}
          className="grid grid-cols-2 border-b last:border-b-0"
        >
          {/* LEFT SIDE */}
          <div className="grid grid-cols-2 bg-[#F0FBF7] border-r border-[#D6EEE5]">
            <span className="px-4 py-3 text-xs font-medium text-gray-600">
              {row.leftLabel}
            </span>

            <span className="px-4 py-3 text-xs text-gray-700">
              {row.leftValue}
            </span>
          </div>

          {/* RIGHT SIDE */}
          <div className="grid grid-cols-2 bg-[#F0FBF7]">
            <span className="px-4 py-3 text-xs font-medium text-gray-600">
              {row.rightLabel}
            </span>

            <span className="px-4 py-3 text-xs text-gray-700">
              {row.rightValue}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MedicineInfoTable;