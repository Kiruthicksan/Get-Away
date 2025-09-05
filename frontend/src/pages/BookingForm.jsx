import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function BookingForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    travelers: 1,
    assistance: false,
  });

  // Fetch flight by ID
  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const response = await axios.get(`/api/flights/${id}`);
        setFlight(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching flight:", error);
        setLoading(false);
      }
    };
    fetchFlight();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/bookings", {
        flightId: flight._id,
        passengerName: formData.name,
        contactNumber: formData.contact,
        email: formData.email,
        travelers: formData.travelers,
        specialAssistance: formData.assistance,
        amount: flight.price * formData.travelers,
      });

      if (response.data.success) {
        navigate("/booking-confirmation", { state: { booking: response.data.booking } });
      }
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Failed to book flight. Please try again.");
    }
  };

  if (loading) return <p className="text-center text-white">Loading flight details...</p>;
  if (!flight) return <p className="text-center text-red-500">Flight not found.</p>;

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg max-w-4xl mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Book Flight {flight.flightNumber}</h2>

      <div className="border border-gray-700 p-4 rounded-lg mb-6">
        <h3 className="text-lg mb-2">Flight Details</h3>
        <p className="text-gray-400">{flight.from} → {flight.to}</p>
        <p className="text-gray-400">Date: {flight.journeyDate}</p>
        <p className="text-gray-400">Price: ₹{flight.price} per person</p>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter full name as per ID"
          className="w-full p-2 mb-3 bg-gray-800 border border-gray-600 rounded"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="contact"
          placeholder="Enter contact number"
          className="w-full p-2 mb-3 bg-gray-800 border border-gray-600 rounded"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Enter email address"
          className="w-full p-2 mb-3 bg-gray-800 border border-gray-600 rounded"
          onChange={handleChange}
          required
        />

        <div className="flex items-center gap-4 mb-4">
          <select
            name="travelers"
            value={formData.travelers}
            onChange={handleChange}
            className="p-2 bg-gray-800 border border-gray-600 rounded"
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="assistance"
              checked={formData.assistance}
              onChange={handleChange}
            />
            Special Assistance
          </label>
        </div>

        <p className="text-lg font-bold mb-4">Total Amount: ₹{flight.price * formData.travelers}</p>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold"
        >
          Proceed to Book
        </button>
      </form>
    </div>
  );
}
