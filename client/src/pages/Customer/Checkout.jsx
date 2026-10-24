import React,{useState} from "react";

import Sidebar from "../../components/customer/Sidebar";
import TopNavbar from "../../components/customer/TopNavbar";

import DeliveryAddress from "../../components/customer/Checkout/DeliveryAddress";
import SelectPharmacy from "../../components/customer/Checkout/SelectPharmacy";
import DeliveryOptions from "../../components/customer/Checkout/DeliveryOptions";
import PaymentMethods from "../../components/customer/Checkout/PaymentMethods";
import OrderSuccessModal from "../../components/customer/Checkout/OrderSuccessModal";
import OrderSummary from "../../components/customer/Cart/OrderSummary";
import {
  createPayment,
  paymentSuccess,
  paymentFailed
} from "../../redux/slices/paymentSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { fetchCart } from "../../redux/slices/cartSlice";

import {
  placeOrder,
  clearCheckoutError,
} from "../../redux/slices/checkoutSlice";

const Checkout = () => {

  const dispatch = useDispatch();
  const location = useLocation();

  const [paidOrder, setPaidOrder] = useState(null);

  const buyNowItem = location.state?.buyNowItem;

  const { cart } = useSelector((state) => state.cart);

  const cartItems = cart?.items || [];
  console.log("Checkout cart:", cart);
console.log("Checkout cart items:", cartItems);
console.log("First cart item:", cartItems[0]);
console.log("Medicine data:", cartItems[0]?.medicine);
console.log("Medicine price:", cartItems[0]?.medicine?.price);
  const deliveryCharge = 40;

  useEffect(() => {
    if (!buyNowItem) {
      dispatch(fetchCart());
    }
  }, [dispatch, buyNowItem]);

  const {
    selectedPharmacy,
    selectedDeliveryMethod,
    selectedPaymentMethod,
    order,
    loading,
    error,
    success,
  } = useSelector((state) => state.checkout);
  const { loading: paymentLoading } = useSelector((state) => state.payment)


  const handleRazorpayPayment = async (createdOrder) => {
  try {
    // 1. Load Razorpay checkout
    const loaded = await loadRazorpayScript();

    if (!loaded) {
      alert("Razorpay failed to load. Please try again.");
      return;
    }

    // 2. Create Razorpay order in backend
    const result = await dispatch(
      createPayment({
        orderId: createdOrder._id,
        paymentMethod: "razorpay",
      })
    ).unwrap();

    const { payment, razorpay } = result;

    // 3. Configure Razorpay checkout
    const options = {
      key: razorpay.keyId,
      amount: razorpay.amount,
      currency: razorpay.currency,

      name: "PharmaCare",
      description: "Medicine Order",

      order_id: razorpay.orderId,

      handler: async function (response) {
        try {
          // 4. Verify payment in backend
          const verification = await dispatch(
            paymentSuccess({
              paymentId: payment._id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            })
          ).unwrap();

          // 5. Show success only after verification
          setPaidOrder(verification.order);

        } catch (error) {
          console.error("Payment verification error:", error);

          alert(
            typeof error === "string"
              ? error
              : error?.message || "Payment verification failed."
          );
        }
      },

      modal: {
        ondismiss: function () {
          console.log("Razorpay checkout closed.");
        },
      },

      theme: {
        color: "#0F9D74",
      },
    };

    // 6. OPEN RAZORPAY CHECKOUT
    const razorpayInstance = new window.Razorpay(options);

    razorpayInstance.on("payment.failed", function (response) {
      console.error("Razorpay payment failed:", response.error);

      alert(
        response.error?.description ||
          "Payment failed. Please try again."
      );
    });

    razorpayInstance.open();

  } catch (error) {
    console.error("Razorpay initiation error:", error);

    alert(
      typeof error === "string"
        ? error
        : error?.message || "Unable to start payment."
    );
  }

  }

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");

    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
};

  

  
  // PLACE ORDER
  const handlePlaceOrder = async () => {

    // Pharmacy validation
    if (!selectedPharmacy) {
      alert("Please select a pharmacy");
      return;
    }

    // Payment validation
    if (!selectedPaymentMethod) {
      alert("Please select a payment method");
      return;
    }

    // Delivery validation
    if (!selectedDeliveryMethod) {
      alert("Please select a delivery method");
      return;
    }


  

   try {
  const result = await dispatch(
    placeOrder({
      pharmacyId: selectedPharmacy,
      deliveryMethod: selectedDeliveryMethod,
      paymentMethod: selectedPaymentMethod,
    })
  ).unwrap();

  console.log("ORDER RESPONSE:", result);

  // COD
  if (selectedPaymentMethod === "cod") {
    console.log("COD order created successfully");
    return;
  }

  // RAZORPAY
  if (selectedPaymentMethod === "razorpay") {
    await handleRazorpayPayment(result.order);
  }

} catch (error) {
  console.error("PLACE ORDER ERROR:", error);
}

  };


  return (
    <div className="min-h-screen bg-[#F7F9FA] md:flex">

      {/* SIDEBAR */}
      <Sidebar />


      {/* CONTENT */}
      <div className="flex-1 min-w-0">

        <TopNavbar />


        <main className="p-3 sm:p-4 lg:p-5">

          {/* HEADER */}
          <div className="mb-5">

            <h1 className="text-xl font-semibold text-gray-800">
              Checkout
            </h1>

            <p className="mt-1 text-xs text-gray-500">
              Complete your order in a few simple steps
            </p>

          </div>


          {/* ERROR */}
          {error && (
            <div className="mb-4 flex items-center justify-between rounded-lg bg-red-50 p-3 text-xs text-red-500">

              <span>
                {error}
              </span>

              <button
                type="button"
                onClick={() =>
                  dispatch(clearCheckoutError())
                }
                className="font-semibold"
              >
                ×
              </button>

            </div>
          )}


          {/* GRID */}
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_320px]">


            {/* LEFT */}
            <div className="space-y-4">

              <DeliveryAddress />

              <SelectPharmacy />

              <DeliveryOptions />

              <PaymentMethods />


              {/* PLACE ORDER */}
              {/* <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={loading}
                className="w-full rounded-lg bg-[#0F9D74] py-3 text-sm font-semibold text-white transition hover:bg-[#0c8c68] disabled:cursor-not-allowed disabled:opacity-60"
              >

                {loading
                  ? "Placing Order..."
                  : "Place Order"}

              </button> */}
              <button
  type="button"
  onClick={handlePlaceOrder}
  disabled={loading || paymentLoading}
  className="w-full rounded-lg bg-[#0F9D74] py-3 text-sm font-semibold text-white transition hover:bg-[#0c8c68] disabled:cursor-not-allowed disabled:opacity-60"
