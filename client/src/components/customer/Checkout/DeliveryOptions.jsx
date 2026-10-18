import React,{useState} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { setSelectedDeliveryMethod } from '../../../redux/slices/checkoutSlice';
function DeliveryOptions() {
    const dispatch=useDispatch()
    const selectedOption=useSelector((state)=>state.checkout.selectedDeliveryMethod)
    
     const deliveryOptions = [
    {
      id: "standard",
      title: "Standard Delivery",
      description: "Delivery within 30–45 minutes",
      price: 40,
    },
    {
      id: "express",
      title: "Express Delivery",
      description: "Faster delivery within 15–25 minutes",
      price: 70,
    },
  ];
  return (
      <section className="rounded-xl border border-gray-200 bg-white p-4">

      {/* HEADER */}
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-gray-800">
          <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#0F9D74] text-xs text-white">
            3
          </span>

          Delivery Options
        </h2>

        <p className="ml-7 mt-1 text-[10px] text-gray-500">
          Choose your preferred delivery option
        </p>
      </div>

      {/* OPTIONS */}
      <div className="space-y-3">

        {deliveryOptions.map((option) => {
          const isSelected =
            selectedOption === option.id;

          return (
            <div
              key={option.id}
              onClick={() =>
                dispatch(setSelectedDeliveryMethod(option.id))
              }
              className={`cursor-pointer rounded-lg border p-3 transition ${
                isSelected
                  ? "border-[#0F9D74] bg-[#F0FBF7]"
                  : "border-gray-200 bg-white hover:border-[#BCE9D9]"
              }`}
            >

              <div className="flex items-start gap-3">

                {/* RADIO */}
                <div
                  className={`mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                    isSelected
                      ? "border-[#0F9D74]"
                      : "border-gray-300"
                  }`}
                >
                  {isSelected && (
                    <span className="h-2 w-2 rounded-full bg-[#0F9D74]" />
                  )}
                </div>

                {/* DETAILS */}
                <div className="flex-1">

                  <div className="flex items-center justify-between">

                    <h3 className="text-xs font-semibold text-gray-800">
                      {option.title}
                    </h3>

                    <span className="text-xs font-semibold text-gray-800">
                      ₹{option.price}
                    </span>

                  </div>

                  <p className="mt-1 text-[10px] text-gray-500">
                    {option.description}
                  </p>

                </div>

              </div>

            </div>
          );
        })}

      </div>

    </section>
  )
}

export default DeliveryOptions
