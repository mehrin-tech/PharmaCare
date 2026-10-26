import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AdminSidebar from "../../components/admin/AdminSidebar";
import TopNavbar from "../../components/customer/TopNavbar";

import PharmacyStats from "../../components/admin/PharmacyManagement/PharmacyStats";
import PharmacyTabs from "../../components/admin/PharmacyManagement/PharmacyTabs";
import PharmacyTable from "../../components/admin/PharmacyManagement/PharmacyTable";
import PharmacyDetailsModal from
  "../../components/admin/PharmacyManagement/PharmacyDetailsModal";
import { getAllPharmacies,rejectPharmacy,approvePharmacy } from "../../redux/slices/pharmacySlice";

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
  
  const handleReject=async(pharmacy,reason)=>{
    try{
      await dispatch(rejectPharmacy({
        pharmacyId:pharmacy._id,
        reason
      })).unwrap()
      setSelectedPharmacy(null)
      dispatch(getAllPharmacies())

    }catch(error){

      console.error("Reject pharmacy failed:", error);
    alert(typeof error === "string" ? error : "Failed to reject pharmacy");

    }
  }

  const handleApprove=async(pharmacy)=>{
    try{
      await dispatch(approvePharmacy(pharmacy._id)).unwrap()
      setSelectedPharmacy(null);

    await dispatch(getAllPharmacies()).unwrap();
    alert("Pharmacy approved successfully!");

    }catch(error){
       console.error("Approve pharmacy failed:", error);
    alert(
      typeof error === "string"
        ? error
        : "Failed to approve pharmacy"
    );

    }
  }
  return (

  <div className="min-h-screen bg-[#F7F9FA] lg:flex">
        <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 min-w-0">

             <TopNavbar setSidebarOpen={setSidebarOpen} />
             <div className="px-4 pb-2 pt-6 sm:px-6 lg:px-8">
  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <div className="flex items-center gap-2">
       

        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Pharmacy Management
        </h1>
      </div>

     
    </div>

   
  </div>
</div>

           

        

          {/* Statistics */}
         
            <section className="mb-8">
           <PharmacyStats />
        </section>

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
   onReject={handleReject}
   onApprove={handleApprove}
/>
         
        </main>
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
