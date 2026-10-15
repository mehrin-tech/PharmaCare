import React, { useState } from "react";

const MedicineDescriptionTabs = ({ medicine }) => {

  const [activeTab, setActiveTab] =
    useState("Description");

  const tabs = [
    "Description",
    "Dosage",
    "Uses",
    "Side Effects",
    "Storage",
    "Precautions",
    "Reviews",
  ];

  const renderContent = () => {

    switch (activeTab) {

      case "Description":
        return (
          <div className="text-sm text-gray-600 leading-6">
            {medicine?.description ||
              `${medicine?.name || "This medicine"} is used for healthcare purposes. Please use this medicine according to the instructions provided by a healthcare professional.`}
          </div>
        );

      case "Dosage":
        return (
          <div className="text-sm text-gray-600 leading-6">
            {medicine?.dosage ||
              "Take the medicine only according to the dosage recommended by your doctor or pharmacist."}
          </div>
        );

      case "Uses":
        return (
          <div className="text-sm text-gray-600 leading-6">
            {medicine?.uses ||
              "Used for the conditions mentioned on the medicine label or as prescribed by a healthcare professional."}
          </div>
        );

      case "Side Effects":
        return (
          <div className="text-sm text-gray-600 leading-6">
            {medicine?.sideEffects ||
              "Possible side effects may vary from person to person. Consult a healthcare professional if you experience unusual symptoms."}
          </div>
        );

      case "Storage":
        return (
          <div className="text-sm text-gray-600 leading-6">
            {medicine?.storage ||
              "Store according to the instructions on the medicine packaging and keep away from children."}
          </div>
        );

      case "Precautions":
        return (
          <div className="text-sm text-gray-600 leading-6">
            {medicine?.precautions ||
              "Follow the prescribed dosage and check with a healthcare professional if you have any concerns."}
          </div>
        );

      case "Reviews":
        return (
          <div className="text-sm text-gray-600">
            {medicine?.reviews?.length
              ? `${medicine.reviews.length} customer reviews`
              : "No reviews yet."}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm">

      {/* Tabs */}
      <div className="flex overflow-x-auto border-b">

        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-3 text-xs whitespace-nowrap font-medium border-b-2 ${
              activeTab === tab
                ? "border-[#0F9D74] text-[#0F9D74]"
                : "border-transparent text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}

      </div>

      {/* Content */}
      <div className="p-5">
        {renderContent()}
      </div>

    </div>
  );
};

export default MedicineDescriptionTabs;