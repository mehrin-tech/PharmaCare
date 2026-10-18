
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getSalesReport } from "../../redux/slices/salesReportSlice";
import { getPharmacyOrders } from "../../redux/slices/orderSlice";

import SaleOverview from "../../components/pharmacy/Sales&Reports/SaleOverview";
import TopSellingMedicines from "../../components/pharmacy/Sales&Reports/TopSellingMedicines";
import RecentOrders from "../../components/pharmacy/Sales&Reports/RecentOrders";

const SalesReport = () => {
  const dispatch = useDispatch();

  // Sales report Redux state
  const { pharmacy, report, loading, error } = useSelector(
    (state) => state.salesReport
  );

  // Pharmacy orders Redux state
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

  const handleRefresh = () => {
    dispatch(getSalesReport());
    dispatch(getPharmacyOrders());
  };

  return (
    <div className="min-h-screen space-y-6 bg-gray-50 p-4 md:p-6">

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Sales & Reports
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            {pharmacy?.pharmacyName
              ? `${pharmacy.pharmacyName} sales performance`
              : "Track your pharmacy sales and performance"}
          </p>
        </div>

        <button
          type="button"
          onClick={handleRefresh}
          disabled={loading || pharmacyOrdersLoading}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-60"
        >
          {loading || pharmacyOrdersLoading
            ? "Loading..."
            : "Refresh Report"}
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Sales Overview + Top Selling Medicines */}
<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
  <SaleOverview
    report={report}
    loading={loading}
  />

  <TopSellingMedicines
    medicines={report?.topSellingMedicines || []}
    loading={loading}
  />
</div>

{/* Recent Orders - Full Width Below */}
{pharmacyOrdersError && (
  <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
    {pharmacyOrdersError}
  </div>
)}

<RecentOrders
  orders={recentOrders}
  loading={pharmacyOrdersLoading}
/>

    </div>
  );
};

export default SalesReport;
