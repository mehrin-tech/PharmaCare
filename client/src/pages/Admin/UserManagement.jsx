
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Users, RefreshCw } from "lucide-react";

import AdminSidebar from "../../components/admin/AdminSidebar";
import TopNavbar from "../../components/customer/TopNavbar";

import UserStats from "../../components/admin/CustomerManagement/UserStats";
import UserFilters from "../../components/admin/CustomerManagement/UserFilters";
import UserTable from "../../components/admin/CustomerManagement/UserTable";
import {
  fetchCustomers,
  updateCustomerStatus,
} from "../../redux/slices/adminUserSlice";
import Pagination from "../../components/Pagination/Pagination";
//import { getAllPharmacies } from "../../redux/slices/pharmacySlice";

const UserManagement = () => {
  const dispatch = useDispatch();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [currentPage,setCurrentPage]=useState(1)
  const limit =6

  const { customers = [], loading = false,pagination={} } = useSelector(
    (state) => state.adminUsers || {}
  );

  useEffect(() => {
    dispatch(fetchCustomers({page:currentPage,limit}));
    
  }, [dispatch,currentPage]);

  const handleToggleStatus = async (customer) => {
    const currentlyActive =
      customer.isActive ??
      (customer.status === "active"
        ? true
        : customer.status === "inactive"
          ? false
          : undefined);

    if (currentlyActive === undefined) return;

    const nextStatus = currentlyActive ? "inactive" : "active";

    const confirmed = window.confirm(
      `Are you sure you want to ${nextStatus === "active" ? "activate" : "deactivate"} this customer?`
    );

    if (!confirmed) return;

    try {
      await dispatch(
        updateCustomerStatus({
          customerId: customer._id || customer.id,
          status: nextStatus,
        })
      ).unwrap();

      dispatch(fetchCustomers());
    } catch (error) {
      console.error("Failed to update customer status:", error);
    }
  };

  const handleViewCustomer = (customer) => {
    console.log("Selected customer:", customer);
    // Connect your existing customer-details view here.
  };




return (
  <div className="min-h-screen bg-[#F7F9FA] lg:flex">
    {/* Sidebar */}
    <AdminSidebar
      isOpen={sidebarOpen}
      onClose={() => setSidebarOpen(false)}
    />

    {/* Main Content */}
    <main className="min-w-0 flex-1">
      {/* Top Navbar */}
      <TopNavbar setSidebarOpen={setSidebarOpen} />

      <div className="mx-auto w-full max-w-[1600px] px-4 pb-8 pt-6 sm:px-6 lg:px-8">
        {/* Page Heading */}
         <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  User Management
                </h1>
      

            

        {/* Statistics */}
        <section className="mb-8">
          <UserStats />
        </section>

        {/* Customer List */}
        <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
          {/* Section Heading */}
          <div className="flex flex-col gap-2 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Registered Customers
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Search, filter and manage customer accounts.
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="border-b border-gray-100 bg-white p-5 sm:p-6">
            <UserFilters
              search={search}
              setSearch={setSearch}
              status={status}
              setStatus={setStatus}
            />
          </div>

          {/* Customer Table */}
          <div className="min-w-0">
            <UserTable
              search={search}
              status={status}
              onViewCustomer={handleViewCustomer}
              onToggleStatus={handleToggleStatus}
            />
          </div>
          <Pagination
  currentPage={pagination.currentPage || currentPage}
  totalPages={pagination.totalPages || 0}
  totalItems={pagination.totalCustomers || 0}
  limit={limit}
  onPageChange={setCurrentPage}
  loading={loading}
/>

          {/* Footer */}
          {!loading && (
            <div className="border-t border-gray-100 bg-gray-50/50 px-5 py-4 text-sm text-gray-500 sm:px-6">
              <span className="font-semibold text-gray-800">
                {customers.length}
              </span>{" "}
              customer records loaded
            </div>
          )}
        </section>
      </div>
    </main>
  </div>
);

};

export default UserManagement;
