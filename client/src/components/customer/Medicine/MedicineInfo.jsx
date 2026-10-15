import React, { useState } from "react";
import { Star, Minus, Plus, ShoppingCart,FileText, } from "lucide-react";

const MedicineInfo = ({
  medicine,
  onAddToCart,
  onBuyNow,
  onUploadPrescription
}) => {

  const [quantity, setQuantity] = useState(1);

  const price = medicine?.price || 0;

  const stock =
    medicine?.stock ??
    medicine?.availableStock ??
    0;

  const discount = medicine?.discount || 0;

  const increaseQuantity = () => {
    if (quantity < stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-xl border border-gray-100 shadow-sm p-5">

      {/* Medicine Name */}
      <h1 className="text-xl font-bold leading-tight text-[#102A43] break-words">
        {medicine?.name}
      </h1>

      {/* Brand */}
      <p className="text-sm text-gray-500 mt-1">
        {medicine?.brand ||
          medicine?.manufacturer ||
          "Medicine"}
      </p>

      {/* Rating */}
      <div className="flex items-center gap-2 mt-3">

        <Star
          size={17}
          className="fill-yellow-400 text-yellow-400"
        />

        <span className="text-sm font-medium">
          {medicine?.rating || "4.8"}
        </span>

        <span className="text-xs text-gray-400">
          ({medicine?.reviews?.length || 0} Reviews)
        </span>

      </div>

      {/* Price */}
      <div className="flex items-center gap-3 mt-5">

        <span className="text-2xl font-bold text-[#0F9D74]">
          ₹{price}
        </span>

        {discount > 0 && (
          <span className="bg-[#E8F8F2] text-[#0F9D74] text-xs font-semibold px-3 py-1 rounded-full">
            {discount}% OFF
          </span>
        )}

      </div>

      {/* Quantity + Stock */}
      <div className="flex flex-wrap items-center gap-3 mt-5">

        <div className="flex items-center border border-[#0F9D74] rounded-lg overflow-hidden">

          <button
            onClick={decreaseQuantity}
            className="px-3 py-2 hover:bg-gray-100"
          >
            <Minus size={15} />
          </button>

          <span className="px-4 text-sm font-medium">
            {quantity}
          </span>

          <button
            onClick={increaseQuantity}
            className="px-3 py-2 hover:bg-gray-100"
          >
            <Plus size={15} />
          </button>

        </div>

        <span className="text-xs text-gray-500">
          Available: {stock} Packs
        </span>

      </div>

      {/* Buttons */}
      {/* <div className="flex flex-col min-[420px]:flex-row gap-3 mt-6">

        <button
          onClick={() =>
            onAddToCart?.(medicine, quantity)
          }
          className="flex-1 flex items-center justify-center gap-2 bg-[#0F9D74] text-white rounded-lg py-3 text-sm font-semibold hover:bg-[#0c8965]"
        >
          <ShoppingCart size={17} />
          Add to Cart
        </button>

        <button
          onClick={() =>
            onBuyNow?.(medicine, quantity)
          }
          className="flex-1 border border-[#0F9D74] text-[#0F9D74] rounded-lg py-3 text-sm font-semibold hover:bg-[#E8F8F2]"
        >
          Buy Now
        </button>

      </div> */}
      {/* Buttons */}
<div className="flex flex-col min-[420px]:flex-row gap-3 mt-6">

  {(medicine?.prescriptionRequired ?? medicine?.requiresPrescription) ? (
    <button
      onClick={() =>
        onUploadPrescription?.(medicine)
      }
      className="w-full flex items-center justify-center gap-2 bg-[#0F9D74] text-white rounded-lg py-3 text-sm font-semibold hover:bg-[#0c8965]"
    >
      <FileText size={17} />
      Upload Prescription
    </button>
  ) : (
    <>
      <button
        onClick={() =>
          onAddToCart?.(medicine, quantity)
        }
        className="flex-1 flex items-center justify-center gap-2 bg-[#0F9D74] text-white rounded-lg py-3 text-sm font-semibold hover:bg-[#0c8965]"
      >
        <ShoppingCart size={17} />
        Add to Cart
      </button>

      <button
        onClick={() =>
          onBuyNow?.(medicine, quantity)
        }
        
        className="flex-1 border border-[#0F9D74] text-[#0F9D74] rounded-lg py-3 text-sm font-semibold hover:bg-[#E8F8F2]"
      >
        Buy Now
      </button>
    </>
  )}

</div>

    </div>
  );
};

export default MedicineInfo;
