import { useAuth } from "../../context/useAuth";
import Search from "../../components/homepage/Search";
import RecentBookings from "../../components/homepage/RecentBookings";
import PopularDestination from "../../components/homepage/PopularDestination";

const PassengerHome = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#121212] text-gray-200 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Welcome Section */}
        <div className="flex flex-col justify-center text-center mt-8 mb-10">
          <h1 className="font-bold text-3xl text-white">
            Welcome Back,{" "}
            {user.userName.charAt(0).toUpperCase() + user.userName.slice(1)}
          </h1>
          <p className="text-gray-400 mt-2">Find and book your next flight</p>
        </div>

        {/* Quick Flight Search */}
        <Search />

        {/* Recent Bookings & Popular Destinations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Bookings */}
          <RecentBookings />

          {/* Popular Destinations */}
          <PopularDestination />
        </div>
      </div>
    </div>
  );
};

export default PassengerHome;
