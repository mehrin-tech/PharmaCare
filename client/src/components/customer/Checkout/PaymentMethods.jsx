
import React from "react";
import { useDispatch,useSelector } from "react-redux";
import { setSelectedPaymentMethod } from "../../../redux/slices/checkoutSlice";

const PaymentMethods = () => {
    const dispatch=useDispatch()
    const selectedPayment=useSelector((state)=>state.checkout.selectedPaymentMethod)

  const paymentMethods = [
    {
      id: "cod",
      title: "Cash on Delivery",
      description: "Pay when your order is delivered",
      icon: "💵",
    },
    {
      id: "razorpay",
      title: "Razorpay",
      description: "Pay securely using UPI, cards, or net banking",
      icon: "💳",
    },
  ];

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4">

      {/* HEADER */}
      <div className="mb-4">

        <h2 className="text-sm font-semibold text-gray-800">

          <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#0F9D74] text-xs text-white">
            4
          </span>

          Payment Method

        </h2>

        <p className="ml-7 mt-1 text-[10px] text-gray-500">
          Choose your preferred payment method
        </p>

      </div>


      {/* PAYMENT METHODS */}
      <div className="space-y-3">

        {paymentMethods.map((method) => {

          const isSelected =
            selectedPayment === method.id;

          return (

            <div
              key={method.id}
              onClick={() =>
                setSelectedPaymentMethod(method.id)
              }
              className={`cursor-pointer rounded-lg border p-4 transition ${
                isSelected
                  ? "border-[#0F9D74] bg-[#F0FBF7]"
                  : "border-gray-200 bg-white hover:border-[#BCE9D9]"
              }`}
            >

              <div className="flex items-center gap-3">

                {/* RADIO */}
                <div
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                    isSelected
                      ? "border-[#0F9D74]"
                      : "border-gray-300"
                  }`}
                >

                  {isSelected && (
                    <span className="h-2 w-2 rounded-full bg-[#0F9D74]" />
                  )}

                </div>


                {/* ICON */}
                <div className="text-lg">
                  {method.icon}
                </div>


                {/* DETAILS */}
                <div className="flex-1">

                  <h3 className="text-xs font-semibold text-gray-800">
                    {method.title}
                  </h3>

                  <p className="mt-1 text-[10px] text-gray-500">
                    {method.description}
                  </p>

                </div>


                {/* SELECTED */}
                {isSelected && (
                  <span className="rounded-full bg-[#DFF6EE] px-2 py-1 text-[9px] font-medium text-[#0F9D74]">
                    Selected
                  </span>
                )}

              </div>

            </div>

          );

        })}

      </div>

    </section>
  );
};

export default PaymentMethods;