import React from "react";

const WishlistCard = ({ item, onRemove, onAddToCart }) => {
  const medicine = item.medicine;

  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white px-3 py-4 sm:px-4 md:px-5">

      {/* MAIN CONTENT */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">

        {/* CHECKBOX */}
        {/* <div className="flex shrink-0 items-start sm:items-center">
          <input
            type="checkbox"
            className="h-4 w-4 cursor-pointer accent-[#0F9D74]"
          />
        </div> */}

        {/* PRODUCT IMAGE */}
        <div
          className="
            flex
            h-20
            w-20
            shrink-0
            items-center
            justify-center
            self-center
            sm:h-16
            sm:w-16
            sm:self-auto
            md:h-20
            md:w-20
          "
        >
          <img
            src={medicine?.image}
            alt={medicine?.name || "Medicine"}
            className="h-full w-full object-contain"
          />
        </div>

        {/* PRODUCT DETAILS */}
        <div className="min-w-0 flex-1 text-center sm:text-left">

          <h2 className="text-sm font-semibold text-gray-900 md:text-base">
            {medicine?.name}
          </h2>

          <p className="mt-1 line-clamp-2 text-xs text-gray-500 md:text-sm">
            {medicine?.description}
          </p>

          <p className="mt-1 text-xs text-gray-500">
            {medicine?.quantity || "10 Tablets"}
          </p>

        </div>

        {/* RIGHT SIDE */}
        <div
          className="
            flex
            w-full
            items-center
            justify-between
            gap-3
            border-t
            border-gray-100
            pt-3
            sm:w-auto
            sm:border-t-0
            sm:pt-0
            md:gap-5
          "
        >

          {/* PRICE */}
          <div className="shrink-0">
            <p className="text-sm font-bold text-[#0F9D74] md:text-base">
              ₹{medicine?.price}
            </p>
          </div>

          {/* ADD TO CART */}
          <button
            onClick={() => onAddToCart(item.medicine._id)}
            className="
              whitespace-nowrap
              rounded-md
              border
              border-gray-200
              px-3
              py-2
              text-[10px]
              font-medium
              text-[#0F9D74]
              transition
              hover:bg-green-50
              sm:px-3
              md:px-4
              md:text-xs
              cursor-pointer
            "
          >
            🛒 Add to Cart
          </button>

          {/* REMOVE */}
          <button
            onClick={() => onRemove(item)}
            className="
              shrink-0
              text-red-500
              transition
              hover:text-red-600
            "
            title="Remove from wishlist"
          >
            🗑
          </button>

        </div>

      </div>

    </div>
  );
};

export default WishlistCard;