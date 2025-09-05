import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FlightsTable = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/flights");
        setFlights(response.data);
      } catch (error) {
        console.error("Error fetching flights:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  return (
    <div className="bg-[#1E1E1E] min-h-screen p-6 text-white">
      <h2 className="text-3xl font-bold text-center mb-6">All Flights</h2>

      {loading ? (
        <p className="text-center text-gray-400">Loading flights...</p>
      ) : flights.length === 0 ? (
        <p className="text-center text-gray-400">No flights available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-700 bg-[#2A2A2A] rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-800 text-gray-200">
                <th className="px-4 py-3 border-b border-gray-700">#</th>
                <th className="px-4 py-3 border-b border-gray-700">Flight Name</th>
                <th className="px-4 py-3 border-b border-gray-700">Flight No</th>
                <th className="px-4 py-3 border-b border-gray-700">From</th>
                <th className="px-4 py-3 border-b border-gray-700">To</th>
                <th className="px-4 py-3 border-b border-gray-700">Date</th>
                <th className="px-4 py-3 border-b border-gray-700">Price (₹)</th>
                <th className="px-4 py-3 border-b border-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {flights.map((flight, index) => (
                <tr
                  key={flight._id}
                  className="hover:bg-gray-700 transition-all duration-200"
                >
                  <td className="px-4 py-3 border-b border-gray-600 text-center">{index + 1}</td>
                  <td className="px-4 py-3 border-b border-gray-600">{flight.flightName}</td>
                  <td className="px-4 py-3 border-b border-gray-600">{flight.flightNumber}</td>
                  <td className="px-4 py-3 border-b border-gray-600">{flight.from}</td>
                  <td className="px-4 py-3 border-b border-gray-600">{flight.to}</td>
                  <td className="px-4 py-3 border-b border-gray-600">{flight.journeyDate}</td>
                  <td className="px-4 py-3 border-b border-gray-600 text-green-400 font-bold">
                    ₹{flight.price}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-600 text-center">
                    <button
                      onClick={() => navigate('/booking-form/:id')}
                      className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md"
                    >
                      Book
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FlightsTable;
