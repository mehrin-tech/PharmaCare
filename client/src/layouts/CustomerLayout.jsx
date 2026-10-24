import { useState } from "react";
import TopNavbar from "../components/customer/TopNavbar";
import CustomerSidebar from "../components/customer/Sidebar";

const CustomerLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <CustomerSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="md:ml-[230px]">
        <TopNavbar setSidebarOpen={setSidebarOpen} />
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
};

export default CustomerLayout;
