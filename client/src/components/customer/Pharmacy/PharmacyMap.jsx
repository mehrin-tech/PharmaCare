import {
  MapPin,
  Navigation,
} from "lucide-react";


const PharmacyMap = ({ pharmacy }) => {

  if (!pharmacy) return null;


  // =========================
  // LOCATION
  // =========================

  // =========================
  // ADDRESS
  // =========================

  const address = [
    pharmacy.address?.street,
    pharmacy.address?.city,
    pharmacy.address?.state,
    pharmacy.address?.pincode,
  ]
    .filter(Boolean)
    .join(", ");

  const latitude = pharmacy?.location?.latitude;
  const longitude = pharmacy?.location?.longitude;
  const hasCoordinates = latitude != null && longitude != null && latitude !== "" && longitude !== "" &&
    Number.isFinite(Number(latitude)) && Number.isFinite(Number(longitude));
  const destination = hasCoordinates ? `${latitude},${longitude}` : address;
  const mapUrl = destination
    ? `https://www.google.com/maps?q=${encodeURIComponent(destination)}&z=15&output=embed`
    : "https://www.google.com/maps?output=embed";


  // =========================
  // DIRECTIONS
  // =========================

  const openDirection = () => {

    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination || pharmacy.pharmacyName)}`,
      "_blank"
    );

  };


  return (

    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">


        {/* MAP */}

        <div className="h-[130px]">

          <iframe
            title="Pharmacy Location"
            src={mapUrl}
            className="
              w-full
              h-full
              border-0
            "
            loading="lazy"
            allowFullScreen
          />

        </div>


        {/* LOCATION DETAILS */}

        <div className="p-3">


          <div className="flex gap-2">


            <MapPin
              size={11}
              className="
                text-[#0F9D74]
                shrink-0
                mt-0.5
              "
            />


            <div>

              <p className="
                text-[10px]
                font-semibold
                text-gray-700
              ">

                {pharmacy.distance
                  ? `${Number(
                      pharmacy.distance
                    ).toFixed(1)} km away`
                  : "Nearby"}

              </p>


              <p className="
                text-[10px]
                text-gray-500
                mt-0.5
                leading-3
              ">

                {address ||
                  "Pharmacy location"}

              </p>

            </div>

          </div>


          {/* GET DIRECTION */}

          <button
            onClick={openDirection}
            className="
              flex
              items-center
              gap-1
              text-[10px]
              font-medium
              text-[#0F9D74]
              mt-3
              hover:underline
            "
          >

            <Navigation size={8} />

            Get Direction

          </button>


        </div>

    </div>
  );
};


export default PharmacyMap;
