import React, { useState } from "react";
import { Heart } from "lucide-react";

import paracetamolImg from "../../../assets/paracetamol.png";
import DoloImg from "../../../assets/Dolo.png";

const MedicineImage = ({ medicine }) => {
  const fallbackImage =
    medicine?.name?.toLowerCase().includes("dolo")
      ? DoloImg
      : paracetamolImg;

  const images = [
    medicine?.image || fallbackImage,
    medicine?.image || fallbackImage,
    medicine?.image || fallbackImage,
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const selectedImage = images[selectedIndex];

  return (
    <div className="h-full bg-white rounded-xl border border-gray-100 shadow-sm p-4">

      {/* Main Image */}
      <div className="relative h-[320px] flex items-center justify-center">

        {/* Wishlist */}
        <button
          type="button"
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-2 right-2 w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center"
        >
          <Heart
            size={22}
            className={
              isWishlisted
                ? "fill-red-500 text-red-500"
                : "text-gray-500"
            }
          />
        </button>

        <img
          src={selectedImage}
          alt={medicine?.name || "Medicine"}
          className="w-[220px] h-[270px] object-contain"
        />
      </div>

      {/* Image Tabs */}
      <div className="flex items-center justify-center gap-3 mt-3">

        {images.map((image, index) => {
          const isActive = selectedIndex === index;

          return (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className={`
                relative
                w-[58px]
                h-[58px]
                rounded-lg
                flex
                items-center
                justify-center
                overflow-hidden
                transition-all
                duration-200
                ${
                  isActive
                    ? "border-2 border-[#0F9D74] bg-[#E8F8F2]"
                    : "border border-gray-200 bg-white hover:border-[#0F9D74]"
                }
              `}
            >
              <img
                src={image}
                alt={`Medicine ${index + 1}`}
                className="w-[44px] h-[44px] object-contain"
              />

              {/* Active indicator */}
              {isActive && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-[3px] bg-[#0F9D74] rounded-full" />
              )}
            </button>
          );
        })}

      </div>
    </div>
  );
};

export default MedicineImage;
