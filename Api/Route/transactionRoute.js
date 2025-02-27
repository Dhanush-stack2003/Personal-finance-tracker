import express from 'express'
import { createTransaction, deleteTransaction, getAllTransaction, updateTransaction } from '../Controller/TransactionController.js'
import userAuth from '../Config/userAuth.js'

const transRouter = express.Router()

transRouter.post('/add-transaction',userAuth,createTransaction)

transRouter.get('/get-transaction',getAllTransaction)

transRouter.post('/edit-transaction/:transactionId',updateTransaction)

transRouter.delete('/delete-transaction/:transactionId',deleteTransaction)


export default transRouter