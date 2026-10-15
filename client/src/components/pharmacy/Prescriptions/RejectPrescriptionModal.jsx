
import { X } from "lucide-react";

const RejectPrescriptionModal = ({
  prescription,
  reason,
  onReasonChange,
  onClose,
  onConfirm,
  loading,
}) => {
  if (!prescription) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">
            Reject Prescription
          </h2>

          <button
            onClick={onClose}
            disabled={loading}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <p className="mt-2 text-sm text-gray-500">
          Prescription ID: {prescription._id}
        </p>

        <label className="mt-5 block text-sm font-medium text-gray-700">
          Rejection reason *
        </label>

        <textarea
          rows={4}
          value={reason}
          onChange={(event) =>
            onReasonChange(event.target.value)
          }
          placeholder="Explain why the prescription cannot be accepted..."
          className="mt-2 w-full rounded-lg border border-gray-300 p-3 text-sm outline-none focus:border-emerald-500"
        />

        <div className="mt-5 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-lg border px-4 py-2 text-sm text-gray-700 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading || !reason.trim()}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Rejecting..." : "Confirm Reject"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectPrescriptionModal;
