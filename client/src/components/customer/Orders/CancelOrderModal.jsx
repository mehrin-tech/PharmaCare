import React from "react";
import { X, AlertCircle } from "lucide-react";

const CancelOrderModal = ({
  order,
  onClose,
  onConfirm,
}) => {
    const handleCancel=()=>{
         onConfirm()
    }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">

      {/* MODAL */}
      <div className="relative w-full max-w-[320px] rounded-xl bg-white p-6 shadow-xl">

        {/* CLOSE BUTTON */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 text-red-500 hover:text-red-600"
        >
          <X size={14} />
        </button>


        {/* ICON */}
        <div className="flex justify-center">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50">
            <AlertCircle
              size={16}
              className="text-red-500"
            />
          </div>
        </div>


        {/* TITLE */}
        <h2 className="mt-2 text-center text-sm font-semibold text-gray-800">
          Cancel Order
        </h2>


        {/* MESSAGE */}
        <p className="mt-2 text-center text-[10px] leading-4 text-gray-500">
          Are you sure you want to cancel this Order
          {order?.orderNumber && (
            <span className="font-medium text-gray-700">
              {" "}#{order.orderNumber}
            </span>
          )}
          ?
        </p>


        {/* BUTTONS */}
        <div className="mt-5 flex items-center justify-center gap-2">

          {/* NO */}
          <button
            type="button"
            onClick={onClose}
            className="w-[95px] rounded-md border border-[#0F9D74] px-3 py-2 text-[9px] font-medium text-[#0F9D74] hover:bg-[#F0FBF7]"
          >
            No, Keep It
          </button>


          {/* YES */}
          <button
            type="button"
            onClick={handleCancel}
            className="w-[95px] rounded-md bg-red-600 px-3 py-2 text-[9px] font-medium text-white hover:bg-red-700"
          >
            Yes, Cancel Order
          </button>

        </div>

      </div>

    </div>
  );
};

export default CancelOrderModal;