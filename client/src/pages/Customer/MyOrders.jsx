import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Sidebar from "../../components/customer/Sidebar";
import TopNavbar from "../../components/customer/TopNavbar";

import { getMyOrders } from "../../redux/slices/orderSlice";

import OrderTabs from "../../components/customer/Orders/OrderTabs";
import OrderCard from "../../components/customer/Orders/OrderCard";
import Pagination from "../../components/Pagination/Pagination";
function MyOrders() {

  const dispatch = useDispatch();

  const { orders, loading, error,pagination } = useSelector(
    (state) => state.orders
  );

  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
const limit = 2

  // =========================
  // GET ORDERS
  // =========================

  useEffect(() => {
    dispatch(getMyOrders({
      page:currentPage,limit
    }));
  }, [dispatch,currentPage]);


  // =========================
  // FILTER ORDERS
  // =========================

  const filteredOrders = orders.filter((order) => {

    if (activeTab === "all") {
      return true;
    }

    if (activeTab === "processing") {
      return [
        "pending",
        "accepted",
        "preparing",
        "packed",
      ].includes(order.orderStatus);
    }

    if (activeTab === "shipping") {
      return order.orderStatus === "out_for_delivery";
    }

    if (activeTab === "delivered") {
      return order.orderStatus === "delivered";
    }

    if (activeTab === "cancelled") {
      return order.orderStatus === "cancelled";
    }

    return true;
  });


  console.log("MY ORDERS:", orders);


  return (
    <div className="min-h-screen bg-[#F7F9FA] md:flex">

      {/* SIDEBAR */}
      <Sidebar />


      {/* CONTENT AREA */}
      <div className="flex-1 min-w-0">

        {/* TOP NAVBAR */}
        <TopNavbar />


        {/* MAIN CONTENT */}
        <main className="p-3 sm:p-4 lg:p-5">


          {/* HEADER */}
          <div className="mb-5">

            <h1 className="text-xl font-semibold text-gray-800">
              My Orders
            </h1>

            <p className="mt-1 text-xs text-gray-500">
              Track, view & manage all your orders
            </p>

          </div>


          {/* TABS */}
          {/* <OrderTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          /> */}
          <OrderTabs
  activeTab={activeTab}
  setActiveTab={(tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  }}
/>


          {/* LOADING */}
          {loading && (
            <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">

              <p className="text-xs text-gray-500">
                Loading your orders...
              </p>

            </div>
          )}


          {/* ERROR */}
          {!loading && error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4">

              <p className="text-xs text-red-500">
                {error}
              </p>

            </div>
          )}


          {/* NO ORDERS AT ALL */}
          {!loading &&
            !error &&
            orders.length === 0 && (

              <div className="rounded-xl border border-gray-200 bg-white p-10 text-center">

                <div className="text-4xl">
                  📦
                </div>

                <h2 className="mt-3 text-sm font-semibold text-gray-800">
                  No Orders Found
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  You haven't placed any orders yet.
                </p>

              </div>

            )}


          {/* FILTERED ORDERS */}
          {!loading &&
            !error &&
            orders.length > 0 && (

              <div className="space-y-4">

                {filteredOrders.length > 0 ? (

                  filteredOrders.map((order) => (
                    <OrderCard
                      key={order._id}
                      order={order}
                    />
                    
                  ))


                ) : (

                  <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">

                    <div className="text-3xl">
                      📦
                    </div>

                    <p className="mt-3 text-sm font-medium text-gray-700">
                      No {activeTab} orders
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      There are no orders in this category.
                    </p>

                  </div>

                )}
                <Pagination
  currentPage={pagination.currentPage || currentPage}
  totalPages={pagination.totalPages || 0}
  totalItems={pagination.totalOrders || 0}
  limit={limit}
  onPageChange={setCurrentPage}
  loading={loading}
/>

              </div>

            )}

        </main>

      </div>

    </div>
  );
}

export default MyOrders;