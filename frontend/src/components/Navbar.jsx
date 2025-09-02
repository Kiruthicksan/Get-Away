import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const Navbar = () => {
  const { isAdmin, user, isAuthenticated,logout } = useAuth(); 
  
  const handleLogout = async () => {
  console.log("🔥 Logout button clicked!");
  try {
    console.log("📡 Calling logout function...");
    await logout();
    console.log("✅ Logout completed successfully");
  } catch (error) {
    console.error("❌ Logout failed:", error);
  }
};
  return (
    <div>
      <nav className="flex items-center justify-between p-4 bg-white shadow-md">
        <div className="w-40">
          <img src={logo} alt="logo" className="w-full" />
        </div>
        
        <div className="flex items-center space-x-6">
          {/* Navigation Links */}
          {isAuthenticated ? (
            <>
              {isAdmin() ? ( 
                <Link to="/admin" className="hover:text-blue-600">Dashboard</Link>
              ) : (
                <Link to="/" className="hover:text-blue-600">Home</Link>
              )}
              
              <Link to="/flights" className="hover:text-blue-600">Flights</Link>
              
              {isAdmin() ? ( 
                <Link to="/admin/bookings" className="hover:text-blue-600">Manage Bookings</Link>
              ) : (
                <Link to="/my-bookings" className="hover:text-blue-600">My Bookings</Link>
              )}
            </>
          ) : (
            // Show these when user is not logged in
            <>
              <Link to="/" className="hover:text-blue-600">Home</Link>
              <Link to="/flights" className="hover:text-blue-600">Flights</Link>
            </>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              {/* Welcome message */}
              {isAdmin() ? ( // ✅ Add parentheses
                <span className="text-gray-700">
                  Welcome, {user?.userName?.charAt(0)?.toUpperCase() + user?.userName?.slice(1)}
                </span>
              ) : (
                <span className="text-gray-700">
                  Hello, {user?.userName?.charAt(0)?.toUpperCase() + user?.userName?.slice(1)}
                </span>
              )}
              
              {/* Logout button */}
              <button 
                onClick={handleLogout} 
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            // Show login/register when not authenticated
            <>
              <Link to="/login" className="text-blue-600 hover:text-blue-800">Login</Link>
              <Link to="/register" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Register</Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;