import React from "react";
import { Package } from "lucide-react";

const OrderedMedicines = ({ items = [] }) => {
  return (
    <section className="mb-4 rounded-xl border border-gray-200 bg-white p-4">

      {/* HEADER */}
      <div className="mb-4 flex items-center gap-2">
        <Package
          size={14}
          className="text-[#0F9D74]"
        />

        <h2 className="text-xs font-semibold text-gray-800">
          Ordered Medicines
        </h2>
      </div>

      {/* NO ITEMS */}
      {items.length === 0 ? (
        <div className="py-6 text-center">
          <p className="text-xs text-gray-400">
            No medicines found
          </p>
        </div>
      ) : (
        <>
          {/* TABLE HEADER */}
          <div className="grid grid-cols-[1fr_45px_65px_65px] border-b border-gray-100 pb-2 sm:grid-cols-[1fr_60px_80px_80px]">

            <p className="text-[8px] text-gray-400">
              Medicine
            </p>

            <p className="text-center text-[8px] text-gray-400">
              Qty
            </p>

            <p className="text-right text-[8px] text-gray-400">
              Price
            </p>

            <p className="text-right text-[8px] text-gray-400">
              Total
            </p>

          </div>

          {/* ITEMS */}
          {items.map((item, index) => {
            const image =
              item.image || item.medicine?.image;

            const name =
              item.name ||
              item.medicine?.name ||
              "Medicine";

            return (
              <div
                key={item._id || index}
                className="grid grid-cols-[1fr_45px_65px_65px] items-center border-b border-gray-100 py-3 last:border-0 sm:grid-cols-[1fr_60px_80px_80px]"
              >

                {/* MEDICINE */}
                <div className="flex min-w-0 items-center gap-2">

                  {/* IMAGE */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-md bg-gray-50">

                    {image ? (
                      <img
                        src={image}
                        alt={name}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <span className="text-sm">
                        💊
                      </span>
                    )}

                  </div>

                  {/* NAME */}
                  <div className="min-w-0">
                    <p className="truncate text-[9px] font-semibold text-gray-700">
                      {name}
                    </p>

                    <p className="mt-0.5 text-[7px] text-gray-400">
                      Medicine
                    </p>
                  </div>

                </div>

                {/* QUANTITY */}
                <p className="text-center text-[9px] text-gray-600">
                  {item.quantity}
                </p>

                {/* PRICE */}
                <p className="text-right text-[9px] text-gray-600">
                  ₹{Number(item.price || 0).toFixed(2)}
                </p>

                {/* TOTAL */}
                <p className="text-right text-[9px] font-medium text-gray-700">
                  ₹{Number(item.total || 0).toFixed(2)}
                </p>

              </div>
            );
          })}
        </>
      )}

    </section>
  );
};

export default OrderedMedicines;