import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Menu } from "lucide-react";

import api from "../../services/api";

import Sidebar from "../../components/customer/Sidebar";
import TopNavbar from "../../components/customer/TopNavbar";

import PharmacyDetailsHeader
  from "../../components/customer/Pharmacy/PharmacyDetailsHeader";

import PharmacyMap
  from "../../components/customer/Pharmacy/PharmacyMap";

import PharmacyFeatures
  from "../../components/customer/Pharmacy/PharmacyFeatures";

import PharmacyTabs
  from "../../components/customer/Pharmacy/PharmacyTabs";

import PharmacyAbout
  from "../../components/customer/Pharmacy/PharmacyAbout";

import PharmacySearch
  from "../../components/customer/Pharmacy/PharmacySearch";

import MedicineGrid
 from "../../components/customer/Pharmacy/MedicineGrid";
import MedicineCard from '../../components/customer/MedicineCard'

const PharmacyDetails = () => {

  const { pharmacyId } = useParams();
  const navigate = useNavigate();

  // =========================
  // SIDEBAR
  // =========================

  const [sidebarOpen, setSidebarOpen] = useState(false);


  // =========================
  // DATA
  // =========================

  const [pharmacy, setPharmacy] = useState(null);
  const [medicines, setMedicines] = useState([]);

  const [activeTab, setActiveTab] =
    useState("About");

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [pharmacyError, setPharmacyError] = useState("");
  const [medicineLoading, setMedicineLoading] =
    useState(true);


  // =========================
  // FETCH PHARMACY
  // =========================

  const fetchPharmacy = useCallback(
    () => api.get(`/pharmacy/${pharmacyId}`),
    [pharmacyId]
  );


  // =========================
  // FETCH MEDICINES
  // =========================

  const fetchMedicines = useCallback(
    () => api.get(`/medicines/pharmacy/${pharmacyId}`),
    [pharmacyId]
  );


  // =========================
  // INITIAL FETCH
  // =========================

  useEffect(() => {

    if (!pharmacyId) return;
    let cancelled = false;

    Promise.allSettled([fetchPharmacy(), fetchMedicines()]).then(([pharmacyResult, medicinesResult]) => {
      if (cancelled) return;

      if (pharmacyResult.status === "fulfilled") {
        setPharmacy(pharmacyResult.value.data.pharmacy);
        setPharmacyError("");
      } else {
        const error = pharmacyResult.reason;
        console.error("Failed to fetch pharmacy:", error.response?.data || error.message);
        setPharmacy(null);
        setPharmacyError(error.response?.status === 404
          ? "Pharmacy not found."
          : "Unable to load pharmacy details. Check your sign-in and connection, then try again.");
      }

      if (medicinesResult.status === "fulfilled") {
        setMedicines(medicinesResult.value.data.medicines || []);
      } else {
        const error = medicinesResult.reason;
        console.error("Failed to fetch medicines:", error.response?.data || error.message);
        setMedicines([]);
      }

      setLoading(false);
      setMedicineLoading(false);
    });

    return () => { cancelled = true; };
  }, [pharmacyId, fetchPharmacy, fetchMedicines]);


  // =========================
  // SEARCH FILTER
  // =========================

  const filteredMedicines = medicines.filter(
    (medicine) => {

      const name =
        medicine.name?.toLowerCase() || "";

      return name.includes(
        search.toLowerCase()
      );

    }
  );


  // =========================
  // TAB FILTER
  // =========================

  const tabMedicines =

    activeTab === "About" ||
    activeTab === "All Medicines"

      ? filteredMedicines

      : activeTab === "OTC"

      ? filteredMedicines.filter(
          (medicine) =>
            (medicine.isPrescriptionRequired ?? medicine.prescriptionRequired) === false
        )

      : activeTab === "Prescription required"

      ? filteredMedicines.filter(
          (medicine) =>
            (medicine.isPrescriptionRequired ?? medicine.prescriptionRequired) === true
        )

      : activeTab === "HealthCare"

      ? filteredMedicines.filter(
          (medicine) =>
            ["healthcare", "personalcare", "supplement", "supplements"].includes(
              medicine.category?.trim().toLowerCase()
            )
        )

      : activeTab === "BabyCare"

      ? filteredMedicines.filter(
          (medicine) =>
            medicine.category?.trim().toLowerCase() === "babycare"
        )

      : activeTab === "Supplements"

      ? filteredMedicines.filter(
          (medicine) =>
            ["supplement", "supplements"].includes(
              medicine.category?.trim().toLowerCase()
            )
        )

      : filteredMedicines;


  // =========================
  // ADD TO CART
  // =========================

  const handleAddToCart = async (medicine) => {

    try {

      await api.post("/cart", {
        medicineId: medicine._id,
        quantity: 1
      });

      alert("Medicine added to cart");

    } catch (error) {

      console.error(
        "Add to cart error:",
        error.response?.data || error.message
      );

    }

  };


  // =========================
  // VIEW DETAILS
  // =========================

  const handleViewDetails = (medicine) => {

    navigate(
      `/medicines/${medicine._id}`
    );

  };


  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f9fa]">

        <p className="text-[11px] text-gray-500">
          Loading pharmacy...
        </p>

      </div>
    );

  }


  // =========================
  // NOT FOUND
  // =========================

  if (!pharmacy) {

    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-[#f7f9fa]">

        <p className="text-[11px] text-gray-500">
          {pharmacyError || "Pharmacy not found."}
        </p>

        <button
          onClick={() => navigate(-1)}
          className="text-[10px] text-[#0F9D74]"
        >
          Go Back
        </button>

      </div>
    );

  }


  // =========================
  // UI
  // =========================

  return (

    <div className="min-h-screen bg-[#f7f8f8] md:flex">

      {/* ================= SIDEBAR ================= */}

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />


      {/* ================= MAIN ================= */}

      <main className="flex-1 min-w-0">


        {/* ================= TOP NAVBAR ================= */}

        <div className="hidden md:block">
          <TopNavbar setSidebarOpen={setSidebarOpen} />
        </div>


        {/* ================= MOBILE HEADER ================= */}

        <div className="
          md:hidden
          sticky
          top-0
          z-40
          bg-white
          border-b
          px-4
          py-3
          flex
          items-center
          gap-3
        ">

          <button
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={19} />
          </button>

          <h1 className="text-xs font-semibold">
            Pharmacy Details
          </h1>

        </div>


        {/* ================= PAGE ================= */}

        <div className="p-3 sm:p-4 lg:px-6 lg:py-4">


          {/* Breadcrumb */}

          <div className="
            flex
            items-center
            gap-1
            text-[10px]
            text-gray-400
            mb-2
          ">

            <button
              onClick={() => navigate("/home")}
            >
              Home
            </button>

            <span>›</span>

            <button
              onClick={() => navigate("/pharmacies")}
            >
              Nearby Pharmacies
            </button>

            <span>›</span>

            <span className="text-[#0F9D74]">
              {pharmacy.pharmacyName}
            </span>

          </div>


          {/* =========================================
              MAIN 2 COLUMN LAYOUT
          ========================================= */}

          <div className="
            grid
            grid-cols-1
            md:grid-cols-[minmax(0,1fr)_220px]
            lg:grid-cols-[minmax(0,1fr)_250px]
            gap-4
            items-start
          ">


            {/* =====================================
                LEFT COLUMN
            ===================================== */}

            <div className="min-w-0">


              {/* Pharmacy Header */}

              <PharmacyDetailsHeader
                pharmacy={pharmacy}
              />


              {/* Tabs */}

              <div className="mt-3">

                <PharmacyTabs
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />

              </div>


              {/* About */}

              {activeTab === "About" && (
                <div className="mt-3">
                  <PharmacyAbout pharmacy={pharmacy} />
                </div>
              )}
              {activeTab !== "About" && <>
              {/* Search */}

              <div className="mt-3">

                <div className="
                  flex
                  items-center
                  gap-2
                ">

                  <div className="flex-1">

                    <PharmacySearch
                      search={search}
                      setSearch={setSearch}
                    />

                  </div>


                  <button
                    className="
                      shrink-0
                      border
                      border-gray-200
                      bg-white
                      rounded-md
                      px-3
                      py-1.5
                      text-[11px]
                      text-gray-600
                      hover:border-[#0F9D74]
                    "
                  >
                    Popularity
                  </button>

                </div>

              </div> 


              {/* Medicine Heading */}

              <div className="
                flex
                items-center
                justify-between
                mt-4
                mb-3
              ">

                <h2 className="
                  text-[14px]
                  font-semibold
                  text-[#102A43]
                ">
                  All Medicines
                </h2>

                <span className="
                  text-[10px]
                  text-gray-400
                ">
                  {tabMedicines.length} medicines
                </span>

              </div>


              {/* Medicines */}

              {medicineLoading ? (

                <div className="
                  bg-white
                  border
                  rounded-lg
                  py-10
                  text-center
                ">

                  <p className="text-[9px] text-gray-400">
                    Loading medicines...
                  </p>

                </div>

              ) : tabMedicines.length === 0 ? (

                <div className="
                  bg-white
                  border
                  rounded-lg
                  py-10
                  text-center
                ">

                  <p className="text-[9px] text-gray-400">
                    No medicines available
                  </p>

                </div>

              ) : (

                <MedicineGrid
                 
                  medicines={tabMedicines}
                  onAddToCart={handleAddToCart}
                  onViewDetails={handleViewDetails}
                />
//                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
//   {tabMedicines.map((medicine) => (
//     <MedicineCard
//       key={medicine._id}
//       medicine={medicine}
//       onAddToCart={handleAddToCart}
//       onViewDetails={handleViewDetails}
//     />
//   ))}
// </div>

              )}
              </>}
            </div>


            {/* =====================================
                RIGHT COLUMN
            ===================================== */}

            <div className="min-w-0 space-y-3">
              <PharmacyFeatures pharmacy={pharmacy} />
              <PharmacyMap pharmacy={pharmacy} />

            </div>

          </div>

        </div>

      </main>

    </div>
  );
};


export default PharmacyDetails;