>
  {loading || paymentLoading
    ? "Processing..."
    : selectedPaymentMethod === "razorpay"
      ? "Pay Now"
      : "Place Order"}
</button>


              <p className="text-center text-[10px] text-gray-400">
                Safe & secure payment • 100% authentic medicines
              </p>

            </div>


            {/* RIGHT */}
            <div className="h-fit xl:sticky xl:top-20">

              <OrderSummary
                items={
                  buyNowItem
                    ? [
                      {
                        medicine: buyNowItem.medicine,
                        quantity: buyNowItem.quantity,
                      },
                    ]
                    : cartItems
                }
               // deliveryCharge={deliveryCharge}
                showActions={false}
              />

            </div>

          </div>

        </main>


        {/* SUCCESS MODAL */}
        {/* {success && order && (
          <OrderSuccessModal
            order={order}
            paymentMethod={selectedPaymentMethod}
          />
        )} */}

        {/* COD SUCCESS */}
{selectedPaymentMethod === "cod" && success && order && (
  <OrderSuccessModal
    order={order}
    paymentMethod="cod"
  />
)}

{/* RAZORPAY SUCCESS */}
{paidOrder && (
  <OrderSuccessModal
    order={paidOrder}
    paymentMethod="razorpay"
  />
)}

      </div>

    </div>
  );
};

export default Checkout;