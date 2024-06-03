import express from 'express'
import MainController from '../controllers/mainController.js'
const mainRouter  = express.Router()
mainRouter.post('/storeGeneratedQRCode',MainController.StoreGeneratedQRCode)
mainRouter.get('/getStoreGeneratedQRCodeByEmployeeId/:employeeId',MainController.getStoreGeneratedQRCodeByEmployeeId)
mainRouter.get('/getStoreGeneratedQRCodeWithEmployee',MainController.getStoreGeneratedQRCodeWithEmployee)
mainRouter.post('/updateEmployeeRecord',MainController.updateEmployeeRecord)
mainRouter.post('/getChartData',MainController.getChartData)

export default mainRouter