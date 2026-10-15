
import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TopNavbar from "../../components/customer/TopNavbar";
import Sidebar from "../../components/customer/Sidebar";

import {
  fetchWishlist,
  removeFromWishlist,
} from "../../redux/slices/wishlistSlice";

import WishlistCard from "../../components/customer/Wishlist/WishlistCard";
import { addToCart } from "../../redux/slices/cartSlice";

const Wishlist = () => {
  const dispatch = useDispatch();
 

  const {
    items: wishlistItems,
    loading,
    error,
  } = useSelector((state) => state.wishlist);

 
  

  // ================= FETCH WISHLIST =================

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  // ================= REMOVE =================

  const handleRemove = (item) => {
    dispatch(removeFromWishlist(item.medicine._id));
    console.log("Remove:", item);
  };

  // ================= ADD TO CART =================

  const handleAddToCart = (medicineId) => {
    dispatch(
      addToCart({
        medicineId,
        quantity: 1,
      })
    );

    console.log("Add to cart:", medicineId);
  };

  console.log("wishlist items:", wishlistItems);

  return (
    // <div className="min-h-screen bg-[#F7F9FA] md:flex text-[#102A43]">
    <div className="min-h-screen bg-[#F7F9FA] md:flex">

      {/* ================= SIDEBAR ================= */}

      <Sidebar />

      {/* ================= MAIN AREA ================= */}

      <main className="flex-1 min-w-0">

        {/* ================= TOP NAVBAR ================= */}

        <TopNavbar />

        {/* ================= CONTENT ================= */}

        <div className="w-full px-5 py-6 md:px-5">

          {/* ================= BREADCRUMB ================= */}

         


          {/* ================= PAGE HEADER ================= */}

          <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">

            <div>

              <h1 className="text-[22px] sm:text-[24px] font-bold text-[#102A43]">
                My Wishlist
              </h1>

              <p className="mt-1 text-[10px] sm:text-[11px] text-gray-500">
                You saved medicines & healthcare products
              </p>

            </div>

            {!loading && wishlistItems.length > 0 && (
              <div className="flex items-center gap-2">

                <div className="flex h-8 min-w-[32px] items-center justify-center rounded-lg bg-[#E8F8F2] px-2">

                  <span className="text-[11px] font-semibold text-[#0F9D74]">
                    {wishlistItems.length}
                  </span>

                </div>

                <span className="text-[10px] text-gray-500">
                  Saved items
                </span>

              </div>
            )}

          </div>


          {/* ================= LOADING ================= */}

          {loading && (
            <div className="rounded-2xl border border-gray-100 bg-white py-20 text-center shadow-sm">

              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#E8F8F2]">

                <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#0F9D74]/20 border-t-[#0F9D74]" />

              </div>

              <p className="text-[11px] font-medium text-[#102A43]">
                Loading wishlist...
              </p>

              <p className="mt-1 text-[9px] text-gray-400">
                Please wait while we fetch your saved items.
              </p>

            </div>
          )}


          {/* ================= ERROR ================= */}

          {error && (
            <div className="mb-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3">

              <div className="flex items-center gap-2">

                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-100">

                  <span className="text-[12px] text-red-500">
                    !
                  </span>

                </div>

                <div>

                  <p className="text-[10px] font-semibold text-red-600">
                    Something went wrong
                  </p>

                  <p className="mt-0.5 text-[9px] text-red-500">
                    {error}
                  </p>

                </div>

              </div>

            </div>
          )}


          {/* ================= EMPTY WISHLIST ================= */}

          {!loading &&
            wishlistItems.length === 0 &&
            !error && (
              <div className="rounded-2xl border border-gray-100 bg-white px-5 py-20 text-center shadow-sm">

                {/* Heart */}

                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F8F2]">

                  <span className="text-[30px] text-[#0F9D74]">
                    ♡
                  </span>

                </div>

                <h2 className="text-[15px] font-semibold text-[#102A43]">
                  Your wishlist is empty
                </h2>

                <p className="mx-auto mt-2 max-w-[320px] text-[10px] leading-5 text-gray-400">
                  Save your favorite medicines and healthcare
                  products here for quick access later.
                </p>

              </div>
            )}


          {/* ================= WISHLIST CONTENT ================= */}

          {!loading &&
            wishlistItems.length > 0 && (

              <div>

                {/* ================= TOOLBAR ================= */}

                {/* <div className="mb-5 rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm">

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                    {/* SELECT ALL */}

                    {/* <label className="flex cursor-pointer items-center gap-2.5">

                      <input
                        type="checkbox"
                        className="
                          h-[15px]
                          w-[15px]
                          cursor-pointer
                          rounded
                          border-gray-300
                          accent-[#0F9D74]
                          focus:ring-0
                        "
                      />

                      <span className="text-[10px] font-medium text-gray-600">
                        Select All
                      </span>

                    </label> */}


                    {/* RIGHT SIDE */}

                    {/* <div className="flex items-center justify-between sm:justify-end gap-3">

                      <span className="text-[9px] text-gray-400">
                        {wishlistItems.length} items
                      </span> */}

                      {/* SORT */}

                      {/* <div className="flex items-center gap-2">

                        <span className="text-[9px] text-gray-400">
                          Sort by
                        </span>

                        <select value={sortBy} onChange={(e)=>setSortBy(e.target.value)}
                          className="
                            h-[30px]
                            min-w-[125px]
                            rounded-lg
                            border
                            border-gray-200
                            bg-white
                            px-3
                            text-[9px]
                            text-gray-600
                            outline-none
                            transition
                            hover:border-gray-300
                            focus:border-[#0F9D74]
                            focus:ring-1
                            focus:ring-[#0F9D74]/20
                          "
                        > */}

                          {/* <option value="recent">
                            Recently Added
                          </option>

                          <option value="low">
                            Price: Low to High
                          </option>

                          <option value="high">
                            Price: High to Low
                          </option>

                        </select>

                      </div>

                    </div>

                  </div>

                </div>  */}


                {/* ================= WISHLIST CARDS ================= */}

                <div className="space-y-3">
{/*  */}
                  {wishlistItems.map((item) => (

                    <WishlistCard
                      key={item._id}
                      item={item}
                      onRemove={handleRemove}
                      onAddToCart={handleAddToCart}
                    />

                  ))}

                </div>

              </div>
            )}

        </div>

      </main>

    </div>
  );
};

export default Wishlist;