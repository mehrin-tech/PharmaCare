import {
  useEffect,
  useMemo,
  useState,
} from "react";

import Sidebar from "../../components/customer/Sidebar";
import TopNavbar from "../../components/customer/TopNavbar";

import PharmacyHeader from "../../components/customer/PharmacyHeader";
import PharmacySearchFilter from "../../components/customer/PharmacySearchFilter";
import PharmacyLocationBar from "../../components/customer/PharmacyLocationBar";
import PharmacyMap from "../../components/customer/PharmacyMap";
import PharmacyList from "../../components/customer/PharmacyList";
import PharmacyFeatures from "../../components/customer/PharmacyFeatures";

import api from "../../services/api";

import ApolloImg from "../../assets/Appollo.png";
import LifeCareImg from "../../assets/Lifecare.png";
import MedplusImg from "../../assets/Medplus.png";
import MediCareImg from "../../assets/medicare.png";

export default function Pharmacies() {

  // ===============================
  // STATES
  // ===============================

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [pharmacies, setPharmacies] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [searchTerm, setSearchTerm] =
    useState("");

  const [selectedPharmacy, setSelectedPharmacy] =
    useState(null);

  const [sortBy, setSortBy] =
    useState("nearest");

  const [pharmacyType, setPharmacyType] =
    useState("all");

  const [showFilters, setShowFilters] =
    useState(false);

  const [userLocation, setUserLocation] =
    useState(null);


  // ===============================
  // FETCH PHARMACIES
  // ===============================

  useEffect(() => {

    const fetchNearbyPharmacies = async () => {

      try {

        setLoading(true);
        setError("");

        const response = await api.get(
          "/pharmacy/nearby?radius=20"
        );

        console.log(
          "Pharmacies response:",
          response.data
        );

        const pharmacyData =
          response.data.pharmacies || [];

        setPharmacies(pharmacyData);

        if (response.data.userLocation) {

          setUserLocation(
            response.data.userLocation
          );

        }

        if (pharmacyData.length > 0) {

          setSelectedPharmacy(
            pharmacyData[0]
          );

        }

      } catch (error) {

        console.error(
          "Pharmacy fetch error:",
          error.response?.data ||
            error.message
        );

        setError(
          error.response?.data?.message ||
            "Failed to load nearby pharmacies"
        );

      } finally {

        setLoading(false);

      }

    };

    fetchNearbyPharmacies();

  }, []);


  // ===============================
  // PHARMACY LOGO
  // ===============================

  const getPharmacyLogo = (name) => {

    const pharmacyName =
      name?.toLowerCase() || "";

    if (
      pharmacyName.includes("apollo")
    ) {
      return ApolloImg;
    }

    if (
      pharmacyName.includes("lifecare")
    ) {
      return LifeCareImg;
    }

    if (
      pharmacyName.includes("medplus")
    ) {
      return MedplusImg;
    }

    if (
      pharmacyName.includes("medicare")
    ) {
      return MediCareImg;
    }

    return null;
  };


  // ===============================
  // FILTER + SORT
  // ===============================

  const filteredPharmacies = useMemo(() => {

    let result = [...pharmacies];

    // Search
    if (searchTerm.trim()) {

      const search =
        searchTerm.toLowerCase();

      result = result.filter(
        (pharmacy) =>
          pharmacy.pharmacyName
            ?.toLowerCase()
            .includes(search) ||

          pharmacy.pharmacyType
            ?.toLowerCase()
            .includes(search) ||

          pharmacy.address?.city
            ?.toLowerCase()
            .includes(search)
      );

    }

    // Pharmacy type
    if (pharmacyType !== "all") {

      result = result.filter(
        (pharmacy) =>
          pharmacy.pharmacyType
            ?.toLowerCase() ===
          pharmacyType.toLowerCase()
      );

    }

    // Nearest
    if (sortBy === "nearest") {

      result.sort(
        (a, b) =>
          Number(a.distance || 999) -
          Number(b.distance || 999)
      );

    }

    // Delivery
    if (sortBy === "delivery") {

      const getMinutes = (time) => {

        if (!time) return 999;

        const match =
          String(time).match(/\d+/);

        return match
          ? Number(match[0])
          : 999;
      };

      result.sort(
        (a, b) =>
          getMinutes(a.deliveryTime) -
          getMinutes(b.deliveryTime)
      );

    }

    // Name
    if (sortBy === "name") {

      result.sort((a, b) =>
        (a.pharmacyName || "")
          .localeCompare(
            b.pharmacyName || ""
          )
      );

    }

    return result;

  }, [
    pharmacies,
    searchTerm,
    pharmacyType,
    sortBy,
  ]);


  // ===============================
  // SELECT PHARMACY
  // ===============================

  const handleSelectPharmacy = (
    pharmacy
  ) => {

    setSelectedPharmacy(pharmacy);

  };


  // ===============================
  // DIRECTIONS
  // ===============================

  const handleDirections = (
    pharmacy
  ) => {

    const latitude =
      pharmacy?.location?.latitude;

    const longitude =
      pharmacy?.location?.longitude;

    if (
      latitude === undefined ||
      longitude === undefined
    ) {
      return;
    }

    const url =
      `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );

  };


  // ===============================
  // UI
  // ===============================

  return (

    <div className="min-h-screen bg-[#F7F9FA] text-[#102A43] flex">

      {/* Sidebar */}

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />


      {/* Main */}

      <div className="flex-1 min-w-0">

        {/* Navbar */}

        <TopNavbar
          setSidebarOpen={setSidebarOpen}
          medicinePage={false}
        />


        <main className="p-3 sm:p-4 lg:p-5">

          <div className="max-w-[1600px] mx-auto">


            {/* Header */}

            <PharmacyHeader />


            {/* Search + Filter */}

            <PharmacySearchFilter
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              sortBy={sortBy}
              setSortBy={setSortBy}
              showFilters={showFilters}
              setShowFilters={setShowFilters}
              pharmacyType={pharmacyType}
              setPharmacyType={setPharmacyType}
            />


            {/* Location */}

            <PharmacyLocationBar
              pharmacyCount={
                pharmacies.length
              }
            />


            {/* Map + List */}

            <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.15fr)_minmax(380px,0.85fr)] gap-4">


              {/* Map */}

              <PharmacyMap
                selectedPharmacy={
                  selectedPharmacy
                }
                userLocation={
                  userLocation
                }
                getPharmacyLogo={
                  getPharmacyLogo
                }
              />


              {/* Pharmacy List */}

              <PharmacyList
                loading={loading}
                error={error}
                filteredPharmacies={
                  filteredPharmacies
                }
                selectedPharmacy={
                  selectedPharmacy
                }
                onSelectPharmacy={
                  handleSelectPharmacy
                }
                onDirections={
                  handleDirections
                }
                getPharmacyLogo={
                  getPharmacyLogo
                }
              />

            </div>


            {/* Bottom Features */}

            <PharmacyFeatures />

          </div>

        </main>

      </div>

    </div>
  );
}