
import React from "react";

const NewOrders = ({
  orders = [],
  loading = false,
  onViewAll,
  onAccept,
}) => {
  const today = new Date();

  const todayOrders = orders
  .filter((order) => {
    if (!order.createdAt) return false;

    const orderDate = new Date(order.createdAt);

    return (
      !Number.isNaN(orderDate.getTime()) &&
      orderDate.toDateString() === today.toDateString()
    );
  })
  .filter((order) =>
    ["pending", "confirmed"].includes(
      order.orderStatus?.toLowerCase()
    )
  )
  .sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  )
  .slice(0, 4);

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-bold text-gray-900">
          New Orders (Today)
        </h2>

        <button
          type="button"
          onClick={onViewAll}
          className="text-xs font-semibold text-emerald-600 hover:text-emerald-700"
        >
          View All Orders →
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-16 animate-pulse rounded-lg bg-gray-100"
            />
          ))}
        </div>
      ) : todayOrders.length === 0 ? (
        <p className="py-8 text-center text-sm text-gray-500">
          No new orders today
        </p>
      ) : (
        <div className="space-y-3">
          {todayOrders.map((order) => (
            <div
              key={order._id}
              className="flex items-center justify-between gap-3 border-b border-gray-100 pb-3 last:border-0"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <span className="text-lg">▣</span>
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-gray-800">
                    {order.orderNumber || `#${order._id?.slice(-6)}`}
                  </p>

                  <p className="truncate text-xs text-gray-500">
                    {order.user?.name || "Customer"}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {new Date(order.createdAt).toLocaleTimeString(
                      "en-IN",
                      { hour: "2-digit", minute: "2-digit" }
                    )}
                    {" · "}
                    ₹{Number(order.totalAmount || 0).toLocaleString("en-IN")}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onAccept?.(order)}
                className="shrink-0 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-700"
              >
                View
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default NewOrders;
