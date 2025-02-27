import jwt from 'jsonwebtoken'

const userAuth = (req,res,next) => {
    const {Token} = req.cookies;
    if(!Token){
        return res
          .status(403)
          .json({
            success: false,
            message: "Authentication failed, login again",
          });
    }
    try {
        const jwtDecode = jwt.verify(Token,process.env.JWT_TOKEN)
        if(jwtDecode.id){
            req.body.userId = jwtDecode.id
            next()
        }
    } catch (error) {
        return res.status(403).json({success:false,message:"Authentication failed, login again"})
    }
}

export default userAuth