import mongodb from 'mongoose'

const userSchema = new mongodb.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  verifyOtp: {
    type: String,
    default: "",
  },
  verifyOtpExpire: {
    type: Number,
    default: 0,
  },
  resetOtp: {
    type: String,
    default: "",
  },
  resetOtpExpire: {
    type: Number,
    default: 0,
  },
  photoURL: {
    type: String,
    default:
      "https://static-00.iconduck.com/assets.00/user-icon-2046x2048-9pwm22pp.png",
  },
});

const User = mongodb.model('userCredentialslist',userSchema)

export default User

