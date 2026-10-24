
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { TrendingUp } from "lucide-react";

import { getRevenueReport } from "../../../redux/slices/adminRevenueSlice";

const formatCurrency = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN")}`;

const RevenueChart = () => {
  const dispatch = useDispatch();

  const [period, setPeriod] = useState("Monthly");

  const {
    report,
    loading,
    error,
  } = useSelector((state) => state.adminRevenue);

  // Fetch revenue report whenever the selected period changes
  useEffect(() => {
    dispatch(getRevenueReport(period));
  }, [dispatch, period]);

  const chartData = report?.revenueTrend || [];

  const handlePeriodChange = (event) => {
    setPeriod(event.target.value);
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
      {/* Header */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">
            Revenue Trend
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Revenue performance over time
          </p>
        </div>

        <select
          value={period}
          onChange={handlePeriodChange}
          disabled={loading}
          className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
        </select>
      </div>

      {/* Chart */}
      <div className="h-[280px] w-full sm:h-[320px]">
        {loading ? (
          <div className="flex h-full flex-col items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
            <p className="mt-3 text-sm text-gray-500">
              Loading revenue data...
            </p>
          </div>
        ) : error ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <p className="text-sm font-medium text-red-500">
              Failed to load revenue data
            </p>
            <p className="mt-1 text-sm text-gray-500">
              {error}
            </p>

            <button
              type="button"
              onClick={() => dispatch(getRevenueReport(period))}
              className="mt-3 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
            >
              Retry
            </button>
          </div>
        ) : chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 10,
                right: 12,
                left: 8,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#E5E7EB"
              />

              <XAxis
                dataKey="label"
                tick={{ fontSize: 12, fill: "#64748B" }}
                axisLine={false}
                tickLine={false}
                tickMargin={10}
              />

              <YAxis
                tickFormatter={(value) =>
                  value >= 1000
                    ? `₹${Number(value / 1000).toLocaleString("en-IN")}k`
                    : `₹${Number(value).toLocaleString("en-IN")}`
                }
                tick={{ fontSize: 11, fill: "#64748B" }}
                axisLine={false}
                tickLine={false}
                width={60}
              />

              <Tooltip
                formatter={(value) => [
                  formatCurrency(value),
                  "Revenue",
                ]}
                contentStyle={{
                  borderRadius: "10px",
                  border: "1px solid #E5E7EB",
                  fontSize: "13px",
                }}
                labelStyle={{
                  color: "#334155",
                  fontWeight: 600,
                }}
              />

              <Line
                type="monotone"
                dataKey="revenue"
                name="Revenue"
                stroke="#10B981"
                strokeWidth={2.5}
                dot={false}
                activeDot={{
                  r: 5,
                  fill: "#10B981",
                  stroke: "#FFFFFF",
                  strokeWidth: 2,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-gray-400">
            <TrendingUp size={32} />

            <p className="mt-2 text-sm font-medium">
              No revenue data available
            </p>

            <p className="mt-1 text-xs">
              No data found for the selected period.
            </p>
          </div>
        )}
      </div>

      <p className="mt-3 text-xs text-gray-400">
        Showing backend revenue data for the {period.toLowerCase()} period.
      </p>
    </div>
  );
};

export default RevenueChart;
