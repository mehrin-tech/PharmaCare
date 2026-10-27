// import { Link } from "react-router-dom";
// import heroImage from "../../assets/hero section images.png";

// const HeroSection = () => {
//   return (
//     <section id="home" className="scroll-mt-24 px-4 pt-6 sm:px-6 lg:px-8">
//       <div className="mx-auto grid max-w-8xl  overflow-hidden rounded-[32px] bg-[#effbf4] lg:min-h-[410px] lg:grid-cols-2">

//         {/* Left Content */}
//         <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-14 lg:py-12">

//           <p className="mb-6 flex items-center gap-2 text-sm font-medium text-[#0F9D74]">
//             <span>♡</span>
//             Your Health, Our Priority
//           </p>

//           <h1 className="max-w-xl text-4xl font-extrabold leading-tight tracking-tight text-[#111827] sm:text-5xl lg:text-[54px]">
//             Better Health,
//             <span className="block text-[#0F9D74]">
//               Better Life.
//             </span>
//           </h1>

//           <p className="mt-5 max-w-sm text-base leading-7 text-gray-500">
//             Order medicines online,
//             <br className="hidden sm:block" />
//             upload prescriptions,
//             <br className="hidden sm:block" />
//             track orders easily.
//           </p>

//           {/* CTA Buttons */}
//           <div className="mt-7 flex flex-wrap gap-3">
//             <Link
//               to="/medicines"
//               className="rounded-lg bg-[#0F9D74] px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#0b805e]"
//             >
//               Order Medicines
//             </Link>

//             <Link
//               to="/medicines"
//               className="rounded-lg border-2 border-[#0F9D74] bg-white px-5 py-3 text-sm font-semibold text-[#0F9D74] transition hover:bg-[#DFF6EE]"
//             >
//               Explore Products
//             </Link>
//           </div>

//           {/* Highlights */}
//           <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-xs font-medium text-gray-800 sm:text-sm">
//             <span>🔒 Secure Payments</span>
//             <span>🛡️ 100% Genuine Medicines</span>
//             <span>🚚 Fast Delivery</span>
//           </div>
//         </div>

//         {/* Right Image */}
//         <div className="relative min-h-[280px] overflow-hidden bg-white sm:min-h-[360px] lg:min-h-full">
//           <img
//             src={heroImage}
//             alt="PharmaCare medicines, supplements and healthcare products"
//             className="absolute inset-0 h-full w-full object-cover object-center"
//           />
//         </div>

//       </div>
//     </section>
//   );
// };

// export default HeroSection;


import { Link } from "react-router-dom";
import heroImage from "../../assets/hero section images.png";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="scroll-mt-20 w-full"
    >
      <div className="grid min-h-[calc(100vh-200px)] rounded-xl w-full overflow-hidden bg-[#effbf4] lg:grid-cols-2">

        {/* Left Content */}
        <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-12 xl:px-16">

          <p className="mb-6 flex items-center gap-2 text-sm font-medium text-[#0F9D74]">
            <span>♡</span>
            Your Health, Our Priority
          </p>

          <h1 className="max-w-xl text-4xl font-extrabold leading-tight tracking-tight text-[#111827] sm:text-5xl lg:text-[54px]">
            Better Health,
            <span className="block text-[#0F9D74]">
              Better Life.
            </span>
          </h1>

          <p className="mt-5 max-w-sm text-base leading-7 text-gray-500">
            Order medicines online,
            <br className="hidden sm:block" />
            upload prescriptions,
            <br className="hidden sm:block" />
            track orders easily.
          </p>

          {/* CTA Buttons */}
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/medicines"
              className="rounded-lg bg-[#0F9D74] px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#0b805e]"
            >
              Order Medicines
            </Link>

            <Link
              to="/medicines"
              className="rounded-lg border-2 border-[#0F9D74] bg-white px-5 py-3 text-sm font-semibold text-[#0F9D74] transition hover:bg-[#DFF6EE]"
            >
              Explore Products
            </Link>
          </div>

          {/* Highlights */}
          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-xs font-medium text-gray-800 sm:text-sm">
            <span>🔒 Secure Payments</span>
            <span>🛡️ 100% Genuine Medicines</span>
            <span>🚚 Fast Delivery</span>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative min-h-[300px] overflow-hidden bg-white lg:min-h-0">
          <img
            src={heroImage}
            alt="PharmaCare medicines, supplements and healthcare products"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
