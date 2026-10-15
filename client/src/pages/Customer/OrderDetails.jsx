import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import Sidebar from "../../components/customer/Sidebar";
import TopNavbar from "../../components/customer/TopNavbar";

import { getOrderDetails } from "../../redux/slices/orderSlice";

// Order components
import OrderPharmacyDetails from "../../components/customer/Orders/OrderPharmacyDetails";
import OrderedMedicines from "../../components/customer/Orders/OrderedMedicines";
import OrderDeliveryAddress from "../../components/customer/Orders/OrderDeliveryAddress";
import PaymentDetails from "../../components/customer/Orders/PaymentDetails";
import OrderSummary from "../../components/customer/Orders/OrderSummary";
import OrderTracking from "../../components/customer/OrderTracking";

const OrderDetails = () => {
  const { orderId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // =====================================================
  // REDUX
  // =====================================================

  const {
    selectedOrder,
    orderDetailsLoading,
    orderDetailsError,
  } = useSelector((state) => state.orders);

  // =====================================================
  // GET ORDER DETAILS
  // =====================================================

  useEffect(() => {
    if (orderId) {
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, orderId]);

  // =====================================================
  // LOADING
  // =====================================================

  if (orderDetailsLoading) {
    return (
      <div className="min-h-screen bg-[#F7F9FA] md:flex">
        <Sidebar />

        <div className="min-w-0 flex-1">
          <TopNavbar />

          <div className="flex min-h-[500px] items-center justify-center">
            <p className="text-xs text-gray-500">
              Loading order details...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (orderDetailsError) {
    return (
      <div className="min-h-screen bg-[#F7F9FA] md:flex">
        <Sidebar />

        <div className="min-w-0 flex-1">
          <TopNavbar />

          <div className="flex min-h-[500px] flex-col items-center justify-center">
            <p className="text-xs text-red-500">
              {orderDetailsError}
            </p>

            <button
              type="button"
              onClick={() => navigate("/orders")}
              className="mt-3 text-xs text-[#0F9D74]"
            >
              ← Back to Orders
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =====================================================
  // NO ORDER
  // =====================================================

  if (!selectedOrder) {
    return (
      <div className="min-h-screen bg-[#F7F9FA] md:flex">
        <Sidebar />

        <div className="min-w-0 flex-1">
          <TopNavbar />

          <div className="flex min-h-[500px] items-center justify-center">
            <p className="text-xs text-gray-500">
              Order not found
            </p>
          </div>
        </div>
      </div>
    );
  }

  const order = selectedOrder;

  // =====================================================
  // STATUS
  // =====================================================

  const statusLabels = {
    pending: "Processing",
    accepted: "Accepted",
    preparing: "Preparing",
    packed: "Packed",
    out_for_delivery: "Shipped",
    delivered: "Delivered",
    cancelled: "Cancelled",
  };

  const statusLabel =
    statusLabels[order.orderStatus] || order.orderStatus;

  // =====================================================
  // DATE
  // =====================================================

  const orderDate = order.createdAt
    ? new Date(order.createdAt).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "-";

  return (
    <div className="min-h-screen bg-[#F7F9FA] md:flex">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="min-w-0 flex-1">
        <TopNavbar />

        <main className="p-3 sm:p-4 lg:p-5">

          {/* =====================================================
              BACK
          ===================================================== */}

          <button
            type="button"
            onClick={() => navigate("/orders")}
            className="mb-3 flex items-center gap-1 text-[10px] font-medium text-[#0F9D74]"
          >
            <ArrowLeft size={13} />
            Back to My Orders
          </button>

          {/* =====================================================
              PAGE HEADER
          ===================================================== */}

          <div className="mb-4 flex items-center justify-between">

            <div>
              <h1 className="text-xl font-semibold text-gray-800">
                Order Details
              </h1>

              {/* <p className="mt-1 text-[10px] text-gray-400">
                Order #{order.orderNumber}
              </p>

              <p className="mt-1 text-[9px] text-gray-400">
                {orderDate}
              </p> */}
            </div>

            {/* STATUS */}

            <span
              className={`rounded-full px-4 py-1.5 text-[9px] font-medium ${
                order.orderStatus === "cancelled"
                  ? "bg-red-50 text-red-500"
                  : order.orderStatus === "delivered"
                  ? "bg-[#DFF6EE] text-[#0F9D74]"
                  : "bg-yellow-50 text-yellow-600"
              }`}
            >
              {statusLabel}
            </span>

          </div>

          {/* =====================================================
              ORDER INFORMATION
          ===================================================== */}

          <section className="mb-4 rounded-xl border border-gray-200 bg-white p-4">

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">

              {/* ORDER ID */}

              <div>
                <p className="text-[8px] text-gray-400">
                  Order ID
                </p>

                <p className="mt-1 text-[10px] font-semibold text-gray-800">
                  #{order.orderNumber}
                </p>
              </div>

              {/* ORDER DATE */}

              <div>
                <p className="text-[8px] text-gray-400">
                  Order Date
                </p>

                <p className="mt-1 text-[9px] text-gray-700">
                  {orderDate}
                </p>
              </div>

              {/* PAYMENT */}

              <div>
                <p className="text-[8px] text-gray-400">
                  Payment Status
                </p>

                <p className="mt-1 text-[9px] capitalize text-gray-700">
                  {order.paymentStatus || "Pending"}
                </p>
              </div>

              {/* DELIVERY */}

              <div>
                <p className="text-[8px] text-gray-400">
                  Delivery
                </p>

                <p className="mt-1 text-[9px] capitalize text-gray-700">
                  {order.deliveryMethod || "-"}
                </p>
              </div>

            </div>

          </section>

          {/* =====================================================
              PHARMACY
          ===================================================== */}

          <div className="mb-4">
            <OrderPharmacyDetails
              pharmacy={order.pharmacy}
            />
          </div>

          {/* =====================================================
              ORDERED MEDICINES
          ===================================================== */}

          <div className="mb-4">
            <OrderedMedicines
              items={order.items}
            />
          </div>

          {/* =====================================================
              ADDRESS + PAYMENT + SUMMARY
          ===================================================== */}

          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">

            {/* DELIVERY ADDRESS */}

            <OrderDeliveryAddress
              address={order.address}
            />

            {/* PAYMENT */}

            <PaymentDetails
              paymentStatus={order.paymentStatus}
              deliveryMethod={order.deliveryMethod}
            />

            {/* SUMMARY */}

            <OrderSummary
              subtotal={order.subtotal}
              deliveryFee={order.deliveryFee}
              totalAmount={order.totalAmount}
            />

          </div>

          {/* =====================================================
              ORDER TRACKING
          ===================================================== */}

          <OrderTracking
            orderId={order.orderNumber || order._id}
            orderStatus={order.orderStatus}
          />

        </main>
      </div>
    </div>
  );
};

export default OrderDetails;