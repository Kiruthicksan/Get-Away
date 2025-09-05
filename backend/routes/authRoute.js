import express from 'express'
import { getUserProfile, LoginUser, LogoutUser, RegisterUser } from '../controllers/UserController.js'
import { ValidateRegisterUser } from '../middleware/validator.js'
import protect from '../middleware/auth.js'
import { createFlights, deleteFlights, getFlights, searchFlights, updateFlights } from '../controllers/flightController.js'
import { approveBooking, createBooking, getAllBookings, getMyBookings, rejectBooking } from '../controllers/bookingController.js'

const router = express.Router()

router.post('/register', ValidateRegisterUser,   RegisterUser)
router.post('/login', LoginUser)
router.post('/logout' , LogoutUser)
router.get('/profile', protect, getUserProfile)

// Flight API's

router.post('/flights', createFlights)
router.get('/flights', getFlights)
router.get('/flights/search' , searchFlights)
router.put('/flights/:id', updateFlights)
router.delete('/flights/:id', deleteFlights)

// bookings api

router.post('/bookings', createBooking)
router.get('/bookings/my', getMyBookings)
router.get("/all", getAllBookings)
router.put("/bookings/:id/approve" , approveBooking)
router.put("/bookings/:id/reject", rejectBooking)

export default router