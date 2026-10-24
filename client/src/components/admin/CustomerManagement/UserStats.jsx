
import { useSelector } from "react-redux";
import {
  Users,
  UserRound,
  Store,
  ShieldCheck,
} from "lucide-react";

const UserStats = () => {
  const {
    customers = [],
    loading = false,
    error = null,
  } = useSelector((state) => state.adminUsers || {});

  const totalCustomers = customers.length;
console.log("Redux customers:", customers);
console.log("Customer count:", customers.length);
 const {
    allPharmacies = [],
    allPharmaciesLoading = false,
    allPharmaciesError = null,
  } = useSelector((state) => state.pharmacy || {});

  const totalPharmacies=allPharmacies.length
  const stats = [
    {
      title: "Total Users",
      value: totalCustomers,
      description: "Registered customers",
      icon: Users,
      iconStyle: "bg-emerald-100 text-emerald-600",
    },
    {
      title: "Customers",
      value: totalCustomers,
      description: "Customer accounts",
      icon: UserRound,
      iconStyle: "bg-blue-100 text-blue-600",
    },
    // {
    //   title: "Pharmacies",
    //   value: totalPharmacies,
    //   description: "Pharmacy accounts",
    //   icon: Store,
    //   iconStyle: "bg-orange-100 text-orange-600",
    // },
    {
      title: "Admins",
      value: "1",
      description: "Admin accounts",
      icon: ShieldCheck,
      iconStyle: "bg-purple-100 text-purple-600",
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="animate-pulse rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
          >
            <div className="h-4 w-28 rounded bg-gray-200" />
            <div className="mt-5 h-8 w-16 rounded bg-gray-200" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
        Failed to load user statistics: {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>

                <h2 className="mt-3 text-2xl font-bold text-slate-800">
                  {stat.value}
                </h2>
              </div>

              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${stat.iconStyle}`}
              >
                <Icon size={22} strokeWidth={1.8} />
              </div>
            </div>

            <p className="mt-4 text-xs text-gray-400">
              {stat.description}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default UserStats;
