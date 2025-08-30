import express from 'express'
import { RegisterUser } from '../controllers/UserController.js'
import { ValidateRegisterUser } from '../middleware/validator.js'

const router = express.Router()

router.post('/register', ValidateRegisterUser,   RegisterUser)

export default router