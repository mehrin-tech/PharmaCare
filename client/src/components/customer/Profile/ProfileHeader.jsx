import { useEffect, useState,useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Mail, Phone, MapPin, Camera } from "lucide-react";
import api from "../../../services/api";
import { getMyOrders } from "../../../redux/slices/orderSlice";
import { fetchWishlist } from "../../../redux/slices/wishlistSlice";
import { getAddresses } from "../../../redux/slices/addressSlice";
const ProfileHeader = () => {
    const dispatch=useDispatch()

    
    const [profile, setProfile] = useState(null);
     const [profileLoading, setProfileLoading] = useState(true);

     const orders=useSelector((state)=>state.orders.orders)
     const wishlistItems=useSelector((state)=>state.wishlist.items)
     const addresses=useSelector((state)=>state.address.addresses)

     const orderCount=orders.length
     const wishlistCount=wishlistItems.length

     const defaultAddress=useMemo(()=>
    addresses.find((address)=>address.isDefault===true)  || addresses[0] || null,[addresses])
   

    useEffect(() => {
        dispatch(getMyOrders());
        dispatch(fetchWishlist());
        dispatch(getAddresses());

        let active = true;

        const fetchProfile = async () => {
            try {
                const response = await api.get("/auth/me");

                if (!active) return;

                const user =
                    response.data.user ||
                    response.data.profile?.user ||
                    response.data.profile;

                setProfile(user || null);
            } catch (error) {
                console.error(
                    "Profile API error:",
                    error.response?.status,
                    error.response?.data || error.message
                );
            } finally {
                if (active) setProfileLoading(false);
            }
        };

        fetchProfile();

        return () => {
            active = false;
        };
    }, [dispatch]);

    if (profileLoading) {
        return (
            <div className="rounded-xl border bg-white p-6">
                Loading profile...
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="rounded-xl border bg-white p-6">
                Failed to load profile. Please check the console.
            </div>
        );
    }

    // Keep your existing JSX below this line.

    return (
        <div className="bg-white rounded-xl border p-4 sm:p-6 flex flex-col md:flex-row justify-between gap-6">

            {/* =========================
                LEFT SIDE
            ========================= */}

            <div className="flex items-center gap-4 sm:gap-5">

                {/* PROFILE IMAGE */}

                <div className="relative shrink-0">

                    <img
                        src={
                            profile.profilePhoto ||
                            "/profile.png"
                        }
                        alt="Profile"
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border"
                    />


                </div>

                {/* USER INFO */}

                <div className="min-w-0">

                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 truncate">
                        {profile.name}
                    </h2>

                    <p className="text-sm text-gray-500 mb-3 capitalize">
                        {profile.role}
                    </p>

                    <div className="space-y-1.5 text-sm text-gray-600">

                        {/* EMAIL */}

                        <p className="flex items-center gap-2">
                            <Mail
                                size={15}
                                className="shrink-0"
                            />

                            <span className="truncate">
                                {profile.email}
                            </span>
                        </p>

                        {/* PHONE */}

                        <p className="flex items-center gap-2">
                            <Phone
                                size={15}
                                className="shrink-0"
                            />

                            <span>
                                {profile.phone || "Phone not added"}
                            </span>
                        </p>

                        {/* LOCATION */}

                        <p className="flex items-center gap-2">
                            <MapPin
                                size={15}
                                className="shrink-0"
                            />

                            <span>
                                {defaultAddress
                                    ? `${defaultAddress.city}, ${defaultAddress.state}`
                                    : "Add delivery address"}
                            </span>
                        </p>

                    </div>

                </div>

            </div>

            {/* =========================
                STATISTICS
            ========================= */}

            <div className="flex gap-3 sm:gap-4">

                {/* TOTAL ORDERS */}

                <div className="bg-emerald-50 rounded-xl px-5 sm:px-8 py-4 sm:py-5 text-center flex-1 md:flex-none">

                    <p className="text-xs text-gray-500 whitespace-nowrap">
                        Total Orders
                    </p>

                    <p className="text-2xl font-bold text-gray-800 mt-1">
                        {orderCount}
                    </p>

                </div>

                {/* WISHLIST */}

                <div className="bg-emerald-50 rounded-xl px-5 sm:px-8 py-4 sm:py-5 text-center flex-1 md:flex-none">

                    <p className="text-xs text-gray-500 whitespace-nowrap">
                        Wishlist Items
                    </p>

                    <p className="text-2xl font-bold text-gray-800 mt-1">
                        {wishlistCount}
                    </p>

                </div>

            </div>

        </div>
    );
};

export default ProfileHeader;
