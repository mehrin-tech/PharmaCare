
import React from "react";
import {
  X,
  Building2,
  UserRound,
  Mail,
  Phone,
  ShieldCheck,
  FileText,
} from "lucide-react";

const PharmacyDetailsModal = ({ pharmacy, onClose }) => {
  if (!pharmacy) return null;

  const isActive = pharmacy.isActive;

  const details = [
    {
      label: "Pharmacy Name",
      value: pharmacy.pharmacyName,
      icon: Building2,
    },
    {
      label: "Owner Name",
      value: pharmacy.ownerName || pharmacy.user?.name,
      icon: UserRound,
    },
    {
      label: "Email Address",
      value: pharmacy.email || pharmacy.user?.email,
      icon: Mail,
    },
    {
      label: "Phone Number",
      value: pharmacy.phone || pharmacy.user?.phone,
      icon: Phone,
    },
    {
      label: "Business Type",
      value: pharmacy.pharmacyType,
      icon: Building2,
    },
    {
      label: "License Number",
      value: pharmacy.licenseNumber,
      icon: FileText,
    },
    {
      label: "Approval Status",
      value: pharmacy.approvalStatus,
      icon: ShieldCheck,
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="pharmacy-modal-title"
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
          <div>
            <h2
              id="pharmacy-modal-title"
              className="text-xl font-bold text-slate-800"
            >
              Pharmacy Details
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Pharmacy registration information
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Pharmacy Profile */}
        <div className="flex items-center gap-4 bg-emerald-50/60 px-6 py-5">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
            <Building2 size={27} />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="break-words font-semibold text-slate-800">
              {pharmacy.pharmacyName || "Unnamed Pharmacy"}
            </h3>
            <p className="mt-1 text-sm capitalize text-gray-500">
              {pharmacy.pharmacyType || "Pharmacy"}
            </p>
          </div>

          <span
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
              isActive === true
                ? "bg-emerald-100 text-emerald-700"
                : isActive === false
                  ? "bg-red-100 text-red-600"
                  : "bg-gray-100 text-gray-600"
            }`}
          >
            {isActive === true
              ? "Active"
              : isActive === false
                ? "Inactive"
                : "Unknown"}
          </span>
        </div>

        {/* Details */}
        <div className="space-y-5 px-6 py-6">
          {details.map(({ label, value, icon: Icon }) => (
            <div key={label} className="flex items-start gap-3">
              <div className="rounded-lg bg-gray-100 p-2 text-gray-500">
                <Icon size={18} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-gray-500">
                  {label}
                </p>
                <p className="mt-1 break-words text-sm font-medium capitalize text-slate-800">
                  {value || "—"}
                </p>
              </div>
            </div>
          ))}

          <div className="border-t border-gray-100 pt-4">
            <p className="text-xs font-medium text-gray-500">
              Pharmacy ID
            </p>
            <p className="mt-1 break-all text-sm text-slate-700">
              {pharmacy._id || "—"}
            </p>
          </div>

          {pharmacy.licenseDocument && (
            <a
              href={pharmacy.licenseDocument}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700 hover:underline"
            >
              <FileText size={17} />
              View License Document
            </a>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-gray-100 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PharmacyDetailsModal;
