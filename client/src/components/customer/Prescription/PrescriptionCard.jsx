import React from "react";
import {
  FileText,
  Building2,
  CalendarDays,
} from "lucide-react";

const PrescriptionCard = ({ prescription }) => {
  const getStatusStyle = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-50 text-green-600";

      case "rejected":
        return "bg-red-50 text-red-500";

      default:
        return "bg-yellow-50 text-yellow-600";
    }
  };

  const getPrescriptionUrl = (url) => {
  if (!url) return "";

  if (
    url.includes("/raw/upload/") &&
    !url.includes("/raw/upload/fl_inline/")
  ) {
    return url.replace(
      "/raw/upload/",
      "/raw/upload/fl_inline/"
    );
  }

  return url;
};
  const uploadedDate = prescription?.createdAt
    ? new Date(prescription.createdAt)
    : null;
  const formattedDate = uploadedDate && !Number.isNaN(uploadedDate.getTime())
    ? uploadedDate.toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      )
    : "-";

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      
      {/* TOP */}
      <div className="flex items-start justify-between gap-3">

        <div className="flex min-w-0 items-center gap-3">
          
          {/* ICON */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F0FBF7]">
            <FileText
              size={18}
              className="text-[#0F9D74]"
            />
          </div>

          {/* MEDICINE */}
          <div className="min-w-0">
            <h3 className="truncate text-[10px] font-semibold text-gray-800">
              {prescription.medicine?.name || "Medicine"}
            </h3>

            <p className="mt-1 text-[8px] text-gray-400">
              ₹{Number(
                prescription.medicine?.price || 0
              ).toFixed(2)}
            </p>
          </div>
        </div>

        {/* STATUS */}
        <span
          className={`shrink-0 rounded-full px-2 py-1 text-[8px] font-medium capitalize ${getStatusStyle(
            prescription.status
          )}`}
        >
          {prescription?.status || "pending"}
        </span>

      </div>

      {/* DETAILS */}
      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">

        {/* PHARMACY */}
        <div className="flex items-center gap-2">
          <Building2
            size={12}
            className="text-gray-400"
          />

          <div>
            <p className="text-[7px] text-gray-400">
              Pharmacy
            </p>

            <p className="text-[9px] font-medium text-gray-600">
              {prescription.pharmacy?.pharmacyName ||
                "Pharmacy"}
            </p>
          </div>
        </div>

        {/* DATE */}
        <div className="flex items-center gap-2">
          <CalendarDays
            size={12}
            className="text-gray-400"
          />

          <div>
            <p className="text-[7px] text-gray-400">
              Uploaded On
            </p>

            <p className="text-[9px] font-medium text-gray-600">
              {formattedDate}
            </p>
          </div>
        </div>

      </div>

      {/* REJECTION REASON */}
      {prescription.status === "rejected" &&
        prescription.rejectionReason && (
          <div className="mt-3 rounded-lg bg-red-50 p-3">
            <p className="text-[7px] font-medium text-red-500">
              Rejection Reason
            </p>

            <p className="mt-1 text-[9px] text-red-400">
              {prescription.rejectionReason}
            </p>
          </div>
        )}

      {/* VIEW PRESCRIPTION */}
      {/* {prescription.image && (
        <div className="mt-4">
          <a
            href={prescription.image}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-md border border-[#0F9D74] px-3 py-2 text-[8px] font-medium text-[#0F9D74] hover:bg-[#F0FBF7]"
          >
            View Prescription
          </a>
        </div>
      )} */}

      {prescription.image && (
  <div className="mt-4">
    <a
      href={getPrescriptionUrl(prescription.image)}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center rounded-md border border-[#0F9D74] px-3 py-2 text-[8px] font-medium text-[#0F9D74] hover:bg-[#F0FBF7]"
    >
      View Prescription
    </a>
  </div>
)}

    </div>
  );
};

export default PrescriptionCard;
