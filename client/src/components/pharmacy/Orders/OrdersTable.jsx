
import {
  Eye,
  Check,
  X,
  Play,
  PackageCheck,
  Truck,
  Banknote,
  LoaderCircle,
} from "lucide-react";

const statusLabels = {
  pending: "Pending",
  accepted: "Accepted",
  preparing: "Preparing",
  packed: "Packed",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const statusStyles = {
  pending: "bg-amber-50 text-amber-700",
  accepted: "bg-emerald-50 text-emerald-700",
  preparing: "bg-violet-50 text-violet-700",
  packed: "bg-blue-50 text-blue-700",
  out_for_delivery: "bg-indigo-50 text-indigo-700",
  delivered: "bg-green-50 text-green-700",
  cancelled: "bg-red-50 text-red-700",
};

const formatDate = (date) => {
  if (!date) return "—";

  return new Date(date).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const OrdersTable = ({
  orders = [],
  loading = false,
  actionLoading = false,
  onView,
  onUpdateStatus,
  onConfirmCashReceived,
}) => {
  const getAction = (order) => {
    switch (order.orderStatus) {
      case "pending":
        return (
          <>
            <button
              type="button"
              disabled={actionLoading}
              onClick={() => onUpdateStatus?.(order._id, "accepted")}
              className="rounded-md bg-emerald-50 px-2.5 py-1.5 text-xs font-medium text-emerald-700 hover:bg-emerald-100 disabled:opacity-50"
            >
              <Check size={13} className="mr-1 inline" />
              Accept
            </button>

            <button
              type="button"
              disabled={actionLoading}
              onClick={() => onUpdateStatus?.(order._id, "cancelled")}
              className="rounded-md bg-red-50 px-2.5 py-1.5 text-xs font-medium text-red-700 hover:bg-red-100 disabled:opacity-50"
            >
              <X size={13} className="mr-1 inline" />
              Reject
            </button>
          </>
        );

      case "accepted":
        return (
          <button
            type="button"
            disabled={actionLoading}
            onClick={() => onUpdateStatus?.(order._id, "preparing")}
            className="rounded-md bg-violet-50 px-2.5 py-1.5 text-xs font-medium text-violet-700 hover:bg-violet-100 disabled:opacity-50"
          >
            <Play size={13} className="mr-1 inline" />
            Start Processing
          </button>
        );

      case "preparing":
        return (
          <button
            type="button"
            disabled={actionLoading}
            onClick={() => onUpdateStatus?.(order._id, "packed")}
            className="rounded-md bg-blue-50 px-2.5 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100 disabled:opacity-50"
          >
            <PackageCheck size={13} className="mr-1 inline" />
            Mark Ready
          </button>
        );

      case "packed":
        return (
          <button
            type="button"
            disabled={actionLoading}
            onClick={() =>
              onUpdateStatus?.(order._id, "out_for_delivery")
            }
            className="rounded-md bg-indigo-50 px-2.5 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-100 disabled:opacity-50"
          >
            <Truck size={13} className="mr-1 inline" />
            Ship Order
          </button>
        );

      case "out_for_delivery":
        return (
          <button
            type="button"
            disabled={actionLoading}
            onClick={() => onUpdateStatus?.(order._id, "delivered")}
            className="rounded-md bg-green-50 px-2.5 py-1.5 text-xs font-medium text-green-700 hover:bg-green-100 disabled:opacity-50"
          >
            <PackageCheck size={13} className="mr-1 inline" />
            Mark Delivered
          </button>
        );

      case "delivered":
        if (
          order.paymentMethod === "cod" &&
          order.paymentStatus !== "paid"
        ) {
          return (
            <button
              type="button"
              disabled={actionLoading || !onConfirmCashReceived}
              onClick={() => onConfirmCashReceived?.(order._id)}
              className="whitespace-nowrap rounded-md bg-emerald-600 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Banknote size={13} className="mr-1 inline" />
              Confirm Cash Received
            </button>
          );
        }

        return (
          <span className="text-xs text-gray-400">
            {order.paymentStatus === "paid"
              ? "Payment completed"
              : "No action"}
          </span>
        );

      case "cancelled":
        return (
          <span className="text-xs text-gray-400">
            Order cancelled
          </span>
        );

      default:
        return (
          <span className="text-xs text-gray-400">
            No action
          </span>
        );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center rounded-xl border bg-white py-16 text-gray-500">
        <LoaderCircle size={20} className="mr-2 animate-spin" />
        Loading orders...
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="border-b p-5">
        <h2 className="font-semibold text-gray-900">Orders</h2>
        <p className="mt-1 text-sm text-gray-500">
          View orders, update delivery status, and confirm COD payments.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px] text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-4">Order ID</th>
              <th className="px-4 py-4">Customer</th>
              <th className="px-4 py-4">Items</th>
              <th className="px-4 py-4">Amount</th>
              <th className="px-4 py-4">Payment</th>
              <th className="px-4 py-4">Order Date</th>
              <th className="px-4 py-4">Status</th>
              <th className="px-4 py-4">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {orders.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-16 text-center text-gray-500"
                >
                  <PackageCheck
                    size={34}
                    className="mx-auto mb-3 text-gray-300"
                  />
                  <p className="font-medium">No orders found</p>
                  <p className="mt-1 text-xs">
                    Orders matching your filters will appear here.
                  </p>
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 font-medium text-gray-800">
                    {order.orderNumber ||
                      (order._id
                        ? order._id.slice(-8).toUpperCase()
                        : "—")}
                  </td>

                  <td className="px-4 py-4">
                    <p className="font-medium text-gray-800">
                      {order.user?.name || "Customer"}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {order.user?.email || order.user?.phone || "—"}
                    </p>
                  </td>

                  <td className="px-4 py-4">
                    <p className="font-medium">
                      {order.items?.length || 0} item(s)
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {order.items
                        ?.map((item) => item.name)
                        .filter(Boolean)
                        .slice(0, 2)
                        .join(", ")}
                    </p>
                  </td>

                  <td className="px-4 py-4 font-medium">
                    ₹{Number(order.totalAmount || 0).toFixed(2)}
                  </td>

                  <td className="px-4 py-4">
                    <p
                      className={
                        order.paymentStatus === "paid"
                          ? "font-medium text-emerald-600"
                          : order.paymentStatus === "failed"
                          ? "font-medium text-red-600"
                          : "font-medium text-amber-600"
                      }
                    >
                      {(order.paymentStatus || "pending")
                        .replaceAll("_", " ")
                        .toUpperCase()}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {(order.paymentMethod || "unknown")
                        .toUpperCase()}
                    </p>
                  </td>

                  <td className="px-4 py-4 text-gray-600">
                    {formatDate(order.createdAt)}
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${
                        statusStyles[order.orderStatus] ||
                        "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {statusLabels[order.orderStatus] ||
                        order.orderStatus ||
                        "Unknown"}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex min-w-[190px] flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onView?.(order)}
                        className="rounded-md border border-gray-200 p-2 text-gray-600 hover:bg-gray-100"
                        title="View order"
                        aria-label="View order"
                      >
                        <Eye size={15} />
                      </button>

                      {getAction(order)}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;
