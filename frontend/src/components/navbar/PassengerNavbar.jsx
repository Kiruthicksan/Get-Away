import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { useState } from "react";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import logo from "../../assets/logo.png";

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
    <nav className="sticky top-0 z-50 bg-[#1E1E1E] border-b border-gray-700 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div>
            <Link to="/">
              <img
                src={logo}
                alt="logo"
                className="h-10 w-auto bg-white rounded-xl p-2"
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `relative text-gray-200 font-medium text-md transition ${
                  isActive ? "text-amber-400" : "hover:text-amber-400"
                } after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-amber-500 hover:after:w-full after:transition-all`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/flights"
              className={({ isActive }) =>
                `relative text-gray-200 font-medium text-md transition ${
                  isActive ? "text-amber-400" : "hover:text-amber-400"
                } after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-amber-500 hover:after:w-full after:transition-all`
              }
            >
              Flights
            </NavLink>

            <NavLink
              to="/my-bookings"
              className={({ isActive }) =>
                `relative text-gray-200 font-medium text-md transition ${
                  isActive ? "text-amber-400" : "hover:text-amber-400"
                } after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-amber-500 hover:after:w-full after:transition-all`
              }
            >
              My Bookings
            </NavLink>
          </div>

          {/* Profile & Mobile Menu */}
          <div className="flex gap-6 items-center">
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-200 text-2xl"
              >
                {isMenuOpen ? <HiX /> : <HiOutlineMenu />}
              </button>
            </div>

            {/* Profile Avatar */}
            <div
              className="cursor-pointer bg-amber-600 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-md"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              {user?.userName?.charAt(0)?.toUpperCase()}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Dropdown */}
      {isProfileOpen && (
        <div className="absolute right-10 mt-2 w-40 bg-[#1E1E1E] border border-gray-700 rounded-lg shadow-lg text-gray-200">
          <Link
            to="/profile"
            className="block px-4 py-2 hover:bg-[#2A2A2A] transition"
          >
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 hover:bg-[#2A2A2A] transition"
          >
            Logout
          </button>
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#1E1E1E] p-4 space-y-4 text-center border-t border-gray-700">
          <Link
            className="block text-gray-200 hover:text-amber-400"
            to="/dashboard"
          >
            Dashboard
          </Link>
          <Link className="block text-gray-200 hover:text-amber-400" to="/flights">
            Flights
          </Link>
          <Link
            className="block text-gray-200 hover:text-amber-400"
            to="/manage-bookings"
          >
            My Bookings
          </Link>
        </div>
      )}
    </nav>
  );
};

export default PassengerNavbar;
