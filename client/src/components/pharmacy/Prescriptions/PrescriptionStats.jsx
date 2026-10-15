
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

const PrescriptionStats = ({ prescriptions = [] }) => {
  const stats = [
    {
      label: "Total Prescriptions",
      count: prescriptions.length,
      icon: FileText,
      iconStyle: "bg-blue-50 text-blue-600",
    },
    {
      label: "Pending Review",
      count: prescriptions.filter(
        (item) => item.status === "pending"
      ).length,
      icon: Clock,
      iconStyle: "bg-amber-50 text-amber-600",
    },
    {
      label: "Approved",
      count: prescriptions.filter(
        (item) => item.status === "approved"
      ).length,
      icon: CheckCircle,
      iconStyle: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Rejected",
      count: prescriptions.filter(
        (item) => item.status === "rejected"
      ).length,
      icon: XCircle,
      iconStyle: "bg-red-50 text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-gray-500">
                {stat.label}
              </p>

              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${stat.iconStyle}`}
              >
                <Icon size={21} strokeWidth={1.8} />
              </div>
            </div>

            <p className="mt-4 text-3xl font-bold text-gray-900">
              {stat.count}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default PrescriptionStats;
