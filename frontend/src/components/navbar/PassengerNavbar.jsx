import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
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

const avatarVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.1, rotate: 5 },
  tap: { scale: 0.9 },
};

const PassengerNavbar = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <nav className="sticky top-0 z-50 bg-[#1D3557] backdrop:blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 ">
          {/* Brand logo */}
          <motion.div variants={logoVariants} whileHover="hover" whileTap="tap">
            <Link to="/">
              <img
                src={logo}
                alt="logo"
                className="h-10 w-full bg-white rounded-2xl p-2"
              />
            </Link>
          </motion.div>

          {/* Navigation links */}
          <div className="hidden md:flex items-center space-x-8">
            <motion.div
              variants={navItemVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <NavLink
                to="/"
                className="text-white relative font-medium text-md hover:text-[#457B9D]"
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
                className="text-white relative font-medium text-md hover:text-[#457B9D]"
              >
                Flights
              </NavLink>
            </motion.div>

            <motion.div
              variants={navItemVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <NavLink
                to="/my-bookings"
                className="text-white relative font-medium text-md hover:text-[#457B9D]"
              >
               My Bookings
              </NavLink>
            </motion.div>

            
          </div>

          {/* Profile Buttons */}

          <div className="flex gap-6 items-center">
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white text-2xl font-extrabold items-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isMenuOpen ? (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <HiX />
                  </motion.span>
                ) : (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <HiOutlineMenu />
                  </motion.span>
                )}
              </button>
            </div>
            <motion.div
              variants={avatarVariants}
              whileHover="hover"
              whileTap="tap"
              className="cursor-pointer"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <div className="bg-[#E63946] w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                {user?.userName?.charAt(0)?.toUpperCase()}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* DropDown Menu */}

      {isProfileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute right-10 mt-2 w-40 bg-white rounded-lg shadow-lg text-black"
        >
          <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Logout
          </button>
        </motion.div>
      )}

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-[#1D3557] p-4 space-y-4 text-center"
        >
          <Link
            className="block text-white hover:text-[#457B9D]"
            to="/dashboard"
          >
            Dashboard
          </Link>
          <Link className="block text-white hover:text-[#457B9D]" to="/flights">
            Flights
          </Link>
          <Link
            className="block text-white hover:text-[#457B9D]"
            to="/manage-bookings"
          >
           My Bookings
          </Link>
        
        </motion.div>
      )}
    </nav>
  );
};

export default PassengerNavbar;
