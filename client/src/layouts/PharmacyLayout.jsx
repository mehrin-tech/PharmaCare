

import { useState } from "react";
import { Outlet } from "react-router-dom";
import TopNavbar from "../components/customer/TopNavbar";
import PharmacySidebar from "../components/pharmacy/PharmacySidebar";

const PharmacyLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <PharmacySidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="md:ml-[230px]">
        <TopNavbar setSidebarOpen={setSidebarOpen} />

        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PharmacyLayout;
