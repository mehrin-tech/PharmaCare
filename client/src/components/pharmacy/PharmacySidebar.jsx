import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Pill,
  ClipboardList,
  ShoppingBag,
  Package,
  UserRound,
  LogOut,
  HeartPulse,
  ChartNoAxesCombined,
  X,
} from "lucide-react";

import medicinesImg from "../../assets/medcines.png";
import logo from '../../assets/logo.png'
const menuItems = [
  {
    name: "Dashboard",
    path: "/pharmacy/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Medicines",
    path: "/pharmacy/medicines",
    icon: Pill,
  },
  {
    name: "Prescription",
    path: "/pharmacy/prescriptions",
    icon: ClipboardList,
  },
  {
    name: "Orders",
    path: "/pharmacy/orders",
    icon: ShoppingBag,
  },
  {
    name: "Inventory",
    path: "/pharmacy/inventory",
    icon: Package,
  },
  {
    name: "Sales & Reports",
    path: "/pharmacy/sales&reports",
    icon: ChartNoAxesCombined,
  },
  {
    name: "Profile",
    path: "/pharmacy/profile",
    icon: UserRound,
  },
];

const PharmacySidebar = ({ isOpen = true, onClose }) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 z-50 flex h-screen w-[230px]
          flex-col border-r border-[#244E43] bg-[#123C32]
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="flex h-[85px] shrink-0 items-center justify-between px-5">
          <NavLink
            to="/pharmacy/dashboard"
            onClick={onClose}
            className="flex items-center gap-2"
          >

            <img
              src={logo}
              alt="PharmaCare"
              className="w-[24px] h-[24px] object-contain"
            />

            <div>
              <h1 className="text-[17px] font-bold tracking-tight text-white">
                Pharma<span className="text-[#0F9D74]">Care</span>
              </h1>
              <p className="text-[9px] text-[#B5D1C7]">
                Your Health, Your Priority
              </p>
            </div>
          </NavLink>

          <button
            type="button"
            onClick={onClose}
            className="text-[#D1E5DE] hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={19} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-3">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex h-[40px] items-center gap-3 rounded-lg
                  px-3 text-[11px] transition-colors duration-200
                  ${isActive
                    ? "bg-[#0F9D74] font-semibold text-white"
                    : "text-[#D1E5DE] hover:bg-[#205447] hover:text-white"
                  }`
                }
              >
                <Icon size={16} strokeWidth={2} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}

          {/* Logout */}
          <button
            type="button"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
            className="mt-2 flex h-[40px] w-full items-center gap-3
              rounded-lg px-3 text-[11px] text-[#D1E5DE]
              transition-colors hover:bg-red-500/15 hover:text-red-300"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </nav>

        {/* Bottom promotional card */}
        <div className="mx-3 mb-4 rounded-xl border border-[#2B5A4B] bg-[#1B493D] p-3">
          <h3 className="text-[11px] font-bold leading-5 text-white">
            Manage medicines
            <br />
            with ease
          </h3>

          <p className="mt-1.5 text-[9px] leading-4 text-[#C0D8CF]">
            Manage your medicines, stock and prescriptions efficiently.
          </p>

          <div className="mt-2 flex justify-center">
            <img
              src={medicinesImg}
              alt="Medicines and prescription"
              className="h-20 w-full object-contain"
            />
          </div>

          <NavLink
            to="/pharmacy/inventory"
            onClick={onClose}
            className="mt-2 flex w-full items-center justify-center gap-2
              rounded-lg bg-[#0F9D74] px-3 py-2
              text-[10px] font-semibold text-white
              transition hover:bg-[#0B805E]"
          >
            Go to Inventory
            <Package size={13} />
          </NavLink>
        </div>
      </aside>
    </>
  );
};

export default PharmacySidebar;
