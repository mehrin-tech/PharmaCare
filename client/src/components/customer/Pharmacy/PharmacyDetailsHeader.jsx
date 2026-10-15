import {
  MapPin,
  Star,
  Phone,
  Truck,
  Clock,
  CreditCard,
  Store,
} from "lucide-react";
import ApolloImg from '../../../assets/Appollo.png'
import medplusImg from '../../../assets/Medplus.png'
import MedicareImg from '../../../assets/medicare.png'
import CooperativeImg from  '../../../assets/Cooperative.png'
const PharmacyDetailsHeader = ({ pharmacy }) => {
console.log("PHARMACY DATA:", pharmacy);
const pharmacyImageMap = {
  "Apollo Pharmacy": ApolloImg,
  "Medplus Pharmacy": medplusImg,
  "Cooperative Hospital":CooperativeImg,
  "MediCare Pharmacy": MedicareImg,
};
  if (!pharmacy) return null;
  const pharmacyImage = pharmacyImageMap[pharmacy.pharmacyName] || null

  const address = [
    pharmacy.address?.street,
    pharmacy.address?.city,
    pharmacy.address?.state,
  ]
    .filter(Boolean)
    .join(", ");
  

  return (
    <div className="bg-white border border-gray-200 rounded-lg">

      <div className="p-4">

        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">

          {/* IMAGE */}

          <div className="relative flex h-[110px] w-full shrink-0 items-center justify-center overflow-hidden rounded-md bg-[#E8F8F2] sm:h-[82px] sm:w-[120px]">
            {pharmacyImage ? (
              <>
                <img
                  src={pharmacyImage}
                  alt={pharmacy.pharmacyName}
                  className="h-full w-full object-cover"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                    event.currentTarget.nextElementSibling?.classList.remove("hidden");
                  }}
                />
                <div className="hidden absolute inset-0 flex flex-col items-center justify-center gap-1 text-[#0F9D74]">
                  <Store size={24} strokeWidth={1.5} />
                  <span className="text-[9px] font-medium">Pharmacy</span>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center gap-1 text-[#0F9D74]">
                <Store size={24} strokeWidth={1.5} />
                <span className="text-[9px] font-medium">Pharmacy</span>
              </div>
            )}
          </div>

          {/* DETAILS */}

          <div className="flex-1 min-w-0">

            <div className="flex items-center gap-1.5">

              <h1 className="text-[18px] font-semibold text-[#102A43] truncate">
                {pharmacy.pharmacyName}
              </h1>

              {pharmacy.approvalStatus ===
                "approved" && (
                <span className="text-[10px] text-[#0F9D74]">
                  Verified
                </span>
              )}

            </div>

            {(pharmacy.rating != null || pharmacy.totalReviews != null) && <div className="flex items-center gap-2 mt-1">

              <div className="flex items-center gap-1">

                <Star
                  size={8}
                  className="fill-yellow-400 text-yellow-400"
                />

              <span className="text-[11px]">
                  {pharmacy.rating}
                </span>

              </div>

              <span className="text-[10px] text-gray-400">
                ({pharmacy.totalReviews} Reviews)
              </span>

            </div>}

            <div className="flex items-center gap-1 mt-1">

              <MapPin
                size={8}
                className="text-gray-500"
              />

              <span className="text-[10px] text-gray-500 truncate">
                {address || "Location unavailable"}
              </span>

            </div>

            {pharmacy.phone && (
              <div className="flex items-center gap-1 mt-1">

                <Phone
                  size={8}
                  className="text-gray-500"
                />

                <span className="text-[10px] text-gray-500">
                  {pharmacy.phone}
                </span>

              </div>
            )}

            <div className="flex items-center gap-2 mt-1">

              {pharmacy.distance && (
                <span className="text-[10px] text-gray-500">
                  📍 {Number(pharmacy.distance).toFixed(1)} km away
                </span>
              )}

              <span className={`text-[10px] ${pharmacy.isActive ? "text-[#0F9D74]" : "text-gray-400"}`}>
                {pharmacy.isActive ? "Open now" : "Currently unavailable"}
              </span>

            </div>

          </div>

        </div>

        {/* FEATURES */}

        <div className="grid grid-cols-3 mt-4 pt-3 border-t border-gray-100">

          <div className="text-center border-r border-gray-100">

            <Truck
              size={10}
              className="mx-auto text-[#0F9D74]"
            />

            <p className="text-[10px] font-medium mt-1">
              Fast Delivery
            </p>

            <p className="text-[9px] text-gray-400">
              30 mins
            </p>

          </div>

          <div className="text-center border-r border-gray-100">

            <Clock
              size={10}
              className="mx-auto text-[#0F9D74]"
            />

            <p className="text-[10px] font-medium mt-1">
              Delivery Fee
            </p>

            <p className="text-[9px] text-gray-400">
              ₹20
            </p>

          </div>

          <div className="text-center">

            <CreditCard
              size={10}
              className="mx-auto text-[#0F9D74]"
            />

            <p className="text-[10px] font-medium mt-1">
              Accepts
            </p>

            <p className="text-[9px] text-gray-400">
              COD, UPI, Card
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default PharmacyDetailsHeader;
