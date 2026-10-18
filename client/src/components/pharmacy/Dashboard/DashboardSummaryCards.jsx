
import React from "react";
import {
  ShoppingBag,
  CircleDollarSign,
  ClipboardList,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const DashboardSummaryCards = ({
  summary = {},
  loading = false,
}) => {
  const cards = [
   
    {
      title: "Today's Revenue",
      value: `₹${Number(
        summary.todayRevenue ?? 0
      ).toLocaleString("en-IN")}`,
      icon: CircleDollarSign,
      iconStyle: "bg-orange-100 text-orange-600",
      trend: summary.revenueTrend ?? 0,
    },
    {
      title: "Pending Prescriptions",
      value: summary.pendingPrescriptions ?? 0,
      icon: ClipboardList,
      iconStyle: "bg-blue-100 text-blue-600",
      trend: summary.prescriptionsTrend ?? 0,
    },
    {
      title: "Low Stock Items",
      value: summary.lowStockItems ?? 0,
      icon: AlertTriangle,
      iconStyle: "bg-red-100 text-red-600",
      trend: summary.stockTrend ?? 0,
      isStock: true,
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="animate-pulse rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
          >
            <div className="h-4 w-28 rounded bg-gray-200" />
            <div className="mt-5 h-8 w-20 rounded bg-gray-200" />
            <div className="mt-4 h-3 w-32 rounded bg-gray-100" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        const TrendIcon =
          Number(card.trend) < 0
            ? TrendingDown
            : TrendingUp;

        return (
          <div
            key={card.title}
            className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-medium text-gray-500">
                {card.title}
              </p>

              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${card.iconStyle}`}
              >
                <Icon size={20} />
              </div>
            </div>

            <h3 className="mt-3 text-2xl font-bold text-gray-900">
              {card.value}
            </h3>

            <div className="mt-3 flex items-center gap-1.5">
              {card.isStock ? (
                <span className="text-xs text-gray-500">
                  Medicines needing restock
                </span>
              ) : (
                <>
                  <TrendIcon
                    size={14}
                    className={
                      Number(card.trend) < 0
                        ? "text-red-500"
                        : "text-emerald-500"
                    }
                  />
                  <span
                    className={`text-xs font-medium ${
                      Number(card.trend) < 0
                        ? "text-red-500"
                        : "text-emerald-600"
                    }`}
                  >
                    {Math.abs(Number(card.trend))}%
                  </span>
                  <span className="text-xs text-gray-400">
                    vs. previous period
                  </span>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardSummaryCards;
