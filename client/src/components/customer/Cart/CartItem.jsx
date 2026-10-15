import React from "react";
import { Trash2, Minus, Plus } from "lucide-react";
const CartItem = ({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) => {
  const medicine = item?.medicine;

  if (!medicine) return null;

  const price = Number(medicine.price || 0);
  const quantity = Number(item.quantity || 1);
  const total = price * quantity;

  return (
    <div className="bg-white border border-gray-100 rounded-lg p-3">
      <div className="flex items-center gap-3">

        {/* Medicine Image */}
        <div className="w-[42px] h-[48px] bg-gray-50 rounded-md flex items-center justify-center">
          {medicine.image ? (
           
           <img 
              src={medicine.image}
              alt={medicine.name}

              className="w-full h-full object-contain rounded-md"
            />
            
          ) : (
            <div className="w-[25px] h-[35px] bg-gray-200 rounded-sm" />
          )}
        </div>

        {/* Medicine Details */}
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-medium text-[#102A43]">
            {medicine.name}
          </p>

          <p className="text-[7px] text-gray-500 mt-0.5">
            {medicine.packSize || "Pack"}
          </p>

          <div className="flex items-center gap-2 mt-2">
            <span className="bg-[#DFF6EE] text-[#0F9D74] text-[7px] px-2 py-1 rounded-sm">
              In stock
            </span>

            <button
              onClick={() => onRemove?.(medicine._id)}
              className="text-gray-400 hover:text-red-500 cursor-pointer"
            >
              <Trash2 size={10} />
            </button>
          </div>
        </div>

        {/* Price */}
        <div>
          <p className="text-[8px] font-semibold text-[#102A43]">
            ₹{price.toFixed(2)}
          </p>
        </div>

        {/* Quantity */}
        <div className="flex items-center border border-[#0F9D74] rounded-md h-[22px]">

          <button
            onClick={() =>
              onDecrease?.(medicine._id, quantity)
            }
            className="w-[22px] flex items-center justify-center text-[#0F9D74] cursor-pointer"
          >
            <Minus size={9} />
          </button>

          <span className="w-[20px] text-center text-[8px]">
            {quantity}
          </span>

          <button
            onClick={() =>
              onIncrease?.(medicine._id, quantity)
            }
            className="w-[22px] flex items-center justify-center text-[#0F9D74] cursor-pointer"
          >
            <Plus size={9} />
          </button>

        </div>

        {/* Total */}
        <div className="w-[40px] text-right">
          <p className="text-[9px] font-medium text-[#102A43]">
            ₹{total.toFixed(2)}
          </p>
        </div>

      </div>
    </div>
  );
};

export default CartItem;