
import {
  Eye,
  CheckCircle,
  XCircle,
  FileText,
} from "lucide-react";

const PrescriptionTable = ({
  prescriptions = [],
  loading = false,
  actionLoading = false,
  onView,
  onApprove,
  onReject,
}) => {
  if (loading) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-10 text-center text-gray-500">
        Loading prescriptions...
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="border-b border-gray-200 p-5">
        <h2 className="font-semibold text-gray-900">
          Pending Prescriptions
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Review customer prescriptions and take action.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] text-left">
          <thead className="bg-gray-50">
            <tr className="text-xs uppercase text-gray-500">
              <th className="px-5 py-4">Customer</th>
              <th className="px-5 py-4">Medicine</th>
              <th className="px-5 py-4">Uploaded Date</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Prescription</th>
              <th className="px-5 py-4">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {prescriptions.map((prescription) => (
              <tr
                key={prescription._id}
                className="transition hover:bg-gray-50"
              >
                {/* Customer */}
                <td className="px-5 py-4">
                  <p className="text-sm font-medium text-gray-800">
                    {prescription.user?.name || "Customer"}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {prescription.user?.email || "—"}
                  </p>
                </td>

                {/* Medicine */}
                <td className="px-5 py-4 text-sm text-gray-700">
                  {prescription.medicine?.name || "—"}
                </td>

                {/* Upload date */}
                <td className="px-5 py-4 text-sm text-gray-600">
                  {prescription.createdAt
                    ? new Date(
                        prescription.createdAt
                      ).toLocaleDateString("en-IN")
                    : "—"}
                </td>

                {/* Status */}
                <td className="px-5 py-4">
                  <span className="inline-flex rounded-full bg-amber-50 px-3 py-1 text-xs font-medium capitalize text-amber-700">
                    {prescription.status}
                  </span>
                </td>

                {/* Prescription document */}
                <td className="px-5 py-4">
                  {prescription.image ? (
                    <a
                      href={prescription.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700 hover:underline"
                    >
                      <FileText size={16} />
                      View file
                    </a>
                  ) : (
                    <span className="text-sm text-gray-400">
                      No file
                    </span>
                  )}
                </td>

                {/* Actions */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      title="View details"
                      onClick={() => onView?.(prescription)}
                      className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-100"
                    >
                      <Eye size={17} />
                    </button>

                    {prescription.status === "pending" && (
                      <>
                        <button
                          type="button"
                          title="Approve prescription"
                          disabled={actionLoading}
                          onClick={() =>
                            onApprove?.(prescription)
                          }
                          className="rounded-lg p-2 text-emerald-600 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <CheckCircle size={18} />
                        </button>

                        <button
                          type="button"
                          title="Reject prescription"
                          disabled={actionLoading}
                          onClick={() =>
                            onReject?.(prescription)
                          }
                          className="rounded-lg p-2 text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <XCircle size={18} />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}

            {prescriptions.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-12 text-center"
                >
                  <FileText
                    size={38}
                    className="mx-auto text-gray-300"
                  />

                  <p className="mt-3 font-medium text-gray-700">
                    No pending prescriptions
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    New prescriptions will appear here.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PrescriptionTable;
