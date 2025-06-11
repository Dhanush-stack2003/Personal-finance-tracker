import express from 'express'
import { createTransaction, deleteTransaction, filterTransaction, getAllTransaction, getTransaction, updateTransaction } from '../Controller/TransactionController.js'
import userAuth from '../Config/userAuth.js'
import { filterByDate, FilterByMonth, TotalAmount } from '../Controller/TransactionReport.js'

const transRouter = express.Router()

transRouter.post('/add',createTransaction)

transRouter.get('/get-all',userAuth,getAllTransaction)

transRouter.get('/get/:transactionId',getTransaction)

transRouter.post('/edit/:transactionId',updateTransaction)

transRouter.get('/filter',filterTransaction)

transRouter.get('/filterByDate/:filterDate/:userId',filterByDate)

transRouter.delete('/delete/:transactionId',deleteTransaction)

transRouter.get('/totalAmount/:userId',TotalAmount)

transRouter.get('/filterByMonth/:userId',FilterByMonth)


export default transRouter