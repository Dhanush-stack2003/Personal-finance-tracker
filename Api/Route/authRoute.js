import Express from 'express'
import { SignIn, SignOut, SignUp, EmailVerification, OtpVerification, isAuthenticated, resetOtp, verifyResetOtp } from '../Controller/AuthController.js'
import userAuth from '../Config/userAuth.js'

const AuthRouter = Express.Router()

AuthRouter.post('/sign-up',SignUp)

AuthRouter.post('/sign-in',SignIn)

AuthRouter.get('/logout',SignOut)

AuthRouter.post('/verify-email',userAuth,EmailVerification)

AuthRouter.post('/verify-otp',userAuth,OtpVerification)

AuthRouter.get('/is-auth',userAuth,isAuthenticated)

AuthRouter.post('/send-reset-otp',resetOtp)

AuthRouter.post('/verify-reset-otp',verifyResetOtp)

export default AuthRouter