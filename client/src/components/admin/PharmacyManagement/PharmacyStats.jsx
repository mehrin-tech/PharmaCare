
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  Building2,
  Clock,
  CheckCircle2,
  XCircle,
  Ban,
} from "lucide-react";

const PharmacyStats = () => {
  const {
    allPharmacies = [],
    allPharmaciesLoading = false,
    allPharmaciesError = null,
  } = useSelector((state) => state.pharmacy || {});

  const stats = useMemo(() => {
    const total = allPharmacies.length;

    const pending = allPharmacies.filter(
      (pharmacy) => pharmacy.approvalStatus === "pending"
    ).length;

    const approved = allPharmacies.filter(
      (pharmacy) => pharmacy.approvalStatus === "approved"
    ).length;

    const rejected = allPharmacies.filter(
      (pharmacy) => pharmacy.approvalStatus === "rejected"
    ).length;

   

    return [
      {
        title: "Total Pharmacies",
        value: total,
        description: "All registered pharmacies",
        icon: Building2,
        color: "blue",
      },
      {
        title: "Pending Approvals",
        value: pending,
        description: "Awaiting admin review",
        icon: Clock,
        color: "amber",
      },
      {
        title: "Approved Pharmacies",
        value: approved,
        description: "Approved registrations",
        icon: CheckCircle2,
        color: "green",
      },
      {
        title: "Rejected Pharmacies",
        value: rejected,
        description: "Rejected registrations",
        icon: XCircle,
        color: "red",
      }
    ];
  }, [allPharmacies]);

  const colorStyles = {
    blue: {
      icon: "bg-blue-50 text-blue-600",
      value: "text-blue-700",
    },
    amber: {
      icon: "bg-amber-50 text-amber-600",
      value: "text-amber-700",
    },
    green: {
      icon: "bg-emerald-50 text-emerald-600",
      value: "text-emerald-700",
    },
    red: {
      icon: "bg-red-50 text-red-600",
      value: "text-red-700",
    },
    gray: {
      icon: "bg-gray-100 text-gray-600",
      value: "text-gray-700",
    },
  };

  if (allPharmaciesLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="h-32 animate-pulse rounded-xl border border-gray-100 bg-white"
          />
        ))}
      </div>
    );
  }

  if (allPharmaciesError) {
    return (
      <p className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
        Failed to load pharmacy statistics:{" "}
        {String(allPharmaciesError)}
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {stats.map((stat) => {
        const Icon = stat.icon;
        const styles = colorStyles[stat.color];

        return (
          <div
            key={stat.title}
            className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>

                <p
                  className={`mt-3 text-3xl font-bold ${styles.value}`}
                >
                  {stat.value}
                </p>
              </div>

              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${styles.icon}`}
              >
                <Icon size={21} />
              </div>
            </div>

            <p className="mt-4 text-xs text-gray-500">
              {stat.description}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default PharmacyStats;
