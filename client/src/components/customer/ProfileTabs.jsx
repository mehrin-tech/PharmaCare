const ProfileTabs = ({ activeTab, setActiveTab }) => {

    const tabs = [
        {
            id: "personal",
            label: "Personal Info"
        },
        {
            id: "address",
            label: "Address"
        },
        // {
        //     id: "payment",
        //     label: "Payment Methods"
        // },
        // {
        //     id: "security",
        //     label: "Security"
        // }
    ];

    return (
        <div className="bg-white border-b mt-5">

            <div className="flex gap-8 px-6">

                {tabs.map((tab) => (

                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`py-4 text-sm font-medium border-b-2 ${
                            activeTab === tab.id
                                ? "text-emerald-600 border-emerald-500"
                                : "text-gray-500 border-transparent"
                        }`}
                    >
                        {tab.label}
                    </button>

                ))}

            </div>

        </div>
    );
};

export default ProfileTabs;
