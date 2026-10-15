import React from "react";

const OrderTabs = ({ activeTab, setActiveTab }) => {

  const tabs = [
    {
      id: "all",
      label: "All Orders",
    },
    {
      id: "processing",
      label: "Processing",
    },
    {
      id: "shipping",
      label: "Shipping",
    },
    {
      id: "delivered",
      label: "Delivered",
    },
    {
      id: "cancelled",
      label: "Cancelled",
    },
  ];

  return (
    <div className="mb-4 overflow-x-auto">

      <div className="flex min-w-max border-b border-gray-200">

        {tabs.map((tab) => {

          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-4 py-3 text-xs font-medium transition ${
                isActive
                  ? "text-[#0F9D74]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >

              {tab.label}

              {isActive && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-[#0F9D74]" />
              )}

            </button>
          );

        })}

      </div>

    </div>
  );
};

export default OrderTabs;