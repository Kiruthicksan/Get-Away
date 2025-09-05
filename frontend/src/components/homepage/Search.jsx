import { useForm } from "react-hook-form";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

    const navigate = useNavigate()
  const [fromSearch, setFromSearch] = useState("");
  const [toSearch, setToSearch] = useState("");
  const [showFromOptions, setShowFromOptions] = useState(false);
  const [showToOptions, setShowToOptions] = useState(false);

  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cities = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Hyderabad",
    "Chennai",
    "Kolkata",
    "Goa",
    "Pune",
    "Jaipur",
    "Kochi",
  ];

  // Filter cities based on search input
  const filteredFromCities = useMemo(() => {
    return cities.filter((city) =>
      city.toLowerCase().includes(fromSearch.toLowerCase())
    );
  }, [fromSearch]);

  const filteredToCities = useMemo(() => {
    return cities.filter((city) =>
      city.toLowerCase().includes(toSearch.toLowerCase())
    );
  }, [toSearch]);

  const onSubmit = async (data) => {
    if (!fromSearch || !toSearch) {
      setError("Please select both From and To cities");
      return;
    }
    if (fromSearch === toSearch) {
      setError("From and To cities cannot be the same");
      return;
    }

    setError("");
    setLoading(true);
    setFlights([]);

    try {
      const queryParams = new URLSearchParams({
        from: fromSearch,
        to: toSearch,
        journeyDate: data.date, 
      }).toString();

      const response = await fetch(
        `http://localhost:5000/api/flights/search?${queryParams}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch flights");
      }

      const result = await response.json();
      setFlights(Array.isArray(result) ? result : []);
    } catch (err) {
      console.error("Error fetching flights:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#1E1E1E] rounded-xl shadow-lg p-6 mb-10 border border-gray-700">
      <h2 className="text-2xl font-bold text-center text-gray-100 mb-6">
        Quick Flight Search
      </h2>
      <div className="bg-[#2A2A2A] p-6 rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* From City */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                From
              </label>
              <input
                type="text"
                className="w-full p-3 bg-[#121212] border border-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="Select departure city"
                value={fromSearch}
                onChange={(e) => setFromSearch(e.target.value)}
                onFocus={() => setShowFromOptions(true)}
                onBlur={() => setTimeout(() => setShowFromOptions(false), 200)}
              />
              {showFromOptions && (
                <div className="absolute z-10 w-full mt-1 bg-[#1E1E1E] border border-gray-700 rounded-lg shadow-lg max-h-60 overflow-auto">
                  {filteredFromCities.length > 0 ? (
                    filteredFromCities.map((city) => (
                      <div
                        key={city}
                        className="p-3 hover:bg-[#333333] cursor-pointer"
                        onClick={() => {
                          setFromSearch(city);
                          setShowFromOptions(false);
                        }}
                      >
                        {city}
                      </div>
                    ))
                  ) : (
                    <div className="p-3 text-gray-400">No cities found</div>
                  )}
                </div>
              )}
            </div>

            {/* To City */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                To
              </label>
              <input
                type="text"
                className="w-full p-3 bg-[#121212] border border-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="Select destination city"
                value={toSearch}
                onChange={(e) => setToSearch(e.target.value)}
                onFocus={() => setShowToOptions(true)}
                onBlur={() => setTimeout(() => setShowToOptions(false), 200)}
              />
              {showToOptions && (
                <div className="absolute z-10 w-full mt-1 bg-[#1E1E1E] border border-gray-700 rounded-lg shadow-lg max-h-60 overflow-auto">
                  {filteredToCities.length > 0 ? (
                    filteredToCities.map((city) => (
                      <div
                        key={city}
                        className="p-3 hover:bg-[#333333] cursor-pointer"
                        onClick={() => {
                          setToSearch(city);
                          setShowToOptions(false);
                        }}
                      >
                        {city}
                      </div>
                    ))
                  ) : (
                    <div className="p-3 text-gray-400">No cities found</div>
                  )}
                </div>
              )}
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Date
              </label>
              <input
                type="date"
                className="w-full p-3 bg-[#121212] border border-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                {...register("date", { required: "Please select a date" })}
              />
              {errors.date && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.date.message}
                </p>
              )}
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-center mt-4">{error}</p>
          )}

          <div className="mt-6 text-center">
            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-8 rounded-lg transition duration-300"
            >
              {loading ? "Searching..." : "Search Flights"}
            </button>
          </div>
        </form>
      </div>

      {/* Results Section */}
      <div className="mt-6">
  {loading && (
    <p className="text-gray-400 text-center text-lg animate-pulse">
      Loading flights...
    </p>
  )}

  {!loading && flights.length > 0 && (
    <div>
      <h3 className="text-2xl font-semibold text-gray-100 mb-6 text-center">
        Available Flights
      </h3>

      <div className="space-y-4">
        {flights.map((flight) => (
          <div
            key={flight._id}
            className="bg-gradient-to-r from-gray-800 to-gray-900 p-5 rounded-lg shadow-lg flex justify-between items-center border border-gray-700 hover:border-amber-500 transition-all duration-300"
          >
            {/* Flight Info */}
            <div>
              <h3 className="text-xl font-bold text-amber-400">
                {flight.flightName} ({flight.flightNumber})
              </h3>
              <p className="text-gray-300">
                <span className="font-medium">{flight.from}</span> →{" "}
                <span className="font-medium">{flight.to}</span>
              </p>
              <p className="text-gray-400 text-sm">Date: {flight.journeyDate}</p>
              <p className="text-gray-400 text-sm">
                Price: <span className="text-green-400 font-semibold">₹{flight.price}</span>
              </p>
            </div>

            {/* Book Button */}
            <div>
              <button
                className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-all duration-300"
                onClick={() => navigate('/booking-form/:id')}
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )}

  {!loading && flights.length === 0 && (
    <p className="text-center text-gray-400 mt-6 text-lg">No flights available.</p>
  )}
</div>

    </div>
  );
};

export default Search;
