
import React, { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { TrendingUp } from "lucide-react";

const sampleData = {
  Daily: [
    { date: "Mon", sales: 1200 },
    { date: "Tue", sales: 1800 },
    { date: "Wed", sales: 1500 },
    { date: "Thu", sales: 2600 },
    { date: "Fri", sales: 2200 },
    { date: "Sat", sales: 3400 },
    { date: "Sun", sales: 4200 },
  ],
  Weekly: [
    { date: "Week 1", sales: 8500 },
    { date: "Week 2", sales: 11200 },
    { date: "Week 3", sales: 9800 },
    { date: "Week 4", sales: 14500 },
  ],
  Monthly: [
    { date: "May", sales: 18000 },
    { date: "Jun", sales: 22500 },
    { date: "Jul", sales: 19500 },
    { date: "Aug", sales: 28000 },
    { date: "Sep", sales: 32000 },
    { date: "Oct", sales: 36500 },
  ],
};

const currency = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN")}`;

const SalesOverview = ({
  salesTrend,
  loading = false,
}) => {
  const [period, setPeriod] = useState("Weekly");

  const data = useMemo(
    () => salesTrend?.[period] ?? sampleData[period],
    [salesTrend, period]
  );

  const totalSales = data.reduce(
    (total, item) => total + Number(item.sales || 0),
    0
  );

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900">
            <TrendingUp size={20} className="text-emerald-600" />
            Sales Overview
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Track your pharmacy revenue over time
          </p>
        </div>

        <div className="flex rounded-lg bg-gray-100 p-1">
          {["Daily", "Weekly", "Monthly"].map((item) => (
            <button
              key={item}
              onClick={() => setPeriod(item)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                period === item
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-500">
          {period} Sales
        </p>
        <p className="mt-1 text-2xl font-bold text-emerald-600">
          {currency(totalSales)}
        </p>
      </div>

      <div className="h-64 w-full">
        {loading ? (
          <div className="h-full animate-pulse rounded-lg bg-gray-100" />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="salesGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#10b981"
                    stopOpacity={0.25}
                  />
                  <stop
                    offset="95%"
                    stopColor="#10b981"
                    stopOpacity={0.02}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e5e7eb"
              />

              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: "#6b7280" }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tickFormatter={(value) =>
                  value >= 1000
                    ? `₹${value / 1000}k`
                    : `₹${value}`
                }
                tick={{ fontSize: 11, fill: "#6b7280" }}
                axisLine={false}
                tickLine={false}
                width={55}
              />

              <Tooltip
                formatter={(value) => [currency(value), "Sales"]}
                contentStyle={{
                  borderRadius: 10,
                  border: "1px solid #e5e7eb",
                  fontSize: 12,
                }}
              />

              <Area
                type="monotone"
                dataKey="sales"
                stroke="#059669"
                strokeWidth={2.5}
                fill="url(#salesGradient)"
                activeDot={{ r: 5 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  );
};

export default SalesOverview;
