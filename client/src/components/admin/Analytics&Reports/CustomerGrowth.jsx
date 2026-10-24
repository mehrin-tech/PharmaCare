
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { getAdminAnalytics } from "../../../redux/slices/adminAnalyticsSlice";

const CustomerGrowth = () => {
  const dispatch = useDispatch();
  const [period, setPeriod] = useState("Monthly");

  const { analytics, loading, error } = useSelector(
    (state) => state.adminAnalytics
  );

  const customerGrowth = analytics?.customerGrowth || [];

  useEffect(() => {
    dispatch(getAdminAnalytics(period));
  }, [dispatch, period]);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Customer Growth
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Track newly registered customers
          </p>
        </div>

        {/* Period Filter */}
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500"
        >
         
          <option value="Monthly">Monthly</option>
        </select>
      </div>

      {/* Chart */}
      {loading ? (
        <div className="flex h-72 items-center justify-center">
          <p className="text-sm text-gray-500">
            Loading customer growth...
          </p>
        </div>
      ) : error ? (
        <div className="flex h-72 items-center justify-center">
          <p className="text-sm text-red-500">{error}</p>
        </div>
      ) : customerGrowth.length === 0 ? (
        <div className="flex h-72 items-center justify-center">
          <p className="text-sm text-gray-500">
            No customer growth data available.
          </p>
        </div>
      ) : (
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={customerGrowth}
              margin={{ top: 10, right: 10, left: -15, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#E5E7EB"
              />

              <XAxis
                dataKey="label"
                tick={{ fontSize: 12, fill: "#6B7280" }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                allowDecimals={false}
                tick={{ fontSize: 12, fill: "#6B7280" }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                cursor={{ fill: "#D1FAE5", opacity: 0.4 }}
                contentStyle={{
                  borderRadius: "10px",
                  border: "1px solid #E5E7EB",
                  fontSize: "13px",
                }}
                formatter={(value) => [value, "New Customers"]}
                labelFormatter={(label) => `Period: ${label}`}
              />

              <Bar
                dataKey="customers"
                name="New Customers"
                fill="#10B981"
                radius={[6, 6, 0, 0]}
                maxBarSize={45}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Total Customers */}
      <div className="mt-5 border-t border-gray-100 pt-4">
        <p className="text-sm text-gray-500">
          Total registered customers
        </p>
        <p className="mt-1 text-2xl font-bold text-gray-800">
          {(analytics?.customers?.total || 0).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default CustomerGrowth;
