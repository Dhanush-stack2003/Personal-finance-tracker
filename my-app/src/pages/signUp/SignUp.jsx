import {useState} from 'react';
import {useNavigate,Link} from 'react-router-dom'
import './SignUp.css'

function SignUp() {
    const navigate = useNavigate()
    const [userData,setUserData] = useState({
        username:"",
        email:"",
        password:""
    })

    const submitHandler = async(e) => {
        e.preventDefault();
            try {
               const user = await fetch('http://localhost:3000/api/auth/sign-up',{
                 method:'POST',
                 headers:{
                    "Content-Type":"application/json"
                 },
                 body:JSON.stringify(userData)
                })

                const data = await user.json()

                if(data.success === true){
                    console.log("sign-in completed")
                    navigate('/sign-in')
                }
                else{
                    console.log(data)
                }
            } catch (error) {
                console.log(error)
            }
        }

    const changehandler = (e) => {
        setUserData({...userData,[e.target.id]:e.target.value})
    }
  return (
    <div className="signup">
        <form>
            <div className="username">
                <input type='text' placeholder='Enter your Name' onChange={changehandler} id='username' value={userData.username}/>
            </div>
            <div className="email">
                <input type='email' placeholder='Enter your email' onChange={changehandler} id='email' value={userData.email}/>
            </div>
            <div className="password">
                <input type='password' placeholder='Enter your password' onChange={changehandler} id='password' value={userData.password}/>
            </div>
            <p>Already have an account <Link to='/sign-in'>Sign In</Link></p>
            <button onClick={submitHandler}>Sign Up</button>
        </form>
    </div>
  )
}

export default SignUp