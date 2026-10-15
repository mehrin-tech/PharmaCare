// import { Link, useNavigate } from "react-router-dom";
// import { useCallback, useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import {
//   fetchNotifications,
//   markNotificationAsRead,
//   markAllNotificationsAsRead,
// } from "../../redux/slices/notificationSlice";
// import {
//   Menu,
//   Search,
//   MapPin,
//   Bell,
//   UserRound,
//   ShoppingCart
// } from "lucide-react";

// import api from "../../services/api";

// export default function TopNavbar({ setSidebarOpen }) {
// const navigate=useNavigate()
//   const [user, setUser] = useState(null);
//   const role = user?.role?.toLowerCase();
// const isCustomer = role === "customer";
// const isPharmacy = role === "pharmacy";
// const isAdmin = role === "admin";
//   const [searchTerm, setSearchTerm] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [searchLoading, setSearchLoading] = useState(false);
//   const [location, setLocation] = useState(()=>{
//     try{
//       const savedLocation=localStorage.getItem('pharmacareLocation')
//       return savedLocation?{...JSON.parse(savedLocation),loading:false} :
//       {city:'Set Location',loading:false}

//     }catch{
//       return {city:"Set location",loading:false}

//     }
  
//   });

//   useEffect(() => {

//     const fetchProfile = async () => {

//       try {

//         const response = await api.get("/profile");

//         console.log("Navbar profile:", response.data);

//         const profileUser = response.data.profile.user;

//         setUser(profileUser);

//       } catch (error) {

//         console.error(
//           "Navbar profile error:",
//           error.response?.data || error.message
//         );

//       }
//     };

//     fetchProfile();

//   }, []);

//   const getCurrentLocation = useCallback(() => {

//     if (!navigator.geolocation) {
//       alert("Geolocation is not supported by this browser.");
//       return;
//     }

//     setLocation((prev) => ({
//       ...prev,
//       loading: true
//     }));

//     navigator.geolocation.getCurrentPosition(
//       async (position) => {

//         const { latitude, longitude } = position.coords;

//         console.log("Latitude:", latitude);
//         console.log("Longitude:", longitude);

//         try {

//           const response = await fetch(
//             `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
//           );

//           const data = await response.json();

//           const address = data.address;

//           const city =
//             address.city ||
//             address.town ||
//             address.village ||
//             address.municipality ||
//             address.county ||
//             "Unknown location";

//           const newLocation = {
//             city,
//             state: address.state || "",
//             latitude,
//             longitude,
//             loading: false
//           };

//           // React state
//           setLocation(newLocation);

//           // Browser storage
//           localStorage.setItem(
//             "pharmacareLocation",
//             JSON.stringify(newLocation)
//           );
//           window.dispatchEvent(new CustomEvent("pharmacareLocationChange", { detail: newLocation }));

//         } catch (error) {

//           console.error(
//             "Location conversion error:",
//             error
//           );

//           setLocation((prev) => ({
//             ...prev,
//             loading: false,
//             city: "Location unavailable"
//           }));
//         }
//       },

//       (error) => {

//         console.error("Geolocation error:", error);

//         setLocation((prev) => ({
//           ...prev,
//           loading: false
//         }));

//         if (error.code === 1) {
//           alert(
//             "Please allow location access for PharmaCare."
//           );
//         }
//       },

//       {
//         enableHighAccuracy: true,
//         timeout: 10000,
//         maximumAge: 0
//       }
//     );
//   }, []);

//   useEffect(() => {
//     const requestLocation = () => getCurrentLocation();
//     window.addEventListener("pharmacareChangeLocation", requestLocation);
//     return () => window.removeEventListener("pharmacareChangeLocation", requestLocation);
//   }, [getCurrentLocation]);

  
// useEffect(() => {
//   const syncLocation = (event) => {
//     if (event.detail) {
//       setLocation({
//         ...event.detail,
//         loading: false,
//       });
//       return;
//     }

//     try {
//       const saved = localStorage.getItem("pharmacareLocation");

