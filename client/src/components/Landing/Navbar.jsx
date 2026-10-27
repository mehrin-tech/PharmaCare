import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from '../../assets/logo.png'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "How it works", id: "how-it-works" },
    { name: "Top Offers", id: "top-offers" },
    { name: "Why PharmaCare", id: "why-pharmacare" },
   
  ];

  const closeMenu = () => setIsMenuOpen(false);
  const handleScroll=(id)=>{
    if(id==='home'){
      window.scrollTo({
        top:0,
        behavior:'smooth'
      })
    }else{
      document.getElementById(id)?.scrollIntoView({
        behavior:'smooth',
        block:'start'
      })
    }

    closeMenu()
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white">
      <nav className="flex w-full items-center justify-between px-6 py-4 sm:px-8 lg:px-[5%]">

       
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-2"
        >
          
                          <img
                            src={logo}
                            alt="PharmaCare"
                            className="w-[48px] h-[48px] object-contain"
                          />

          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Pharma<span className="text-[#0F9D74]">Care</span>
            </h1>
            <p className="text-xs text-gray-500">
              Your Health, Our Priority
            </p>
          </div>
        </Link> 
  {/* <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-4 sm:px-6 lg:px-8"> */}

    {/* Logo */}
    {/* <Link
      to="/"
      onClick={closeMenu}
      className="flex items-center gap-2"
    >
      <img
        src={logo}
        alt="PharmaCare"
        className="h-12 w-12 object-contain"
      />

      <div>
        <h1 className="text-xl font-bold text-gray-900">
          Pharma<span className="text-[#0F9D74]">Care</span>
        </h1>

        <p className="text-xs text-gray-500">
          Your Health, Our Priority
        </p>
      </div>
    </Link> */}

        {/* Desktop Navigation */}
        {/* <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive
                    ? "text-[#0F9D74]"
                    : "text-gray-600 hover:text-[#0F9D74]"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div> */}
        <div className="hidden items-center gap-8 md:flex">
  {navLinks.map((link) => (
    <button
      key={link.id}
      type="button"
      onClick={() => handleScroll(link.id)}
      className="text-sm font-medium text-gray-600 transition-colors hover:text-[#0F9D74]"
    >
      {link.name}
    </button>
  ))}
</div>

        {/* Desktop Auth Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/login"
            className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 transition hover:text-[#0F9D74]"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-lg bg-[#0F9D74] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0b805e]"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-2xl text-gray-700 md:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? "×" : "☰"}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {/* {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `text-sm font-medium ${
                    isActive
                      ? "text-[#0F9D74]"
                      : "text-gray-600 hover:text-[#0F9D74]"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))} */}
            <div className="flex flex-col gap-4">
  {navLinks.map((link) => (
    <button
      key={link.id}
      type="button"
      onClick={() => handleScroll(link.id)}
      className="text-left text-sm font-medium text-gray-600 hover:text-[#0F9D74]"
    >
      {link.name}
    </button>
  ))}

  {/* Login and Sign Up buttons ഇവിടെ തുടരാം */}


            <div className="flex gap-3 border-t border-gray-100 pt-4">
              <Link
                to="/login"
                onClick={closeMenu}
                className="flex-1 rounded-lg border border-[#0F9D74] px-4 py-2.5 text-center text-sm font-semibold text-[#0F9D74]"
              >
                Login
              </Link>

<Link
  to="/register"
  onClick={closeMenu}
  className="flex-1 rounded-lg bg-[#0F9D74] px-4 py-2.5 text-center text-sm font-semibold text-white"
>
  Sign Up
</Link>
              {/* <Link
                to="/register"
                onClick={closeMenu}
                className="flex-1 rounded-lg bg-[#0F9D74] px-4 py-2.5 text-center text-sm font-semibold text-white"
              >
                Sign Up
              </Link> */}
            </div>
          </div>
        </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;