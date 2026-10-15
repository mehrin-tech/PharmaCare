import { Link,useNavigate } from "react-router-dom";

import supplements from '../../assets/supplements.png'
import devices from '../../assets/devices.png'
import personalCare from '../../assets/personalCare.png'
import HealthCare from '../../assets/HealthCare.png'
import Medicines from '../../assets/medicines.png'
import BabyCare from '../../assets/babyCare.png'
export default function BrowseCategories() {
  const categories = [
    {
      name: "Medicines",
      logo:Medicines ,
    },
    {
      name: "Healthcare",
      logo: HealthCare,
    },
    {
      name: "Personal Care",
      logo: personalCare,
    },
    {
      name: "Babycare",
      logo: BabyCare,
    },
    {
      name: "Supplements",
      logo: supplements,
    },
    {
      name: "Devices",
      logo: devices,
    },
  ];

  
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(
      `/medicines?category=${encodeURIComponent(category)}`
    );
  };
  return (
    <section className="w-full bg-white rounded-xl border border-gray-100 p-3 mt-3">

      {/* Header */}
      <div className="flex items-center justify-between mb-3">

        <h2 className="text-[13px] font-bold text-[#102A43]">
          Browse Categories
        </h2>

        <Link
          to="/medicines"
          className="text-[8px] text-[#0F9D74] font-medium hover:underline"
        >
          View All
        </Link>

      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">

        {categories.map((category) => {
          return (
            <Link
              key={category.name}
              to="/medicines"
              className="
                h-[85px]
                bg-white
                border border-gray-100
                rounded-xl
                shadow-sm
                flex
                flex-col
                items-center
                justify-center
                gap-2
                hover:shadow-md
                hover:border-[#0F9D74]
                transition
              "
            >

              <div className="w-[38px] h-[38px] rounded-lg bg-[#E8F8F2] flex items-center justify-center">
                <img
                 src={category.logo}
                alt={category.name}
                className="w-full h-full object-contain"
                
                />
              </div>

              <span className="text-[8px] font-medium text-[#102A43] text-center">
                {category.name}
              </span>

            </Link>
          );
        })}

      </div>

    </section>
  );
}
