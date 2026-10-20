
import React from "react";

const tabs = [
  { label: "All Pharmacies", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
];

const PharmacyTabs = ({
  activeTab = "all",
  onTabChange,
  counts = {},
}) => {
  return (
    <div className="flex gap-6 overflow-x-auto border-b border-gray-200">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.value;
        const count = counts[tab.value];

        return (
          <button
            key={tab.value}
            type="button"
            onClick={() => onTabChange?.(tab.value)}
            className={`flex shrink-0 items-center gap-2 border-b-2 px-1 py-4 text-sm font-medium transition ${
              isActive
                ? "border-emerald-600 text-emerald-700"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-800"
            }`}
          >
            <span>{tab.label}</span>

            {typeof count === "number" && (
              <span
                className={`rounded-full px-2 py-0.5 text-xs ${
                  isActive
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default PharmacyTabs;
