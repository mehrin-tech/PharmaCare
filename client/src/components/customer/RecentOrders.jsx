import { Link } from "react-router-dom";
import { Package } from "lucide-react";

export default function RecentOrders({ orders = [] }) {
  const recentOrders = orders.slice(0, 3);

  const getStatusStyle = (status) => {
    if (status === "delivered") {
      return "bg-[#E8F8F2] text-[#0F9D74]";
    }

    if (status === "cancelled") {
      return "bg-red-50 text-red-500";
    }

    return "bg-orange-50 text-orange-500";
  };

  return (
    <section className="w-full bg-white rounded-xl border border-gray-100 p-3">

      {/* Header */}
      <div className="flex items-center justify-between mb-3">

        <h2 className="text-[13px] font-bold text-[#102A43]">
          Recent Orders
        </h2>

        <Link
          to="/orders"
          className="text-[8px] text-[#0F9D74] font-medium hover:underline"
        >
          View All
        </Link>

      </div>

      {/* Orders */}
      <div className="space-y-2">

        {recentOrders.length > 0 ? (
          recentOrders.map((order) => {

            const medicine = order.items?.[0];

            return (
              <Link
                key={order._id}
                to={`/orders/${order._id}`}
                className="
                  flex
                  items-center
                  justify-between
                  gap-2
                  bg-white
                  border border-gray-100
                  rounded-lg
                  shadow-sm
                  p-2
                  hover:shadow-md
                  transition
                "
              >

                {/* Left */}
                <div className="flex items-center gap-2 min-w-0">

                  <div className="w-[32px] h-[32px] rounded-lg bg-[#E8F8F2] flex items-center justify-center shrink-0">
                    <Package
                      size={15}
                      className="text-[#0F9D74]"
                    />
                  </div>

                  <div className="min-w-0">

                    <h3 className="text-[8px] font-medium text-[#102A43] truncate">
                      {medicine?.name || "Medicine Order"}
                    </h3>

                    <p className="text-[7px] text-gray-400 mt-1">
                      #ORD{order._id?.slice(-4).toUpperCase()}
                    </p>

                    <p className="text-[6px] text-gray-400 mt-0.5">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString()
                        : ""}
                    </p>

                  </div>

                </div>

                {/* Status */}
                <span
                  className={`
                    px-2
                    py-1
                    rounded-full
                    text-[6px]
                    font-medium
                    whitespace-nowrap
                    ${getStatusStyle(order.orderStatus)}
                  `}
                >
                  {order.orderStatus
                    ?.replaceAll("_", " ")
                    .replace(/\b\w/g, (letter) =>
                      letter.toUpperCase()
                    )}
                </span>

              </Link>
            );
          })
        ) : (
          <div className="h-[120px] flex items-center justify-center">
            <p className="text-[8px] text-gray-400">
              No recent orders
            </p>
          </div>
        )}

      </div>

    </section>
  );
}