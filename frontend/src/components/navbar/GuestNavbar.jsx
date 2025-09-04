import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useState } from "react";
import { HiOutlineMenu, HiX } from "react-icons/hi";

const GuestNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-gray-900 border-b border-gray-700 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src={logo}
              alt="logo"
              className="h-10 w-auto bg-white rounded-2xl p-2"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `relative font-medium text-md transition-colors ${
                  isActive
                    ? "text-indigo-400"
                    : "text-gray-300 hover:text-white"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/flights"
              className={({ isActive }) =>
                `relative font-medium text-md transition-colors ${
                  isActive
                    ? "text-indigo-400"
                    : "text-gray-300 hover:text-white"
                }`
              }
            >
              Flights
            </NavLink>
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/login"
              className="text-gray-300 hover:text-white transition-colors px-4 py-2"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-500 transition-colors shadow-lg"
            >
              Register
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isMenuOpen ? (
                <HiX className="h-6 w-6" />
              ) : (
                <HiOutlineMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-900 border-t border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-3">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive
                      ? "text-indigo-400 bg-gray-800"
                      : "text-gray-300 hover:text-white hover:bg-gray-800"
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </NavLink>

              <NavLink
                to="/flights"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive
                      ? "text-indigo-400 bg-gray-800"
                      : "text-gray-300 hover:text-white hover:bg-gray-800"
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Flights
              </NavLink>

              <div className="border-t border-gray-700 pt-3">
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-indigo-600 text-white hover:bg-indigo-500 transition-colors mt-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default GuestNavbar;
