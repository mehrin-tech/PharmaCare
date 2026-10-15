
import { X, FileText, ExternalLink } from "lucide-react";

const PrescriptionDetailsModal = ({
  prescription,
  onClose,
  onApprove,
  onReject,
  actionLoading,
}) => {
  if (!prescription) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Prescription Details
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {prescription._id}
            </p>
          </div>

          <button onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <div className="mt-6 space-y-4 text-sm">
          <div>
            <p className="text-gray-500">Customer</p>
            <p className="font-medium text-gray-900">
              {prescription.user?.name || "Customer"}
            </p>
            <p className="text-gray-500">
              {prescription.user?.email || "—"}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Medicine</p>
            <p className="font-medium text-gray-900">
              {prescription.medicine?.name || "—"}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Uploaded date</p>
            <p className="font-medium text-gray-900">
              {prescription.createdAt
                ? new Date(
                    prescription.createdAt
                  ).toLocaleDateString("en-IN")
                : "—"}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Status</p>
            <span className="mt-1 inline-block rounded-full bg-amber-50 px-3 py-1 text-xs font-medium capitalize text-amber-700">
              {prescription.status}
            </span>
          </div>

          {prescription.image && (
            <a
              href={prescription.image}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-medium text-emerald-700 hover:underline"
            >
              <FileText size={18} />
              View prescription document
              <ExternalLink size={15} />
            </a>
          )}
        </div>

        {prescription.status === "pending" && (
          <div className="mt-7 flex justify-end gap-3 border-t pt-4">
            <button
              disabled={actionLoading}
              onClick={() => onReject(prescription)}
              className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 disabled:opacity-50"
            >
              Reject
            </button>

            <button
              disabled={actionLoading}
              onClick={() => onApprove(prescription)}
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
            >
              Approve
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrescriptionDetailsModal;
