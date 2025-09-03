import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { motion } from "framer-motion";
import { useState } from "react";
import { HiOutlineMenu, HiX } from "react-icons/hi";

const logoVariants = {
  hover: { scale: 1.05, rotate: -2 },
  tap: { scale: 0.95 },
};

const navItemVariants = {
  hover: { scale: 1.05, y: -2 },
  tap: { scale: 0.95 },
};

const buttonVariants = {
  hover: { scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" },
  tap: { scale: 0.95 },
};

const GuestNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#1D3557] backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand logo */}
          <motion.div
            variants={logoVariants}
            whileHover="hover"
            whileTap="tap"
            className="flex-shrink-0"
          >
            <Link to="/">
              <img
                src={logo}
                alt="logo"
                className="h-10 w-auto bg-white rounded-2xl p-2"
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation links */}
          <div className="hidden md:flex items-center space-x-8">
            <motion.div
              variants={navItemVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `relative font-medium text-md transition-colors ${
                    isActive
                      ? "text-[#A8DADC]"
                      : "text-white hover:text-[#457B9D]"
                  }`
                }
              >
                Home
              </NavLink>
            </motion.div>

            <motion.div
              variants={navItemVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <NavLink
                to="/flights"
                className={({ isActive }) =>
                  `relative font-medium text-md transition-colors ${
                    isActive
                      ? "text-[#A8DADC]"
                      : "text-white hover:text-[#457B9D]"
                  }`
                }
              >
                Flights
              </NavLink>
            </motion.div>
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.div
              variants={navItemVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                to="/login"
                className="text-white font-medium hover:text-[#A8DADC] transition-colors px-4 py-2"
              >
                Login
              </Link>
            </motion.div>

            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                to="/register"
                className="bg-[#E63946] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#F94144] transition-colors shadow-lg"
              >
                Register
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-[#457B9D] focus:outline-none"
            >
              {isMenuOpen ? (
                <HiX className="h-6 w-6" />
              ) : (
                <HiOutlineMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-[#1D3557] border-t border-gray-700"
          >
            <div className="px-2 pt-2 pb-3 space-y-3">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive
                      ? "text-[#A8DADC] bg-[#457B9D]"
                      : "text-white hover:text-[#A8DADC] hover:bg-[#457B9D]"
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
                      ? "text-[#A8DADC] bg-[#457B9D]"
                      : "text-white hover:text-[#A8DADC] hover:bg-[#457B9D]"
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Flights
              </NavLink>

              <div className="border-t border-gray-700 pt-3">
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-[#A8DADC] hover:bg-[#457B9D] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-[#E63946] text-white hover:bg-[#F94144] transition-colors mt-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default GuestNavbar;