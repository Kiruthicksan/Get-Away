const RecentBookings = () => {
  const recentBookings = [
    {
      flight: "AI-101",
      route: "Mumbai → Delhi",
      date: "Dec 15, 2024",
      status: "Confirmed",
    },
    {
      flight: "AI-205",
      route: "Delhi → Bangalore",
      date: "Dec 20, 2024",
      status: "Pending",
    },
  ];
  return (
    <div className="bg-[#1E1E1E] rounded-xl shadow-lg p-6 border border-gray-700">
      <h2 className="text-xl font-bold text-gray-100 mb-4">
        My Recent Bookings
      </h2>
      <div className="space-y-4">
        {recentBookings.map((booking, index) => (
          <div
            key={index}
            className="border border-gray-700 rounded-lg p-4 hover:bg-[#2A2A2A] transition"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-gray-200">
                  {booking.flight} • {booking.route}
                </h3>
                <p className="text-sm text-gray-400">{booking.date}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  booking.status === "Confirmed"
                    ? "bg-emerald-700 text-emerald-200"
                    : "bg-amber-700 text-amber-200"
                }`}
              >
                {booking.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentBookings;
