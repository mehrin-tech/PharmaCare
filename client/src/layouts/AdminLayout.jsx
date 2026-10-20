

// import React, { useState } from "react";
// import { Outlet } from "react-router-dom";

// import TopNavbar from "../components/customer/TopNavbar";
// import AdminSidebar from "../components/admin/AdminSidebar";

// const AdminLayout = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="h-screen overflow-hidden bg-[#F7F8FA]">
//       <AdminSidebar
//         isOpen={sidebarOpen}
//         onClose={() => setSidebarOpen(false)}
//       />

//       <div className="h-screen overflow-hidden lg:ml-[230px]">
//         {/* Fixed Top Navbar */}
//         <header className="fixed left-0 right-0 top-0 z-40 h-[70px] bg-white lg:left-[230px]">
//           <TopNavbar setSidebarOpen={setSidebarOpen} />
//         </header>

//         <main className="h-screen overflow-y-auto px-4 pb-6 pt-[86px] md:px-6">
//            <h1 className="text-2xl font-bold text-blue-700">
//     ADMIN CONTENT AREA
//   </h1>
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;



