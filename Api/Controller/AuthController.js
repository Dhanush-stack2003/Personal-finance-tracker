import axios from 'axios';
import User  from '../model/model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


export const SignUp = async (req,res) => {
    const {username,email,password} = req.body;

    if(!username || !email || !password){
        return res.json({success:false,message:"please fill all the details"})
    }

    const hashedPassword = bcrypt.hashSync(password,10)

    try {
        const userSignUp = await User.create({
            username,
            email,
            password:hashedPassword
        })

        await userSignUp.save();

        res.status(201).json({success:true,message:"Account created successfull"})
    } catch (error) {
        res.status(400).json(error.message)
    }
}

export const SignIn = async(req,res) => {
    const {email,password} = req.body;
     if (email === '' || password === '') {
       return res.json({
         success: false,
         message: "please provide all the details",
       });
     }

     try{
     const isExistingUser = await User.findOne({email});

     if(!isExistingUser){
        return res.status(401).json({success:false,message:"user not found"})
     }

     const isPasswordValid = bcrypt.compareSync(password,isExistingUser.password) 

     if(!isPasswordValid){
        return res.status(401).json({success:false,message:"invalid password"})
     }

     const userId = isExistingUser._id

     const AccessToken = jwt.sign({id:userId},process.env.ACCESS_TOKEN_KEY,{expiresIn:'15m'});

     const RefreshToken = jwt.sign({id:userId},process.env.REFRESH_TOKEN_KEY,{expiresIn:'7d'})

     const isProd = process.env.NODE_ENV === 'production'

     res.cookie('AccessToken',AccessToken,{
        httpOnly:true,
        secure:isProd,
        sameSite:isProd ? 'None' : 'Strict',
        maxAge: 15 * 60 * 1000
     })

     res.cookie('RefreshToken',RefreshToken,{
        httpOnly:true,
        secure:isProd,
        sameSite:isProd ? 'None' :'Strict',
        maxAge:7* 24 * 60 * 60 * 1000
     })

     const {password:pass,...rest} = isExistingUser._doc

     return res.status(200).json({success:true,message:rest})
     }catch(error){
        return res.status(400).json(error.message)
     }
}

