// // import { useState } from "react";

// // export default function MedicineFilters({
// //   filters,
// //   setFilters,
// //   onClear,
// // }) {
// //   const [price, setPrice] = useState(filters?.maxPrice ??  2000);

// //   // =========================
// //   // CHECKBOX HANDLER
// //   // =========================

// //   const handleCheckbox = (type, value) => {
// //     setFilters((prev) => ({
// //       ...prev,
// //       [type]:
// //         prev[type] === value ? "" : value,
// //     }));
// //   };

// //   // =========================
// //   // PRICE HANDLER
// //   // =========================

// //   const handlePriceChange = (value) => {
// //     const newPrice = Number(value);

// //     setPrice(newPrice);

// //     setFilters((prev) => ({
// //       ...prev,
// //       maxPrice: newPrice,
// //     }));
// //   };

// //   // =========================
// //   // CLEAR ALL
// //   // =========================

// //   const handleClear = () => {
// //     setPrice(2000);
// //     onClear();
// //   };

// //   return (
// //     <aside
// //       className="
// //         bg-white
// //         rounded-xl
// //         border
// //         border-gray-100
// //         shadow-sm
// //         p-3
// //         w-full
// //         h-fit
// //       "
// //     >

// //       {/* =================================
// //           HEADER
// //       ================================= */}

// //       <div className="flex items-center justify-between mb-3">

// //         <h3 className="text-[11px] font-semibold text-[#102A43]">
// //           Filters
// //         </h3>

// //         <button
// //           type="button"
// //           onClick={handleClear}
// //           className="
// //             text-[7px]
// //             text-[#0F9D74]
// //             font-medium
// //             hover:underline
// //           "
// //         >
// //           Clear All
// //         </button>

// //       </div>


// //       {/* =================================
// //           DISTANCE
// //       ================================= */}

// //       <div className="mb-4">

// //         <h4 className="text-[8px] font-semibold text-[#102A43] mb-2">
// //           Distance
// //         </h4>

// //         <div className="space-y-2">

// //           <FilterCheckbox
// //             label="0-2 km"
// //             checked={filters.distance === "0-2"}
// //             onChange={() =>
// //               handleCheckbox("distance", "0-2")
// //             }
// //           />

// //           <FilterCheckbox
// //             label="2-5 km"
// //             checked={filters.distance === "2-5"}
// //             onChange={() =>
// //               handleCheckbox("distance", "2-5")
// //             }
// //           />

// //           <FilterCheckbox
// //             label="5-10 km"
// //             checked={filters.distance === "5-10"}
// //             onChange={() =>
// //               handleCheckbox("distance", "5-10")
// //             }
// //           />

// //           <FilterCheckbox
// //             label="10+ km"
// //             checked={filters.distance === "10+"}
// //             onChange={() =>
// //               handleCheckbox("distance", "10+")
// //             }
// //           />

// //         </div>

// //       </div>


// //       {/* =================================
// //           DELIVERY TIME
// //       ================================= */}

// //       <div className="mb-4">

// //         <h4 className="text-[8px] font-semibold text-[#102A43] mb-2">
// //           Delivery Time
// //         </h4>

// //         <div className="space-y-2">

// //           <FilterCheckbox
// //             label="30min"
// //             checked={filters.deliveryTime === "30min"}
// //             onChange={() =>
// //               handleCheckbox(
// //                 "deliveryTime",
// //                 "30min"
// //               )
// //             }
// //           />

// //           <FilterCheckbox
// //             label="1 Hour"
// //             checked={filters.deliveryTime === "1hour"}
// //             onChange={() =>
// //               handleCheckbox(
// //                 "deliveryTime",
// //                 "1hour"
// //               )
// //             }
// //           />

// //           <FilterCheckbox
// //             label="Today"
// //             checked={filters.deliveryTime === "today"}
// //             onChange={() =>
// //               handleCheckbox(
// //                 "deliveryTime",
// //                 "today"
// //               )
// //             }
// //           />

