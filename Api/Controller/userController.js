import User from "../model/model.js"

export const userData = async (req,res) => {
    const {email} = req.body

    if(!email){
        return res.json({success:false,message:"provide valid email"})
    }

    try {
        const user = await User.findOne({email})

        if(!user){
          return res.status(404).json({ success: false, message: "user does not exist" });
        }

        res.status(200).json({success:true,
        message:{
            username:user.username,
            email:user.email,
            isAccountVerified:user.isAccountVerified
        }})
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
}