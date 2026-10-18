
import React from "react";
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

const SaleOverview = ({ report = {}, loading = false }) => {
  // Backend must return date-wise salesTrend data for a real trend graph.
  const salesTrend = report.salesTrend || [];

  const currency = (value = 0) =>
    `₹${Number(value || 0).toLocaleString("en-IN")}`;

  if (loading) {
    return (
      <section className="rounded-xl border bg-white p-5">
        <div className="mb-5 h-6 w-40 animate-pulse rounded bg-gray-200" />
        <div className="h-72 animate-pulse rounded-lg bg-gray-100" />
      </section>
    );
  }

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="text-emerald-600" size={21} />
            <h2 className="text-lg font-bold text-gray-900">
              Sales Overview
            </h2>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Track your pharmacy revenue over time
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm text-gray-500">Total Sales</p>
          <p className="text-xl font-bold text-emerald-600">
            {currency(report.totalSales)}
          </p>
        </div>
      </div>

      {salesTrend.length > 0 ? (
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={salesTrend}
              margin={{ top: 10, right: 15, left: 5, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tickFormatter={(value) => `₹${value}`}
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                width={65}
              />
              <Tooltip
                formatter={(value) => [currency(value), "Sales"]}
                contentStyle={{
                  borderRadius: "10px",
                  border: "1px solid #e5e7eb",
                }}
              />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#059669"
                strokeWidth={3}
                dot={{ r: 3, fill: "#059669" }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex min-h-64 flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 text-center">
          <TrendingUp size={34} className="mb-3 text-emerald-600" />
          <p className="font-medium text-gray-800">
            Sales trend will appear here
          </p>
          <p className="mt-1 max-w-sm text-sm text-gray-500">
            The backend currently returns total, today, and monthly sales.
            Add date-wise salesTrend data to display the graph.
          </p>
        </div>
      )}

      <div className="mt-5 grid grid-cols-1 gap-3 border-t pt-4 sm:grid-cols-2">
        <div>
          <p className="text-sm text-gray-500">Today's Sales</p>
          <p className="mt-1 text-lg font-semibold text-gray-900">
            {currency(report.todaySales)}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">This Month</p>
          <p className="mt-1 text-lg font-semibold text-gray-900">
            {currency(report.monthlySales)}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SaleOverview;
