import React from "react";
import { useNavigate } from "react-router-dom";
const OrderSummary = ({ items = [],showActions=true }) => {
const navigate = useNavigate();
  // Calculate subtotal
  const subtotal = items.reduce((total, item) => {
    const medicine=item.medicine || item.medicineId || item
    const price = Number(item.medicine?.price || 0);
    const quantity = Number(item.quantity || 1);

    return total + price * quantity;
  }, 0);

  // Free delivery above ₹500
  const deliveryCharge = subtotal >= 500 ? 0 : 40;

 const savings=items.reduce((total,item)=>{
  const medicine = item.medicine || item.medicineId || item;
    const mrp=Number(item.medicine?.mrp || 0);
    const price=Number(item.medicine?.price || 0);
    const quantity=Number(item.quantity || 0)
    const discount=Math.max(mrp-price,0)

    return total + discount*quantity
 },0)

  const total = subtotal + deliveryCharge ;

  return (
    <div className="bg-white border border-gray-100 rounded-lg p-4">

      {/* Heading */}
      <h2 className="text-sm font-semibold text-[#102A43] mb-4">
        Order Summary
      </h2>

      {/* Subtotal */}
      <div className="flex justify-between text-xs mb-3">
        <span className="text-gray-500">
          Subtotal
        </span>

        <span className="font-medium text-[#102A43]">
          ₹{subtotal.toFixed(2)}
        </span>
      </div>

      {/* Delivery */}
      <div className="flex justify-between text-xs mb-3">
        <span className="text-gray-500">
          Delivery
        </span>

        <span className="font-medium text-[#102A43]">
          {deliveryCharge === 0
            ? "FREE"
            : `₹${deliveryCharge.toFixed(2)}`
          }
        </span>
      </div>

      {/* Savings */}
      <div className="flex justify-between text-xs mb-4">
        <span className="text-gray-500">
          You Saved
        </span>

        <span className="font-medium text-[#0F9D74]">
          ₹{savings.toFixed(2)}
        </span>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 pt-4">

        <div className="flex justify-between items-center">

          <span className="text-sm font-semibold text-[#102A43]">
            Total
          </span>

          <span className="text-lg font-bold text-[#0F9D74]">
            ₹{total.toFixed(2)}
          </span>

        </div>

      </div>

{/* <button
  type="button"
  onClick={() => navigate('/medicines')}
  className="w-full mt-4 bg-white border border-[#0F9D74] text-[#0F9D74] hover:bg-[#DFF6EE] cursor-pointer text-xs font-semibold py-3 rounded-md transition"
>
  Continue Shopping
</button>
      {/* Checkout button */}
      {/* <button
        type="button"
        onClick={()=>navigate('/checkout')}
        className="w-full  mt-4 bg-[#0F9D74] hover:bg-[#0c8764]  cursor-pointer text-white text-xs font-semibold py-3 rounded-md transition"
      >
        Proceed to Checkout
      </button> */} 
      {showActions && (
  <div className="mt-5 space-y-3">

    <button
      onClick={()=>navigate('/medicines')}
      className="w-full rounded-lg border border-[#0F9D74] py-3 text-sm font-medium text-[#0F9D74]"
    >
      Continue Shopping
    </button>

    <button
      onClick={()=>navigate('/checkout')}
      className="w-full rounded-lg bg-[#0F9D74] py-3 text-sm font-medium text-white"
    >
      Proceed to Checkout
    </button>

  </div>
)}

    </div>
  );
};

export default OrderSummary;