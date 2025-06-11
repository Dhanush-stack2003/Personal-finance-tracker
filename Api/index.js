import express from 'express'
import cors from 'cors'
import AuthRouter from './Route/authRoute.js'
import 'dotenv/config'
import mongodb from 'mongoose'
import cookieParser from 'cookie-parser'
import userRouter from './Route/userRoute.js'
import transRouter from './Route/transactionRoute.js'
const port = 4000

const app = express()

app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}))

app.use(cookieParser())

app.use(express.json())

mongodb.connect(process.env.MONGODB).then(()=>console.log("mongodb connected")).catch((err)=>console.log(err))

app.use('/api/auth',AuthRouter)

app.use('/api/user',userRouter)

app.use('/api/transaction',transRouter)

app.listen(port,()=>console.log("your are listening to "+port))