import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";

import NotFoundImg from "../../assets/notfoundimg.png";

import Sidebar from "../../components/customer/Sidebar";
import TopNavbar from "../../components/customer/TopNavbar";

const NotFound = () => {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F8F8] md:flex">

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

      <main className="flex-1 min-w-0">


        {/* =================================
            DESKTOP NAVBAR
        ================================= */}

        <div className="hidden md:block">
          <TopNavbar
            setSidebarOpen={setSidebarOpen}
          />
        </div>


        {/* =================================
            MOBILE HEADER
        ================================= */}

        <div className="md:hidden bg-white border-b border-gray-100 px-4 py-3">

          <button
            onClick={() => setSidebarOpen(true)}
            className="text-[#102A43] text-xl"
            aria-label="Open menu"
          >
            ☰
          </button>

        </div>


        {/* =================================
            404 CONTENT
        ================================= */}

        <div
          className="
            min-h-[calc(100vh-64px)]
            flex
            items-center
            justify-center
            px-4
            py-8
          "
        >

          <div
            className="
              w-full
              max-w-[500px]
              flex
              flex-col
              items-center
              text-center
            "
          >


            {/* =================================
                ILLUSTRATION
            ================================= */}

            <div className="flex justify-center mb-2">

              <img
                src={NotFoundImg}
                alt="Page not found"
                className="
                  w-[190px]
                  sm:w-[220px]
                  h-auto
                  object-contain
                "
              />

            </div>


            {/* =================================
                404 NUMBER
            ================================= */}

            <h1
              className="
                text-[52px]
                sm:text-[64px]
                font-bold
                leading-none
                text-[#0F9D74]
              "
            >
              404
            </h1>


            {/* =================================
                HEADING
            ================================= */}

            <h2
              className="
                mt-2
                text-[15px]
                sm:text-[18px]
                font-semibold
                text-[#102A43]
              "
            >
              Oops! Page Not Found
            </h2>


            {/* =================================
                DESCRIPTION
            ================================= */}

            <p
              className="
                mt-2
                max-w-[300px]
                text-[9px]
                sm:text-[10px]
                leading-4
                text-gray-500
              "
            >
              The page you are looking for doesn't exist
              <br />
              or may have been moved.
            </p>


            {/* =================================
                BUTTONS
            ================================= */}

            <div
              className="
                flex
                items-center
                justify-center
                gap-3
                mt-5
              "
            >

              {/* Dashboard */}

              <button
                onClick={() => navigate("/home")}
                className="
                  min-w-[105px]
                  h-[32px]
                  px-4
                  rounded-md
                  bg-[#0F9D74]
                  text-white
                  text-[9px]
                  font-semibold
                  hover:bg-[#0C8965]
                  transition
                  flex
                  items-center
                  justify-center
                  gap-1.5
                "
              >

                <Home size={12} />

                Go to Dashboard

              </button>


              {/* Go Back */}

              <button
                onClick={() => navigate(-1)}
                className="
                  min-w-[90px]
                  h-[32px]
                  px-4
                  rounded-md
                  border
                  border-[#0F9D74]
                  bg-white
                  text-[#0F9D74]
                  text-[9px]
                  font-semibold
                  hover:bg-[#E8F8F2]
                  transition
                  flex
                  items-center
                  justify-center
                  gap-1.5
                "
              >

                <ArrowLeft size={12} />

                Go Back

              </button>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
};

export default NotFound;