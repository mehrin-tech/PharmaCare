import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="footer"
      className="bg-white px-4 pb-4 pt-10 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-8xl">
        {/* Main Footer */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 border-b border-gray-200 pb-8 md:grid-cols-3 lg:grid-cols-5 lg:gap-8">
          {/* Brand & Social Media */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-flex flex-col">
              <span className="text-2xl font-bold tracking-tight text-slate-900">
                <span className="mr-1 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#0F9D74] text-sm text-[#0F9D74]">
                  ✚
                </span>
                Pharma<span className="text-[#0F9D74]">Care</span>
              </span>

              <span className="ml-8 text-[10px] text-gray-500">
                Your Health, Our Priority
              </span>
            </Link>

            {/* Social Links */}
            <div className="mt-8 flex items-center gap-5">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="text-gray-700 transition hover:text-[#0F9D74]"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
                </svg>
              </a>

              <a
                href="https://x.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="X"
                className="text-gray-700 transition hover:text-[#0F9D74]"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.7 5.6 22H2.4l7.3-8.4L1.8 2h6.5l4.5 6.7L18.9 2Zm-1.1 18h1.7L7.3 3.9H5.5L17.8 20Z" />
                </svg>
              </a>

              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="text-gray-700 transition hover:text-[#0F9D74]"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M23 7a3 3 0 0 0-2.1-2.1C19 4.4 12 4.4 12 4.4s-7 0-8.9.5A3 3 0 0 0 1 7a31 31 0 0 0-.5 5 31 31 0 0 0 .5 5 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5A3 3 0 0 0 23 17a31 31 0 0 0 .5-5 31 31 0 0 0-.5-5ZM9.8 15.5v-7l6 3.5-6 3.5Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-bold text-gray-900">
              Company
            </h3>

            <ul className="space-y-2 text-xs text-gray-600">
              <li>
                <a href="#about" className="hover:text-[#0F9D74]">
                  About Us
                </a>
              </li>
              <li>
                <a href="#careers" className="hover:text-[#0F9D74]">
                  Careers
                </a>
              </li>
              <li>
                <a href="#blog" className="hover:text-[#0F9D74]">
                  Blog
                </a>
              </li>
              <li>
                <a href="#press" className="hover:text-[#0F9D74]">
                  Press & Media
                </a>
              </li>
            </ul>
          </div>

          {/* Help & Support */}
          <div>
            <h3 className="mb-4 text-sm font-bold text-gray-900">
              Help & Support
            </h3>

            <ul className="space-y-2 text-xs text-gray-600">
              <li>
                <Link to="/contact" className="hover:text-[#0F9D74]">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="hover:text-[#0F9D74]">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/shipping-policy" className="hover:text-[#0F9D74]">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/returns-refunds" className="hover:text-[#0F9D74]">
                  Returns & Refunds
                </Link>
              </li>
            </ul>
          </div>

          {/* My Account */}
          <div>
            <h3 className="mb-4 text-sm font-bold text-gray-900">
              My Account
            </h3>

            <ul className="space-y-2 text-xs text-gray-600">
              <li>
                <Link to="/login" className="hover:text-[#0F9D74]">
                  Login/Register
                </Link>
              </li>
              <li>
                <Link to="/my-orders" className="hover:text-[#0F9D74]">
                  My Orders
                </Link>
              </li>
              <li>
                <Link to="/my-prescriptions" className="hover:text-[#0F9D74]">
                  My Prescriptions
                </Link>
              </li>
              <li>
                <Link to="/track-order" className="hover:text-[#0F9D74]">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="mb-4 text-sm font-bold text-gray-900">
              Contact Us
            </h3>

            <ul className="space-y-3 text-xs text-gray-700">
              <li className="flex items-start gap-2">
                <span aria-hidden="true">☎</span>
                <a
                  href="tel:+918976543210"
                  className="hover:text-[#0F9D74]"
                >
                  +91 8976543210
                </a>
              </li>

              <li className="flex items-start gap-2">
                <span aria-hidden="true">✉</span>
                <a
                  href="mailto:support@pharmacare.com"
                  className="break-all hover:text-[#0F9D74]"
                >
                  support@pharmacare.com
                </a>
              </li>

              <li className="flex items-start gap-2">
                <span aria-hidden="true">⌖</span>
                <span>Bangalore, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright & Policies */}
        <div className="flex flex-col items-center justify-between gap-3 pt-4 text-xs text-gray-500 sm:flex-row">
          <p className="text-center sm:text-left">
            <span className="mr-1">©</span>
            {currentYear} PharmaCare. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <Link
              to="/terms-and-conditions"
              className="transition hover:text-[#0F9D74]"
            >
              Terms & Conditions
            </Link>

            <Link
              to="/privacy-policy"
              className="transition hover:text-[#0F9D74]"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;