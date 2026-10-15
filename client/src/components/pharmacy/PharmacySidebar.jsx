import { NavLink } from "react-router-dom";
import { LayoutDashboard,Pill,ClipboardList,ShoppingBag,  Package,
  Truck,
  UserRound,
  LogOut,
  HeartPulse,
  X, } from "lucide-react";
import medicinesImg from '../../assets/medcines.png'
  const menuItems=[
    {
        name:"Dashboard",
        path:'/pharmacy/dashboard',
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
    name: "Deliveries",
    path: "/pharmacy/deliveries",
    icon: Truck,
  },
  {
    name: "Profile",
    path: "/pharmacy/profile",
    icon: UserRound,
  },
  ]
const PharmacySidebar=({isOpen=true,onClose})=>{
    return (
        <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 z-50 flex h-screen w-[230px]
          flex-col border-r border-gray-100 bg-white
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="flex h-[100px] items-center justify-between px-6">
          <NavLink
            to="/pharmacy/dashboard"
            className="flex items-center gap-2"
          >
            <HeartPulse
              size={29}
              strokeWidth={2.5}
              className="text-emerald-600"
            />

            <div>
              <h1 className="text-[19px] font-bold tracking-tight text-slate-800">
                PharmaCare
              </h1>
              <p className="text-[9px] text-gray-500">
                Your Health, Your Priority
              </p>
            </div>
          </NavLink>

          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 md:hidden"
            aria-label="Close sidebar"
          >
            <X size={21} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex h-[46px] items-center gap-4 rounded-xl
                  px-3 text-[13px] transition-all duration-200
                  ${
                    isActive
                      ? "bg-emerald-50 font-semibold text-emerald-600"
                      : "text-gray-500 hover:bg-gray-50 hover:text-emerald-600"
                  }`
                }
              >
                <Icon size={18} strokeWidth={2} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}

          {/* Logout */}
          <button
            type="button"
            onClick={() => {
              // Connect your existing logout function here.
            }}
            className="flex h-[46px] w-full items-center gap-4
              rounded-xl px-3 text-[13px] text-gray-500
              transition hover:bg-red-50 hover:text-red-500"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </nav>

        {/* Bottom promotional card */}
        <div className="mx-3 mb-4 rounded-xl bg-emerald-50 p-4">
          <h3 className="text-[12px] font-bold leading-5 text-slate-800">
            Manage medicines
            <br />
            with ease
          </h3>

          <p className="mt-2 text-[9px] leading-4 text-gray-600">
            Manage your medicines, stock and prescriptions efficiently.
          </p>

          {/* <div className="mt-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white">
              <Pill size={38} className="text-emerald-600" />
            </div>
          </div> */}
          <div className="mt-3 flex justify-center">
  <img
    src={medicinesImg}
    alt="Medicines and prescription"
    className="h-24 w-full object-contain"
  />
</div>

         <NavLink
  to="/pharmacy/inventory"
  onClick={onClose}
  className="mt-3 flex w-full items-center justify-center gap-2
    rounded-lg bg-emerald-600 px-3 py-2
    text-[11px] font-semibold text-white
    transition hover:bg-emerald-700"
>
  Go to Inventory
  <Package size={14} />
</NavLink>
        </div>
      </aside>
    </>
    )
}
export default PharmacySidebar