// import React from 'react'

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import AdminSidebar from "../../components/admin/AdminSidebar";
// import TopNavbar from "../../components/customer/TopNavbar";
// import PharmacyStats from '../../components/admin/PharmacyManagement/PharmacyStats';
// import { getAllPharmacies } from '../../redux/slices/pharmacySlice';
// import PharmacyTabs from '../../components/admin/PharmacyManagement/PharmacyTabs';
// import PharmacyTable from '../../components/admin/PharmacyManagement/PharmacyTable';
// const PharmacyManagement = () => {
//     const dispatch=useDispatch()
//       const [sidebarOpen, setSidebarOpen] = useState(false);
//       const [approvalStatus, setApprovalStatus] = useState("all");

//       const { allPharmacies = [], allPharmaciesLoading, allPharmaciesError } =
//   useSelector((state) => state.pharmacy || {});
//       useEffect(()=>{
//         dispatch(getAllPharmacies())
//       })
//   return (
//     <div className="min-h-screen bg-[#F7F8FA]">
//       <AdminSidebar  isOpen={sidebarOpen}
//         onClose={() => setSidebarOpen(false)} />
//         <div className="h-screen lg:ml-[230px]">
//             <header className="sticky top-0 z-30 h-[70px] border-b border-gray-200 bg-white">
//             <TopNavbar setSidebarOpen={setSidebarOpen} />

//             </header>
//             <main  className="space-y-6 p-4 md:p-6">
//                 <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
//                     <div>
//                           <div className="flex items-center gap-2">
                

//                 <h1 className="text-2xl font-bold text-slate-800">
//                   Pharmacy Management
//                 </h1>
//               </div>

//               <p className="mt-2 text-sm text-gray-500">
//                 Manage and monitor registered customer accounts.
//               </p>
//                     </div>

//                 </div>
//                 <PharmacyStats/>
//                 <PharmacyTabs activeTab={approvalStatus}
//   onTabChange={setApprovalStatus}/>
//   <PharmacyTable  pharmacies={allPharmacies}
//   loading={allPharmaciesLoading}
//   error={allPharmaciesError}
//   search={search}
//   approvalStatus={approvalStatus}
//   businessType={businessType}
//   accountStatus={accountStatus}
//   onView={(pharmacy) => setSelectedPharmacy(pharmacy)}/>
//             </main>
//         </div>
        
     
//     </div>
//   )
// }

// export default PharmacyManagement


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AdminSidebar from "../../components/admin/AdminSidebar";
import TopNavbar from "../../components/customer/TopNavbar";

import PharmacyStats from "../../components/admin/PharmacyManagement/PharmacyStats";
import PharmacyTabs from "../../components/admin/PharmacyManagement/PharmacyTabs";
import PharmacyTable from "../../components/admin/PharmacyManagement/PharmacyTable";
import PharmacyDetailsModal from
  "../../components/admin/PharmacyManagement/PharmacyDetailsModal";
import { getAllPharmacies } from "../../redux/slices/pharmacySlice";

const PharmacyManagement = () => {
  const dispatch = useDispatch();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Filters
  const [search, setSearch] = useState("");
  const [approvalStatus, setApprovalStatus] = useState("all");
  const [businessType, setBusinessType] = useState("all");
  const [accountStatus, setAccountStatus] = useState("all");

  // Selected pharmacy for details modal
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);

  // Redux state
  const {
    allPharmacies = [],
    allPharmaciesLoading = false,
    allPharmaciesError = null,
  } = useSelector((state) => state.pharmacy || {});

  // Fetch pharmacies once when page mounts
  useEffect(() => {
    dispatch(getAllPharmacies());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      {/* Sidebar */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="min-h-screen lg:ml-[230px]">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 h-[70px] border-b border-gray-200 bg-white">
          <TopNavbar setSidebarOpen={setSidebarOpen} />
        </header>

        <main className="space-y-6 p-4 md:p-6">
          {/* Page Header */}
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Pharmacy Management
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Manage, verify, and monitor registered pharmacies.
            </p>
          </div>

          {/* Statistics */}
          <PharmacyStats />

          {/* Pharmacy Status Tabs */}
          <div className="rounded-xl border border-gray-100 bg-white px-5">
            <PharmacyTabs
              activeTab={approvalStatus}
              onTabChange={setApprovalStatus}
            />
          </div>

          {/* Search and Filters */}
          <div className="rounded-xl border border-gray-100 bg-white p-4">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search pharmacy, owner, email..."
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />

              <select
                value={businessType}
                onChange={(event) => setBusinessType(event.target.value)}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-emerald-500"
              >
                <option value="all">All Business Types</option>
                <option value="local">Local Pharmacy</option>
                <option value="hospital">Hospital Pharmacy</option>
              </select>

              <select
                value={accountStatus}
                onChange={(event) => setAccountStatus(event.target.value)}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-emerald-500"
              >
                <option value="all">All Account Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Pharmacy Table */}
          <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
            <PharmacyTable
              pharmacies={allPharmacies}
              loading={allPharmaciesLoading}
              error={allPharmaciesError}
              search={search}
              approvalStatus={approvalStatus}
              businessType={businessType}
              accountStatus={accountStatus}
onView={setSelectedPharmacy}            />
          </div>

<PharmacyDetailsModal
  pharmacy={selectedPharmacy}
  onClose={() => setSelectedPharmacy(null)}
/>
         
        </main>
      </div>
    </div>
  );
};

const Detail = ({ label, value }) => (
  <div>
    <p className="text-xs font-medium text-gray-500">{label}</p>
    <p className="mt-1 break-words text-sm font-medium text-slate-800">
      {value || "—"}
    </p>
  </div>
);

export default PharmacyManagement;
