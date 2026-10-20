

// import { useMemo } from "react";
// import { useSelector } from "react-redux";
// import {
//   Eye,
//   UserRound,
//   Mail,
//   Phone,
// } from "lucide-react";

// const UserTable = ({
//   search = "",
//   status = "all",
//   onViewCustomer,
//   onToggleStatus,
// }) => {
//   const {
//     customers = [],
//     admins = [],
//     loading: usersLoading = false,
//     error: usersError = null,
//   } = useSelector((state) => state.adminUsers || {});

//   const {
//     allPharmacies = [],
//     allPharmaciesLoading = false,
//     allPharmaciesError = null,
//   } = useSelector((state) => state.pharmacy || {});

//   // Convert pharmacy records into table rows using the populated owner.
//   const pharmacyUsers = allPharmacies
//     .filter((pharmacy) => pharmacy.user)
//     .map((pharmacy) => ({
//       ...pharmacy.user,
//       _id: pharmacy.user._id,
//       role: "pharmacy",
//       pharmacyId: pharmacy._id,
//       pharmacyName: pharmacy.pharmacyName,
//       accountType: "pharmacy",
//       isActive: pharmacy.isActive ?? pharmacy.user.isActive ?? false,
//     }));

//   const allUsers = useMemo(() => {
//     const customerRows = customers.map((user) => ({
//       ...user,
//       accountType: "customer",
//     }));

//     const adminRows = admins.map((user) => ({
//       ...user,
//       accountType: "admin",
//     }));

//     return [...customerRows, ...pharmacyUsers, ...adminRows];
//   }, [customers, admins, allPharmacies]);

//   const filteredUsers = useMemo(() => {
//     const query = search.trim().toLowerCase();

//     return allUsers.filter((user) => {
//       const matchesSearch =
//         !query ||
//         user.name?.toLowerCase().includes(query) ||
//         user.email?.toLowerCase().includes(query) ||
//         user.pharmacyName?.toLowerCase().includes(query);

//       const active =
//         user.isActive ??
//         (user.status === "active"
//           ? true
//           : user.status === "inactive"
//             ? false
//             : undefined);

//       const matchesStatus =
//         status === "all" ||
//         (status === "active" && active === true) ||
//         (status === "inactive" && active === false);

//       return matchesSearch && matchesStatus;
//     });
//   }, [allUsers, search, status]);

//   const loading = usersLoading || allPharmaciesLoading;
//   const error = usersError || allPharmaciesError;

//   if (loading) {
//     return (
//       <div className="p-8 text-center text-sm text-gray-500">
//         Loading users...
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="m-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
//         Failed to load users: {String(error)}
//       </div>
//     );
//   }

//   return (
//     <div className="w-full overflow-x-auto">
//       <table className="w-full min-w-[850px] text-left text-sm">
//         <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
//           <tr>
//             <th className="px-5 py-4 font-semibold">User</th>
//             <th className="px-5 py-4 font-semibold">Contact</th>
//             <th className="px-5 py-4 font-semibold">Role</th>
//             <th className="px-5 py-4 font-semibold">Status</th>
//             <th className="px-5 py-4 text-right font-semibold">Actions</th>
//           </tr>
//         </thead>

//         <tbody className="divide-y divide-gray-100">
//           {filteredUsers.length > 0 ? (
//             filteredUsers.map((user, index) => {
//               const active =
//                 user.isActive ??
//                 (user.status === "active"
//                   ? true
//                   : user.status === "inactive"
//                     ? false
//                     : undefined);

//               const role = user.accountType;

//               return (
//                 <tr
//                   key={`${role}-${user._id || user.email || index}`}
//                   className="transition hover:bg-gray-50/70"
//                 >
//                   <td className="px-5 py-4">
//                     <div className="flex items-center gap-3">
//                       <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
//                         <UserRound size={19} />
//                       </div>

//                       <div>
//                         <p className="font-semibold text-slate-800">
//                           {user.name || user.ownerName || "Unnamed user"}
//                         </p>
//                         {role === "pharmacy" && (
//                           <p className="mt-1 text-xs text-gray-500">
//                             {user.pharmacyName || "Pharmacy account"}
//                           </p>
//                         )}
//                         <p className="mt-1 text-xs text-gray-400">
//                           ID: {user._id || "—"}
//                         </p>
//                       </div>
//                     </div>
//                   </td>

//                   <td className="px-5 py-4">
//                     <div className="space-y-2">
//                       <div className="flex items-center gap-2 text-gray-600">
//                         <Mail size={14} className="shrink-0 text-gray-400" />
//                         <span>{user.email || "—"}</span>
//                       </div>
//                       <div className="flex items-center gap-2 text-gray-500">
//                         <Phone size={14} className="shrink-0 text-gray-400" />
//                         <span>{user.phone || "—"}</span>
//                       </div>
//                     </div>
//                   </td>

//                   <td className="px-5 py-4">
//                     <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium capitalize text-blue-700">
//                       {role}
//                     </span>
//                   </td>

//                   <td className="px-5 py-4">
//                     <span
//                       className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
//                         active === true
//                           ? "bg-emerald-50 text-emerald-700"
//                           : active === false
//                             ? "bg-red-50 text-red-600"
//                             : "bg-gray-100 text-gray-600"
//                       }`}
//                     >
//                       {active === true
//                         ? "Active"
//                         : active === false
//                           ? "Inactive"
//                           : "Unknown"}
//                     </span>
//                   </td>

