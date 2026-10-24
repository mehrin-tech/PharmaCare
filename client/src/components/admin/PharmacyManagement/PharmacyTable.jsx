// CheckCircle,XCircle
import React from "react";
import { Eye, Building2, Mail, Phone,  } from "lucide-react";

const PharmacyTable = ({
  pharmacies = [],
  loading = false,
  error = null,
  search = "",
  approvalStatus = "all",
  businessType = "all",
  accountStatus = "all",
  onView,
  onReject
}) => {
  const filteredPharmacies = pharmacies.filter((pharmacy) => {
    const query = search.trim().toLowerCase();

    const matchesSearch =
      !query ||
      pharmacy.pharmacyName?.toLowerCase().includes(query) ||
      pharmacy.ownerName?.toLowerCase().includes(query) ||
      pharmacy.email?.toLowerCase().includes(query) ||
      pharmacy.licenseNumber?.toLowerCase().includes(query);

    const matchesApproval =
      approvalStatus === "all" ||
      pharmacy.approvalStatus?.toLowerCase() ===
        approvalStatus.toLowerCase();

    const matchesBusinessType =
      businessType === "all" ||
      pharmacy.pharmacyType?.toLowerCase() ===
        businessType.toLowerCase();

    const active = pharmacy.isActive;

    const matchesAccountStatus =
      accountStatus === "all" ||
      (accountStatus === "active" && active === true) ||
      (accountStatus === "inactive" && active === false);

    return (
      matchesSearch &&
      matchesApproval &&
      matchesBusinessType &&
      matchesAccountStatus
    );
  });

  if (loading) {
    return (
      <div className="p-10 text-center text-sm text-gray-500">
        Loading pharmacies...
      </div>
    );
  }

  if (error) {
    return (
      <div className="m-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
        Failed to load pharmacies: {String(error)}
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[1050px] text-left text-sm">
        <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
          <tr>
            <th className="px-5 py-4 font-semibold">Pharmacy</th>
            <th className="px-5 py-4 font-semibold">Owner</th>
            <th className="px-5 py-4 font-semibold">Contact</th>
            <th className="px-5 py-4 font-semibold">Business Type</th>
            <th className="px-5 py-4 font-semibold">License Number</th>
            <th className="px-5 py-4 font-semibold">Approval</th>
            <th className="px-5 py-4 font-semibold">Account Status</th>
            <th className="px-5 py-4 text-right font-semibold">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {filteredPharmacies.length > 0 ? (
            filteredPharmacies.map((pharmacy, index) => {
              const approval = pharmacy.approvalStatus?.toLowerCase();

              return (
              <tr
  key={pharmacy._id || index}
  onClick={() => onView?.(pharmacy)}
  title="Click to view pharmacy details"
  className="cursor-pointer transition hover:bg-gray-50"
>
                  {/* Pharmacy */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                        <Building2 size={19} />
                      </div>

                      <div>
                        <p className="font-semibold text-slate-800">
                          {pharmacy.pharmacyName || "Unnamed Pharmacy"}
                        </p>
                        <p className="mt-1 text-xs text-gray-400">
                          ID: {pharmacy._id || "—"}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Owner */}
                  <td className="px-5 py-4 font-medium text-slate-700">
                    {pharmacy.ownerName || pharmacy.user?.name || "—"}
                  </td>

                  {/* Contact */}
                  <td className="px-5 py-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail size={14} className="shrink-0 text-gray-400" />
                        <span>{pharmacy.email || pharmacy.user?.email || "—"}</span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-500">
                        <Phone size={14} className="shrink-0 text-gray-400" />
                        <span>{pharmacy.phone || pharmacy.user?.phone || "—"}</span>
                      </div>
                    </div>
                  </td>

                  {/* Business Type */}
                  <td className="px-5 py-4">
                    <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium capitalize text-blue-700">
                      {pharmacy.pharmacyType || "—"}
                    </span>
                  </td>

                  {/* License */}
                  <td className="px-5 py-4 text-gray-600">
                    {pharmacy.licenseNumber || "—"}
                  </td>

                  {/* Approval */}
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
                        approval === "approved"
                          ? "bg-emerald-50 text-emerald-700"
                          : approval === "pending"
                            ? "bg-amber-50 text-amber-700"
                            : approval === "rejected"
                              ? "bg-red-50 text-red-600"
                              : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {pharmacy.approvalStatus || "Unknown"}
                    </span>
                  </td>

                  {/* Account Status */}
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                        pharmacy.isActive === true
                          ? "bg-emerald-50 text-emerald-700"
                          : pharmacy.isActive === false
                            ? "bg-red-50 text-red-600"
                            : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {pharmacy.isActive === true
                        ? "Active"
                        : pharmacy.isActive === false
                          ? "Inactive"
                          : "Unknown"}
                    </span>
                  </td>

                  {/* View Action */}
                {/* Actions */}
<td className="px-5 py-4">
  <div className="flex items-center justify-end gap-2">
    {/* View Details */}
    <button
      type="button"
      onClick={() => onView?.(pharmacy)}
      title="View pharmacy details and license"
      className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
    >
      <Eye size={15} />
      View
    </button>

    {/* Approve / Reject only for pending pharmacies */}
    {/* {approval === "pending" && (
      <>
        <button
          type="button"
          onClick={() => onApprove?.(pharmacy)}
          title="Approve pharmacy"
          className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
        >
          <CheckCircle size={15} />
          Approve
        </button>

        <button
          type="button"
          onClick={() => onReject?.(pharmacy)}
          title="Reject pharmacy"
          className="inline-flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
        >
          <XCircle size={15} />
          Reject
        </button>
      </>
    )} */}
  </div>
</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={8} className="px-5 py-14 text-center">
                <Building2 size={30} className="mx-auto text-gray-300" />

                <p className="mt-3 text-sm font-medium text-slate-700">
                  No pharmacies found
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Try changing your search or filters.
                </p>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="border-t border-gray-100 px-5 py-3 text-xs text-gray-500">
        Showing {filteredPharmacies.length} pharmacies
      </div>
    </div>
  );
};

export default PharmacyTable;
