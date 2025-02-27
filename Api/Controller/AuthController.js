import User  from '../model/model.js'
import bcrypt from 'bcrypt'
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

        console.log(userSignUp)
        res.status(201).json({success:true,message:"Account created successfull"})
    } catch (error) {
        res.status(400).json(error.message)
    }
}

export const SignIn = async(req,res) => {
    const {email,password} = req.body;

     if (!email || !password) {
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

     const token = jwt.sign({id:isExistingUser._id},process.env.JWT_TOKEN,{expiresIn:'7d'});
     
     const {password:pass,...rest} = isExistingUser._doc;

     res.cookie('Token',token,{
        httpOnly:true,
        secure:process.env.NODE_TOKEN === 'production',
        sameSite:process.env.NODE_TOKEN === 'production' ? 'none' : 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
     })


     console.log(rest)

     return res.status(200).json({success:true,message:'Logged In'})
     }catch(error){
        return res.status(400).json(error.message)
     }
}

export const SignOut = (req,res) => {
    try {
        res.clearCookie("Token", {
          HttpOnly: true,
          Secure: process.env.NODE_TOKEN === "production",
          SameSite: process.env.NODE_TOKEN === "production" ? "none" : "strict",
        });
    
        return res.status(200).json({success:true,message:'Logged out'})
        
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
    }
}

export const EmailVerification = async (req,res) => {
    const {userId} = req.body;
    console.log(userId)
    try {
       const user = await User.findById(userId)
       
       if(!user){
        return res.status(401).json({success:false,message:"user not found"})
       }

       if(user.isAccountVerified){
        return res.json({success:false,message:"user already verified"})
       }

       const otp = String(Math.floor(100000 + Math.random() * 900000))

       const otpValidTime = Date.now() + 24 * 60 * 60 * 1000 
  

        user.verifyOtp = otp;
        user.verifyOtpExpire = otpValidTime

        await user.save()

        return res.status(200).json({success:true,message:user})

    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
}

export const OtpVerification =async (req,res) => {
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

            user.isAccountVerified = true
            user.verifyOtp = ''
            user.verifyOtpExpire = 0  
            await user.save();
            return res.status(200).json({success:true,message:"OTP Verified successfully"})
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const isAuthenticated = (req,res) => {
    try {
        return res.status(200).json({success:true,message:"user Authenticated"})
    } catch (error) {
        return res.json({success:false,message:error.message})
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

export const verifyResetOtp = async(req,res) => {
    const { email,otp,newPassword } = req.body

    if(!email || !otp || !password){
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