import React from "react";
import {
  X,
  Pill,
  Package,
  IndianRupee,
  CalendarDays,
  Building2,
  Tag,
  ClipboardCheck,
  Pencil,
} from "lucide-react";

const MedicineDetailsModal = ({
  medicine,
  isOpen,
  onClose,
  onEdit,
}) => {
  if (!isOpen || !medicine) return null;

  const stock = Number(medicine.stock ?? 0);

  const stockLabel =
    stock === 0
      ? "Out of Stock"
      : stock <= 10
      ? "Low Stock"
      : "In Stock";

  const stockClass =
    stock === 0
      ? "bg-red-50 text-red-600"
      : stock <= 10
      ? "bg-orange-50 text-orange-600"
      : "bg-emerald-50 text-emerald-700";

  const formatDate = (date) => {
    if (!date) return "Not specified";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Not specified";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const DetailItem = ({ icon: Icon, label, value }) => (
    <div className="flex min-w-0 items-start gap-3 rounded-xl border border-gray-100 p-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
        <Icon size={17} />
      </div>

      <div className="min-w-0">
        <p className="text-xs text-gray-500">{label}</p>
        <p className="mt-1 break-words text-sm font-medium text-gray-800">
          {value ?? "Not specified"}
        </p>
      </div>
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="medicine-details-title"
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-5 py-4 sm:px-7">
          <div>
            <h2
              id="medicine-details-title"
              className="text-lg font-bold text-gray-900"
            >
              Medicine Details
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              View complete medicine information
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close medicine details"
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6 p-5 sm:p-7">
          {/* Product summary */}
          <div className="flex flex-col gap-5 rounded-xl bg-gray-50 p-4 sm:flex-row sm:items-center">
            <div className="flex h-36 w-full shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-white sm:w-36">
              {medicine.image ? (
                <img
                  src={medicine.image}
                  alt={medicine.name || "Medicine"}
                  className="h-full w-full object-contain p-3"
                />
              ) : (
                <Pill size={48} className="text-gray-300" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
                {medicine.category || "Uncategorized"}
              </p>

              <h3 className="mt-2 text-xl font-bold text-gray-900">
                {medicine.name || "Unnamed medicine"}
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                {medicine.brandName || "Brand not specified"}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="text-2xl font-bold text-emerald-700">
                  ₹{Number(medicine.price || 0).toLocaleString("en-IN")}
                </span>

                {medicine.mrp != null && (
                  <span className="text-sm text-gray-500">
                    MRP: ₹{Number(medicine.mrp).toLocaleString("en-IN")}
                  </span>
                )}
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${stockClass}`}
                >
                  {stockLabel} ({stock})
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    medicine.isActive
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {medicine.isActive ? "Active" : "Inactive"}
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    medicine.prescriptionRequired
                      ? "bg-orange-50 text-orange-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {medicine.prescriptionRequired
                    ? "Prescription Required"
                    : "No Prescription Required"}
                </span>
              </div>
            </div>
          </div>

          {/* Medicine information */}
          <section>
            <h3 className="mb-3 text-sm font-semibold text-gray-900">
              General Information
            </h3>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <DetailItem
                icon={Pill}
                label="Generic Name"
                value={medicine.genericName}
              />

              <DetailItem
                icon={Tag}
                label="Brand Name"
                value={medicine.brandName}
              />

              <DetailItem
                icon={Package}
                label="Pack Size"
                value={medicine.packSize}
              />

              <DetailItem
                icon={ClipboardCheck}
                label="Dosage"
                value={medicine.dosage}
              />

              <DetailItem
                icon={Pill}
                label="Form"
                value={medicine.form}
              />

              <DetailItem
                icon={Tag}
                label="Drug Type"
                value={medicine.drugType}
              />

              <DetailItem
                icon={Building2}
                label="Manufacturer"
                value={medicine.manufacturer}
              />

              <DetailItem
                icon={CalendarDays}
                label="Expiry Date"
                value={formatDate(medicine.expiryDate)}
              />

              <DetailItem
                icon={IndianRupee}
                label="Medicine ID"
                value={medicine._id}
              />

              <DetailItem
                icon={Building2}
                label="Country of Origin"
                value={medicine.countryOfOrigin}
              />
            </div>
          </section>

          {/* Description */}
          <section>
            <h3 className="mb-2 text-sm font-semibold text-gray-900">
              Description
            </h3>

            <p className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-sm leading-6 text-gray-600">
              {medicine.description || "No description available."}
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-white px-5 py-4 sm:flex-row sm:justify-end sm:px-7">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Close
          </button>

          <button
            type="button"
            onClick={() => onEdit?.(medicine)}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0F9D74] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0B8964]"
          >
            <Pencil size={16} />
            Edit Medicine
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicineDetailsModal;
