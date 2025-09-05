import { useLocation, useNavigate } from "react-router-dom";

export default function BookingConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking;

  if (!booking) {
    return (
      <div className="text-center text-white mt-10">
        <p>No booking details found.</p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 px-4 py-2 rounded mt-4"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
      <div className="flex justify-center mb-4">
        <div className="bg-green-500 rounded-full p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-2">Booking Submitted!</h2>
      <p className="text-gray-400 mb-4">Your booking request has been submitted successfully</p>

      <div className="bg-gray-800 p-4 rounded-lg mb-6">
        <p><strong>Booking Reference:</strong> {booking.reference}</p>
        <p><strong>Flight:</strong> {booking.flightName}</p>
        <p><strong>Route:</strong> {booking.from} → {booking.to}</p>
        <p><strong>Date:</strong> {booking.journeyDate}</p>
        <p><strong>Passengers:</strong> {booking.travelers}</p>
        <p><strong>Status:</strong> <span className="text-yellow-400">{booking.status}</span></p>
      </div>

      <p className="text-gray-400 mb-4">Next Steps:</p>
      <ul className="text-gray-400 mb-6 text-sm">
        <li>✔ Your booking is pending admin approval</li>
        <li>✔ You will receive an email confirmation once approved</li>
        <li>✔ Check your booking status in "My Bookings"</li>
        <li>✔ Contact support for any queries</li>
      </ul>

      <div className="flex gap-4 justify-center">
        <button
          onClick={() => navigate("/my-bookings")}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
        >
          View My Bookings
        </button>
        <button
          onClick={() => navigate("/flights")}
          className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg"
        >
          Book Another Flight
        </button>
      </div>
    </div>
  );
}
