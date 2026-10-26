


import React from "react";
import { NavLink } from "react-router-dom";
import {
  HeartPulse,
  LayoutDashboard,
  Users,
  Store,
  Pill,
  ShoppingBag,
  ChartNoAxesCombined,
  Wallet,
  X,
  LogOut,
  ClipboardList
} from "lucide-react";
import logo from '../../assets/logo.png'

const menuItems = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "User Management",
    path: "/admin/customers",
    icon: Users,
  },
  {
    name: "Pharmacy Management",
    path: "/admin/pharma",
    icon: Store,
  },

  {
    name: "Order Monitor",
    path: "/admin/orders",
    icon: ClipboardList,
  },
  {
    name: "Analytics & Reports",
    path: "/admin/analytics",
    icon: ChartNoAxesCombined,
  },
  {
    name: "Revenue Overview",
    path: "/admin/revenue",
    icon: Wallet,
  },
];

const AdminSidebar = ({ isOpen, onClose, onLogout }) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed lg:sticky
          top-0 left-0
          z-50
          w-[230px]
          min-h-screen
          lg:h-screen
          bg-[#123C32]
          border-r border-[#244E43]
          flex flex-col
          shrink-0
          transform
          transition-transform
          duration-300
          ${isOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* Logo */}
        <div className="px-5 py-5 border-b border-[#244E43]">
          <div className="flex items-center justify-between">
            <NavLink
              to="/admin/dashboard"
              onClick={onClose}
              className="flex items-center gap-2"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#DFF6EE]">

                <img
                  src={logo}
                  alt="PharmaCare"
                  className="w-[24px] h-[24px] object-contain"
                />

              </div>

              <div>
                <h1 className="text-[16px] font-bold text-white">
                  Pharma<span className="text-[#0F9D74]">Care</span>
                </h1>
                <p className="text-[9px] text-[#C5DDD5]">
                  Admin Panel
                </p>
              </div>
            </NavLink>

            {/* Mobile Close */}
            <button
              type="button"
              onClick={onClose}
              className="text-[#C5DDD5] hover:text-white lg:hidden"
              aria-label="Close sidebar"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-5">


          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/admin/dashboard"}
                  onClick={onClose}
                  className={({ isActive }) => `
                    flex
                    items-center
                    gap-3
                    px-3
                    py-2.5
                    rounded-lg
                    text-[11px]
                    transition-colors
                    duration-200
                    ${isActive
                      ? "bg-[#0F9D74] text-white font-semibold shadow-sm"
                      : "text-[#D1E5DE] hover:bg-[#205447] hover:text-white"
                    }
                  `}
                >
                  <Icon
                    size={16}
                    strokeWidth={1.8}
                    className="shrink-0"
                  />

                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* Bottom Section */}
        <div className="border-t border-[#244E43] p-3">
          <div className="mb-3 rounded-xl bg-[#1B493D] p-3">
            <p className="text-[11px] font-bold text-white">
              Manage PharmaCare
            </p>
            <p className="mt-1 text-[9px] leading-4 text-[#C5DDD5]">
              Manage customers, pharmacies, orders and reports.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              localStorage.removeItem('token')
              window.location.href = '/login'
            }}
            className="
              w-full
              flex
              items-center
              gap-3
              px-3
              py-2.5
              rounded-lg
              text-[11px]
              text-[#D1E5DE]
              hover:bg-red-500/15
              hover:text-red-300
              transition-colors
            "
          >
            <LogOut size={16} strokeWidth={1.8} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;

