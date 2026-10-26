import { Link, useNavigate, useLocation } from "react-router-dom";
import deliveryBoy from "../../assets/deliveryBoy.png";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCart } from "../../redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import {
  House,
  ClipboardList,
  Store,
  FileUp,
  ShoppingCart,
  Heart,
  List,
  UserRound,
  LogOut,
  X,
} from "lucide-react";

import logo from "../../assets/logo.png";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const cart=useSelector((state)=>state.cart.cart)

   useEffect(() => {
    if (!cart) {
      dispatch(fetchCart());
    }
  }, [dispatch, cart]);

  const cartCount = (cart?.items || []).reduce(
    (total, item) => total + (Number(item.quantity) || 0),
    0
  );

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: House,
    },
    {
      name: "Medicines",
      path: "/medicines",
      icon: ClipboardList,
    },
    {
      name: "Pharmacies",
      path: "/pharmacies",
      icon: Store,
    },
    {
      name: "Prescription",
      path: "/prescription",
      icon: FileUp,
    },
    {
      name: "Cart",
      path: "/cart",
      icon: ShoppingCart,
    },
    {
      name: "Wishlist",
      path: "/wishlist",
      icon: Heart,
    },
    {
      name: "My Orders",
      path: "/orders",
      icon: List,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: UserRound,
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
        />
      )}

      <aside
        className={`
          fixed md:sticky
          top-0 left-0
          z-50
          w-[190px]
          min-h-screen
          md:h-screen
          bg-white
          border-r border-gray-100
          flex flex-col
          shrink-0

          transform
          transition-transform
          duration-300

          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >

        {/* Logo */}
        <div className="px-5 py-5 border-b border-gray-100">

          <div className="flex items-center justify-between">

            <Link
              to="/home"
              onClick={() => setSidebarOpen(false)}
            >
              <div className="flex items-center gap-1.5">

                <img
                  src={logo}
                  alt="PharmaCare"
                  className="w-[24px] h-[24px] object-contain"
                />

                <span className="text-[16px] font-bold text-[#102A43]">
                  Pharma<span className="text-[#0F9D74]">Care</span>
                </span>

              </div>

              <p className="text-[6px] text-gray-500 ml-7 -mt-1">
                Your Health, Our Priority
              </p>
            </Link>

            {/* Mobile Close */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-gray-500"
            >
              <X size={18} />
            </button>

          </div>

        </div>


        {/* Menu */}
        <div className="px-3 py-5 flex-1">

          <div className="space-y-1">

            {menuItems.map((item) => {

              const active = location.pathname === item.path ||
                location.pathname.startsWith(`${item.path}/`);

              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex
                    items-center
                    gap-3
                    px-3
                    py-2.5
                    rounded-lg
                    text-[10px]
                    transition

                    ${
                      active
                        ? "bg-[#E8F8F2] text-[#0F9D74] font-medium"
                        : "text-gray-500 hover:bg-gray-50 hover:text-[#0F9D74]"
                    }
                  `}
                >

                  <Icon
                    size={16}
                    strokeWidth={1.8}
                    className="shrink-0"
                  />

                  <span>
                    {item.name}
                  </span>
                  {item.name === "Cart" && cartCount > 0 && (
  <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-semibold text-white">
    {cartCount > 99 ? "99+" : cartCount}
  </span>
)}

                </Link>
              );
            })}

          </div>


          {/* Logout */}
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
            className="
              w-full
              flex
              items-center
              gap-3
              px-3
              py-2.5
              rounded-lg
              text-[10px]
              text-gray-500
              hover:bg-red-50
              hover:text-red-500
              mt-2
            "
          >

            <LogOut
              size={16}
              strokeWidth={1.8}
            />

            <span>
              Logout
            </span>

          </button>

        </div>


        {/* Free Delivery */}
        <div className="px-3 pb-4">

          <div className="bg-[#E8F8F2] rounded-xl p-3 overflow-hidden">

            <p className="text-[10px] font-bold text-[#0F9D74]">
              Free Delivery
            </p>

            <p className="text-[7px] text-gray-500 mt-1">
              For orders above
            </p>

            <p className="text-[15px] font-bold text-[#0F9D74] mt-1">
              ₹ 499.00
            </p>

            <div className="flex justify-center items-center mt-3 h-[105px]">

              <img
                src={deliveryBoy}
                alt="Free Delivery"
                className="w-[115px] h-[105px] object-contain"
              />

            </div>

            <button 
              className="
                w-full
                bg-[#0F9D74]
                text-white
                text-[8px]
                py-1.5
                rounded-md
                mt-1
              "
              onClick={()=>navigate('/medicines')}
            >
              Shop Now
            </button>

          </div>

        </div>

      </aside>
    </>
  );
}

export default Sidebar;
