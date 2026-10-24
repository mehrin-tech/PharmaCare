
import React from "react";
import { useSelector } from "react-redux";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import { CreditCard } from "lucide-react";

const STATUS_COLORS = {
  paid: "#10B981",
  pending: "#F59E0B",
  failed: "#EF4444",
};

const formatStatus = (status) =>
  status.charAt(0).toUpperCase() + status.slice(1);

const PaymentDonut = ({ title, counts }) => {
  const data = [
    { name: "Paid", value: counts?.paid || 0, key: "paid" },
    { name: "Pending", value: counts?.pending || 0, key: "pending" },
    { name: "Failed", value: counts?.failed || 0, key: "failed" },
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="rounded-xl border border-gray-100 p-4">
      <h3 className="text-sm font-semibold text-slate-800">{title}</h3>

      <div className="relative mt-3 h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={54}
              outerRadius={76}
              paddingAngle={total > 0 ? 3 : 0}
              stroke="none"
            >
              {data.map((item) => (
                <Cell
                  key={item.key}
                  fill={STATUS_COLORS[item.key]}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value, name) => [value, name]}
              contentStyle={{
                borderRadius: "10px",
                border: "1px solid #E5E7EB",
                fontSize: "12px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-slate-800">
            {total}
          </span>
          <span className="text-xs text-gray-500">Payments</span>
        </div>
      </div>

      <div className="mt-2 space-y-2">
        {data.map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between text-sm"
          >
            <div className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: STATUS_COLORS[item.key] }}
              />
              <span className="text-gray-600">
                {formatStatus(item.key)}
              </span>
            </div>

            <span className="font-semibold text-slate-800">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const RevenuePaymentMethod = () => {
  const { report, loading, error } = useSelector(
    (state) => state.adminRevenue
  );

  const paymentCounts = report?.paymentMethodCounts || {
    upi: { paid: 0, pending: 0, failed: 0 },
    cod: { paid: 0, pending: 0, failed: 0 },
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-lg bg-emerald-50 p-2">
          <CreditCard className="text-emerald-600" size={22} />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-800">
            Payment Overview
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Payment status counts by method
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex h-48 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
        </div>
      ) : error ? (
        <div className="flex h-48 items-center justify-center text-sm text-red-500">
          {error}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <PaymentDonut
            title="Online Payment (UPI / Razorpay)"
            counts={paymentCounts.upi}
          />

          <PaymentDonut
            title="Cash on Delivery (COD)"
            counts={paymentCounts.cod}
          />
        </div>
      )}

      <div className="mt-5 flex flex-wrap justify-center gap-4 border-t border-gray-100 pt-4">
        {Object.entries(STATUS_COLORS).map(([status, color]) => (
          <div key={status} className="flex items-center gap-2 text-xs text-gray-600">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: color }}
            />
            {formatStatus(status)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RevenuePaymentMethod;