//       if (saved) {
//         setLocation({
//           ...JSON.parse(saved),
//           loading: false,
//         });
//       }
//     } catch (error) {
//       console.error("Location sync failed:", error);
//     }
//   };

//   window.addEventListener("pharmacareLocationChange", syncLocation);

//   return () => {
//     window.removeEventListener("pharmacareLocationChange", syncLocation);
//   };
// }, []);


// const handleSearchChange=async(e)=>{
//   const value=e.target.value;
//   setSearchTerm(value)

//   if(value.trim().length<2){
//     setSuggestions([]);
//     return;
//   }
//   try{
//     setSearchLoading(true);

//         const response = await api.get("/medicines/search", {
//             params: {
//                 search: value
//             }
//         });

//         console.log("Search results:", response.data);

//         if (response.data.success) {
//             setSuggestions(response.data.medicines || []);
//         }
//   }catch(error){
//      console.error(
//             "Medicine search error:",
//             error.response?.data || error.message
//         );

//         setSuggestions([]);
//   }finally{
//     setSearchLoading(false)
//   }

// }

// const handleSearch = (e) => {

//     e.preventDefault();

//     if (!searchTerm.trim()) {
//         return;
//     }

//     setSuggestions([]);

//     navigate(
//         `/medicines?search=${encodeURIComponent(searchTerm.trim())}`
//     );
// };

// const handleSuggestionClick = (medicine) => {

//     setSearchTerm(medicine.name);

//     setSuggestions([]);

//     navigate(
//         `/medicines?search=${encodeURIComponent(medicine.name)}`
//     );
// };

// const dispatch = useDispatch();

// const {
//   notifications = [],
//   unreadCount = 0,
//   loading: notificationsLoading,
// } = useSelector((state) => state.notifications);

// const [showNotifications, setShowNotifications] = useState(false);

// useEffect(() => {
//   dispatch(fetchNotifications());
// }, [dispatch]);

// const handleNotificationClick = async (notification) => {
//   try {
//     if (!notification.isRead) {
//       await dispatch(
//         markNotificationAsRead(notification._id)
//       ).unwrap();
//     }

//     setShowNotifications(false);

//     if (notification.order?._id) {
//       navigate(`/orders/${notification.order._id}`);
//     } else {
//       navigate("/notifications");
//     }
//   } catch (error) {
//     console.error("Notification update failed:", error);
//   }
// };

// const handleMarkAllRead = async () => {
//   try {
//     await dispatch(markAllNotificationsAsRead()).unwrap();
//   } catch (error) {
//     console.error("Mark all notifications read failed:", error);
//   }
// };
//   return (

//     <header className="min-h-[54px] bg-white border-b border-gray-100 flex items-center justify-between gap-2 px-3 sm:px-5">

//       {/* ================= LEFT ================= */}

//       <div className="flex min-w-0 items-center gap-2 sm:gap-3">

//         {/* Menu */}

//         <button
//           onClick={() => setSidebarOpen(true)}
//           className="text-gray-600"
//         >
//           <Menu
//             size={20}
//             strokeWidth={1.8}
//           />
//         </button>


//         {/* Search */}

//         {/* <div className="w-[320px] h-[30px] border border-gray-200 rounded-md flex items-center overflow-hidden">

//     <Search
//         size={12}
//         className="ml-3 text-gray-400 shrink-0"
//     />

//     <input
//         type="text"
//         placeholder="Search for medicines, healthcare products..."
//         className="flex-1 px-2 outline-none text-[8px] text-gray-600"
//     />

//     <button className="h-full px-4 bg-[#0F9D74] text-white text-[8px]">
//         Search
//     </button>

// </div> */}
// <div className="relative">
// <form onSubmit={handleSearch} className="w-[min(52vw,320px)] sm:w-[320px] h-[30px] border border-gray-200 rounded-md flex items-center overflow-hidden">

//     <Search
//         size={12}
//         className="ml-3 text-gray-400 shrink-0"
//     />

