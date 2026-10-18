import {
  ClipboardList,
  Clock,
  CheckCircle,
  Package,
  Truck,
  XCircle,
} from "lucide-react";

const OrderStats = ({ orders = [] }) => {
  const stats = [
    {
      label: "Total Orders",
      value: orders.length,
      icon: ClipboardList,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Pending",
      value: orders.filter(
        (order) => order.orderStatus === "pending"
      ).length,
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "Accepted",
      value: orders.filter(
        (order) => order.orderStatus === "accepted"
      ).length,
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "Processing",
      value: orders.filter(
        (order) =>
          ["preparing", "packed"].includes(order.orderStatus)
      ).length,
      icon: Package,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      label: "Out for Delivery",
      value: orders.filter(
        (order) => order.orderStatus === "out_for_delivery"
      ).length,
      icon: Truck,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      label: "Cancelled",
      value: orders.filter(
        (order) => order.orderStatus === "cancelled"
      ).length,
      icon: XCircle,
      color: "text-red-600",
      bg: "bg-red-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                {stat.label}
              </p>

              <div className={`rounded-lg p-3 ${stat.bg}`}>
                <Icon size={21} className={stat.color} />
              </div>
            </div>

            <p className="mt-4 text-2xl font-bold text-gray-900">
              {stat.value}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default OrderStats;