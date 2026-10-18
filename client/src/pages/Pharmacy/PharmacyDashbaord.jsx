import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import DashboardSummaryCards from "../../components/pharmacy/Dashboard/DashboardSummaryCards";
import SaleOverview from "../../components/pharmacy/Sales&Reports/SaleOverview";

import { getSalesReport } from "../../redux/slices/salesReportSlice";
import { useNavigate } from "react-router-dom";
import { getPharmacyOrders } from "../../redux/slices/orderSlice";
// import NewOrders from "../../components/pharmacy/Dashboard/NewOrders";
import RecentOrders from "../../components/pharmacy/Sales&Reports/RecentOrders";
const PharmacyDashboard = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()

  const { report, loading, error } = useSelector(
    (state) => state.salesReport
  );
   const {
     pharmacyOrders,
     pharmacyOrdersLoading,
     pharmacyOrdersError,
   } = useSelector((state) => state.orders);
  useEffect(() => {
    dispatch(getSalesReport());
    dispatch(getPharmacyOrders());
  }, [dispatch]);


    // Latest 5 pharmacy orders
  const recentOrders = [...(pharmacyOrders || [])]
    .sort(
      (a, b) =>
        new Date(b.createdAt) - new Date(a.createdAt)
    )
    .slice(0, 5);
  return (
    <div className="min-h-screen space-y-6 bg-gray-50 p-4 md:p-6">
      <h1 className="text-2xl font-bold text-gray-900">
        Pharmacy Dashboard
      </h1>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <DashboardSummaryCards
        summary={{
          todayOrders: 0,
          todayRevenue: report?.todaySales || 0,
          pendingPrescriptions: 0,
          lowStockItems: 0,
          ordersTrend: 0,
          revenueTrend: 0,
          prescriptionsTrend: 0,
          lowStockTrend: 0,
        }}
        loading={loading}
      />

      <SaleOverview
        report={report}
        loading={loading}
      />
      {/* <NewOrders
  orders={pharmacyOrders}
  loading={pharmacyOrdersLoading}
  onViewAll={() => navigate("/pharmacy/orders")}
  onAccept={(order) =>
    navigate(`/pharmacy/orders/${order._id}`)
  }
/> */}
<RecentOrders
  orders={recentOrders}
  loading={pharmacyOrdersLoading}
/>
    </div>
  );
};

export default PharmacyDashboard;