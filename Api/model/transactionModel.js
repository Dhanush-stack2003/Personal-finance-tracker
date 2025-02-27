import mongoose from 'mongoose'

const TransactionSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"User",
    },
    paymentMethod:{
        type:String,
        enum:['Cash','Upi'],
        required:true
    },
    category:{
        type:String,
        enum:["Rent","Entertainment","Food","Salary","Others"],
        required:true
    },
    type:{
        type:String,
        enum:["Income","Expense"],
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    },
    note:{
        type:String,
        required:true,
        MaxKey:100
    }
})

const Transaction = mongoose.model('Transaction',TransactionSchema)

export default Transaction;