// //         </div>

// //       </div>


// //       {/* =================================
// //           AVAILABILITY
// //       ================================= */}

// //       <div className="mb-4">

// //         <h4 className="text-[8px] font-semibold text-[#102A43] mb-2">
// //           Availability
// //         </h4>

// //         <div className="space-y-2">

// //           <FilterCheckbox
// //             label="In Stock"
// //             checked={filters.availability === "inStock"}
// //             onChange={() =>
// //               handleCheckbox(
// //                 "availability",
// //                 "inStock"
// //               )
// //             }
// //           />

// //           <FilterCheckbox
// //             label="Prescription"
// //             checked={filters.availability === "prescription"}
// //             onChange={() =>
// //               handleCheckbox(
// //                 "availability",
// //                 "prescription"
// //               )
// //             }
// //           />

// //           <FilterCheckbox
// //             label="OTC only"
// //             checked={filters.availability === "otc"}
// //             onChange={() =>
// //               handleCheckbox(
// //                 "availability",
// //                 "otc"
// //               )
// //             }
// //           />

// //         </div>

// //       </div>


// //       {/* =================================
// //           PRICE RANGE
// //       ================================= */}

// //       <div>

// //         <h4 className="text-[8px] font-semibold text-[#102A43] mb-2">
// //           Price Range
// //         </h4>

// //         <input
// //           type="range"
// //           min="0"
// //           max="2000"
// //           step="10"
// //           value={price}
// //           onChange={(e) =>
// //             handlePriceChange(e.target.value)
// //           }
// //           className="
// //             w-full
// //             h-[3px]
// //             accent-[#0F9D74]
// //             cursor-pointer
// //           "
// //         />

// //         <div className="flex items-center justify-between mt-1">

// //           <span className="text-[7px] text-gray-400">
// //             ₹0
// //           </span>

// //           <span className="text-[7px] text-gray-400">
// //             ₹{price}
// //           </span>

// //           <span className="text-[7px] text-gray-400">
// //             ₹2000
// //           </span>

// //         </div>

// //       </div>

// //     </aside>
// //   );
// // }


// // /* =====================================
// //    CHECKBOX COMPONENT
// // ===================================== */

// // function FilterCheckbox({
// //   label,
// //   checked,
// //   onChange,
// // }) {
// //   return (
// //     <label
// //       className="
// //         flex
// //         items-center
// //         gap-2
// //         cursor-pointer
// //         select-none
// //       "
// //     >

// //       <span
// //         onClick={onChange}
// //         className={`
// //           w-[19px]
// //           h-[19px]
// //           rounded-[4px]
// //           border
// //           flex
// //           items-center
// //           justify-center
// //           transition-all
// //           ${
// //             checked
// //               ? "bg-[#0F9D74] border-[#0F9D74]"
// //               : "bg-white border-gray-300"
// //           }
// //         `}
// //       >

// //         {checked && (
// //           <svg
// //             width="11"
// //             height="11"
// //             viewBox="0 0 24 24"
// //             fill="none"
// //             stroke="white"
// //             strokeWidth="3"
// //             strokeLinecap="round"
// //             strokeLinejoin="round"
// //           >
// //             <polyline points="20 6 9 17 4 12" />
// //           </svg>
// //         )}

// //       </span>

// //       <span className="text-[7px] text-gray-500">
// //         {label}
// //       </span>

// //     </label>
// //   );
// // }
// import React from 'react'

// function MedicineFilters() {
//   return (
//     <div>
//       <h1>Hello</h1>
//     </div>
//   )
// }

// export default MedicineFilters
import { useState } from "react";

