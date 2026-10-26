import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import {
  ChevronRight,
  RotateCcw,
  Truck,
  XCircle,
} from "lucide-react";
import CancelOrderModal from "./CancelOrderModal";
import { cancelOrder } from "../../../redux/slices/orderSlice";

const OrderCard = ({ order }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showCancelModal, setShowCancelModal] = useState(false);

  const statusConfig = {
    pending: {
      label: "Processing",
      className: "bg-yellow-50 text-yellow-600",
    },

    accepted: {
      label: "Processing",
      className: "bg-yellow-50 text-yellow-600",
    },

    preparing: {
      label: "Processing",
      className: "bg-yellow-50 text-yellow-600",
    },

    packed: {
      label: "Processing",
      className: "bg-yellow-50 text-yellow-600",
    },

    out_for_delivery: {
      label: "Shipped",
      className: "bg-blue-50 text-blue-600",
    },

    delivered: {
      label: "Delivered",
      className: "bg-[#DFF6EE] text-[#0F9D74]",
    },

    cancelled: {
      label: "Cancelled",
      className: "bg-red-50 text-red-500",
    },
  };

  const status =
    statusConfig[order.orderStatus] || statusConfig.pending;

  // =========================
  // VIEW DETAILS
  // =========================

  const handleViewDetails = () => {
    navigate(`/orders/${order._id}`);
  };

  // =========================
  // TRACK ORDER
  // =========================

  const handleTrackOrder = () => {
    navigate(`/orders/${order._id}/track`);
  };

  // =========================
  // REORDER
  // =========================

  // const handleReorder = () => {
  //   console.log("Reorder:", order._id);
  // };


  const handleReorder = async () => {
  try {
    if (!order.items || order.items.length === 0) {
      console.error("No items found in this order");
      return;
    }

    for (const item of order.items) {
      const medicineId =
        item.medicine?._id ||
        item.medicineId ||
        item.medicine;

      if (!medicineId) {
        console.error("Medicine ID not found:", item);
        continue;
      }

      // Add each medicine to cart
      // Dispatch your cartSlice action here
      // Example:
      // await dispatch(addToCart({
      //   medicineId,
      //   quantity: item.quantity || 1,
      // })).unwrap();
    }

    navigate("/cart");
  } catch (error) {
    console.error("Reorder error:", error);
  }
};
  // =========================
  // CANCEL
  // =========================

  const handleCancel = () => {
    setShowCancelModal(true);
  };

  // =========================
  // CONFIRM CANCEL
  // =========================

 const handleConfirmCancel = async () => {
  try {
    await dispatch(
      cancelOrder(order._id)
    ).unwrap();

    setShowCancelModal(false);

  } catch (error) {
    console.error("Cancel order error:", error);
  }
};

  return (
    <>
      {/* ================= ORDER CARD ================= */}

      <div className="rounded-xl border border-gray-200 bg-white p-4">

        {/* ================= HEADER ================= */}

        <div className="flex items-start justify-between">

          <div>
            <p className="text-[9px] text-gray-400">
              Order ID
            </p>

            <p className="mt-1 text-xs font-semibold text-gray-800">
              #{order.orderNumber}
            </p>
          </div>

          <span
            className={`rounded-full px-3 py-1 text-[9px] font-medium ${status.className}`}
          >
            {status.label}
          </span>

        </div>


        {/* ================= DATE ================= */}

        <div className="mt-3 flex items-center gap-5">

          <div>
            <p className="text-[9px] text-gray-400">
              Placed on
            </p>

            <p className="mt-1 text-[9px] text-gray-600">
              {new Date(order.createdAt).toLocaleString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>

          <div>
            <p className="text-[9px] text-gray-400">
              Delivered on
            </p>

            <p className="mt-1 text-[9px] text-gray-600">
              {order.orderStatus === "delivered"
                ? "Delivered"
                : "Expected soon"}
            </p>
          </div>

        </div>


        {/* ================= MEDICINES ================= */}

        <div className="mt-4 flex items-center gap-4">

          <div className="flex min-w-0 flex-1 items-center gap-2">

            {order.items?.slice(0, 3).map((item, index) => (

              <div
                key={index}
                className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg bg-gray-50"
              >

                {item.image || item.medicine?.image ? (

                  <img
                    src={
                      item.image ||
                      item.medicine?.image
                    }
                    alt={
                      item.name ||
                      item.medicine?.name ||
                      "Medicine"
                    }
                    className="h-full w-full object-contain"
                  />

                ) : (

                  <div className="text-xl">
                    💊
                  </div>

                )}

              </div>

            ))}

          </div>


          {/* ================= TOTAL ================= */}

          <div className="text-right">

            <p className="text-[9px] text-gray-400">
              {order.items?.length || 0} items
            </p>

            <p className="mt-1 text-sm font-semibold text-[#0F9D74]">
              ₹{order.totalAmount}
            </p>

          </div>

        </div>


        {/* ================= PHARMACY ================= */}
{/* ================= PHARMACY ================= */}

<div className="mt-4 flex items-center gap-3 border-t border-gray-100 pt-3">

  {/* PHARMACY IMAGE */}
{console.log("PHARMACY DATA:", order.pharmacy)}
  <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-[#F0FBF7]">

    {order.pharmacy?.image ? (
      <img
        src={order.pharmacy.image}
        alt={order.pharmacy?.pharmacyName || "Pharmacy"}
        className="h-full w-full object-cover"
      />
    ) : (
      <span className="text-sm">
        🏥
      </span>
    )}

  </div>


  {/* PHARMACY NAME */}

  <div className="flex-1">

    <p className="text-[10px] font-semibold text-gray-700">
      {order.pharmacy?.pharmacyName ||
        "PharmaCare Pharmacy"}
    </p>

    <p className="mt-0.5 text-[9px] text-gray-400">
      Pharmacy
    </p>

  </div>

</div>


        {/* ================= ACTIONS ================= */}

        <div className="mt-4 flex items-center gap-2">

          {/* VIEW DETAILS */}

          <button
            type="button"
            onClick={handleViewDetails}
            className="rounded-md border border-[#0F9D74] px-3 py-1.5 text-[9px] font-medium text-[#0F9D74] transition hover:bg-[#F0FBF7]"
          >
            View Details
          </button>


          {/* ================= DELIVERED ================= */}

          {order.orderStatus === "delivered" && (

            <button
              type="button"
              onClick={handleReorder}
              className="flex items-center gap-1 rounded-md border border-[#0F9D74] px-3 py-1.5 text-[9px] font-medium text-[#0F9D74]"
            >
              <RotateCcw size={10} />
              Reorder
            </button>

          )}


          {/* ================= SHIPPING ================= */}

          {order.orderStatus === "out_for_delivery" && (

            <button
              type="button"
              onClick={handleTrackOrder}
              className="flex items-center gap-1 rounded-md bg-[#0F9D74] px-3 py-1.5 text-[9px] font-medium text-white"
            >
              <Truck size={10} />
              Track Order
            </button>

          )}


          {/* ================= PROCESSING ================= */}

          {[
            "pending",
            "accepted",
            "preparing",
            "packed",
          ].includes(order.orderStatus) && (

            <button
              type="button"
              onClick={handleCancel}
              className="flex items-center gap-1 rounded-md border border-red-200 px-3 py-1.5 text-[9px] font-medium text-red-500"
            >
              <XCircle size={10} />
              Cancel Order
            </button>

          )}


          {/* ================= ARROW ================= */}

          <button
            type="button"
            onClick={handleViewDetails}
            className="ml-auto text-gray-400 hover:text-[#0F9D74]"
          >
            <ChevronRight size={16} />
          </button>

        </div>

      </div>


      {/* ================= CANCEL MODAL ================= */}

      {showCancelModal && (

        <CancelOrderModal
          order={order}
          onClose={() => setShowCancelModal(false)}
          onConfirm={handleConfirmCancel}
        />

      )}

    </>
  );
};

export default OrderCard;