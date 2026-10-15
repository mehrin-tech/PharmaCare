import { useState } from "react";
import TopNavbar from "../components/common/TopNavbar";
import AdminSidebar from "../components/admin/AdminSidebar";

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="md:ml-[230px]">
        <TopNavbar setSidebarOpen={setSidebarOpen} />
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;