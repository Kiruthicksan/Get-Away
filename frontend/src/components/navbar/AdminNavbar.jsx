import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import logo from "../../assets/logo.png";
import { useState } from "react";
import { HiOutlineMenu, HiX } from "react-icons/hi";

const AdminNavbar = () => {
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
    <nav className="sticky top-0 z-50 bg-gray-900 border-b border-gray-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/">
            <img
              src={logo}
              alt="logo"
              className="h-10 w-full bg-white rounded-2xl p-2"
            />
          </Link>

          {/* Navigation links */}
          <div className="hidden md:flex items-center space-x-8">
            {[
              { to: "/", label: "Dashboard" },
              { to: "/flights", label: "Flights" },
              { to: "/manage-bookings", label: "Manage Bookings" },
              { to: "/reports", label: "Reports" },
            ].map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className="text-gray-300 font-medium hover:text-white transition duration-200"
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Profile & Menu */}
          <div className="flex gap-6 items-center">
            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 text-2xl"
              >
                {isMenuOpen ? <HiX /> : <HiOutlineMenu />}
              </button>
            </div>

            {/* Profile Avatar */}
            <div
              className="cursor-pointer"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <div className="bg-indigo-600 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                {user?.userName?.charAt(0)?.toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Dropdown */}
      {isProfileOpen && (
        <div className="absolute right-10 mt-2 w-40 bg-gray-800 rounded-lg shadow-lg text-gray-300 border border-gray-700">
          <Link to="/profile" className="block px-4 py-2 hover:bg-gray-700">
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 hover:bg-gray-700"
          >
            Logout
          </button>
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900 p-4 space-y-4 text-center border-t border-gray-700">
          <Link className="block text-gray-300 hover:text-white" to="/dashboard">
            Dashboard
          </Link>
          <Link className="block text-gray-300 hover:text-white" to="/flights">
            Flights
          </Link>
          <Link
            className="block text-gray-300 hover:text-white"
            to="/manage-bookings"
          >
            Manage Bookings
          </Link>
          <Link className="block text-gray-300 hover:text-white" to="/reports">
            Reports
          </Link>
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;