//     <input
//         type="text"
//         value={searchTerm}
//         onChange={handleSearchChange}
//         placeholder="Search for medicines, healthcare products..."
//         aria-label="Search medicines and healthcare products"
//         className="flex-1 px-2 outline-none text-[8px] text-gray-600"
//     />

//     <button type="submit" className="h-full px-4 bg-[#0F9D74] text-white text-[8px]">
//         Search
//     </button>

// </form>
// {(searchLoading || suggestions.length > 0) && (
//   <div className="absolute left-0 top-[34px] z-50 w-[min(52vw,320px)] sm:w-[320px] rounded-md border border-gray-200 bg-white shadow-lg">
//     {searchLoading && <p className="px-3 py-2 text-[9px] text-gray-500">Searching...</p>}
//     {suggestions.map((medicine) => (
//       <button key={medicine._id} type="button" onClick={() => handleSuggestionClick(medicine)} className="block w-full px-3 py-2 text-left text-[10px] text-[#102A43] hover:bg-[#E8F8F2]">
//         {medicine.name}
//       </button>
//     ))}
//   </div>
// )}
// </div>

//       </div>


//       {/* ================= RIGHT ================= */}

//       <div className="flex shrink-0 items-center gap-2 sm:gap-5">


//         {/* ================= LOCATION ================= */}

//         {/* <button className="flex items-center gap-2">

//                     <MapPin
//                         size={16}
//                         className="text-[#0F9D74]"
//                         strokeWidth={1.8}
//                     />

//                     <div className="text-left">

//                         <p className="text-[7px] text-gray-400">
//                             Deliver to
//                         </p>

//                         <p className="text-[8px] font-semibold text-[#102A43]">
//                             Kochi
//                         </p>

//                     </div>

//                 </button> */}
//         <button
//           onClick={getCurrentLocation}
//           className="flex items-center gap-2 hover:bg-gray-50 rounded-lg px-2 py-1"
//         >
//           <MapPin
//             size={16}
//             className="text-[#0F9D74]"
//             strokeWidth={1.8}
//           />

//           <div className="text-left">

//             <p className="text-[7px] text-gray-400">
//               Deliver to
//             </p>

//             <p className="text-[8px] font-semibold text-[#102A43]">
//               {location.loading
//                 ? "Locating..."
//                 : location.city
//               }
//             </p>

//           </div>

//         </button>


//         {/* ================= NOTIFICATION ================= */}

//         <Link
//           to="/cart"
//           aria-label="Cart"
//           className="text-gray-500 hover:text-[#0F9D74]"
//         >
//           <ShoppingCart size={16} strokeWidth={1.8} />
//         </Link>

//         {/* <Link
//           to="/notifications"
//           className="relative text-gray-500"
//         >

//           <Bell
//             size={16}
//             strokeWidth={1.8}
//           />

//           <span className="absolute -top-1 -right-1 w-[5px] h-[5px] rounded-full bg-red-500" />

//         </Link> */}
        
// <div className="relative">
//   <button
//     type="button"
//     onClick={() => setShowNotifications((prev) => !prev)}
//     aria-label="Open notifications"
//     className="relative text-gray-500 hover:text-[#0F9D74]"
//   >
//     <Bell size={18} strokeWidth={1.8} />

//     {unreadCount > 0 && (
//       <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-semibold text-white">
//         {unreadCount > 99 ? "99+" : unreadCount}
//       </span>
//     )}
//   </button>

//   {showNotifications && (
//     <div className="absolute right-0 top-8 z-50 w-80 max-w-[90vw] overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl">
//       <div className="flex items-center justify-between border-b p-3">
//         <h3 className="text-sm font-semibold text-[#102A43]">
//           Notifications
//         </h3>

//         {unreadCount > 0 && (
//           <button
//             type="button"
//             onClick={handleMarkAllRead}
//             className="text-[10px] font-medium text-[#0F9D74]"
//           >
//             Mark all as read
//           </button>
//         )}
//       </div>

