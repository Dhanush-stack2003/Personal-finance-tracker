import express from 'express'
import { userData } from '../Controller/userController.js';

const userRouter = express.Router();

userRouter.get('/user-data',userData)

export default userRouter