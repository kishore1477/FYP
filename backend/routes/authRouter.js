import express from 'express'
import AuthController from '../controllers/authController.js'
const app = express()
const authRouter  = express.Router()
// app.use('/login', )

authRouter.post('/register',AuthController.UserRegisteration)
authRouter.post('/login',AuthController.UserLogin)

export default authRouter