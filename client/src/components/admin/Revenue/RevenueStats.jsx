
import React from "react";
import { useSelector } from "react-redux";
import {
  Wallet,
  TrendingUp,
  Package,
  CheckCircle2,
} from "lucide-react";

const formatCurrency = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;

const RevenueStats = () => {
  const {
    report = {},
    loading,
    error,
  } = useSelector((state) => state.adminRevenue || {});

  const stats = [
    {
      label: "Total Revenue",
      value: formatCurrency(report.totalSales),
      icon: Wallet,
      iconStyle: "bg-emerald-50 text-emerald-600",
      description: "Medicine sales from delivered orders",
    },
    {
      label: "Platform Commission",
      value: formatCurrency(report.platformCommission),
      icon: TrendingUp,
      iconStyle: "bg-blue-50 text-blue-600",
      description: `Commission rate: ${report.commissionRate || "0%"}`,
    },
    {
      label: "Delivered Orders",
      value: Number(report.totalDeliveredOrders || 0).toLocaleString("en-IN"),
      icon: Package,
      iconStyle: "bg-amber-50 text-amber-600",
      description: "Successfully delivered orders",
    },
    {
      label: "Pharmacy Earnings",
      value: formatCurrency(report.pharmacyEarnings),
      icon: CheckCircle2,
      iconStyle: "bg-purple-50 text-purple-600",
      description: "Earnings after platform commission",
    },
  ];

  if (error && !loading) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {stat.label}
                </p>

                <h3 className="mt-3 text-2xl font-bold text-slate-800">
                  {loading ? (
                    <span className="inline-block h-7 w-20 animate-pulse rounded bg-gray-200" />
                  ) : (
                    stat.value
                  )}
                </h3>
              </div>

              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${stat.iconStyle}`}
              >
                <Icon size={21} />
              </div>
            </div>

            <p className="mt-3 text-xs text-gray-500">
              {stat.description}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default RevenueStats;

