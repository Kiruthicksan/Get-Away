import express from 'express'
import { getUserProfile, LoginUser, LogoutUser, RegisterUser } from '../controllers/UserController.js'
import { ValidateRegisterUser } from '../middleware/validator.js'
import protect from '../middleware/auth.js'

const router = express.Router()

router.post('/register', ValidateRegisterUser,   RegisterUser)
router.post('/login', LoginUser)
router.post('/logout' , LogoutUser)
router.get('/profile', protect, getUserProfile)

export default router