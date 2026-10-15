import { useState,useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import api from '../../services/api'
import Sidebar from "../../components/customer/Sidebar";
import TopNavbar from "../../components/customer/TopNavbar";
import MedicineLocationBar from "../../components/customer/MedicineLocationBar";
// import categories from '../../components/customer/BrowserCategories'
import healthcare from "../../assets/HealthCare.png";
import medicinesImg from "../../assets/medicines.png";
import personalCare from "../../assets/personalCare.png";
import supplements from "../../assets/supplements.png";
import MedicineSearchHeader from "../../components/customer/MedicineSearchHeader";
import MedicineFilters from "../../components/customer/MedicineFilters";
import MedicineCard from "../../components/customer/MedicineCard";
import NearbyPharmacies from "../../components/customer/NearByPharmacies";

export default function Medicines() {
  
    const [medicines,setMedicines]=useState([])
    const [loading,setLoading]=useState(true)
    const [error,setError]=useState('')
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [filters, setFilters] = useState({
  distance: "",
  deliveryTime: "",
  availability: "",
  maxPrice: 2000,
});
  
const [searchParams, setSearchParams] = useSearchParams();

const [selectedCategory, setSelectedCategory] = useState(
  searchParams.get("category") || "all"
);

useEffect(() => {
  const fetchMedicinesWithLocation = async () => {
    try {
      setLoading(true);
      setError("");

      // Fetch medicines and nearby pharmacies together
      const [medicineResponse, pharmacyResponse] = await Promise.all([
        api.get("/medicines/active"),
        api.get("/pharmacy/nearby?radius=20"),
      ]);

      console.log("Medicine response:", medicineResponse.data);
      console.log("Nearby pharmacy response:", pharmacyResponse.data);

      const medicinesData = medicineResponse.data.medicines || [];
      const pharmaciesData = pharmacyResponse.data.pharmacies || [];

      // Add distance + deliveryTime to every medicine
      const updatedMedicines = medicinesData.map((medicine) => {

        const medicinePharmacyId =
          medicine?.pharmacy?._id || medicine?.pharmacy;

        const nearbyPharmacy = pharmaciesData.find(
          (pharmacy) =>
            pharmacy?._id?.toString() ===
            medicinePharmacyId?.toString()
        );

        return {
          ...medicine,

          distance: nearbyPharmacy?.distance,
          deliveryTime: nearbyPharmacy?.deliveryTime,
        };
      });

      console.log("Updated medicines:", updatedMedicines);

      setMedicines(updatedMedicines);

    } catch (error) {
      console.error(
        "Medicine/location fetch error:",
        error.response?.data || error.message
      );

      setError(
        error.response?.data?.message ||
        "Failed to load medicines"
      );
    } finally {
      setLoading(false);
    }
  };

  fetchMedicinesWithLocation();
}, []);
  
  const categories = [
  {
    name: "All",
    image: null,
    value: "all",
  },
  {
    name: "HealthCare",
    image: healthcare,
    value: "healthcare",
  },
  {
    name: "Medicines",
    image: medicinesImg,
    value: "medicines",
  },
  {
    name: "PersonalCare",
    image: personalCare,
    value: "personalcare",
  },
  {
    name: "Supplements",
    image: supplements,
    value: "supplement",
  },
  {
    name: "BabyCare",
    image: healthcare, // later BabyCare image add cheyyam
    value: "babycare",
  }
  
];

const filteredMedicines = medicines.filter((medicine) => {
  const category =
    medicine?.category?.toLowerCase()?.trim();

  // =========================
  // SEARCH FILTER
  // =========================

  const searchQuery =
    searchParams.get("search")?.toLowerCase()?.trim() || "";

  const medicineName =
    medicine?.name?.toLowerCase()?.trim() || "";

  const searchMatch =
    !searchQuery ||
    medicineName.includes(searchQuery);

  if (!searchMatch) {
    return false;
  }

  // =========================
  // CATEGORY FILTER
  // =========================

  if (selectedCategory === "all") {
    return true;
  }

  if (selectedCategory === "healthcare") {
    return [
      "babycare",
      "personalcare",
      "supplement",
    ].includes(category);
  }

  if (selectedCategory === "medicines") {
    return [
      "pain relief",
      "medicines",
    ].includes(category);
  }

  if (selectedCategory === "personalcare") {
    return category === "personalcare";
  }

  if (selectedCategory === "supplement") {
    return category === "supplement";
  }

  if (selectedCategory === "babycare") {
    return category === "babycare";
  }

  return true;
});


 return (
  <div className="min-h-screen bg-[#F7F9FA] flex text-[#102A43]">

    {/* ================= SIDEBAR ================= */}

    <Sidebar
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
    />


    {/* ================= MAIN AREA ================= */}

    <div className="flex-1 min-w-0">

      {/* ================= TOP NAVBAR ================= */}

      <TopNavbar
        setSidebarOpen={setSidebarOpen}
        medicinePage={true}
      />


      {/* ================= LOCATION BAR ================= */}

      <MedicineLocationBar />


      {/* ================= MAIN CONTENT ================= */}

      <main className="p-3 sm:p-4 lg:p-5">

        {/* ================= CATEGORIES ================= */}

        <section className="w-full mt-1">

          <div className="flex gap-2 overflow-x-auto pb-1">

            {categories.map((category) => (

              <button
                key={category.name}
                onClick={() =>
                  setSelectedCategory(category.value)
                }
                className={`
                  h-[46px]
                  min-w-[110px]
                  px-3
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  shadow-sm
                  transition-all
                  duration-200
                  flex-shrink-0

                  ${
                    selectedCategory === category.value
                      ? "bg-[#DDF7EE] border-[#0F9D74] text-[#0F9D74]"
                      : "bg-white border-gray-100 text-[#102A43] hover:border-[#0F9D74] hover:bg-[#F7FFFC]"
                  }
                `}
              >

                {/* Category Icon */}

                {category.name === "All" ? (

                  <div className="grid grid-cols-2 gap-[2px]">

                    <span className="w-[7px] h-[7px] bg-[#0F9D74] rounded-[2px]" />

                    <span className="w-[7px] h-[7px] bg-[#0F9D74] rounded-[2px]" />

                    <span className="w-[7px] h-[7px] bg-[#0F9D74] rounded-[2px]" />

                    <span className="w-[7px] h-[7px] bg-[#0F9D74] rounded-[2px]" />

                  </div>

                ) : (

                  <div className="w-[30px] h-[30px] flex items-center justify-center">

                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-contain"
                    />

                  </div>

                )}


                {/* Category Name */}

                <span className="text-[8px] sm:text-[9px] font-semibold whitespace-nowrap">
                  {category.name}
                </span>

              </button>

            ))}

          </div>

        </section>


        {/* ================= PRODUCTS AREA ================= */}

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-[minmax(0,1fr)_170px]
            gap-3
            mt-4
            items-start
          "
        >

          {/* ================= MEDICINES ================= */}

          <section className="min-w-0">

            {/* Products Header */}

            <div className="flex items-center justify-between mb-2 px-1">

              <div>

                <h2 className="text-[12px] sm:text-[13px] font-semibold text-[#102A43]">
                  Medicines & Healthcare Products
                </h2>

                <p className="text-[8px] sm:text-[9px] text-gray-500 mt-0.5">
                  Find medicines and healthcare products near you
                </p>

              </div>


              {/* Product Count */}

              {!loading && !error && (
                <span className="text-[9px] sm:text-[10px] text-[#0F9D74] font-semibold">
                  {filteredMedicines.length} products
                </span>
              )}

            </div>


            {/* ================= MEDICINE GRID ================= */}

            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                xl:grid-cols-4
                gap-3
              "
            >

              {/* Loading */}

              {loading && (

                <div className="col-span-full flex justify-center py-10">

                  <p className="text-[10px] text-gray-500">
                    Loading Medicines...
                  </p>

                </div>

              )}


              {/* Error */}

              {!loading && error && (

                <div className="col-span-full bg-white border border-red-100 rounded-xl p-8 text-center">

                  <p className="text-[10px] text-red-500">
                    {error}
                  </p>

                  <button
                    onClick={() =>
                      window.location.reload()
                    }
                    className="
                      mt-3
                      px-4
                      py-2
                      rounded-lg
                      bg-[#0F9D74]
                      text-white
                      text-[9px]
                      font-medium
                    "
                  >
                    Try Again
                  </button>

                </div>

              )}


              {/* No medicines */}

              {!loading &&
                !error &&
                medicines.length === 0 && (

                  <div className="col-span-full bg-white rounded-xl border border-gray-100 p-10 text-center">

                    <p className="text-[11px] font-semibold text-[#102A43]">
                      No medicines found
                    </p>

                    <p className="text-[8px] text-gray-400 mt-1">
                      There are currently no medicines available.
                    </p>

                  </div>

                )}


              {/* Medicine Cards */}

              {!loading &&
                !error &&
                filteredMedicines.map((medicine) => (

                  <MedicineCard
                    key={medicine._id}
                    medicine={medicine}
                  />

                ))}


              {/* No category products */}

              {!loading &&
                !error &&
                medicines.length > 0 &&
                filteredMedicines.length === 0 && (

                  <div className="col-span-full bg-white rounded-xl border border-gray-100 p-10 text-center">

                    <p className="text-[11px] font-semibold text-[#102A43]">
                      No medicines found in this category
                    </p>

                    <p className="text-[8px] text-gray-400 mt-1">
                      Try selecting another category.
                    </p>

                  </div>

                )}

            </div>

          </section>


          {/* ================= NEARBY PHARMACIES ================= */}

          <aside className="min-w-0">

            <NearbyPharmacies />

          </aside>

        </div>

      </main>

    </div>

  </div>
);
}
