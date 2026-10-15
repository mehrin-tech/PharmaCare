import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { trackOrder } from "../../../redux/slices/orderSlice";

const OrderTracking = () => {

  const dispatch = useDispatch();
  const { orderId } = useParams();
  const navigate = useNavigate();


  // =========================
  // REDUX
  // =========================

  const {
    trackingOrder,
    trackingLoading,
    trackingError
  } = useSelector((state) => state.orders);


  // =========================
  // GET ORDER TRACKING
  // =========================

  useEffect(() => {

    if (orderId) {
      dispatch(trackOrder(orderId));
    }

  }, [dispatch, orderId]);


  // =========================
  // LOADING
  // =========================

  if (trackingLoading) {

    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F9FA]">

        <p className="text-sm text-gray-500">
          Loading order tracking...
        </p>

      </div>
    );

  }


  // =========================
  // ERROR
  // =========================

  if (trackingError) {

    return (
      <div className="min-h-screen bg-[#F7F9FA] p-5">

        <div className="rounded-xl border border-red-200 bg-red-50 p-4">

          <p className="text-xs text-red-500">
            {trackingError}
          </p>

          <button
            type="button"
            onClick={() => navigate("/my-orders")}
            className="mt-3 text-xs font-medium text-[#0F9D74]"
          >
            Back to My Orders
          </button>

        </div>

      </div>
    );

  }


  // =========================
  // ORDER
  // =========================

  const order = trackingOrder?.order || trackingOrder;


  if (!order) {
    return null;
  }


  // =========================
  // CURRENT STATUS
  // =========================

  const currentStatus =
    order.orderStatus || "pending";


  // =========================
  // TRACKING STEPS
  // =========================

  const trackingSteps = [

    {
      id: "pending",
      title: "Order Placed",
    },

    {
      id: "accepted",
      title: "Accepted",
    },

    {
      id: "preparing",
      title: "Preparing",
    },

    {
      id: "packed",
      title: "Packed",
    },

    {
      id: "out_for_delivery",
      title: "Out for Delivery",
    },

    {
      id: "delivered",
      title: "Delivered",
    },

  ];


  // =========================
  // CURRENT INDEX
  // =========================

  const currentIndex =
    trackingSteps.findIndex(
      (step) => step.id === currentStatus
    );


  return (

    <div className="min-h-screen bg-[#F7F9FA] p-4">


      {/* =========================
          HEADER
      ========================= */}

      <div className="mb-5 flex items-center justify-between">

        <div>

          <h1 className="text-xl font-semibold text-gray-800">
            Track Your Order
          </h1>

          <p className="mt-1 text-xs text-gray-500">
            Order #{order.orderNumber || orderId}
          </p>

        </div>


        <button
          type="button"
          onClick={() => navigate("/my-orders")}
          className="text-xs font-medium text-[#0F9D74]"
        >
          View All Orders
        </button>

      </div>


      {/* =========================
          CURRENT STATUS
      ========================= */}

      <div className="mb-5 rounded-xl border border-gray-200 bg-white p-4">

        <p className="text-[10px] text-gray-400">
          Current Status
        </p>

        <p className="mt-1 text-sm font-semibold text-[#0F9D74]">

          {currentStatus === "pending" &&
            "Order Placed"}

          {currentStatus === "accepted" &&
            "Order Accepted"}

          {currentStatus === "preparing" &&
            "Preparing Your Order"}

          {currentStatus === "packed" &&
            "Order Packed"}

          {currentStatus === "out_for_delivery" &&
            "Out for Delivery"}

          {currentStatus === "delivered" &&
            "Delivered"}

          {currentStatus === "cancelled" &&
            "Order Cancelled"}

        </p>

      </div>


      {/* =========================
          TRACKING
      ========================= */}

      <div className="rounded-xl border border-gray-200 bg-white p-6">

        <div className="flex items-center">

          {trackingSteps.map((step, index) => {

            const completed =
              index <= currentIndex;

            const active =
              step.id === currentStatus;


            return (

              <React.Fragment key={step.id}>

                {/* STEP */}

                <div className="flex flex-1 flex-col items-center">

                  {/* CIRCLE */}

                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full border-2 ${
                      completed
                        ? "border-[#0F9D74] bg-[#0F9D74]"
                        : "border-gray-300 bg-white"
                    }`}
                  >

                    {completed ? (

                      <span className="text-xs font-bold text-white">
                        ✓
                      </span>

                    ) : (

                      <span className="h-2 w-2 rounded-full bg-gray-300" />

                    )}

                  </div>


                  {/* TITLE */}

                  <p
                    className={`mt-2 text-center text-[9px] ${
                      active
                        ? "font-semibold text-[#0F9D74]"
                        : completed
                        ? "text-gray-600"
                        : "text-gray-400"
                    }`}
                  >
                    {step.title}
                  </p>

                </div>


                {/* LINE */}

                {index < trackingSteps.length - 1 && (

                  <div
                    className={`h-[2px] flex-1 ${
                      index < currentIndex
                        ? "bg-[#0F9D74]"
                        : "bg-gray-200"
                    }`}
                  />

                )}

              </React.Fragment>

            );

          })}

        </div>

      </div>


      {/* =========================
          CANCELLED
      ========================= */}

      {currentStatus === "cancelled" && (

        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4">

          <p className="text-xs font-semibold text-red-600">
            Order Cancelled
          </p>

          <p className="mt-1 text-[10px] text-red-500">
            This order has been cancelled.
          </p>

        </div>

      )}

    </div>

  );

};

export default OrderTracking;