import { useState } from "react";

const PharmacyAbout = ({ pharmacy }) => {
  const [expanded, setExpanded] = useState(false);

  if (!pharmacy) return null;


  const description = pharmacy.description ||
    `${pharmacy.pharmacyName} provides genuine medicines, healthcare products and pharmacy services for customers. Our pharmacy focuses on quality medicines, convenient ordering and reliable delivery.`;

  return (

    <div className="
      bg-white
      border
      border-gray-200
      rounded-lg
      p-4
    ">

      <h2 className="
        text-[13px]
        font-semibold
        text-[#0F9D74]
        mb-1
      ">
        About {pharmacy.pharmacyName}
      </h2>


      <p className={`
        text-[11px]
        leading-5
        text-gray-500
        ${expanded ? "" : "line-clamp-2"}
      `}>
        {description}
      </p>

      {description.length > 120 && <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        className="mt-1 text-[10px] font-medium text-[#0F9D74]"
      >
        {expanded ? "Read Less" : "Read More"}
      </button>}


    </div>

  );
};

export default PharmacyAbout;
