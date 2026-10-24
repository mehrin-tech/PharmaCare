import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Users } from "lucide-react";
import { fetchCustomers } from "../../../redux/slices/adminUserSlice";

const RecentRegisteredUsers = () => {
  const dispatch = useDispatch();

  const { customers, loading, error } = useSelector(
    (state) => state.adminUsers
  );

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const recentUsers = useMemo(() => {
    return [...(Array.isArray(customers) ? customers : [])]
      .sort(
        (a, b) =>
          new Date(b.createdAt || 0) -
          new Date(a.createdAt || 0)
      )
      .slice(0, 5);
  }, [customers]);

  return (
    <section className="min-w-0 rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-emerald-50 p-3 text-emerald-600">
            <Users size={21} />
          </div>

          <div>
            <h2 className="font-semibold text-slate-800">
              Recent Registered Users
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Latest customer registrations
            </p>
          </div>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="py-10 text-center text-sm text-slate-500">
          Loading users...
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="py-10 text-center text-sm text-red-500">
          {error}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && recentUsers.length === 0 && (
        <div className="py-10 text-center text-sm text-slate-500">
          No registered users found.
        </div>
      )}

      {/* Users Table */}
      {!loading && !error && recentUsers.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead>
              <tr className="bg-slate-50 text-xs text-slate-500">
                <th className="rounded-l-lg px-4 py-3 font-medium">
                  Name
                </th>
                <th className="px-4 py-3 font-medium">
                  Email
                </th>
                <th className="px-4 py-3 font-medium">
                  Role
                </th>
                <th className="px-4 py-3 font-medium">
                  Registered On
                </th>
                <th className="rounded-r-lg px-4 py-3 font-medium">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {recentUsers.map((user) => {
                const isActive =
                  user.isActive === true ||
                  user.status === "active";

                return (
                  <tr
                    key={user._id}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70"
                  >
                    <td className="px-4 py-4 font-medium text-slate-700">
                      {user.name || "—"}
                    </td>

                    <td className="px-4 py-4 text-slate-500">
                      {user.email || "—"}
                    </td>

                    <td className="px-4 py-4 capitalize text-slate-500">
                      {user.role || "customer"}
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 text-slate-500">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )
                        : "—"}
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium ${
                          isActive
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {isActive ? "Active" : "Inactive"}
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

export default RecentRegisteredUsers;
