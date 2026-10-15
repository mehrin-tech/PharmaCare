import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import api from "../../services/api";

// Sidebar
import Sidebar from "../../components/customer/Sidebar";

// Navbar
import Navbar from "../../components/customer/TopNavbar";

import MedicineImageGallery
  from "../../components/customer/Medicine/MedicineImage";

import MedicineInfo
  from "../../components/customer/Medicine/MedicineInfo";

import MedicinePharmacyCard
  from "../../components/customer/Medicine/MedicinePharmacyCard";


import MedicineInfoTable
  from "../../components/customer/Medicine/MedicineInfoTable";

import MedicineDescriptionTabs
  from "../../components/customer/Medicine/MedicineDescriptionTabs";

import NotFound from "../NotFound/NotFound";
const MedicineDetails = () => {
  const dispatch = useDispatch();

  const { medicineId } = useParams();
  const navigate = useNavigate();

  const [medicine, setMedicine] = useState(null);
  const [loading, setLoading] = useState(true);


  // Sidebar mobile state
  const [sidebarOpen, setSidebarOpen] = useState(false);


  // =====================================
  // FETCH MEDICINE
  // =====================================

  useEffect(() => {

    const fetchMedicine = async () => {

      try {

        setLoading(true);

        const response = await api.get(
          `/medicines/${medicineId}`
        );

        console.log(
          "Medicine details:",
          response.data
        );
      

        setMedicine(
          response.data.medicine
        );

      } catch (error) {

        console.error(
          "Medicine details error:",
          error.response?.data ||
          error.message
        );
        
      } finally {

        setLoading(false);

      }

    };

    if (medicineId) {
      fetchMedicine();
    }

  }, [medicineId]);

const handleUploadPrescription = () => {
  const pharmacy = medicine?.pharmacy;
  const pharmacyId =
    typeof pharmacy === "object"
      ? pharmacy?._id ?? pharmacy?.id
      : pharmacy;

  if (!medicine?._id || !pharmacyId) {
    console.error("Medicine ID or Pharmacy ID missing");
    return;
  }

  navigate(
    `/prescription?medicineId=${encodeURIComponent(medicine._id)}&pharmacyId=${encodeURIComponent(pharmacyId)}&medicineName=${encodeURIComponent(medicine.name || "Selected medicine")}`
  );
};
  // =====================================
  // ADD TO CART
  // =====================================

 const handleAddToCart = async (medicine, quantity) => {
  try {
    await dispatch(
      addToCart({
        medicineId: medicine._id,
        quantity,
      })
    ).unwrap();

    alert("Medicine added to cart successfully!");
  } catch (error) {
    console.error("Add to cart error:", error);
    alert(
      typeof error === "string"
        ? error
        : "Failed to add medicine to cart"
    );
  }
};


  // =====================================
  // BUY NOW
  // =====================================

const handleBuyNow = (medicine, quantity) => {
  if (!medicine?._id || quantity < 1) {
    alert("Invalid medicine or quantity");
    return;
  }

  navigate("/checkout", {
    state: {
      buyNowItem: {
        medicineId: medicine._id,
        medicine,
        quantity,
      },
    },
  });
};


  // =====================================
  // LOADING
  // =====================================

  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F6F8FA]">

        <p className="text-gray-500">
          Loading medicine...
        </p>

      </div>
    );

  }


  // =====================================
  // NOT FOUND
  // =====================================

  if (!medicine) {

    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#F6F8FA]">

        <p className="text-gray-500">
          Medicine not found.
        </p>

        <button
          onClick={() => navigate("/medicines")}
          className="text-[#0F9D74]"
        >
          Go Back
        </button>

      </div>
    );

  }


  // =====================================
  // MAIN
  // =====================================

  return (

    <div className="min-h-screen bg-[#F6F8FA] md:flex">

      {/* =================================
          SIDEBAR
      ================================= */}

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />


      {/* =================================
          MAIN AREA
      ================================= */}

      <div className="min-w-0 flex-1 min-h-screen">


        {/* =================================
            NAVBAR
        ================================= */}

        <Navbar
          setSidebarOpen={setSidebarOpen}
        />


        {/* =================================
            PAGE CONTENT
        ================================= */}

        <main className="px-4 sm:px-5 lg:px-6 py-5">

          <div className="max-w-[1400px] mx-auto">


            {/* =================================
                BACK BUTTON
            ================================= */}

            <button
              onClick={() => navigate(-1)}
              className="
                flex
                items-center
                gap-2
                text-sm
                text-gray-500
                hover:text-[#0F9D74]
                mb-4
              "
            >

              <ArrowLeft size={17} />

              Back to Medicines

            </button>


            {/* =================================
                TOP SECTION
            ================================= */}

            <div
              className="
                grid
                grid-cols-1
                xl:grid-cols-[1fr_1.4fr_0.9fr]
                gap-4
                items-stretch
              "
            >


              {/* =================================
                  IMAGE
              ================================= */}

              <div className="h-full">
                <MedicineImageGallery
                  medicine={medicine}
                />
              </div>


              {/* =================================
                  MAIN MEDICINE INFO
              ================================= */}

              <div className="h-full">
                <MedicineInfo
                  medicine={medicine}
                  onAddToCart={handleAddToCart}
                  onBuyNow={handleBuyNow}
                  onUploadPrescription={handleUploadPrescription}
                />
              </div>


              {/* =================================
                  RIGHT SIDE
              ================================= */}

              <div className="h-full">

                <MedicinePharmacyCard
                  medicine={medicine}
                />

                {/* <MedicineDeliveryCard
                  medicine={medicine}
                /> */}

              </div>

            </div>


            {/* =================================
                MEDICINE INFORMATION TABLE
            ================================= */}

            <div className="mt-5">

              <MedicineInfoTable
                medicine={medicine}
              />

            </div>


            {/* =================================
                DESCRIPTION
            ================================= */}

            <div className="mt-5">

              <MedicineDescriptionTabs
                medicine={medicine}
              />

            </div>


          </div>

        </main>

      </div>

    </div>

  );

};


export default MedicineDetails;
