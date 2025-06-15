import express from 'express'
import cors from 'cors'
import AuthRouter from './Route/authRoute.js'
import 'dotenv/config'
import mongodb from 'mongoose'
import cookieParser from 'cookie-parser'
import transRouter from './Route/transactionRoute.js'

const port = process.env.PORT
const app = express()

app.use(
  cors({
    origin: "https://finance-tracker-backend-fmcj.onrender.com",
    credentials: true,
  })
);

app.use(cookieParser())

app.use(express.json())

mongodb.connect(process.env.MONGODB).then(()=>console.log("mongodb connected")).catch((err)=>console.log(err))

app.get('/api/test',(req,res)=>{
    return res.send("backend working fine")
})

app.use('/api/auth',AuthRouter)

app.use('/api/transaction',transRouter)

app.listen(port,()=>console.log("your are listening to "+port))