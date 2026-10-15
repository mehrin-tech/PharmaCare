import React from 'react'
import CartItem from "./CartItem";

function CartPharmacyGroup({
  pharmacy,
  items,
  onIncrease,
  onDecrease,
  onRemove,
}) {


    const pharmacyTotal=items.reduce((total,item)=>{
        const price=Number(item.medicine?.price || 0);
        const quantity=Number(item.quantity ||0)
        return total+price*quantity
    },0)
  return (
     
    <div className="bg-white border border-gray-100 rounded-lg overflow-hidden">

      {/* Pharmacy Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <div>
          <h2 className="text-sm font-semibold text-[#102A43]">
            {pharmacy?.pharmacyName || "Pharmacy"}
          </h2>

          <p className="text-[10px] text-gray-400 mt-1">
            Verified Pharmacy
          </p>
        </div>

        <p className="text-sm font-semibold text-[#0F9D74]">
          ₹{pharmacyTotal.toFixed(2)}
        </p>
      </div>

      {/* Medicines */}
      <div className="space-y-2 p-2">
        {items.map((item) => (
          <CartItem
            key={item.medicine?._id}
            item={item}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
            onRemove={onRemove}
          />
        ))}
      </div>

    </div>
  )
}

export default CartPharmacyGroup

