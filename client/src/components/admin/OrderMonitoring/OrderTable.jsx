
import React, { useMemo, useState } from "react";
import { Search, Eye, Package, RefreshCw } from "lucide-react";

const formatCurrency = (amount) =>
  `₹${Number(amount || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const formatDate = (date) => {
  if (!date) return "—";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "—";

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getOrderStatus = (order) =>
  String(order?.orderStatus || order?.status || "pending")
    .toLowerCase()
    .replace(/[\s_-]/g, "");

const statusStyles = {
  pending: "bg-amber-50 text-amber-700",
  processing: "bg-blue-50 text-blue-700",
  confirmed: "bg-indigo-50 text-indigo-700",
  shipped: "bg-purple-50 text-purple-700",
  outfordelivery: "bg-cyan-50 text-cyan-700",
  delivered: "bg-emerald-50 text-emerald-700",
  completed: "bg-emerald-50 text-emerald-700",
  cancelled: "bg-red-50 text-red-700",
  
  rejected: "bg-red-50 text-red-700",
};

const formatStatus = (status) => {
  if (!status) return "Pending";

  return String(status)
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const OrderTable = ({
  orders = [],
  loading = false,
  error = null,
  onView,
}) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();

    return orders.filter((order) => {
      const orderId = String(order?._id || order?.orderId || "");
      const customerName =
        order?.user?.name ||
        order?.customer?.name ||
        order?.customerName ||
        "";
      const customerEmail =
        order?.user?.email ||
        order?.customer?.email ||
        order?.email ||
        "";

      const matchesSearch =
        !query ||
        orderId.toLowerCase().includes(query) ||
        customerName.toLowerCase().includes(query) ||
        customerEmail.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "all" ||
        getOrderStatus(order) ===
          statusFilter.toLowerCase().replace(/[\s_-]/g, "");

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  return (
    <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-gray-100 p-4 sm:flex-row sm:items-center sm:p-5">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">
            All Orders
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            View and monitor customer orders.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search order or customer..."
              className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 sm:w-64"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-emerald-500"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="outfordelivery">Out for Delivery</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="m-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[950px] text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
            <tr>
              <th className="px-5 py-4 font-semibold">Order ID</th>
              <th className="px-5 py-4 font-semibold">Customer</th>
              <th className="px-5 py-4 font-semibold">Order Date</th>
              <th className="px-5 py-4 font-semibold">Items</th>
              <th className="px-5 py-4 font-semibold">Amount</th>
              <th className="px-5 py-4 font-semibold">Payment</th>
              <th className="px-5 py-4 font-semibold">Status</th>
              <th className="px-5 py-4 text-center font-semibold">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan="8" className="px-5 py-12 text-center">
                  <RefreshCw
                    className="mx-auto animate-spin text-emerald-600"
                    size={24}
                  />
                  <p className="mt-3 text-sm text-gray-500">
                    Loading orders...
                  </p>
                </td>
              </tr>
            ) : filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-5 py-12 text-center">
                  <Package
                    size={36}
                    className="mx-auto text-gray-300"
                  />
                  <p className="mt-3 font-medium text-gray-600">
                    No orders found
                  </p>
                  <p className="mt-1 text-sm text-gray-400">
                    Try changing your search or status filter.
                  </p>
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => {
                const id = order?._id || order?.orderId;
                const rawStatus = getOrderStatus(order);
                const statusClass =
                  statusStyles[rawStatus] ||
                  "bg-gray-100 text-gray-700";

                const customerName =
                  order?.user?.name ||
                  order?.customer?.name ||
                  order?.customerName ||
                  "Unknown Customer";

                const itemCount = Array.isArray(order?.items)
                  ? order.items.reduce(
                      (total, item) =>
                        total + Number(item?.quantity || 1),
                      0
                    )
                  : 0;

                const amount =
                  order?.totalAmount ??
                  order?.total ??
                  order?.grandTotal ??
                  order?.subtotal ??
                  0;

                const paymentStatus =
                  order?.paymentStatus ||
                  order?.payment?.status ||
                  (order?.paymentMethod === "cod"
                    ? "Cash on Delivery"
                    : "—");

                return (
                  <tr
                    key={id}
                    className="transition hover:bg-gray-50"
                  >
                    <td className="px-5 py-4">
                      <span className="font-semibold text-slate-700">
                        #{String(id || "").slice(-8).toUpperCase() || "—"}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <p className="font-medium text-slate-700">
                        {customerName}
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        {order?.user?.email ||
                          order?.customer?.email ||
                          order?.email ||
                          ""}
                      </p>
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-gray-600">
                      {formatDate(
                        order?.createdAt ||
                          order?.orderDate ||
                          order?.date
                      )}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {itemCount}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 font-semibold text-slate-700">
                      {formatCurrency(amount)}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {formatStatus(paymentStatus)}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${statusClass}`}
                      >
                        {formatStatus(
                          order?.orderStatus || order?.status
                        )}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-center">
                      <button
                        type="button"
                        onClick={() => onView?.(order)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 px-3 py-2 text-xs font-medium text-emerald-700 transition hover:bg-emerald-50"
                      >
                        <Eye size={15} />
                        View
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      {!loading && (
        <div className="border-t border-gray-100 px-5 py-4 text-sm text-gray-500">
          Showing{" "}
          <span className="font-semibold text-slate-700">
            {filteredOrders.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-slate-700">
            {orders.length}
          </span>{" "}
          orders
        </div>
      )}
    </section>
  );
};

export default OrderTable;
