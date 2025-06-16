import Express from 'express'
import { SignIn, SignOut, SignUp, EmailVerification, verifyOtp, resetOtp, verifyResetOtp, RefreshToken, googleAuth, resetPassword } from '../Controller/AuthController.js'
import userAuth from '../Config/userAuth.js'

const AuthRouter = Express.Router()

AuthRouter.post('/sign-up',SignUp)

AuthRouter.post('/sign-in',SignIn)

AuthRouter.get('/log-out',SignOut)

AuthRouter.post('/verify-email',EmailVerification)

AuthRouter.post('/verify-otp',verifyOtp)

AuthRouter.post('/reset-password',resetPassword)

AuthRouter.post('/send-reset-otp',resetOtp)

AuthRouter.post('/verify-reset-otp',verifyResetOtp)

AuthRouter.post('/refresh-token',RefreshToken)

AuthRouter.post('/google-auth',googleAuth)


export default AuthRouter