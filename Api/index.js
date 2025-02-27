import Express from 'express'
import cors from 'cors'
import AuthRouter from './Route/authRoute.js'
import 'dotenv/config'
import mongodb from 'mongoose'
import cookieParser from 'cookie-parser'
import userRouter from './Route/userRoute.js'
import transRouter from './Route/transactionRoute.js'
const port = 3000

const app = Express()

app.use(cors())

app.use(cookieParser())

app.use(Express.json())

mongodb.connect(process.env.MONGODB).then(()=>console.log("mongodb connected")).catch((err)=>console.log(err))

app.get('/',(req,res)=>{
    res.send("Backend working")
})

app.use('/api/auth',AuthRouter)

app.use('/api/user',userRouter)

app.use('/api/transaction',transRouter)


app.listen(port,()=>console.log("your are listening to "+port))