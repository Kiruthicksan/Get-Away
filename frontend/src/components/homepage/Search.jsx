import { useForm } from "react-hook-form";
import { useAuth } from "../../context/useAuth";
import { useState, useMemo } from "react";

const Search = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [fromSearch, setFromSearch] = useState("");
  const [toSearch, setToSearch] = useState("");
  const [showFromOptions, setShowFromOptions] = useState(false);
  const [showToOptions, setShowToOptions] = useState(false);

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

  const onSubmit = (data) => {
    console.log(data);
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

          <div className="mt-6 text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-8 rounded-lg transition duration-300"
            >
              {isSubmitting ? "Searching..." : "Search Flights"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Search;