//                   <td className="px-5 py-4 text-right">
//                     <button
//                       type="button"
//                       onClick={() => onViewCustomer?.(user)}
//                       title="View user"
//                       className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
//                     >
//                       <Eye size={16} />
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })
//           ) : (
//             <tr>
//               <td colSpan={5} className="px-5 py-14 text-center">
//                 <UserRound size={30} className="mx-auto text-gray-300" />
//                 <p className="mt-3 text-sm font-medium text-slate-700">
//                   No users found
//                 </p>
//                 <p className="mt-1 text-xs text-gray-400">
//                   Try changing your search or status filter.
//                 </p>
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       <div className="border-t border-gray-100 px-5 py-3 text-xs text-gray-500">
//         Showing {filteredUsers.length} of {allUsers.length} users
//       </div>
//     </div>
//   );
// };

// export default UserTable;


import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Eye, UserRound, Mail, Phone } from "lucide-react";
import UserDetailsModal from "./UserDetailsModal";

const UserTable = ({ search = "", status = "all" }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  const {
    customers = [],
    admins = [],
    loading: usersLoading = false,
    error: usersError = null,
  } = useSelector((state) => state.adminUsers || {});

  const {
    allPharmacies = [],
    allPharmaciesLoading = false,
    allPharmaciesError = null,
  } = useSelector((state) => state.pharmacy || {});

  const allUsers = useMemo(() => {
    const customerRows = customers.map((user) => ({
      ...user,
      accountType: "customer",
    }));

    const pharmacyRows = allPharmacies
      .filter((pharmacy) => pharmacy.user)
      .map((pharmacy) => ({
        ...pharmacy.user,
        _id: pharmacy.user._id,
        role: "pharmacy",
        pharmacyId: pharmacy._id,
        pharmacyName: pharmacy.pharmacyName,
        accountType: "pharmacy",
        isActive:
          pharmacy.isActive ??
          pharmacy.user.isActive ??
          false,
      }));

    const adminRows = admins.map((user) => ({
      ...user,
      accountType: "admin",
    }));

    return [...customerRows, ...pharmacyRows, ...adminRows];
  }, [customers, admins, allPharmacies]);

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return allUsers.filter((user) => {
      const matchesSearch =
        !query ||
        user.name?.toLowerCase().includes(query) ||
        user.ownerName?.toLowerCase().includes(query) ||
        user.email?.toLowerCase().includes(query) ||
        user.pharmacyName?.toLowerCase().includes(query);

      const active =
        user.isActive ??
        (user.status === "active"
          ? true
          : user.status === "inactive"
            ? false
            : undefined);

      const matchesStatus =
        status === "all" ||
        (status === "active" && active === true) ||
        (status === "inactive" && active === false);

      return matchesSearch && matchesStatus;
    });
  }, [allUsers, search, status]);

  const loading = usersLoading || allPharmaciesLoading;
  const error = usersError || allPharmaciesError;

  if (loading) {
    return (
      <div className="p-8 text-center text-sm text-gray-500">
        Loading users...
      </div>
    );
  }

  if (error) {
    return (
      <div className="m-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
        Failed to load users: {String(error)}
      </div>
    );
  }

  return (
    <>
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[850px] text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
            <tr>
              <th className="px-5 py-4 font-semibold">User</th>
              <th className="px-5 py-4 font-semibold">Contact</th>
              <th className="px-5 py-4 font-semibold">Role</th>
              <th className="px-5 py-4 font-semibold">Status</th>
              <th className="px-5 py-4 text-right font-semibold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => {
                const active =
                  user.isActive ??
                  (user.status === "active"
                    ? true
                    : user.status === "inactive"
                      ? false
                      : undefined);

                const role = user.accountType;

                return (
                  <tr
                    key={`${role}-${user._id || user.email || index}`}
                    className="transition hover:bg-gray-50/70"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                          <UserRound size={19} />
                        </div>

                        <div>
                          <p className="font-semibold text-slate-800">
                            {user.name || user.ownerName || "Unnamed user"}
                          </p>

                          {role === "pharmacy" && (
                            <p className="mt-1 text-xs text-gray-500">
                              {user.pharmacyName || "Pharmacy account"}
                            </p>
                          )}

                          <p className="mt-1 text-xs text-gray-400">
                            ID: {user._id || "—"}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Mail size={14} className="shrink-0 text-gray-400" />
                          <span>{user.email || "—"}</span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-500">
                          <Phone size={14} className="shrink-0 text-gray-400" />
                          <span>{user.phone || "—"}</span>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium capitalize text-blue-700">
                        {role}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                          active === true
                            ? "bg-emerald-50 text-emerald-700"
                            : active === false
                              ? "bg-red-50 text-red-600"
                              : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {active === true
                          ? "Active"
                          : active === false
                            ? "Inactive"
                            : "Unknown"}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedUser(user)}
                        title="View user details"
                        aria-label={`View ${user.name || user.email || "user"}`}
                        className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                      >
                        <Eye size={16} />
                       
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="px-5 py-14 text-center">
                  <UserRound size={30} className="mx-auto text-gray-300" />
                  <p className="mt-3 text-sm font-medium text-slate-700">
                    No users found
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    Try changing your search or status filter.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="border-t border-gray-100 px-5 py-3 text-xs text-gray-500">
          Showing {filteredUsers.length} of {allUsers.length} users
        </div>
      </div>

      {selectedUser && (
        <UserDetailsModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </>
  );
};

export default UserTable;
