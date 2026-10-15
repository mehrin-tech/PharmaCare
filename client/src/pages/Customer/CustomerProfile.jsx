import { useState } from "react";

import Sidebar from "../../components/customer/Sidebar";
import ProfileHeader from "../../components/customer/Profile/ProfileHeader";
import ProfileTabs from "../../components/customer/ProfileTabs";
import PersonalInfo from "../../components/customer/Profile/PersonalInfo";

 import AddressSection from "../../components/customer/Profile/AddressSection";
// import PaymentMethods from "../../components/customer/PaymentMethods";
// import SecuritySection from "../../components/customer/SecuritySection";

const CustomerProfile = () => {
    const [activeTab, setActiveTab] = useState("personal");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Main Layout */}
            <div className="flex min-h-screen">

                {/* Sidebar */}
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />

                {/* Main Content */}
                <main className="flex-1 min-w-0">

                    {/* Mobile Top Bar */}
                    <div className="md:hidden h-14 bg-white border-b flex items-center px-4">

                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="text-gray-700 text-xl"
                        >
                            ☰
                        </button>

                        <h1 className="ml-4 font-semibold text-gray-800">
                            Profile
                        </h1>

                    </div>

                    {/* Page Content */}
                    <div className="
                        p-3
                        sm:p-4
                        md:p-6
                        lg:p-8
                    ">

                        {/* Profile Header */}
                        <ProfileHeader />

                        {/* Tabs */}
                        <div className="mt-4">
                            <ProfileTabs
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                            />
                        </div>

                        {/* Tab Content */}
                        <div className="mt-4">

                            {activeTab === "personal" && (
                                <PersonalInfo />
                            )}

                            {/* Uncomment when components are created */}

                           
                            {activeTab === "address" && (
                                <AddressSection />
                            )}
{/* 
                            {activeTab === "payment" && (
                                <PaymentMethods />
                            )}

                            {activeTab === "security" && (
                                <SecuritySection />
                            )} */}
                            

                        </div>

                    </div>

                </main>

            </div>

        </div>
    );
};

export default CustomerProfile;
