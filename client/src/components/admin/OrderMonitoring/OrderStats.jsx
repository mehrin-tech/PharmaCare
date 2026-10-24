
import React from "react";
import { useSelector } from "react-redux";
import {
  Package,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const OrderStats = () => {
  const {
    orders = [],
    orderStatistics,
    statisticsLoading = false,
    statisticsError = null,
    ordersLoading = false,
    ordersError = null,
  } = useSelector((state) => state.adminOrder || {});

  // Normalize order status
  const getStatus = (order) =>
    String(order?.orderStatus || order?.status || "")
      .toLowerCase()
      .replace(/[\s_-]/g, "");

  // Calculate counts from orders when statistics are unavailable
  const pendingFromOrders = orders.filter((order) =>
    ["pending", "awaitingconfirmation"].includes(getStatus(order))
  ).length;

  const completedFromOrders = orders.filter((order) =>
    ["delivered", "completed"].includes(getStatus(order))
  ).length;

  const cancelledFromOrders = orders.filter((order) =>
    ["cancelled", "canceled"].includes(getStatus(order))
  ).length;

  const totalOrders =
    orderStatistics?.totalOrders ??
    orderStatistics?.total ??
    orders.length;

  const pendingOrders =
    orderStatistics?.pendingOrders ??
    orderStatistics?.pending ??
    pendingFromOrders;

  const completedOrders =
    orderStatistics?.completedOrders ??
    orderStatistics?.deliveredOrders ??
    orderStatistics?.completed ??
    orderStatistics?.delivered ??
    completedFromOrders;

  const cancelledOrders =
    orderStatistics?.cancelledOrders ??
    orderStatistics?.cancelled ??
    cancelledFromOrders;

  const stats = [
    {
      label: "Total Orders",
      value: totalOrders,
      icon: Package,
      iconStyle: "bg-blue-50 text-blue-600",
    },
    {
      label: "Pending Orders",
      value: pendingOrders,
      icon: Clock,
      iconStyle: "bg-amber-50 text-amber-600",
    },
    {
      label: "Completed Orders",
      value: completedOrders,
      icon: CheckCircle2,
      iconStyle: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Cancelled Orders",
      value: cancelledOrders,
      icon: XCircle,
      iconStyle: "bg-red-50 text-red-600",
    },
  ];

  if (ordersError && !orders.length && statisticsError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
        {ordersError || statisticsError}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        const isLoading = ordersLoading || statisticsLoading;

        return (
          <div
            key={stat.label}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-gray-500">
                {stat.label}
              </p>

              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${stat.iconStyle}`}
              >
                <Icon size={21} />
              </div>
            </div>

            <h3 className="mt-4 text-2xl font-bold text-slate-800">
              {isLoading && !orders.length ? (
                <span className="inline-block h-7 w-12 animate-pulse rounded bg-gray-200" />
              ) : (
                Number(stat.value).toLocaleString("en-IN")
              )}
            </h3>
          </div>
        );
      })}
    </div>
  );
};

export default OrderStats;
