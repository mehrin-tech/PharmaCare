const PharmacyTabs = ({
  activeTab,
  setActiveTab,
}) => {

  const tabs = [
    "About",
    "All Medicines",
    "OTC",
    "Prescription required",
    "HealthCare",
    "BabyCare",
    "Supplements",
  ];


  return (

    <div className="
      bg-white
      border-b
      border-gray-200
    ">

      <div className="
        flex
        items-center
                gap-4
        overflow-x-auto
        scrollbar-hide
      ">

        {tabs.map((tab) => {

          const active =
            activeTab === tab;


          return (

            <button
              key={tab}
              type="button"
              onClick={() =>
                setActiveTab(tab)
              }
              className={`
                relative
                whitespace-nowrap
                pb-2.5
                text-[9px]
                transition

                ${
                  active
                    ? "text-[#0F9D74] font-medium"
                    : "text-gray-400 hover:text-[#0F9D74]"
                }
              `}
            >

              {tab}


              {active && (

                <span className="
                  absolute
                  left-0
                  right-0
                  -bottom-[1px]
                  h-[1.5px]
                  bg-[#0F9D74]
                  rounded-full
                "
                />

              )}

            </button>

          );

        })}

      </div>

    </div>

  );
};

export default PharmacyTabs;
