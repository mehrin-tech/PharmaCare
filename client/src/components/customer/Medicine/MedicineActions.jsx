import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../../services/api";

// Layout
import Sidebar from "../../components/customer/Sidebar";
import TopNavbar from "../../components/customer/TopNavbar";

// Medicine components
import MedicineImageGallery
  from "../../components/customer/Medicine/MedicineImage";

import MedicineMainInfo
  from "../../components/customer/Medicine/MedicineInfo";

import MedicinePharmacyCard
  from "../../components/customer/Medicine/MedicinePharmacyCard";

import MedicineDeliveryCard
  from "../../components/customer/Medicine/MedicineDeliveryCard";

import MedicineInfoTable
  from "../../components/customer/Medicine/MedicineInfoTable";

import MedicineDescriptionTabs
  from "../../components/customer/Medicine/MedicineDescriptionTabs";


const MedicineDetails = () => {

  const { medicineId } = useParams();
  const navigate = useNavigate();

  // Sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Medicine
  const [medicine, setMedicine] = useState(null);
  const [loading, setLoading] = useState(true);


  // =========================
  // FETCH MEDICINE
  // =========================

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


  // =========================
  // ADD TO CART
  // =========================

  const handleAddToCart = async (
    medicine,
    quantity
  ) => {

    try {

      await api.post("/cart", {
        medicine: medicine._id,
        quantity,
      });

      alert("Medicine added to cart");

    } catch (error) {

      console.error(
        "Add to cart error:",
        error.response?.data ||
        error.message
      );

    }

  };


  // =========================
  // BUY NOW
  // =========================

  const handleBuyNow = async (
    medicine,
    quantity
  ) => {

    try {

      await api.post("/cart", {
        medicine: medicine._id,
        quantity,
      });

      navigate("/cart");

    } catch (error) {

      console.error(
        "Buy now error:",
        error.response?.data ||
        error.message
      );

    }

  };


  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (

      <div className="min-h-screen bg-[#F6F8FA]">

        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="md:ml-[190px]">

          <TopNavbar />

          <main className="min-h-[calc(100vh-64px)] flex items-center justify-center">

            <p className="text-sm text-gray-500">
              Loading medicine...
            </p>

          </main>

        </div>

      </div>

    );

  }


  // =========================
  // NOT FOUND
  // =========================

  if (!medicine) {

    return (

      <div className="min-h-screen bg-[#F6F8FA]">

        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="md:ml-[190px]">

          <TopNavbar />

          <main className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center gap-4">

            <p className="text-sm text-gray-500">
              Medicine not found.
            </p>

            <button
              onClick={() => navigate("/medicines")}
              className="text-[#0F9D74] text-sm font-medium"
            >
              Go Back
            </button>

          </main>

        </div>

      </div>

    );

  }


  // =========================
  // MAIN UI
  // =========================

  return (

    <div className="min-h-screen bg-[#F6F8FA]">

      {/* =========================
          SIDEBAR
      ========================= */}

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />


      {/* =========================
          RIGHT SIDE
      ========================= */}

      <div className="md:ml-[190px] min-h-screen">


        {/* =========================
            NAVBAR
        ========================= */}

        <TopNavbar />


        {/* =========================
            MAIN CONTENT
        ========================= */}

        <main className="p-3 sm:p-4 lg:p-5">

          <div className="max-w-[1400px] mx-auto">


            {/* =========================
                TOP MEDICINE SECTION
            ========================= */}

            <div
              className="
                grid
                grid-cols-1
                lg:grid-cols-[0.9fr_1.3fr]
                xl:grid-cols-[0.85fr_1.35fr_0.85fr]
                gap-4
              "
            >


              {/* =========================
                  IMAGE
              ========================= */}

              <MedicineImageGallery
                medicine={medicine}
              />


              {/* =========================
                  MEDICINE INFO
              ========================= */}

              <MedicineMainInfo
                medicine={medicine}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
              />


              {/* =========================
                  RIGHT CARDS
              ========================= */}

              <div className="space-y-4">

                <MedicinePharmacyCard
                  medicine={medicine}
                />

                <MedicineDeliveryCard
                  medicine={medicine}
                />

              </div>

            </div>


            {/* =========================
                MEDICINE INFORMATION TABLE
            ========================= */}

            <div className="mt-4">

              <MedicineInfoTable
                medicine={medicine}
              />

            </div>


            {/* =========================
                DESCRIPTION TABS
            ========================= */}

            <div className="mt-4">

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