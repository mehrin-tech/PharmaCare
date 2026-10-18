import { Search, RefreshCw } from "lucide-react";

const tabs = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Accepted", value: "accepted" },
  { label: "Preparing", value: "preparing" },
  { label: "Ready for Delivery", value: "packed" },
  { label: "Out For Delivery", value: "out_for_delivery" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
];

const OrderFilters = ({
  search,
  onSearchChange,
  activeTab,
  onTabChange,
  orders = [],
  paymentFilter,
  onPaymentFilterChange,
  dateFilter,
  onDateFilterChange,
  onRefresh,
  loading,
}) => {
  const counts = {
    all: orders.length,
    pending: orders.filter((o) => o.orderStatus === "pending").length,
    accepted: orders.filter((o) => o.orderStatus === "accepted").length,
    preparing: orders.filter((o) => o.orderStatus === "preparing").length,
    packed: orders.filter((o) => o.orderStatus === "packed").length,
    out_for_delivery: orders.filter(
      (o) => o.orderStatus === "out_for_delivery"
    ).length,
    delivered: orders.filter((o) => o.orderStatus === "delivered").length,
    cancelled: orders.filter((o) => o.orderStatus === "cancelled").length,
  };

  return (
    <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-4">
      {/* Search and filters */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search order ID or customer..."
            className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-emerald-500"
          />
        </div>

        <select
          value={paymentFilter}
          onChange={(e) => onPaymentFilterChange(e.target.value)}
          className="rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-emerald-500"
        >
          <option value="all">All Payments</option>
          <option value="paid">Paid</option>
          <option value="pending">Payment Pending</option>
          <option value="failed">Failed</option>
        </select>

     

        <button
          type="button"
          onClick={onRefresh}
          disabled={loading}
          className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
        >
          <RefreshCw
            size={16}
            className={loading ? "animate-spin" : ""}
          />
          Refresh
        </button>
      </div>

      {/* Status tabs */}
      <div className="flex gap-5 overflow-x-auto border-b border-gray-100">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => onTabChange(tab.value)}
            className={`shrink-0 border-b-2 px-1 py-3 text-sm transition ${
              activeTab === tab.value
                ? "border-emerald-600 font-semibold text-emerald-700"
                : "border-transparent text-gray-500 hover:text-gray-900"
            }`}
          >
            {tab.label}
            <span className="ml-1 text-xs text-gray-400">
              {counts[tab.value]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default OrderFilters;