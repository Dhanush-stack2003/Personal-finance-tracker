import jwt from 'jsonwebtoken'

const userAuth = (req,res,next) => {
    const {AccessToken} = req.cookies;

    if(!AccessToken){
        return res
          .status(403)
          .json({
            success: false,
            message: "Authentication failed, login again",
          });
    }
    try {
        const jwtDecode = jwt.verify(AccessToken,process.env.ACCESS_TOKEN_KEY)
        if(jwtDecode.id){
            req.userId = jwtDecode.id
            next()
        }
    } catch (error) {
        return res.status(403).json({success:false,message:"Authentication failed, login again"})
    }
}

export default userAuth