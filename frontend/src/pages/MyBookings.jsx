
import React, { useEffect, useState } from "react";
import axios from "axios";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("https://get-away.onrender.com/api/bookings/my", { withCredentials: true });
        setBookings(res.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-white">
      <h2 className="text-3xl font-bold mb-6">My Bookings</h2>

      {loading ? (
        <p className="text-gray-400 text-center">Loading your bookings...</p>
      ) : bookings.length === 0 ? (
        <p className="text-gray-400 text-center">No bookings found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-700 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-800 text-gray-300">
                <th className="p-4 text-left">Flight</th>
                <th className="p-4 text-left">Route</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Seats</th>
                <th className="p-4 text-left">Total Price</th>
                <th className="p-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr
                  key={booking._id}
                  className={`border-b border-gray-700 ${
                    index % 2 === 0 ? "bg-gray-800" : "bg-gray-850"
                  }`}
                >
                  <td className="p-4 font-semibold">{booking.flight.flightName}</td>
                  <td className="p-4">{booking.flight.from} → {booking.flight.to}</td>
                  <td className="p-4">{booking.flight.journeyDate}</td>
                  <td className="p-4">{booking.seats}</td>
                  <td className="p-4 text-green-400">₹{booking.totalPrice}</td>
                  <td
                    className={`p-4 font-bold ${
                      booking.status === "Approved"
                        ? "text-green-500"
                        : booking.status === "Rejected"
                        ? "text-red-500"
                        : "text-yellow-400"
                    }`}
                  >
                    {booking.status}
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

export default MyBookings;
