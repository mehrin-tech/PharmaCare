

import { useEffect, useState } from "react";
import { MapPin, Clock3 } from "lucide-react";
import { Link } from "react-router-dom";

import api from "../../services/api";

import ApolloImg from "../../assets/Appollo.png";
import LifeCareImg from "../../assets/Lifecare.png";
import medplusImg from "../../assets/Medplus.png";
import MediCare from '../../assets/medicare.png'

export default function NearbyPharmacies() {

  const [nearbyPharmacies, setNearbyPharmacies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchNearbyPharmacies = async () => {

      try {

        const response = await api.get("/pharmacy/nearby");

        console.log(
          "Nearby pharmacies:",
          response.data
        );

        setNearbyPharmacies(
          response.data.pharmacies || []
        );

      } catch (error) {

        console.error(
          "Nearby pharmacy fetch error:",
          error.response?.data || error.message
        );

      } finally {

        setLoading(false);

      }
    };

    fetchNearbyPharmacies();

  }, []);


  const getPharmacyLogo = (name) => {

    const pharmacyName =
      name?.toLowerCase() || "";

    if (pharmacyName.includes("apollo")) {
      return ApolloImg;
    }

    if (pharmacyName.includes("lifecare")) {
      return LifeCareImg;
    }

    if (pharmacyName.includes("medplus")) {
      return medplusImg;
    }

     if (pharmacyName.includes("medicare")) {
      return MediCare
    }
    return null;
  };


  return (
    <div className="w-full bg-white rounded-xl p-3 shadow-sm">

      {/* Header */}

      <div className="flex items-center justify-between mb-3 px-1">

        <h2 className="text-[11px] font-semibold text-[#102A43]">
          Nearby Pharmacies
        </h2>

        <Link
          to="/pharmacies"
          className="text-[10px] font-medium text-[#0F9D74]"
        >
          View all
        </Link>

      </div>


      {/* Loading */}

      {loading && (
        <p className="text-[10px] text-gray-500">
          Finding nearby pharmacies...
        </p>
      )}


      {/* Pharmacy List */}

      {!loading && nearbyPharmacies.length > 0 && (

        <div className="space-y-2">

          {nearbyPharmacies.map((pharmacy) => {

            const logo = getPharmacyLogo(
              pharmacy.pharmacyName
            );

            return (

              <div
                key={pharmacy._id}
                className="border border-gray-200 rounded-lg p-2.5"
              >

                <div className="flex items-center gap-2">

                  {/* Logo */}

                  <div className="w-12 h-12 rounded-md bg-gray-50 flex items-center justify-center shrink-0">

                    {logo ? (

                      <img
                        src={logo}
                        alt={pharmacy.pharmacyName}
                        className="w-10 h-10 object-contain"
                      />

                    ) : (

                      <span className="text-[9px] text-gray-400">
                        Pharmacy
                      </span>

                    )}

                  </div>


                  {/* Details */}

                  <div className="flex-1 min-w-0">

                    <h3 className="text-[10px] font-semibold text-[#102A43] truncate">
                      {pharmacy.pharmacyName}
                    </h3>


                    <div className="flex items-center gap-2 mt-1">

                      {/* Distance */}

                      <div className="flex items-center gap-0.5 text-gray-500">

                        <MapPin size={10} />

                        <span className="text-[8px]">
                          {pharmacy.distance} km
                        </span>

                      </div>


                      {/* Delivery time */}

                      <div className="flex items-center gap-0.5 text-gray-500">

                        <Clock3 size={10} />

                        <span className="text-[8px]">
                         {pharmacy.deliveryTime || '-'}
                        </span>

                      </div>

                    </div>

                  </div>

                </div>


                {/* View Medicines */}

                <Link
                  to={`/pharmacies/${pharmacy._id}`}
                  className="mt-2 block w-full text-center border border-[#0F9D74] text-[#0F9D74] rounded-md py-1.5 text-[9px] font-medium hover:bg-[#0F9D74] hover:text-white transition"
                >
                  View Medicines
                </Link>

              </div>

            );

          })}

        </div>

      )}


      {/* No pharmacies */}

      {!loading &&
        nearbyPharmacies.length === 0 && (

          <p className="text-[10px] text-gray-500">
            No nearby pharmacies found.
          </p>

        )}

    </div>
  );
}