//       <div className="max-h-80 overflow-y-auto">
//         {notificationsLoading ? (
//           <p className="p-4 text-center text-xs text-gray-500">
//             Loading notifications...
//           </p>
//         ) : notifications.length === 0 ? (
//           <p className="p-4 text-center text-xs text-gray-500">
//             No notifications yet
//           </p>
//         ) : (
//           notifications.slice(0, 5).map((notification) => (
//             <button
//               key={notification._id}
//               type="button"
//               onClick={() => handleNotificationClick(notification)}
//               className={`w-full border-b px-3 py-3 text-left hover:bg-[#F0FBF7] ${
//                 !notification.isRead ? "bg-[#F0FBF7]" : "bg-white"
//               }`}
//             >
//               <div className="flex items-start gap-2">
//                 {!notification.isRead && (
//                   <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#0F9D74]" />
//                 )}

//                 <div className="min-w-0 flex-1">
//                   <p className="text-xs font-semibold text-[#102A43]">
//                     {notification.title}
//                   </p>

//                   <p className="mt-1 text-[11px] text-gray-600">
//                     {notification.message}
//                   </p>

//                   <p className="mt-1 text-[9px] text-gray-400">
//                     {new Date(notification.createdAt).toLocaleString()}
//                   </p>
//                 </div>
//               </div>
//             </button>
//           ))
//         )}
//       </div>

//       {/* <button
//         type="button"
//         onClick={() => {
//           setShowNotifications(false);
//           navigate("/notifications");
//         }}
//         className="w-full p-3 text-center text-xs font-semibold text-[#0F9D74] hover:bg-gray-50"
//       >
//         View all notifications
//       </button> */}
//     </div>
//   )}
// </div>



//         {/* ================= USER PROFILE ================= */}

//         <Link
//           to="/profile"
//           className="flex items-center gap-2 hover:bg-gray-50 rounded-lg px-2 py-1 transition"
//         >

//           {/* Profile Image */}

//           <div className="w-9 h-9 rounded-full bg-[#E8F8F2] overflow-hidden flex items-center justify-center">

//             {user?.profilePhoto ? (

//               <img
//                 src={user.profilePhoto}
//                 alt="Profile"
//                 className="w-full h-full object-cover"
//               />

//             ) : (

//               <UserRound
//                 size={18}
//                 className="text-[#0F9D74]"
//                 strokeWidth={1.8}
//               />

//             )}

//           </div>


//           {/* User Info */}

//           <div className="text-left">

//             <p className="text-[10px] font-semibold text-[#102A43]">

//               Hi, {user?.name || "Customer"}

//             </p>


//             <p className="text-[8px] text-gray-500">

//               {user?.role === "customer"
//                 ? "Customer"
//                 : user?.role || "Customer"
//               }

//             </p>

//           </div>

//         </Link>

//       </div>

//     </header>

//   );
// }


