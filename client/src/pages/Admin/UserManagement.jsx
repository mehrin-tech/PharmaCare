
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
//import { getAllPharmacies } from "../../redux/slices/pharmacySlice";

const UserManagement = () => {
  const dispatch = useDispatch();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const { customers = [], loading = false } = useSelector(
    (state) => state.adminUsers || {}
  );

  useEffect(() => {
    dispatch(fetchCustomers());
    
  }, [dispatch]);

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
    <div className="min-h-screen bg-[#F7F8FA]">
      {/* Sidebar */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="h-screen lg:ml-[230px]">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 h-[70px] border-b border-gray-200 bg-white">
          <TopNavbar setSidebarOpen={setSidebarOpen} />
        </header>

        <main className="space-y-6 p-4 md:p-6">
          {/* Page Heading */}
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <Users size={21} />
                </div>

                <h1 className="text-2xl font-bold text-slate-800">
                  User Management
                </h1>
              </div>

              <p className="mt-2 text-sm text-gray-500">
                Manage and monitor registered customer accounts.
              </p>
            </div>

            <button
              type="button"
              onClick={() => dispatch(fetchCustomers())}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:opacity-50"
            >
              <RefreshCw
                size={16}
                className={loading ? "animate-spin" : ""}
              />
              Refresh
            </button>
          </div>

          {/* Statistics */}
          <UserStats />

          {/* Customer List */}
          <section className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
            <div className="border-b border-gray-100 p-5">
              <h2 className="text-base font-semibold text-slate-800">
                Registered Customers
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Search, filter and manage customer accounts.
              </p>
            </div>

            <div className="border-b border-gray-100 p-5">
              <UserFilters
                search={search}
                setSearch={setSearch}
                status={status}
                setStatus={setStatus}
              />
            </div>

            <UserTable
              search={search}
              status={status}
              onViewCustomer={handleViewCustomer}
              onToggleStatus={handleToggleStatus}
            />

            {!loading && (
              <div className="border-t border-gray-100 px-5 py-3 text-xs text-gray-500">
                {customers.length} customer records loaded
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default UserManagement;
