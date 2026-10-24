



import React, { useState } from "react";
import {
  X,
  Building2,
  UserRound,
  Mail,
  Phone,
  ShieldCheck,
  FileText,
  CheckCircle,
  XCircle,
  ExternalLink,
} from "lucide-react";

const PharmacyDetailsModal = ({
  pharmacy,
  onClose,
  onApprove,
  onReject,
  processing = false,
}) => {
  const [showRejectInput, setShowRejectInput] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  if (!pharmacy) return null;

  const isPending =
    pharmacy.approvalStatus?.toLowerCase() === "pending";

  const licenseDocument = pharmacy.licenseDocument;
  const licenseUrl =
    typeof licenseDocument === "string"
      ? licenseDocument
      : licenseDocument?.url;

  const isPdf = licenseUrl
    ?.split("?")[0]
    .toLowerCase()
    .endsWith(".pdf");

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
    {
      label: "License Verification",
      value: pharmacy.licenseVerification?.status,
      icon: ShieldCheck,
    },
  ];

 const handleReject = () => {
  console.log("Reject clicked");
  console.log("Pharmacy:", pharmacy._id);
  console.log("Reason:", rejectionReason);

  if (!rejectionReason.trim()) {
    console.log("Rejection reason is empty");
    return;
  }

  if (!onReject) {
    console.error("onReject prop is missing!");
    return;
  }

  onReject(pharmacy, rejectionReason.trim());
};
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !processing) {
          onClose?.();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="pharmacy-modal-title"
        className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl"
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-5 py-4 sm:px-6">
          <div>
            <h2
              id="pharmacy-modal-title"
              className="text-xl font-bold text-slate-800"
            >
              Pharmacy Verification
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Review pharmacy details and license document
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={processing}
            aria-label="Close modal"
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 space-y-6 overflow-y-auto p-5 sm:p-6">
          {/* Pharmacy Profile */}
          <div className="flex items-center gap-4 rounded-xl bg-emerald-50/70 p-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <Building2 size={25} />
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
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                pharmacy.isActive
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {pharmacy.isActive ? "Active" : "Inactive"}
            </span>
          </div>

          {/* Pharmacy Details */}
          <section>
            <h3 className="mb-4 text-sm font-bold text-slate-800">
              Registration Details
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {details.map(({ label, value, icon: Icon }) => (
                <div
                  key={label}
                  className="flex min-w-0 items-start gap-3 rounded-lg border border-gray-100 p-3"
                >
                  <Icon
                    size={18}
                    className="mt-0.5 shrink-0 text-gray-400"
                  />

                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">{label}</p>
                    <p className="mt-1 break-words text-sm font-medium capitalize text-slate-800">
                      {value || "—"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* License Document Preview */}
          <section>
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-slate-800">
                  Pharmacy License Document
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                  Verify the uploaded document before making a decision.
                </p>
              </div>

              {licenseUrl && (
                <a
                  href={licenseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-emerald-700 hover:underline"
                >
                  Open
                  <ExternalLink size={13} />
                </a>
              )}
            </div>

            {licenseUrl ? (
              <div className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
                {isPdf ? (
                  <iframe
                    src={licenseUrl}
                    title="Pharmacy license PDF"
                    className="h-[350px] w-full sm:h-[450px]"
                  />
                ) : (
                  <img
                    src={licenseUrl}
                    alt="Uploaded pharmacy license"
                    className="mx-auto max-h-[450px] w-full object-contain"
                  />
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center rounded-xl border border-dashed border-red-200 bg-red-50 p-8 text-center">
                <FileText size={32} className="text-red-400" />
                <p className="mt-3 text-sm font-semibold text-red-700">
                  No license document available
                </p>
                <p className="mt-1 text-xs text-red-600">
                  Verify the uploaded document before approving.
                </p>
              </div>
            )}
          </section>

          {/* Rejection Reason */}
          {showRejectInput && isPending && (
            <section className="rounded-xl border border-red-200 bg-red-50 p-4">
              <label
                htmlFor="rejectionReason"
                className="text-sm font-semibold text-red-800"
              >
                Rejection Reason
              </label>

              <textarea
                id="rejectionReason"
                value={rejectionReason}
                onChange={(event) =>
                  setRejectionReason(event.target.value)
                }
                placeholder="Explain why this pharmacy registration is rejected..."
                rows={3}
                maxLength={500}
                className="mt-2 w-full rounded-lg border border-red-200 bg-white p-3 text-sm outline-none focus:border-red-400"
              />

              <div className="mt-3 flex justify-end gap-2">
                <button
                  type="button"
                  disabled={processing}
                  onClick={() => {
                    setShowRejectInput(false);
                    setRejectionReason("");
                  }}
                  className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  disabled={processing || !rejectionReason.trim()}
                  onClick={handleReject}
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {processing ? "Processing..." : "Confirm Reject"}
                </button>
              </div>
            </section>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-gray-100 bg-white px-5 py-4 sm:px-6">
          <button
            type="button"
            onClick={onClose}
            disabled={processing}
            className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-50"
          >
            Close
          </button>

          {isPending && !showRejectInput && (
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setShowRejectInput(true)}
                disabled={processing}
                className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
              >
                <XCircle size={16} />
                Reject
              </button>

              <button
                type="button"
                onClick={() => onApprove?.(pharmacy)}
                disabled={
                  processing ||
                  pharmacy.licenseVerification?.status !== "verified" ||
                  !licenseUrl
                }
                title={
                  pharmacy.licenseVerification?.status !== "verified"
                    ? "License must be verified first"
                    : !licenseUrl
                      ? "License document is missing"
                      : "Approve pharmacy"
                }
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <CheckCircle size={16} />
                {processing ? "Processing..." : "Approve"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PharmacyDetailsModal;
