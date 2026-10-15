
// import React from "react";
// import { X, XCircle } from "lucide-react";

// const DeleteMedicineModal = ({
//   isOpen,
//   medicine,
//   onCancel,
//   onConfirm,
//   loading = false,
// }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
//       <div className="relative w-full max-w-sm rounded-xl bg-white px-8 py-7 text-center shadow-xl">

//         {/* Close Button */}
//         <button
//           type="button"
//           onClick={onCancel}
//           disabled={loading}
//           aria-label="Close modal"
//           className="absolute right-4 top-4 text-red-500 hover:text-red-700 disabled:opacity-50"
//         >
//           <X size={20} />
//         </button>

//         {/* Red Icon */}
//         <XCircle
//           size={36}
//           className="mx-auto mb-2 text-red-500"
//         />

//         {/* Title */}
//         <h2 className="text-lg font-semibold text-gray-900">
//           Delete Medicine
//         </h2>

//         {/* Confirmation Message */}
//         <p className="mt-5 text-sm text-gray-700">
//           Are you sure you want to delete{" "}
//           <span className="font-semibold">
//             {medicine?.name || "this medicine"}
//           </span>
//           ?
//         </p>

//         {/* Action Buttons */}
//         <div className="mt-6 flex justify-center gap-3">
//           <button
//             type="button"
//             onClick={onCancel}
//             disabled={loading}
//             className="w-1/2 rounded-lg border border-emerald-500 px-4 py-3 text-sm font-medium text-emerald-600 transition hover:bg-emerald-50 disabled:opacity-50"
//           >
//             Back
//           </button>

//           <button
//             type="button"
//             onClick={onConfirm}
//             disabled={loading}
//             className="w-1/2 rounded-lg bg-emerald-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
//           >
//             {loading ? "Deleting..." : "OK"}
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default DeleteMedicineModal;
