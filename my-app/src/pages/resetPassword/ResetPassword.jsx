import React, { useState } from 'react'
import './ResetPassword.css'
import Api from '../privateProfile/Api'
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'

function ResetPassword() {
    const [sendOtp,setOtpsend] = useState(false)
    const [isOtpVerified,setIsOtpVerified] = useState(false)
    const [otp,setOtp] = useState(['','','','','','']);
    const [email,setEmail] = useState('');
    const [newPassword,setNewPassword] = useState('')
    const [reEnterPassword,setReEnterPassword] = useState('')
    const enteredOtp = otp.join('')
    const navigate = useNavigate();

    const inputRef  = React.useRef([])


    const sendOtpHandler = async (e) => {
      e.preventDefault();
      const { data } = await Api.post('/auth/verify-email',{email:email})
      if(!data){
        toast.error(data.message)
      }
      toast.success(data.message)
      setOtpsend(true)
    }

    const verifyOtpHandler = async (e) => {
      e.preventDefault();
      const { data } = await Api.post('/auth/verify-otp',{otp:enteredOtp,email:email})
      if(!data){
        toast.error(data.message)
      }
      toast.success(data.message)
      setIsOtpVerified(true)
    }

    const setNewPasswordHandler = async (e) => {
      e.preventDefault();
      if(newPassword === reEnterPassword){
        const { data } = await Api.post('/auth/reset-password',{newPassword:newPassword,email:email})
        if(!data){
          toast.error(data.message)
        }
        toast.success(data.message)
        navigate('/add-transaction')
      }
    }

    const inputHandler = (e,index) => {
      if(e.target.value.length > 0 && index < inputRef.current.length - 1 ){
        inputRef.current[index + 1].focus()
      }
    }

    const backspaceHandler = (e,index) => {
      if(e.key === "Backspace" && e.target.value === '' && index > 0){
        inputRef.current[index - 1].focus()
      }
    }


  return (
    <div className="reset_password">
      <h1>Reset Password</h1>
      {!sendOtp && !isOtpVerified && <div className="resetPassword_email">
        <div className="heading">
          <p>Enter the registered email address</p>
        </div>
        <form onSubmit={sendOtpHandler}>
          <input
            type="email"
            id="reset_email"
            placeholder="Email"
            className="reset_email"
            onChange={(e) =>setEmail(e.target.value) }
            required
          />
          <button onClick={()=>sendOtpHandler} className='resetPassword_button'>Send Otp</button>
        </form>
      </div> }
      {!isOtpVerified && sendOtp && <div className="resetPassword_password">
      <p>The OTP has been sent to your email</p>
        <div className="otp_field" >
        {Array(6).fill(0).map((_,index)=>(
          <input 
           type='text'
           maxLength='1'
           key={index} 
           ref={(e)=>inputRef.current[index] = e}
           onChange={e => {
            const newOtp = [...otp];
            newOtp[index] = e.target.value;
            setOtp(newOtp);
           }}
           onInput={(e)=>inputHandler(e,index)}
           onKeyDown={(e)=>backspaceHandler(e,index)}
           />
        ))}
        </div>
        <button onClick={(e)=>verifyOtpHandler(e)} className='resetPassword_button'>Verify otp</button>
      </div>}

      {isOtpVerified && sendOtp && <div className="new_password">
        <p>Enter new Password</p>
        <form>
          <input type='password' placeholder='New password' onChange={(e)=>setNewPassword(e.target.value)}/>
          <input type='password' placeholder='Re-enter password' onChange={(e)=>setReEnterPassword(e.target.value)}/>
          <button className='resetPassword_button' onClick={(e)=>setNewPasswordHandler(e)}>Reset Password</button>
        </form>
      </div>}
    </div>
  );
}

export default ResetPassword