export default function MedicineFilters() {
  const [distance, setDistance] = useState("0-2");
  const [deliveryTime, setDeliveryTime] = useState("30min");
  const [availability, setAvailability] = useState("inStock");
  const [price, setPrice] = useState(2000);

  const clearAll = () => {
    setDistance("");
    setDeliveryTime("");
    setAvailability("");
    setPrice(2000);
  };

  return (
    <aside className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 w-full">

      {/* ================= HEADER ================= */}

      <div className="flex items-center justify-between mb-4">

        <h3 className="text-[11px] font-semibold text-[#102A43]">
          Filters
        </h3>

        <button
          type="button"
          onClick={clearAll}
          className="text-[7px] text-[#0F9D74] hover:underline"
        >
          Clear All
        </button>

      </div>


      {/* ================= DISTANCE ================= */}

      <div className="mb-4">

        <h4 className="text-[8px] font-semibold text-[#102A43] mb-2">
          Distance
        </h4>

        <div className="space-y-2">

          <FilterOption
            label="0-2 km"
            checked={distance === "0-2"}
            onClick={() => setDistance("0-2")}
          />

          <FilterOption
            label="2-5 km"
            checked={distance === "2-5"}
            onClick={() => setDistance("2-5")}
          />

          <FilterOption
            label="5-10 km"
            checked={distance === "5-10"}
            onClick={() => setDistance("5-10")}
          />

          <FilterOption
            label="10+ km"
            checked={distance === "10+"}
            onClick={() => setDistance("10+")}
          />

        </div>

      </div>


      {/* ================= DELIVERY TIME ================= */}

      <div className="mb-4">

        <h4 className="text-[8px] font-semibold text-[#102A43] mb-2">
          Delivery Time
        </h4>

        <div className="space-y-2">

          <FilterOption
            label="30min"
            checked={deliveryTime === "30min"}
            onClick={() => setDeliveryTime("30min")}
          />

          <FilterOption
            label="1 Hour"
            checked={deliveryTime === "1hour"}
            onClick={() => setDeliveryTime("1hour")}
          />

          <FilterOption
            label="Today"
            checked={deliveryTime === "today"}
            onClick={() => setDeliveryTime("today")}
          />

        </div>

      </div>


      {/* ================= AVAILABILITY ================= */}

      <div className="mb-4">

        <h4 className="text-[8px] font-semibold text-[#102A43] mb-2">
          Availability
        </h4>

        <div className="space-y-2">

          <FilterOption
            label="In Stock"
            checked={availability === "inStock"}
            onClick={() => setAvailability("inStock")}
          />

          <FilterOption
            label="Prescription"
            checked={availability === "prescription"}
            onClick={() =>
              setAvailability("prescription")
            }
          />

          <FilterOption
            label="OTC only"
            checked={availability === "otc"}
            onClick={() =>
              setAvailability("otc")
            }
          />

        </div>

      </div>


      {/* ================= PRICE RANGE ================= */}

      <div>

        <h4 className="text-[8px] font-semibold text-[#102A43] mb-2">
          Price Range
        </h4>

        <input
          type="range"
          min="0"
          max="2000"
          value={price}
          onChange={(e) =>
            setPrice(Number(e.target.value))
          }
          className="w-full h-[3px] accent-[#0F9D74] cursor-pointer"
        />

        <div className="flex justify-between mt-1">

          <span className="text-[7px] text-gray-400">
            ₹0
          </span>

          <span className="text-[7px] text-gray-500">
            ₹{price}
          </span>

          <span className="text-[7px] text-gray-400">
            ₹2000
          </span>

        </div>

      </div>

    </aside>
  );
}


/* =========================================
   FILTER OPTION
========================================= */

function FilterOption({
  label,
  checked,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center gap-2 text-left"
    >

      <span
        className={`
          w-[19px]
          h-[19px]
          rounded-[4px]
          border
          flex
          items-center
          justify-center
          flex-shrink-0
          ${
            checked
              ? "bg-[#0F9D74] border-[#0F9D74]"
              : "bg-white border-gray-300"
          }
        `}
      >

        {checked && (
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}

      </span>

      <span className="text-[7px] text-gray-500">
        {label}
      </span>

    </button>
  );
}