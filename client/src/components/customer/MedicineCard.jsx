

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import {
    Heart,
    MapPin,
    Clock3,
    Star,
    ShoppingCart,
} from "lucide-react";

import ApolloImg from "../../assets/Appollo.png";
import medplusImg from "../../assets/Medplus.png";
import LifeCareImg from "../../assets/Lifecare.png";
import paracetamolImg from "../../assets/paracetamol.png";
import DoloImg from "../../assets/Dolo.png";

import api from "../../services/api";

export default function MedicineCard({ medicine }) {
    const dispatch = useDispatch()

   

    const medicineId = medicine?._id;

   

    const [isWishlisted, setIswishlisted] = useState(false);
    const [wishlistLoading, setWishlistLoading] = useState(false);

  

    useEffect(() => {

        if (!medicineId) return;

        const checkWishlist = async () => {

            try {

                const response = await api.get("/wishlist/my");

                const wishlistData =
                    response.data?.wishlist || [];

                // Supports both:
                // wishlist: []
                // wishlist: { items: [] }

                const wishlistItems =
                    Array.isArray(wishlistData)
                        ? wishlistData
                        : wishlistData.items || [];

                const exists = wishlistItems.some(
                    (item) =>
                        item?.medicine?._id === medicineId ||
                        item?.medicine === medicineId
                );

                setIswishlisted(exists);

            } catch (error) {

                console.error(
                    "Wishlist fetch error:",
                    error.response?.data || error.message
                );

            }

        };

        checkWishlist();

    }, [medicineId]);

    if (!medicine) {
        return null;
    }

    // =========================================
    // WISHLIST
    // =========================================

    const handleWishlist = async () => {

        if (!medicineId || wishlistLoading) {
            return;
        }

        try {

            setWishlistLoading(true);

            if (!isWishlisted) {

                // ADD TO WISHLIST

                await api.post("/wishlist", {
                    medicineId: medicineId,
                });

                setIswishlisted(true);

            } else {

                // REMOVE FROM WISHLIST

                await api.delete(
                    `/wishlist/${medicineId}`
                );

                setIswishlisted(false);
            }

        } catch (error) {

            console.error(
                "Wishlist Error:",
                error.response?.data || error.message
            );

        } finally {

            setWishlistLoading(false);

        }
    };

    // =========================================
    // MEDICINE IMAGE
    // =========================================

    const medicineImage =
        medicine?.image ||
        (
            medicine?.name
                ?.toLowerCase()
                .includes("dolo")
                ? DoloImg
                : paracetamolImg
        );

    // =========================================
    // PHARMACY NAME
    // =========================================

    const pharmacyName =
        medicine?.pharmacy?.pharmacyName ||
        medicine?.pharmacyName ||
        "Pharmacy";

    // =========================================
    // PHARMACY LOGO
    // =========================================

    const pharmacyLogo =
        medicine?.pharmacyLogo ||
        (
            pharmacyName
                .toLowerCase()
                .includes("apollo")
                ? ApolloImg
                : pharmacyName
                    .toLowerCase()
                    .includes("medplus")
                    ? medplusImg
                    : pharmacyName
                        .toLowerCase()
                        .includes("lifecare")
                        ? LifeCareImg
                        : null
        );


    //handleaddtocart

    const handleAddToCart = async () => {
        if (!medicineId) {
            console.error("Medicine ID is missing");
            return;
        }
        try{
            const result =dispatch(
      addToCart({
        medicineId: medicineId,
        quantity: 1,
      })
    );

    console.log("Add to cart result:", result);

        }catch(error){
            console.error("Add to cart error:", error);

        }
    }
    // =========================================
    // RETURN
    // =========================================

    return (

        <div
            className="
                w-full
                max-w-[330px]
                h-[162px]
                bg-white
                rounded-xl
                shadow-md
                border
                border-gray-100
                px-3
                py-2.5
                relative
            "
        >

            {/* =====================================
                WISHLIST
            ====================================== */}

            <button
                type="button"
                onClick={handleWishlist}
                disabled={wishlistLoading}
                className="
                    absolute
                    top-2.5
                    right-3
                    text-[#102A43]
                    hover:text-[#0F9D74]
                    transition
                    disabled:opacity-50
                "
            >

                <Heart
                    size={16}
                    strokeWidth={1.8}
                    className={
                        isWishlisted
                            ? "fill-[#9B111E] text-[#9B111E]"
                            : "text-[#102A43] hover:text-[#9B111E]"
                    }
                />

            </button>

            {/* =====================================
                MEDICINE NAME
            ====================================== */}

            <h3
                className="
                    text-[11px]
                    font-semibold
                    text-[#102A43]
                    text-center
                    pr-5
                "
            >
                {medicine?.name || "Medicine"}
            </h3>

            <div className="flex gap-2 mt-1.5">

                {/* =================================
                    MEDICINE IMAGE
                ================================== */}

                <div
                    className="
                        w-[78px]
                        h-[85px]
                        shrink-0
                        flex
                        items-center
                        justify-center
                    "
                >

                    <img
                        src={medicineImage}
                        alt={medicine?.name || "Medicine"}
                        className="
                            w-[65px]
                            h-[75px]
                            object-contain
                        "
                    />

                </div>

                {/* =================================
                    DETAILS
                ================================== */}

                <div className="flex-1 min-w-0">

                    {/* CATEGORY + PRICE */}

                    <div
                        className="
                            flex
                            items-center
                            justify-between
                            gap-2
                        "
                    >

                        <span
                            className="
                                inline-flex
                                items-center
                                justify-center
                                bg-[#E8F8F2]
                                text-[#0F9D74]
                                rounded-full
                                px-4
                                py-1
                                text-[7px]
                                font-medium
                            "
                        >
                            {medicine?.category || "Tablets"}
                        </span>

                        {/* <span
                            className="
                                text-[13px]
                                font-bold
                                text-[#0F9D74]
                            "
                        >
                            ₹ {medicine?.price ?? 0}
                        </span> */}
                        <div className="flex items-center gap-1.5">

  {/* MRP */}
  {medicine?.mrp > medicine?.price && (
    <span className="text-[9px] text-gray-400 line-through">
      ₹{medicine?.mrp}
    </span>
  )}

  {/* Selling Price */}
  <span className="text-[13px] font-bold text-[#0F9D74]">
    ₹{medicine?.price ?? 0}
  </span>

</div>

                    </div>

                    {/* =================================
                        PHARMACY
                    ================================== */}

                    <div
                        className="
                            flex
                            items-center
                            gap-1
                            mt-1.5
                        "
                    >

                        {pharmacyLogo && (

                            <img
                                src={pharmacyLogo}
                                alt={pharmacyName}
                                className="
                                    w-[25px]
                                    h-[20px]
                                    object-contain
                                "
                            />

                        )}

                        <span
                            className="
                                text-[10px]
                                text-[#102A43]
                                truncate
                            "
                        >
                            {pharmacyName}
                        </span>

                    </div>

                    {/* =================================
                        RATING / DISTANCE / DELIVERY
                    ================================== */}

                    <div
                        className="
                            flex
                            items-center
                            gap-2
                            mt-1.5
                            text-[8px]
                            text-[#102A43]
                        "
                    >

                        {/* Rating */}

                        <div className="flex items-center gap-1">

                            <Star
                                size={14}
                                strokeWidth={1.6}
                                className="text-[#102A43]"
                            />

                            <span>
                                {medicine?.rating || "4.8"}
                            </span>

                        </div>

                        {/* Distance */}

                        <div className="flex items-center gap-1">

                            <MapPin
                                size={14}
                                strokeWidth={1.8}
                                className="text-gray-500"
                            />

                            <span>
                                {medicine?.distance !== undefined
                                    ? `${Number(
                                        medicine.distance
                                    ).toFixed(2)} km`
                                    : "-"
                                }
                            </span>

                        </div>

                        {/* Delivery */}

                        <div className="flex items-center gap-1">

                            <Clock3
                                size={14}
                                strokeWidth={1.8}
                                className="text-gray-500"
                            />

                            <span>
                                {medicine?.deliveryTime || "-"}
                            </span>

                        </div>

                    </div>

                    {/* =================================
                        BUTTONS
                    ================================== */}

                    <div
                        className="
                            flex
                            items-center
                            gap-2
                            mt-2
                        "
                    >

                        {/* VIEW DETAILS */}

                        <Link
                            to={`/medicines/${medicineId}`}
                            className="
                                h-[24px]
                                flex-1
                                flex
                                items-center
                                justify-center
                                border
                                border-[#0F9D74]
                                rounded-md
                                text-[7px]
                                font-medium
                                text-[#0F9D74]
                                hover:bg-[#E8F8F2]
                                transition
                            "
                        >
                            View Details
                        </Link>

                        {/* ADD TO CART */}



                        <button onClick={handleAddToCart}
                            type="button"
                            className="
                                h-[24px]
                                px-2.5
                                flex
                                items-center
                                justify-center
                                gap-1
                                bg-[#0F9D74]
                                text-white
                                rounded-md
                                text-[7px]
                                font-semibold
                                hover:bg-[#0c8965]
                                transition
                                cursor-pointer
                            "
                        >

                            <ShoppingCart size={11} />

                            Add to Cart

                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}
