import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Sidebar from "../../components/customer/Sidebar";
import TopNavbar from "../../components/customer/TopNavbar";

import {
  fetchCart,
  updateCartQuantity,
  removeCart,
} from "../../redux/slices/cartSlice";

import CartInfoBanner from "../../components/customer/Cart/CartInfoBanner";
import CartItems from "../../components/customer/Cart/CartItems";
import OrderSummary from "../../components/customer/Cart/OrderSummary";
import CartFeatures from "../../components/customer/Cart/CartFeatures";

const Cart = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const dispatch = useDispatch();

  const { cart, loading, error } = useSelector(
    (state) => state.cart
  );

  // Fetch cart when page loads
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // Increase quantity
  const handleIncrease = (medicineId, quantity) => {
    dispatch(
      updateCartQuantity({
        medicineId,
        quantity: quantity + 1,
      })
    );
  };

  // Decrease quantity
  const handleDecrease = (medicineId, quantity) => {
    if (quantity <= 1) return;

    dispatch(
      updateCartQuantity({
        medicineId,
        quantity: quantity - 1,
      })
    );
  };

  // Remove medicine
  const handleRemove = (medicineId) => {
    dispatch(removeCart(medicineId));
  };

  const items = cart?.items || [];

  return (
    <div className="min-h-screen bg-[#F7F9FA] md:flex">

      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main content */}
      <main className="flex-1 min-w-0">

        {/* Navbar */}
        <TopNavbar
          setSidebarOpen={setSidebarOpen}
        />

        {/* Page content */}
        <div className="p-3 sm:p-4 lg:p-5">

          {/* Cart heading */}
          {!loading && (
            <h1 className="text-lg sm:text-xl font-semibold text-[#102A43] mb-3">
              My Cart ({items.length}{" "}
              {items.length === 1 ? "item" : "items"})
            </h1>
          )}

          {/* Verified pharmacy banner */}
          <CartInfoBanner />

          {/* Loading */}
          {loading && (
            <div className="flex justify-center items-center py-10">
              <p className="text-sm text-gray-500">
                Loading cart...
              </p>
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div className="bg-red-50 border border-red-100 rounded-lg p-4 mt-4">
              <p className="text-sm text-red-500 text-center">
                {error}
              </p>
            </div>
          )}

          {/* Cart content */}
          {!loading && !error && (
            <div className="mt-4">

              {/* 
                Desktop:
                Left  → Cart items
                Right → Order summary + features

                Mobile:
                Cart items
                ↓
                Order summary
                ↓
                Features
              */}
              <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_350px] gap-4 lg:gap-5">

                {/* LEFT SIDE - CART ITEMS */}
                <section className="min-w-0">
                  <CartItems
                    items={items}
                    onIncrease={handleIncrease}
                    onDecrease={handleDecrease}
                    onRemove={handleRemove}
                  />
                </section>

                {/* RIGHT SIDE */}
                <aside className="min-w-0 space-y-4">

                  {/* Order Summary */}
                  <div className="lg:sticky lg:top-20 space-y-4">

                    <OrderSummary
                      items={items}
                    />

                    {/* Features */}
                    <CartFeatures />

                  </div>

                </aside>

              </div>

            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default Cart;