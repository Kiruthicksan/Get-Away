import mongoose  from "mongoose";

const FlightSchema = new mongoose.Schema({
   
    flightNumber: {
        type: String,
        required: true,
    },
    flightName: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    journeyDate: {
        type: String,
        required: true
    },
   
    price: {
        type: String,
        required: true
    },
  
    
}, {timestamps: true});


const Flight = mongoose.model('flights', FlightSchema)

export default Flight