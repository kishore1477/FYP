import express from 'express'
import dotenv from 'dotenv'

import cors from 'cors'
import connectDb from './ConnectDb.js'
import authRouter from './routes/authRouter.js'
import mainRouter from './routes/mainRouter.js'
dotenv.config()
const port = process.env.PORT ||  8000 
const dataBase_URL = process.env.DATABASE_URL 
const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}
const app = express()
app.use(cors(corsOptions)) 
app.use(express.json())
app.use('/api/auth',authRouter)
app.use('/api',mainRouter)
app.get('/', (req, res) => {
  res.send('Hello World!')
})

//Connect to the database before listening
connectDb(dataBase_URL).then(() => {
    app.listen(port, () => {
        console.log("listening for requests");
    })
  })