import express from 'express'
import { LoginUser, LogoutUser, RegisterUser } from '../controllers/UserController.js'
import { ValidateRegisterUser } from '../middleware/validator.js'

const router = express.Router()

router.post('/register', ValidateRegisterUser,   RegisterUser)
router.post('/login', LoginUser)
router.post('logout' , LogoutUser)

export default router