import mongodb from 'mongoose'

const userSchema = new mongodb.Schema({
  username: {
    type: String,
    required: true,
    unique:true
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true,
  },
  isAccountVerified:{
    type:Boolean,
    default:false
  },
  verifyOtp:{
    type:String,
    default:''
  },
  verifyOtpExpire:{
    type:Number,
    default:0
  },
  resetOtp:{
    type:String,
    default:''
  },
  resetOtpExpire:{
    type:Number,
    default:0
  }

});

const User = mongodb.model('userCredentialslist',userSchema)

export default User

