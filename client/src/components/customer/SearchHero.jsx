import { Link } from "react-router-dom";
import {
  Search,
  ShieldCheck,
  BadgeCheck,
  Truck,
} from "lucide-react";

import heroImage from "../../assets/hero section images.png";

function SearchHero() {
  return (
    <section className="w-full bg-white rounded-xl border border-gray-100 overflow-hidden">

      <div
        className="
          w-full
          min-h-[150px]
          bg-gradient-to-r from-[#E8F8F2] to-white
          flex items-center justify-between
          gap-3
          px-3 py-4

          sm:px-4
          md:min-h-[160px]
          md:px-5
        "
      >

        {/* LEFT CONTENT */}
        <div className="flex-1 min-w-0">

          <h1
            className="
              text-[17px]
              sm:text-[19px]
              md:text-[21px]
              font-bold
              leading-tight
              text-[#102A43]
            "
          >
            Search Medicines From
            <br />

            <span className="text-[#0F9D74]">
              Nearby Pharmacies
            </span>
          </h1>


          {/* SEARCH */}
          <div
            className="
              flex
              w-full
              max-w-[280px]
              h-[30px]
              bg-white
              border
              border-gray-200
              rounded-md
              overflow-hidden
              mt-3
            "
          >

            <Search
              size={12}
              className="ml-2.5 mt-2 text-gray-400 shrink-0"
            />

            <input
              type="text"
              placeholder="Search for medicines..."
              className="
                flex-1
                min-w-0
                px-2
                outline-none
                text-[8px]
                sm:text-[9px]
              "
            />

            <Link
              to="/medicines"
              className="
                bg-[#0F9D74]
                text-white
                px-3
                sm:px-4
                flex
                items-center
                justify-center
                text-[8px]
                shrink-0
              "
            >
              Search
            </Link>

          </div>


          {/* FEATURES */}
          <div
            className="
              flex
              flex-wrap
              items-center
              gap-x-2
              gap-y-1
              mt-3
            "
          >

            <div className="flex items-center gap-1">
              <ShieldCheck
                size={9}
                className="text-[#0F9D74] shrink-0"
              />

              <span className="text-[6px] text-gray-500">
                Secure Payments
              </span>
            </div>


            <div className="flex items-center gap-1">
              <BadgeCheck
                size={9}
                className="text-[#0F9D74] shrink-0"
              />

              <span className="text-[6px] text-gray-500">
                100% Genuine
              </span>
            </div>


            <div className="flex items-center gap-1">
              <Truck
                size={9}
                className="text-[#0F9D74] shrink-0"
              />

              <span className="text-[6px] text-gray-500">
                Fast Delivery
              </span>
            </div>

          </div>

        </div>


        {/* RIGHT IMAGE */}
        <div
          className="
            hidden
            sm:flex
            shrink-0
            w-[110px]
            h-[100px]
            md:w-[150px]
            md:h-[125px]
            lg:w-[180px]
            lg:h-[135px]
            rounded-xl
            overflow-hidden
            items-center
            justify-center
          "
        >

          <img
            src={heroImage}
            alt="PharmaCare"
            className="w-full h-full object-contain"
          />

        </div>

      </div>

    </section>
  );
}

export default SearchHero;