
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "lucide-react";
import { getAllPharmacies } from "../../../redux/slices/pharmacySlice";

const RecentRegisteredPharmacies = () => {
  const dispatch = useDispatch();

  const {
    allPharmacies,
    allPharmaciesLoading,
    allPharmaciesError,
  } = useSelector((state) => state.pharmacy);

  useEffect(() => {
    dispatch(getAllPharmacies());
  }, [dispatch]);

  // Latest 5 registered pharmacies
  const recentPharmacies = useMemo(() => {
    return [...(Array.isArray(allPharmacies) ? allPharmacies : [])]
      .sort(
        (a, b) =>
          new Date(b.createdAt || 0) -
          new Date(a.createdAt || 0)
      )
      .slice(0, 5);
  }, [allPharmacies]);

  const getVerificationStatus = (pharmacy) => {
    const status =
      pharmacy.licenseVerification?.status ||
      pharmacy.verificationStatus;

    if (status === "verified" || status === "approved") {
      return {
        label: "Verified",
        styles: "bg-emerald-50 text-emerald-700",
      };
    }

    if (status === "rejected" || status === "failed") {
      return {
        label: status === "rejected" ? "Rejected" : "Failed",
        styles: "bg-red-50 text-red-700",
      };
    }

    if (status === "suspicious") {
      return {
        label: "Review Required",
        styles: "bg-orange-50 text-orange-700",
      };
    }

    return {
      label: "Pending",
      styles: "bg-amber-50 text-amber-700",
    };
  };

  return (
    <section className="min-w-0 rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
          <Store size={21} />
        </div>

        <div>
          <h2 className="font-semibold text-slate-800">
            Recent Registered Pharmacies
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Latest pharmacy registrations
          </p>
        </div>
      </div>

      {/* Loading */}
      {allPharmaciesLoading && (
        <div className="py-10 text-center text-sm text-slate-500">
          Loading pharmacies...
        </div>
      )}

      {/* Error */}
      {!allPharmaciesLoading && allPharmaciesError && (
        <div className="py-10 text-center text-sm text-red-500">
          {allPharmaciesError}
          <button
            onClick={() => dispatch(getAllPharmacies())}
            className="ml-2 font-semibold text-emerald-600 hover:underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* Empty State */}
      {!allPharmaciesLoading &&
        !allPharmaciesError &&
        recentPharmacies.length === 0 && (
          <div className="py-10 text-center text-sm text-slate-500">
            No registered pharmacies found.
          </div>
        )}

      {/* Pharmacy Table */}
      {!allPharmaciesLoading &&
        !allPharmaciesError &&
        recentPharmacies.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] text-left text-sm">
              <thead>
                <tr className="bg-slate-50 text-xs text-slate-500">
                  <th className="rounded-l-lg px-4 py-3 font-medium">
                    Pharmacy Name
                  </th>
                  <th className="px-4 py-3 font-medium">Owner</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">
                    Registered On
                  </th>
                  <th className="rounded-r-lg px-4 py-3 font-medium">
                    Verification
                  </th>
                </tr>
              </thead>

              <tbody>
                {recentPharmacies.map((pharmacy) => {
                  const verification =
                    getVerificationStatus(pharmacy);

                  return (
                    <tr
                      key={pharmacy._id}
                      className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70"
                    >
                      <td className="px-4 py-4 font-medium text-slate-700">
                        {pharmacy.pharmacyName || "—"}
                      </td>

                      <td className="px-4 py-4 text-slate-500">
                        {pharmacy.ownerName || "—"}
                      </td>

                      <td className="px-4 py-4 capitalize text-slate-500">
                        {pharmacy.pharmacyType || "—"}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-slate-500">
                        {pharmacy.createdAt
                          ? new Date(
                              pharmacy.createdAt
                            ).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })
                          : "—"}
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium ${verification.styles}`}
                        >
                          {verification.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
    </section>
  );
};

export default RecentRegisteredPharmacies;
