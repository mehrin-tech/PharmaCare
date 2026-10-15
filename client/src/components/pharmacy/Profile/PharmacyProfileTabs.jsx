import React from 'react'
import { useState } from 'react';
import { Store, MapPin, ShieldCheck } from "lucide-react";

const tabs = [
  {
    id: "info",
    label: "Pharmacy Info",
    icon: Store,
  },
  {
    id: "address",
    label: "Business Address",
    icon: MapPin,
  },
  {
    id: "verification",
    label: "License & Verification",
    icon: ShieldCheck,
  },
];
const PharmacyProfileTabs = ({activeTab,onTabChange}) => {
    const [selectedTab,setSelectedTab]=useState('info')
    const currentTab=activeTab??selectedTab
    const handleTabChange=(tabId)=>{
        setSelectedTab(tabId)
        onTabChange?.(tabId)
    }

  return (
    <div className="overflow-x-auto border-b border-gray-200">
      <div className="flex min-w-max gap-6 sm:gap-8">
        {tabs.map(({ id, label, icon: Icon }) => {
          const isActive = currentTab === id;

          return (
            <button
              key={id}
              type="button"
              onClick={() => handleTabChange(id)}
              className={`flex items-center gap-2 border-b-2 px-1 py-4 text-sm font-medium transition ${
                isActive
                  ? "border-emerald-500 text-emerald-600"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              <Icon size={17} />
              {label}
            </button>
          );
        })}
      </div>
    </div>
  )
}

export default PharmacyProfileTabs
