import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

const AdminFlightManagement = () => {
  const [flights, setFlights] = useState([]);
  const [editingFlight, setEditingFlight] = useState(null);
  const [searchParams, setSearchParams] = useState({ from: "", to: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit, reset } = useForm();

  // ✅ Fetch all flights
  const fetchFlights = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/flights");
      setFlights(res.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch flights");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  // ✅ Add or Update Flight
  const onSubmit = async (data) => {
    try {
      if (editingFlight) {
        await axios.put(`http://localhost:5000/api/flights/${editingFlight._id}`, data);
        setEditingFlight(null);
      } else {
        await axios.post("http://localhost:5000/api/flights", data);
      }
      reset();
      fetchFlights();
    } catch (err) {
      console.error(err);
      setError("Failed to add or update flight");
    }
  };

  // ✅ Delete Flight
  const deleteFlight = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/flights/${id}`);
      fetchFlights();
    } catch (err) {
      setError("Failed to delete flight");
    }
  };

  // ✅ Search Flights
  const searchFlights = async () => {
    try {
      const query = new URLSearchParams(searchParams).toString();
      const res = await axios.get(`http://localhost:5000/api/flights/search?${query}`);
      setFlights(res.data);
    } catch (err) {
      setError("No flights found");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Flight Management</h1>

      {/* ✅ Add / Update Flight Form */}
      <div className="bg-gray-800 p-4 rounded-lg mb-6">
        <h2 className="text-xl mb-4">{editingFlight ? "Update Flight" : "Add Flight"}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
          <input className="p-2 bg-gray-700 rounded" placeholder="Flight Number" {...register("flightNumber", { required: true })} />
          <input className="p-2 bg-gray-700 rounded" placeholder="Flight Name" {...register("flightName", { required: true })} />
          <input className="p-2 bg-gray-700 rounded" placeholder="From" {...register("from", { required: true })} />
          <input className="p-2 bg-gray-700 rounded" placeholder="To" {...register("to", { required: true })} />
          <input className="p-2 bg-gray-700 rounded" placeholder="Journey Date" type="date" {...register("journeyDate", { required: true })} />
          <input className="p-2 bg-gray-700 rounded" placeholder="Price" {...register("price", { required: true })} />
          <button type="submit" className="col-span-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded">
            {editingFlight ? "Update Flight" : "Add Flight"}
          </button>
        </form>
      </div>

      {/* ✅ Search Section */}
      <div className="bg-gray-800 p-4 rounded-lg mb-6 flex gap-4">
        <input className="p-2 bg-gray-700 rounded" placeholder="From" value={searchParams.from} onChange={(e) => setSearchParams({ ...searchParams, from: e.target.value })} />
        <input className="p-2 bg-gray-700 rounded" placeholder="To" value={searchParams.to} onChange={(e) => setSearchParams({ ...searchParams, to: e.target.value })} />
        <button onClick={searchFlights} className="bg-green-600 hover:bg-green-700 p-2 rounded">Search</button>
        <button onClick={fetchFlights} className="bg-gray-600 hover:bg-gray-700 p-2 rounded">Reset</button>
      </div>

      {/* ✅ Flights Table */}
      {loading ? (
        <p>Loading...</p>
      ) : flights.length === 0 ? (
        <p>No flights found</p>
      ) : (
        <table className="w-full border border-gray-700 text-left">
          <thead>
            <tr className="bg-gray-700">
              <th className="p-2">Flight #</th>
              <th className="p-2">Name</th>
              <th className="p-2">From</th>
              <th className="p-2">To</th>
              <th className="p-2">Date</th>
              <th className="p-2">Price</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight) => (
              <tr key={flight._id} className="border-b border-gray-600">
                <td className="p-2">{flight.flightNumber}</td>
                <td className="p-2">{flight.flightName}</td>
                <td className="p-2">{flight.from}</td>
                <td className="p-2">{flight.to}</td>
                <td className="p-2">{flight.journeyDate}</td>
                <td className="p-2">₹{flight.price}</td>
                <td className="p-2 flex gap-2">
                  <button onClick={() => { setEditingFlight(flight); reset(flight); }} className="bg-yellow-500 hover:bg-yellow-600 p-1 rounded">Edit</button>
                  <button onClick={() => deleteFlight(flight._id)} className="bg-red-600 hover:bg-red-700 p-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default AdminFlightManagement;
