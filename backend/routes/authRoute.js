import express from 'express'
import { getUserProfile, LoginUser, LogoutUser, RegisterUser } from '../controllers/UserController.js'
import { ValidateRegisterUser } from '../middleware/validator.js'
import protect from '../middleware/auth.js'
import { createFlights, deleteFlights, getFlights, searchFlights, updateFlights } from '../controllers/flightController.js'

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

export default router