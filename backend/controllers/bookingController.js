import Booking from "../models/bookingSchema.js";
import Flight from "../models/flightSchema.js";

export const createBooking = async (req, res) => {
  try {
    const { flightId, seats } = req.body;
    const userId = req.user.id;

    if (!flightId || !seats) {
      return res.status(400).json({ message: "Flight ID and seats are required" });
    }

    const flight = await Flight.findById(flightId);
    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    }

    const totalPrice = parseFloat(flight.price) * seats;

    const booking = await Booking.create({
      user: userId,
      flight: flightId,
      seats,
      totalPrice
    });

    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const userId = req.user.id;
    const bookings = await Booking.find({ user: userId }).populate("flight");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("user", "name email").populate("flight");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const approveBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.status = "Approved";
    await booking.save();

    res.status(200).json({ message: "Booking approved", booking });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const rejectBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.status = "Rejected";
    await booking.save();

    res.status(200).json({ message: "Booking rejected", booking });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


