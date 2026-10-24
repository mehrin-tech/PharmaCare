import React,{useState} from "react";

import AdminSidebar from "../../components/admin/AdminSidebar";
import TopNavbar from "../../components/customer/TopNavbar";


import RevenueChart from "../../components/admin/Revenue/RevenueChart";
import OrderSalesOverview from "../../components/admin/Dashboard/OrderSalesOverview";
import RecentRegisteredUsers from "../../components/admin/Dashboard/RecentRegisteredUsers";
import RecentRegisteredPharmacies from "../../components/admin/Dashboard/RecentRegisteredPharmacies";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[#F7F9FA] lg:flex">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="min-w-0 flex-1">
        <TopNavbar setSidebarOpen={setSidebarOpen} />

        <div className="mx-auto max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">
          {/* Dashboard Stats */}
       <h1>Dashboard</h1>

          {/* Revenue Chart + Order Sales Overview */}
          <section className="grid grid-cols-1 items-stretch gap-6 xl:grid-cols-2">
            <div className="min-w-0">
              <RevenueChart />
            </div>

            <div className="min-w-0">
              <OrderSalesOverview />
            </div>
          </section>

          {/* Recent Users + Recent Pharmacies */}
          <section className="grid grid-cols-1 items-stretch gap-6 2xl:grid-cols-2">
            <div className="min-w-0">
              <RecentRegisteredUsers />
            </div>

            <div className="min-w-0">
              <RecentRegisteredPharmacies />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
