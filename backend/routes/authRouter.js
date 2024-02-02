import express from 'express'
import AuthController from '../controllers/authController.js'
import Userauth from '../middleware/middlewareController.js'
const app = express()
const authRouter  = express.Router()
authRouter.use('/loggedUserData',Userauth)
// app.use('/login', )

authRouter.post('/register',AuthController.UserRegisteration)
authRouter.post('/login',AuthController.UserLogin)
authRouter.get('/getUsers',AuthController.getAllSignUpUsers)
authRouter.get('/loggedUserData',AuthController.LoggedUserData)

export default authRouter