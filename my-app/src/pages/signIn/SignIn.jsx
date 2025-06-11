import {  useState } from "react";
import { Link } from "react-router-dom";
import { SignInFailure, SignInStart, SignInSuccess } from "../../store/userSlice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import classes from './SignIn.module.css'
import Oauth from '../../components/oAuth/Oauth'
import { toast } from "react-toastify";
import Api from '../privateProfile/Api'

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Loading = useSelector((state) => state.loading)
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const formHandler = (e) => {
    setUserCredentials({ ...userCredentials, [e.target.id]: e.target.value });
  };

  
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(SignInStart())
     const {data} = await Api.post('/auth/sign-in',userCredentials,{withCredentials:true})
     if(data.success === true){
      dispatch(SignInSuccess(data.message))
      toast.success('Signed in Successfully')
      navigate('/dashboard')
     }
     else{
      dispatch(SignInFailure(data.message))
      toast.error(data.message)
     }
    }
    catch (error) {
        dispatch(SignInFailure(error.message))
        toast.error(error.message)
    }
  };
  return (
    <div className={classes.signin}>
      <div className={classes.signin_left_side}>
        <div className={classes.signin_head}>
          <h1>Existing user</h1>
          <p>Log in to continue the track of your personal finances</p>
        </div>
        {Loading ? (
          "Loading..."
        ) : (
          <form onSubmit={submitHandler}>
            <div className={classes.email}>
              <input
                type="email"
                placeholder="Email"
                id="email"
                onChange={formHandler}
                value={userCredentials.email}
                required
              />
            </div>
            <div className={classes.password}>
              <input
                type="password"
                placeholder="Password"
                id="password"
                onChange={formHandler}
                value={userCredentials.password}
                required
              />
            </div>
            <Link to='/reset-password'className={classes.forgot_password} ><span>Forgot Password?</span></Link>
            <button onClick={submitHandler}>Log In</button>
            <Oauth/>
            <p className={classes.signup}>
              Don't have an account <Link to="/sign-up"><span>sign up</span></Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default SignIn;
