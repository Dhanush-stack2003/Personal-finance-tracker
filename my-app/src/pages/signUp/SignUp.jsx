import {useState} from 'react';
import {useNavigate,Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { SignUpSuccess,SignUpFailure,SignUpStart } from '../../store/userSlice/userSlice';
import classes from './SignUp.module.css'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Oauth from '../../components/oAuth/Oauth';
import Api from '../privateProfile/Api';

function SignUp() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loading = useSelector(state=>state.user.loading)
    const [userData,setUserData] = useState({
        username:"",
        email:"",
        password:""
    })


    const submitHandler = async(e) => {
        e.preventDefault();
            try {
              dispatch(SignUpStart())
              const {data} = await Api.post('/auth/sign-up',userData)
                if(data.success === true){
                    dispatch(SignUpSuccess(data._id))
                    navigate('/sign-in')
                }
                else{
                  dispatch(SignUpFailure(data.message))
                  toast.error(data.message)
                }
            } catch (error) {
                dispatch(SignUpFailure(error))
                toast.error(error.message)
            }
        }

    const changehandler = (e) => {
        setUserData({...userData,[e.target.id]:e.target.value})
    }
  return (
    <>
    {loading ? "<p>loading...<p>" : <div className={classes.signup}>
      <div className={classes.signup_leftside}>
        <div className={classes.signup_head}>
          <h1>Create a New Account</h1>
          <p>Create an Account so you can manage your personal finances</p>
        </div>
        <form>
          <div className={classes.username}>
            <input
              type="text"
              placeholder="Name"
              onChange={changehandler}
              id="username"
              value={userData.username}
            />
          </div>
          <div className={classes.email}>
            <input
              type="email"
              placeholder="Email"
              onChange={changehandler}
              id="email"
              value={userData.email}
            />
          </div>
          <div className={classes.password}>
            <input
              type="password"
              placeholder="Password"
              onChange={changehandler}
              id="password"
              value={userData.password}
            />
          </div>
            <button onClick={submitHandler}>{loading ? 'Creating Account...':'Create Account'}</button>
            <Oauth/>
          <p className={classes.signin}>
            Already have an account <Link to="/sign-in">sign in</Link>
          </p>
        </form>
      </div>
    </div>}
  </>
  )
}

export default SignUp