export const googleAuth = async (req,res) => {
    const {email,photoURL,username} = req.body
    
    try {
        const isUserExist = await User.findOne({email:email})
        if(isUserExist){
            const userId = isUserExist._id
            const AccessToken = jwt.sign({id:userId},process.env.ACCESS_TOKEN_KEY,{expiresIn:'15m'})
            const RefreshToken = jwt.sign({id:userId},process.env.REFRESH_TOKEN_KEY,{expiresIn:'7d'})
            const isProd = process.env.NODE_ENV === "production";

            res.cookie("AccessToken", AccessToken, {
              httpOnly: true,
              secure: isProd,
              sameSite: isProd ? "None" : "Strict",
              maxAge: 15 * 60 * 1000,
            });

            res.cookie("RefreshToken", RefreshToken, {
              httpOnly: true,
              secure: isProd,
              sameSite: isProd ? "None" : "Strict",
              maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            const { password:pass,...rest} = isUserExist._doc

            return res.status(200).json({success:true,message:rest})
        }
        else{
            const randomPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);

            const hashedPassword = bcrypt.hashSync(randomPassword,10)

            const user = await User.create({
                email:email,
                photoURL:photoURL,
                password:hashedPassword,
                username:username,
                isAccountVerified:true
            })

            await user.save()

            const userId = user._id

             const AccessToken = jwt.sign({ id: userId },process.env.ACCESS_TOKEN_KEY,{ expiresIn: "15m" });
             const RefreshToken = jwt.sign({ id: userId },process.env.REFRESH_TOKEN_KEY,{expiresIn:'7d'});
             const isProd = process.env.NODE_ENV === "production";

             res.cookie("AccessToken", AccessToken, {
               httpOnly: true,
               secure: isProd,
               sameSite: isProd ? "None" : "Strict",
               maxAge: 15 * 60 * 1000,
             });

             res.cookie("RefreshToken", RefreshToken, {
               httpOnly: true,
               secure: isProd,
               sameSite: isProd ? "None" : "Strict",
               maxAge: 7 * 24 * 60 * 60 * 1000,
             });

             const {pass:password,...rest} = user._doc

            return res.status(201).json({success:true,message:rest})
        }
    } catch (error) {
        return res.status(400).json(error.message);
    }
} 

export const SignOut = (req,res) => {
    try {
        const isProd = process.env.NODE_ENV === 'production'
        
        res.clearCookie("AccessToken", {
          httpOnly: true,
          secure: isProd,
          sameSite: isProd ? "None" : "Strict",
          maxAge: 15 * 60 * 1000,
        });

        res.clearCookie("RefreshToken", {
          httpOnly: true,
          secure: isProd,
          sameSite: isProd ? "None" : "Strict",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        
        return res.status(200).json({success:true,message:'Logged out'})
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
    }
}

export const RefreshToken = async (req,res) => {
    const RefreshToken  = req.cookies.RefreshToken;
    
    if(RefreshToken == null) return res.status(403).json({success:false,message:"no token provided"});
    
    try {
        const decoded = jwt.verify(RefreshToken,process.env.REFRESH_TOKEN_KEY);
        
        const AccessToken =  jwt.sign({id:decoded.id},process.env.ACCESS_TOKEN_KEY,{expiresIn:'15m'})
        
        const isProd = process.env.NODE_ENV === 'production'

        res.cookie("AccessToken", AccessToken, {
          httpOnly: true,
          secure: isProd,
          sameSite: isProd ? "None" : "Strict",
          maxAge: 15 * 60 * 1000,
        });
        
        return res.status(200).json({success:true,message:"new token added"})
    } catch (error) {
        return res.status(500).json({success:false,message:"Invalid Token"})

    }
}

export const OtpVerification = async (req,res) => {
    const {userId,otp} = req.body

    if(!userId || !otp){
        return res.status(404).json({success:false,message:"details missing"})
    }
    try {
        const user = await User.findById(userId)

        if(user.isAccountVerified){
            return res.json({success:false,message:"user already verified"})
        }

        if(user.verifyOtpExpire < Date.now()){
            return res.json({success:false,message:"OTP expired"})
        }

        if(user.verifyOtp != otp || otp === ''){
            return res.join({success:false,message:"invalid otp"})
        }
            user.verifyOtp = ''
            user.verifyOtpExpire = 0  
            await user.save();
            return res.status(200).json({success:true,message:"OTP Verified successfully"})
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const resetOtp = async (req,res) => {
   const {email} = req.body;

   if(!email){
      return res.status(401).json({success:false,message:"provide valid email"})
   }

   try {  
    const user = await User.findOne({email})
        
    if(!user){
        return res.status(404).json({success:false,message:"user does not exist"})
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    const otpValidTime = Date.now() + 15 * 60 * 1000;  

    user.resetOtp = otp

    user.resetOtpExpire =  otpValidTime
       
     await user.save()
     
     return res.status(200).json({success:true,message:"Reset OTP has sent to your mail"})
   } catch (error) {
       return res.status(400).json({success:false,message:error.message})
   }

}

export const verifyResetOtp = async (req,res) => {
    const { email,otp,newPassword } = req.body

    if(!email || !otp || !newPassword){
       return res.status(401).json({ success: false, message: "provide valid email,otp and password" });
    }

    try {
        const user = await User.findOne({email})

        if(!user){
        return res.status(404).json({ success: false, message: "user does not exist" });
        }

        if(user.resetOtp === '' || user.resetOtp !== otp){
            return res.status(403).json({success:false,message:"Invalid OTP"})
        }

        if(user.resetOtpExpire < Date.now()){
            return res.json({success:false,message:"OTP expired"})
        }

        const hashedPassword = bcrypt.hashSync(newPassword,10)

        user.password = hashedPassword

        user.resetOtp = ''
        
        user.resetOtpExpire = 0

        await user.save()

        return res.status(200).json({success:true,message:"Password updated successfully"})

    } catch (error) {
       return res.status(400).json({ success: false, message: error.message });
    }
}

export const EmailVerification = async (req, res) => {

  const { email } = req.body;

  const apikey = process.env.SENDIN_BLUE_APIKEY;
  const endPoint = "https://api.brevo.com/v3/smtp/email";

  try {
    const user = await User.findOne({email:email});
    if (!user) {
        return res.status(401).json({ success: false, message: "user not found" });
    }
    
    if (user.isAccountVerified) {
        return res.json({ success: false, message: "user already verified" });
    }
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const otpValidTime = Date.now() + 24 * 60 * 60 * 1000;
    
    user.verifyOtp = otp;
    user.verifyOtpExpire = otpValidTime;
    
    
    await user.save();
    const emailData = {
        sender: {
            name: "finance tracker",
            email: "jesseprvtp03@gmail.com",
        },
        to: [
            {
                email: email,
            },
        ],
        subject: "otp verification",
        htmlContent: `<html> <body> <p> your otp verification code is ${otp},code will be expire in 15 minutes don't share with anyone </p> </body> </html>`,
    };
    try {
        const { data } = await axios.post(endPoint, emailData, {
            headers: {
                "Content-Type": "application/json",
                "api-key": apikey,
            },
        });
        return res.status(200).json({ success: true, message: "Email sent successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyOtp = async (req,res) => {

    const { otp,email } = req.body
    const user = await User.findOne({email:email});
    try{
    if(!user){
        return res.status(400).json({success:false,message:"Authentication failed"})
    }
    if(user.verifyOtp === otp){
        user.verifyOtp = ''
        user.verifyOtpExpire = 0
        return res.status(200).json({success:true,message:"otp verified"})
    }}catch(error){
        return res.status(500).json({success:false,message:error.message})
    }

}

export const resetPassword = async (req,res) => {

    const { newPassword,email } = req.body;

    try {
        const user = await User.findOne({email:email})
        if(!user){
            return res.status(401).json({success:false,message:"user not found, please sign up"})
        }

        const hashedPassword = bcrypt.hashSync(newPassword,10)

         user.password = hashedPassword

         await user.save()

         return res.status(201).json({success:true,message:"Password has been updated"})
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
    }
}
