import { Link ,useNavigate } from "react-router-dom";

const GuestHome = () => {

  const navigate = useNavigate()
  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gray-900 text-center py-16 px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
          Welcome to <span className="text-indigo-500">GetAway</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mb-8">
          Book your flights easily and manage your travel plans with ease.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/register"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-500 transition"
          >
            Get Started
          </Link>
          <Link
            to="/register"
            className="bg-gray-800 text-gray-200 px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition"
          >
            View Flights
          </Link>
        </div>
      </section>

      {/* Flight Search Section */}
      <section className="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-md p-6 mt-10">
        <h2 className="text-2xl font-bold mb-4 text-white text-center">
          Quick Flight Search
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="From"
            className="p-3 rounded-md bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            placeholder="To"
            className="p-3 rounded-md bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="date"
            className="p-3 rounded-md bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button className="bg-indigo-600 text-white px-4 py-3 rounded-md hover:bg-indigo-500 transition" onClick={() => navigate('/register')}>
            Search
          </button>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="max-w-6xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10 text-white">
          Popular Destinations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              city: "Delhi → Mumbai",
              price: "Starting ₹3,500",
              img: "https://source.unsplash.com/400x300/?mumbai",
            },
            {
              city: "Chennai → Bangalore",
              price: "Starting ₹2,500",
              img: "https://source.unsplash.com/400x300/?bangalore",
            },
            {
              city: "Hyderabad → Kolkata",
              price: "Starting ₹4,000",
              img: "https://source.unsplash.com/400x300/?kolkata",
            },
          ].map((dest, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform"
            >
              <img
                src={dest.img}
                alt={dest.city}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-white">{dest.city}</h3>
                <p className="text-gray-400">{dest.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-800 py-16 px-6">
        <h2 className="text-3xl font-bold text-center text-white mb-10">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          {[
            { title: "Fast Booking", icon: "✈️" },
            { title: "Best Deals", icon: "💰" },
            { title: "Secure Payments", icon: "🔒" },
            { title: "24/7 Support", icon: "📞" },
          ].map((item, index) => (
            <div
              key={index}
              className="p-6 bg-gray-700 rounded-lg shadow hover:bg-gray-600 transition"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-16">
        <h2 className="text-3xl font-bold mb-4 text-white">
          Ready to book your next trip?
        </h2>
        <p className="text-gray-400 mb-6">
          Sign up now and start your journey with amazing offers!
        </p>
        <Link
          to="/register"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-500 transition"
        >
          Sign Up Now
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-6 text-center">
        <p>© 2025 SkyBook. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default GuestHome;
