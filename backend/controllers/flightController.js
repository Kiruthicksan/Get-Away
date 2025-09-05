import Flight from "../models/flightSchema.js";

export const createFlights = async (req, res) => {
  try {
    const {
      flightNumber,
      flightName,
      from,
      to,
      journeyDate,
     
      price,
    
    } = req.body;

    if (
      !flightNumber ||
      !flightName ||
      !from ||
      !to ||
      !journeyDate ||
      
      !price 
     
    ) {
      return res.status(400).json({ message: "All feilds are required" });
    }

    if (Number(price) < 0) {
      return res
        .status(400)
        .json({ message: "Price can't be negative numbers" });
    }

 

    // check for duplicates

    const existingFlight = await Flight.findOne({
      $or: [{ flightNumber }, { flightName }],
    });

    if (existingFlight) {
      return res
        .status(400)
        .json({ message: "The flight number or name is already there" });
    }

    const newFlight = await Flight.create({
      flightNumber,
      flightName,
      from,
      to,
      journeyDate,
      
      price,
      
    });

    res
      .status(201)
      .json({ message: "Flight Created successfully", flight: newFlight });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getFlights = async (req, res) => {
  try {
    const flights = await Flight.find();
    res.status(200).json(flights);
  } catch (error){
    res
      .status(500)
      .json({ message: "Error fetching flights", error: error.message });
  }
};

export const searchFlights = async (req, res) => {
  try {
    const { from, to, status, journeyDate } = req.query;
    const filter = {};
    if (from) filter.from = from;
    if (to) filter.to = to;
  
    if (journeyDate) filter.journeyDate = journeyDate;

    const flights = await Flight.find(filter);

   

    return res.status(200).json(flights);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateFlights = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      flightNumber,
      flightName,
      from,
      to,
      journeyDate,
     
      price,
     
    } = req.body;

    // cheking flight

    const flight = await Flight.findById(id);
    if (!flight) {
      return res.status(404).json({ message: "No Flights found" });
    }

     if (flightNumber && flightNumber !== flight.flightNumber) {
      const duplicate = await Flight.findOne({ flightNumber });
      if (duplicate) return res.status(400).json({ message: "Flight number already exists" });
    }

    // update feilds

    if (flightNumber) flight.flightNumber = flightNumber;
    if (flightName) flight.flightName = flightName;
    if (from) flight.from = from;
    if (to) flight.to = to;
    if (journeyDate) flight.journeyDate = journeyDate;
   
    if (price) flight.price = price;
    

    await flight.save();

    res.status(200).json({ message: "Flight updated successfully", flight });
  } catch (error) {
    res.status(500).json({ message: "Servor Error", error: error.message });
  }
};

export const deleteFlights = async (req, res) => {
      try {
        const { id } = req.params;

        const flight = await Flight.findById(id);
        if (!flight) {
            return res.status(404).json({ message: 'Flight not found' });
        }

        await Flight.findByIdAndDelete(id);

        res.status(200).json({ message: 'Flight deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

