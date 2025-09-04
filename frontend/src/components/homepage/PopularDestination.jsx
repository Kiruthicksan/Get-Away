const PopularDestination = () => {
  const popularDestinations = [
    { name: "Mumbai", price: "₹4,500" },
    { name: "Goa", price: "₹6,200" },
  ];
  return (
    <div className="bg-[#1E1E1E] rounded-xl shadow-lg p-6 border border-gray-700">
      <h2 className="text-xl font-bold text-gray-100 mb-4">
        Popular Destinations
      </h2>
      <div className="grid grid-cols-1 gap-4">
        {popularDestinations.map((destination, index) => (
          <div
            key={index}
            className="bg-[#2A2A2A] rounded-lg p-4 hover:bg-[#333333] transition"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-gray-200">
                {destination.name}
              </h3>
              <p className="text-amber-400 font-bold">
                Starting {destination.price}
              </p>
            </div>
            <button className="mt-3 text-amber-400 text-sm font-medium hover:text-amber-300 transition">
              Explore flights →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularDestination;
