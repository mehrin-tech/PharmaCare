import React, { useState } from 'react'
import {
  TrendingUp,

} from "lucide-react";
import AdminSidebar from '../../components/admin/AdminSidebar'
import TopNavbar from '../../components/customer/TopNavbar'
import RevenueChart from '../../components/admin/Revenue/RevenueChart'
import CustomerGrowth from '../../components/admin/Analytics&Reports/CustomerGrowth';
const AnalyticsReports = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[#F7F9FC] lg:flex">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="min-w-0 flex-1">
          <TopNavbar setSidebarOpen={setSidebarOpen} />
          <div className="mx-auto max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">
          {/* Page Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-emerald-600">
                <TrendingUp size={17} />
                <span>Financial Analytics</span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
                Revenue Overview
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Monitor sales performance, platform commission,
                pharmacy earnings, and payment statuses.
              </p>
            </div>
            </div>
 
{/* Analytics Charts */}
<section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
  {/* Left: Revenue Chart */}
  <div className="min-w-0">
    <RevenueChart />
  </div>

  {/* Right: Customer Growth */}
  <div className="min-w-0">
    <CustomerGrowth />
  </div>
</section>

          </div>
     

      </main>
    
    </div>
  )
}

export default AnalyticsReports
