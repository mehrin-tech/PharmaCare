
import { X, UserRound, Mail, Phone, ShieldCheck, Building2 } from "lucide-react";

const UserDetailsModal = ({ user, onClose }) => {
  if (!user) return null;

  const role = user.accountType || user.role || "customer";

  const isActive =
    user.isActive ??
    (user.status === "active"
      ? true
      : user.status === "inactive"
        ? false
        : undefined);

  const details = [
    { label: "Full Name", value: user.name || user.ownerName || "—", icon: UserRound },
    { label: "Email Address", value: user.email || "—", icon: Mail },
    { label: "Phone Number", value: user.phone || "—", icon: Phone },
    { label: "Account Role", value: role, icon: ShieldCheck },
  ];

  if (role === "pharmacy") {
    details.push({
      label: "Pharmacy Name",
      value: user.pharmacyName || "—",
      icon: Building2,
    });
  }

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
        aria-labelledby="user-modal-title"
        className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
          <div>
            <h2
              id="user-modal-title"
              className="text-lg font-bold text-slate-800"
            >
              User Details
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              View account information
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

        {/* User profile */}
        <div className="flex items-center gap-4 bg-emerald-50/60 px-6 py-5">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <UserRound size={28} />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="truncate font-semibold text-slate-800">
              {user.name || user.ownerName || "Unnamed user"}
            </h3>
            <p className="mt-1 text-sm capitalize text-gray-500">
              {role}
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
                  {value}
                </p>
              </div>
            </div>
          ))}

          <div className="border-t border-gray-100 pt-4">
            <p className="text-xs font-medium text-gray-500">
              User ID
            </p>
            <p className="mt-1 break-all text-sm text-slate-700">
              {user._id || "—"}
            </p>
          </div>
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

export default UserDetailsModal;
