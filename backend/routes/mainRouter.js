import express from 'express'
import MainController from '../controllers/mainController.js'
const app = express()
const mainRouter  = express.Router()
// app.use('/login', )

mainRouter.post('/storeGeneratedQRCode',MainController.StoreGeneratedQRCode)
mainRouter.get('/getStoreGeneratedQRCodeByEmployeeId/:employeeId',MainController.getStoreGeneratedQRCodeByEmployeeId)

export default mainRouter