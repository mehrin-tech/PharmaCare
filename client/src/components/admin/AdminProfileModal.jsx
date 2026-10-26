
import { X, UserRound, Mail, ShieldCheck } from "lucide-react";

const AdminProfileModal = ({ isOpen, onClose, admin }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              Admin Profile
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              View your account information
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
            aria-label="Close profile modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Profile */}
        <div className="p-6">
          <div className="mb-6 flex flex-col items-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <UserRound size={38} />
            </div>

            <h3 className="mt-3 text-xl font-bold text-slate-800">
              {admin?.name || "Admin"}
            </h3>

            <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              <ShieldCheck size={14} />
              Administrator
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-emerald-600 shadow-sm">
                <UserRound size={19} />
              </div>

              <div className="min-w-0">
                <p className="text-xs text-gray-500">Full Name</p>
                <p className="break-words text-sm font-medium text-slate-800">
                  {admin?.name || "Not available"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-emerald-600 shadow-sm">
                <Mail size={19} />
              </div>

              <div className="min-w-0">
                <p className="text-xs text-gray-500">Email Address</p>
                <p className="break-words text-sm font-medium text-slate-800">
                  {admin?.email || "Not available"}
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <button
            type="button"
            onClick={onClose}
            className="mt-6 w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProfileModal;
