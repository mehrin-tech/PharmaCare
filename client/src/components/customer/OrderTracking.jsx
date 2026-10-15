import { Link } from "react-router-dom";
import {
  Check,
  Package,
  Truck,
  Clock3,
  ChefHat,
  CircleCheck,
  XCircle,
} from "lucide-react";

export default function OrderTracking({orderId,orderStatus = "pending"}){

    const steps = [
    {
      status: "pending",
      label: "Order Placed",
      icon: Clock3,
    },
    {
      status: "accepted",
      label: "Accepted",
      icon: CircleCheck,
    },
    {
      status: "preparing",
      label: "Preparing",
      icon: ChefHat,
    },
    {
      status: "packed",
      label: "Packed",
      icon: Package,
    },
    {
      status: "out_for_delivery",
      label: "Out for Delivery",
      icon: Truck,
    },
    {
      status: "delivered",
      label: "Delivered",
      icon: Check,
    },
  ];
  const currentIndex=steps.findIndex((step)=>step.status===orderStatus)


  if(orderStatus=== "cancelled"){
     return (
      <section className="w-full bg-white rounded-xl border border-gray-100 p-4">

        <div className="flex items-center justify-between">

          <div>
            <h2 className="text-[13px] font-bold text-[#102A43]">
              Track Your Order
            </h2>

            <p className="text-[7px] text-gray-400 mt-1">
              Order has been cancelled
            </p>
          </div>

          <Link
            to="/orders"
            className="text-[7px] text-[#0F9D74]"
          >
            View All Orders
          </Link>

        </div>

        <div className="flex items-center gap-2 mt-5 text-red-500">

          <XCircle size={18} />

          <span className="text-[9px] font-medium">
            Cancelled
          </span>

        </div>

      </section>
    );
}
return(
     <section className="w-full bg-white rounded-xl border border-gray-100 p-4 h-[220px]">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-2">

          <h2 className="text-[13px] font-bold text-[#102A43]">
            Track Your Order
          </h2>

          <span className="text-[7px] text-[#0F9D74]">
            #ORD{orderId?.slice(-4)}
          </span>

        </div>

        <Link
          to="/orders"
          className="text-[7px] text-[#0F9D74]"
        >
          View All Orders
        </Link>

      </div>


      {/* Status */}
      <p className="text-[7px] text-gray-400 mt-2">
        Current status:{" "}
        <span className="text-[#0F9D74] font-medium">
          {steps[currentIndex]?.label}
        </span>
      </p>


      {/* Progress */}
      <div className="relative mt-7 overflow-x-auto">

        <div className="min-w-[550px] relative">

          {/* Background line */}
          <div className="absolute top-[7px] left-[4%] right-[4%] h-[2px] bg-gray-200" />

          {/* Completed line */}
          {currentIndex >= 0 && (
            <div
              className="absolute top-[7px] left-[4%] h-[2px] bg-[#0F9D74]"
              style={{
                width: `${(currentIndex / (steps.length - 1)) * 92}%`,
              }}
            />
          )}

          {/* Steps */}
          <div className="relative flex justify-between">

            {steps.map((step, index) => {

              const Icon = step.icon;

              const completed = index <= currentIndex;

              return (
                <div
                  key={step.status}
                  className="flex flex-col items-center"
                >

                  {/* Circle */}
                  <div
                    className={`
                      w-[16px]
                      h-[16px]
                      rounded-full
                      flex
                      items-center
                      justify-center
                      border-2
                      ${
                        completed
                          ? "bg-[#0F9D74] border-[#0F9D74] text-white"
                          : "bg-white border-gray-300 text-gray-300"
                      }
                    `}
                  >
                    <Icon size={8} strokeWidth={2.5} />
                  </div>

                  {/* Label */}
                  <p
                    className={`
                      text-[6px]
                      mt-2
                      whitespace-nowrap
                      ${
                        completed
                          ? "text-[#102A43] font-medium"
                          : "text-gray-400"
                      }
                    `}
                  >
                    {step.label}
                  </p>

                </div>
              );
            })}

          </div>

        </div>

      </div>

    </section>
  );
}
