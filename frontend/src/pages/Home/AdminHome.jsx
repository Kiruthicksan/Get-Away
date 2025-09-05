import {useNavigate} from 'react-router-dom'



const AdminHome = () => {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-[#121212] p-6 text-gray-200">
      <div className="max-w-6xl mx-auto bg-[#1E1E1E] rounded-lg shadow-lg p-6 border border-gray-700">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <button className="bg-amber-600 hover:bg-amber-500 text-white font-medium px-4 py-2 rounded-lg shadow-md" onClick={() => navigate('/manage-bookings')}>
            Add New Flight
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#2A2A2A] rounded-lg p-4 text-center shadow hover:shadow-xl transition">
            <h3 className="text-gray-400 text-sm">Total Flights</h3>
            <p className="text-2xl font-bold text-amber-400">247</p>
          </div>
          <div className="bg-[#2A2A2A] rounded-lg p-4 text-center shadow hover:shadow-xl transition">
            <h3 className="text-gray-400 text-sm">Pending Bookings</h3>
            <p className="text-2xl font-bold text-amber-400">18</p>
          </div>
          <div className="bg-[#2A2A2A] rounded-lg p-4 text-center shadow hover:shadow-xl transition">
            <h3 className="text-gray-400 text-sm">Today's Flights</h3>
            <p className="text-2xl font-bold text-amber-400">12</p>
          </div>
          <div className="bg-[#2A2A2A] rounded-lg p-4 text-center shadow hover:shadow-xl transition">
            <h3 className="text-gray-400 text-sm">Total Passengers</h3>
            <p className="text-2xl font-bold text-amber-400">1,234</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 text-white">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 bg-[#2A2A2A] hover:bg-amber-600 rounded-lg text-gray-200 font-medium transition">
              View All Flights
            </button>
            <button className="px-4 py-2 bg-[#2A2A2A] hover:bg-amber-600 rounded-lg text-gray-200 font-medium transition">
              Pending Approvals
            </button>
            <button className="px-4 py-2 bg-[#2A2A2A] hover:bg-amber-600 rounded-lg text-gray-200 font-medium transition">
              Reports
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-white">Recent Activity</h2>
          <div className="space-y-2">
            {[
              "New booking request from John Doe",
              "Flight AI-101 scheduled for today",
              "Booking approved for Jane Smith",
            ].map((activity, index) => (
              <div
                key={index}
                className="bg-[#2A2A2A] p-3 rounded-lg hover:bg-[#333] transition"
              >
                {activity}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};




export default AdminHome