import { Link, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "../../redux/slices/notificationSlice";

import {
  Menu,
  Search,
  MapPin,
  Bell,
  UserRound,
  ShoppingCart,
} from "lucide-react";

import api from "../../services/api";

export default function TopNavbar({ setSidebarOpen }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const [location, setLocation] = useState(() => {
    try {
      const savedLocation = localStorage.getItem("pharmacareLocation");

      return savedLocation
        ? { ...JSON.parse(savedLocation), loading: false }
        : { city: "Set Location", loading: false };
    } catch {
      return { city: "Set Location", loading: false };
    }
  });

  // -----------------------------------------
  // ROLE CONFIGURATION
  // -----------------------------------------

  const role = user?.role?.toLowerCase() || "customer";

  const isCustomer = role === "customer";
  const isPharmacy = role === "pharmacy";
  const isAdmin = role === "admin";

  const profilePath = {
    customer: "/profile",
    pharmacy: "/pharmacy/profile",
    admin: "/admin/profile",
  }[role] || "/profile";

  const searchPlaceholder = {
    customer: "Search medicines and healthcare products...",
    pharmacy: "Search pharmacy medicines...",
    admin: "Search users, pharmacies...",
  }[role] || "Search...";

  const {
    notifications = [],
    unreadCount = 0,
    loading: notificationsLoading,
  } = useSelector((state) => state.notifications);

  // -----------------------------------------
  // FETCH LOGGED-IN USER
  // -----------------------------------------

  useEffect(() => {
    let cancelled = false;

    const fetchProfile = async () => {
      try {
        const response = await api.get("/profile");
        const profileUser = response.data?.profile?.user;

        if (!cancelled && profileUser) {
          setUser(profileUser);
        }
      } catch (error) {
        console.error(
          "Navbar profile error:",
          error.response?.data || error.message
        );
      }
    };

    fetchProfile();

    return () => {
      cancelled = true;
    };
  }, []);

  // -----------------------------------------
  // LOCATION
  // -----------------------------------------

  const getCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser.");
      return;
    }

    setLocation((prev) => ({
      ...prev,
      loading: true,
    }));

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );

          if (!response.ok) {
            throw new Error("Unable to retrieve location details.");
          }

          const data = await response.json();
          const address = data.address || {};

          const city =
            address.city ||
            address.town ||
            address.village ||
            address.municipality ||
            address.county ||
            "Unknown location";

          const newLocation = {
            city,
            state: address.state || "",
            latitude,
            longitude,
            loading: false,
          };

          setLocation(newLocation);

          localStorage.setItem(
            "pharmacareLocation",
            JSON.stringify(newLocation)
          );

          window.dispatchEvent(
            new CustomEvent("pharmacareLocationChange", {
              detail: newLocation,
            })
          );
        } catch (error) {
          console.error("Location conversion error:", error);

          setLocation((prev) => ({
            ...prev,
            loading: false,
            city: "Location unavailable",
          }));
        }
      },
      (error) => {
        console.error("Geolocation error:", error);

        setLocation((prev) => ({
          ...prev,
          loading: false,
        }));

        if (error.code === 1) {
          alert("Please allow location access for PharmaCare.");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  // Listen for requests to change the customer's location.
  useEffect(() => {
    const requestLocation = () => getCurrentLocation();

    window.addEventListener(
      "pharmacareChangeLocation",
      requestLocation
    );

    return () => {
      window.removeEventListener(
        "pharmacareChangeLocation",
        requestLocation
      );
    };
  }, [getCurrentLocation]);

  // Synchronize location changes from other components.
  useEffect(() => {
    const syncLocation = (event) => {
      if (event.detail) {
        setLocation({
          ...event.detail,
          loading: false,
        });

        return;
      }

      try {
        const saved = localStorage.getItem("pharmacareLocation");

        if (saved) {
          setLocation({
            ...JSON.parse(saved),
            loading: false,
          });
        }
      } catch (error) {
        console.error("Location sync failed:", error);
      }
    };

    window.addEventListener(
      "pharmacareLocationChange",
      syncLocation
    );

    return () => {
      window.removeEventListener(
        "pharmacareLocationChange",
        syncLocation
      );
    };
  }, []);

  // -----------------------------------------
  // CUSTOMER MEDICINE SEARCH
  // -----------------------------------------

  const handleSearchChange = async (event) => {
    const value = event.target.value;

    setSearchTerm(value);

    if (value.trim().length < 2) {
      setSuggestions([]);
      setSearchLoading(false);
      return;
    }

    try {
      setSearchLoading(true);

      const response = await api.get("/medicines/search", {
        params: {
          search: value,
        },
      });

      if (response.data.success) {
        setSuggestions(response.data.medicines || []);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error(
        "Medicine search error:",
        error.response?.data || error.message
      );

      setSuggestions([]);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();

    const query = searchTerm.trim();

    if (!query) return;

    setSuggestions([]);

    if (isCustomer) {
      navigate(`/medicines?search=${encodeURIComponent(query)}`);
    } else if (isPharmacy) {
      // Connect this to your pharmacy medicine-management
      // search/filter logic.
      navigate(
        `/pharmacy/medicines?search=${encodeURIComponent(query)}`
      );
    } else if (isAdmin) {
      // Connect this to the actual admin search functionality.
      navigate(
        `/admin?search=${encodeURIComponent(query)}`
      );
    }
  };

  const handleSuggestionClick = (medicine) => {
    setSearchTerm(medicine.name);
    setSuggestions([]);

    navigate(
      `/medicines?search=${encodeURIComponent(medicine.name)}`
    );
  };

  // -----------------------------------------
  // NOTIFICATIONS
  // -----------------------------------------

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const handleNotificationClick = async (notification) => {
    try {
      if (!notification.isRead) {
        await dispatch(
          markNotificationAsRead(notification._id)
        ).unwrap();
      }

      setShowNotifications(false);

      if (isCustomer && notification.order?._id) {
        navigate(`/orders/${notification.order._id}`);
      } else if (isPharmacy && notification.order?._id) {
        navigate(`/pharmacy/orders/${notification.order._id}`);
      } else if (isAdmin && notification.order?._id) {
        navigate(`/admin/orders/${notification.order._id}`);
      } else {
        // Replace with a role-specific notifications route
        // if your application has one.
        const notificationPath = {
          customer: "/notifications",
          pharmacy: "/pharmacy/notifications",
          admin: "/admin/notifications",
        }[role] || "/notifications";

        navigate(notificationPath);
      }
    } catch (error) {
      console.error("Notification update failed:", error);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await dispatch(markAllNotificationsAsRead()).unwrap();
    } catch (error) {
      console.error(
        "Mark all notifications read failed:",
        error
      );
    }
  };

  // -----------------------------------------
  // RENDER
  // -----------------------------------------

  return (
    <header className="relative z-30 flex min-h-[54px] items-center
      justify-between gap-2 border-b border-gray-100 bg-white
      px-3 sm:px-5">

      {/* LEFT: SIDEBAR + SEARCH */}

      <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={() => setSidebarOpen?.(true)}
          className="shrink-0 text-gray-600 hover:text-[#0F9D74]"
          aria-label="Open sidebar"
        >
          <Menu size={20} strokeWidth={1.8} />
        </button>

        {/* Search */}

        <div className="relative min-w-0">
          <form
            onSubmit={handleSearch}
            className="flex h-[32px] w-full max-w-[320px]
              items-center overflow-hidden rounded-md
              border border-gray-200"
          >
            <Search
              size={13}
              className="ml-2 shrink-0 text-gray-400 sm:ml-3"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={isCustomer ? handleSearchChange : (e) => {
                setSearchTerm(e.target.value);
              }}
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
              className="min-w-0 flex-1 px-2 text-[10px]
                text-gray-600 outline-none sm:text-xs"
            />

            <button
              type="submit"
              className="h-full shrink-0 bg-[#0F9D74]
                px-2 text-[9px] text-white hover:bg-[#0C8663]
                sm:px-4 sm:text-[10px]"
            >
              Search
            </button>
          </form>

          {/* Customer medicine suggestions */}

          {isCustomer &&
            (searchLoading || suggestions.length > 0) && (
              <div className="absolute left-0 top-[36px] z-50
                w-[min(75vw,320px)] overflow-hidden rounded-md
                border border-gray-200 bg-white shadow-lg">

                {searchLoading && (
                  <p className="px-3 py-2 text-xs text-gray-500">
                    Searching...
                  </p>
                )}

                {suggestions.map((medicine) => (
                  <button
                    key={medicine._id}
                    type="button"
                    onClick={() => handleSuggestionClick(medicine)}
                    className="block w-full px-3 py-2 text-left
                      text-xs text-[#102A43] hover:bg-[#E8F8F2]"
                  >
                    {medicine.name}
                  </button>
                ))}
              </div>
            )}
        </div>
      </div>

      {/* RIGHT: ROLE-SPECIFIC ACTIONS */}

      <div className="flex shrink-0 items-center gap-2 sm:gap-4">

        {/* Customer location */}

        {isCustomer && (
          <button
            type="button"
            onClick={getCurrentLocation}
            className="hidden items-center gap-2 rounded-lg
              px-2 py-1 hover:bg-gray-50 sm:flex"
          >
            <MapPin
              size={16}
              className="text-[#0F9D74]"
              strokeWidth={1.8}
            />

            <div className="text-left">
              <p className="text-[8px] text-gray-400">
                Deliver to
              </p>

              <p className="max-w-[100px] truncate text-[10px]
                font-semibold text-[#102A43]">
                {location.loading
                  ? "Locating..."
                  : location.city}
              </p>
            </div>
          </button>
        )}

        {/* Customer cart */}

        {isCustomer && (
          <Link
            to="/cart"
            aria-label="Cart"
            className="text-gray-500 hover:text-[#0F9D74]"
          >
            <ShoppingCart size={18} strokeWidth={1.8} />
          </Link>
        )}

        {/* Notifications */}

        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowNotifications((prev) => !prev);
            }}
            aria-label="Open notifications"
            aria-expanded={showNotifications}
            className="relative text-gray-500 hover:text-[#0F9D74]"
          >
            <Bell size={19} strokeWidth={1.8} />

            {unreadCount > 0 && (
              <span className="absolute -right-2 -top-2 flex
                h-4 min-w-4 items-center justify-center
                rounded-full bg-red-500 px-1 text-[9px]
                font-semibold text-white">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <>
              {/* Close dropdown when clicking outside */}
              <button
                type="button"
                aria-label="Close notifications"
                onClick={() => setShowNotifications(false)}
                className="fixed inset-0 z-40 cursor-default"
              />

              <div className="absolute right-0 top-8 z-50
                w-80 max-w-[90vw] overflow-hidden rounded-xl
                border border-gray-100 bg-white shadow-xl">

                <div className="flex items-center justify-between
                  border-b p-3">
                  <h3 className="text-sm font-semibold text-[#102A43]">
                    Notifications
                  </h3>

                  {unreadCount > 0 && (
                    <button
                      type="button"
                      onClick={handleMarkAllRead}
                      className="text-[10px] font-medium
                        text-[#0F9D74] hover:underline"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto">
                  {notificationsLoading ? (
                    <p className="p-4 text-center text-xs text-gray-500">
                      Loading notifications...
                    </p>
                  ) : notifications.length === 0 ? (
                    <p className="p-4 text-center text-xs text-gray-500">
                      No notifications yet
                    </p>
                  ) : (
                    notifications.slice(0, 5).map((notification) => (
                      <button
                        key={notification._id}
                        type="button"
                        onClick={() =>
                          handleNotificationClick(notification)
                        }
                        className={`w-full border-b px-3 py-3
                          text-left hover:bg-[#F0FBF7] ${
                            !notification.isRead
                              ? "bg-[#F0FBF7]"
                              : "bg-white"
                          }`}
                      >
                        <div className="flex items-start gap-2">
                          {!notification.isRead && (
                            <span className="mt-1.5 h-2 w-2
                              shrink-0 rounded-full bg-[#0F9D74]" />
                          )}

                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-semibold
                              text-[#102A43]">
                              {notification.title}
                            </p>

                            <p className="mt-1 text-[11px] text-gray-600">
                              {notification.message}
                            </p>

                            <p className="mt-1 text-[9px] text-gray-400">
                              {new Date(
                                notification.createdAt
                              ).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* User profile */}

        <Link
          to={profilePath}
          className="flex items-center gap-2 rounded-lg
            px-1 py-1 transition hover:bg-gray-50 sm:px-2"
        >
          <div className="flex h-8 w-8 shrink-0 items-center
            justify-center overflow-hidden rounded-full bg-[#E8F8F2]
            sm:h-9 sm:w-9">

            {user?.profilePhoto ? (
              <img
                src={user.profilePhoto}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <UserRound
                size={18}
                className="text-[#0F9D74]"
                strokeWidth={1.8}
              />
            )}
          </div>

          <div className="hidden text-left sm:block">
            <p className="max-w-[120px] truncate text-[10px]
              font-semibold text-[#102A43]">
              Hi, {user?.name || "User"}
            </p>

            <p className="text-[9px] capitalize text-gray-500">
              {user?.role || "Loading..."}
            </p>
          </div>
        </Link>
      </div>
    </header>
  );
}
