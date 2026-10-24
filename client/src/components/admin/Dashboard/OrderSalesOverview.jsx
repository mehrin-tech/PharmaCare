
import { useEffect, useMemo, useState } from "react";
import { ShoppingBag, CalendarDays, LoaderCircle } from "lucide-react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import api from "../../../services/api";

const ORDER_STATUSES = [
  {
    key: "deliveredOrders",
    label: "Delivered",
    color: "#10B981",
    bg: "bg-emerald-50",
    text: "text-emerald-600",
  },
  {
    key: "outForDeliveryOrders",
    label: "Out for Delivery",
    color: "#3B82F6",
    bg: "bg-blue-50",
    text: "text-blue-600",
  },
  {
    key: "packedOrders",
    label: "Packed",
    color: "#F59E0B",
    bg: "bg-amber-50",
    text: "text-amber-600",
  },
  {
    key: "preparingOrders",
    label: "Preparing",
    color: "#F97316",
    bg: "bg-orange-50",
    text: "text-orange-600",
  },
  {
    key: "acceptedOrders",
    label: "Accepted",
    color: "#8B5CF6",
    bg: "bg-purple-50",
    text: "text-purple-600",
  },
  {
    key: "cancelledOrders",
    label: "Cancelled",
    color: "#EF4444",
    bg: "bg-red-50",
    text: "text-red-600",
  },
];

const formatNumber = (value) =>
  Number(value || 0).toLocaleString("en-IN");

const OrderSalesOverview = () => {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchOrderStatistics = async () => {
      try {
        setLoading(true);
        setError("");

        // Change this URL if your backend route is different.
        const response = await api.get("/admin/orders/statistics");

        if (isMounted) {
          setStatistics(response.data.statistics);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err.response?.data?.message ||
              "Failed to load order statistics."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchOrderStatistics();

    return () => {
      isMounted = false;
    };
  }, []);

  const chartData = useMemo(() => {
    return ORDER_STATUSES.map((status) => ({
      ...status,
      value: Number(statistics?.[status.key] || 0),
    }));
  }, [statistics]);

  const totalOrders = Number(statistics?.totalOrders || 0);

  const totalChartOrders = chartData.reduce(
    (total, item) => total + item.value,
    0
  );

  const pendingOrders = Number(statistics?.pendingOrders || 0);
  const activeOrders =
    Number(statistics?.acceptedOrders || 0) +
    Number(statistics?.preparingOrders || 0) +
    Number(statistics?.packedOrders || 0) +
    Number(statistics?.outForDeliveryOrders || 0);

  const summaryCards = [
    {
      title: "Delivered Orders",
      value: statistics?.deliveredOrders,
      color: "text-emerald-600",
      background: "bg-emerald-50",
    },
    {
      title: "Out for Delivery",
      value: statistics?.outForDeliveryOrders,
      color: "text-blue-600",
      background: "bg-blue-50",
    },
    {
      title: "Pending Orders",
      value: pendingOrders,
      color: "text-amber-600",
      background: "bg-amber-50",
    },
    {
      title: "Cancelled Orders",
      value: statistics?.cancelledOrders,
      color: "text-red-600",
      background: "bg-red-50",
    },
  ];

  return (
    <div className="w-full min-w-0 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-purple-50 p-3 text-purple-600">
            <ShoppingBag size={23} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-800">
              Order Sales Overview
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Total orders distribution by order status
            </p>
          </div>
        </div>

       
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex h-72 items-center justify-center gap-2 text-slate-500">
          <LoaderCircle size={20} className="animate-spin" />
          <span className="text-sm">Loading order statistics...</span>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="flex min-h-64 flex-col items-center justify-center gap-3 text-center">
          <p className="text-sm text-red-500">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white"
          >
            Retry
          </button>
        </div>
      )}

      {/* Doughnut Chart and Legend */}
      {!loading && !error && statistics && (
        <>
          <div className="mt-3 grid grid-cols-1 items-center gap-3 lg:grid-cols-2">
            {/* Doughnut */}
            <div className="relative mx-auto h-64 w-full max-w-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="label"
                    cx="50%"
                    cy="50%"
                    innerRadius={72}
                    outerRadius={105}
                    paddingAngle={3}
                    stroke="none"
                  >
                    {chartData.map((item) => (
                      <Cell
                        key={item.key}
                        fill={item.color}
                      />
                    ))}
                  </Pie>

                  <Tooltip
                    formatter={(value, name) => [
                      formatNumber(value),
                      name,
                    ]}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #E2E8F0",
                      fontSize: "13px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>

              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-slate-800">
                  {formatNumber(totalOrders)}
                </span>
                <span className="mt-1 text-sm text-slate-500">
                  Total Orders
                </span>
              </div>
            </div>

            {/* Status Legend */}
            <div className="min-w-0 divide-y divide-slate-100 rounded-xl border border-slate-100 px-3 sm:px-4">
              {chartData.map((item) => {
                const percentage =
                  totalOrders > 0
                    ? (item.value / totalOrders) * 100
                    : 0;

                return (
                  <div
                    key={item.key}
                   className="grid grid-cols-[minmax(0,1fr)_48px_64px] items-center gap-2 py-2.5 sm:grid-cols-[minmax(0,1fr)_52px_76px] sm:gap-3"
                  >
                    <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                      <span
                        className="h-3 w-3 shrink-0 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="truncate text-xs font-medium text-slate-700 sm:text-sm">
                        {item.label}
                      </span>
                    </div>

                    <span className="text-right text-xs text-slate-500 sm:text-sm">
                      {percentage.toFixed(1)}%
                    </span>

                    <span
                      className={`rounded-full px-2 py-2 text-center text-xs font-semibold sm:text-sm ${item.bg} ${item.text}`}
                    >
                      {formatNumber(item.value)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Summary Cards */}
          {/* <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {summaryCards.map((card) => (
              <div
                key={card.title}
                className="rounded-xl border border-slate-100 p-4"
              >
                <div className="flex items-center gap-3">
                  <div className={`rounded-full p-3 ${card.background} ${card.color}`}>
                    <ShoppingBag size={19} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-slate-500">
                      {card.title}
                    </p>
                    <p className={`mt-1 text-xl font-bold ${card.color}`}>
                      {formatNumber(card.value)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div> */}

        
        </>
      )}
    </div>
  );
};

export default OrderSalesOverview;
