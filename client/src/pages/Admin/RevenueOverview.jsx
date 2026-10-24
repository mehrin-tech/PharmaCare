import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  TrendingUp,
  RefreshCw,
} from "lucide-react";

import AdminSidebar from "../../components/admin/AdminSidebar";
import TopNavbar from "../../components/customer/TopNavbar";

import RevenueStats from "../../components/admin/Revenue/RevenueStats";
import RevenueChart from "../../components/admin/Revenue/RevenueChart";
import RevenuePaymentMethod from "../../components/admin/Revenue/RevenuePaymentMethod";

import { getRevenueReport } from "../../redux/slices/adminRevenueSlice";

const RevenueOverview = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRevenueReport("Monthly"));
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(getRevenueReport("Monthly"));
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] md:flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="min-w-0 flex-1">
        <TopNavbar />

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

            <button
              type="button"
              onClick={handleRefresh}
              className="inline-flex w-fit items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
            >
              <RefreshCw size={16} />
              Refresh Report
            </button>
          </div>

          {/* Revenue Statistics */}
          <section>
            <RevenueStats />
          </section>

          {/* Revenue Trend */}
          <section className="rounded-2xl">
            <RevenueChart />
          </section>

          {/* Payment Method Overview */}
          <section>
            <RevenuePaymentMethod />
          </section>

        </div>
      </main>
    </div>
  );
};

export default RevenueOverview;
