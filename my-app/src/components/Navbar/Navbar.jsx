import { useSelector } from 'react-redux';
import {Link, useLocation} from 'react-router-dom'
import './Navbar.css'
import Api from '../../pages/privateProfile/Api'
import {toast} from 'react-toastify'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {SignOutStart,SignOutSuccess,SignOutFailure} from '../../store/userSlice/userSlice'

function Navbar() {
const {currentUser} = useSelector((state)=>state.user)
const dispatch = useDispatch();
const navigate = useNavigate();
const location = useLocation()

  const logoutHandler = async () => {
    try {
      dispatch(SignOutStart())
      const {data} = await Api.get('/auth/log-out',{withCredentials:true})
      if(data.success){
        dispatch(SignOutSuccess())
        navigate('/sign-in')
      }
    } catch (error) {
      dispatch(SignOutFailure())
      toast.error(error.message)
    }
  }

  return (
    <div className="navbar">
      <div className="logo">
        <a href='/'><h1>
          Finance tracker
        </h1></a>
      </div>
      {!location.pathname === '/' && <div className="menubar">
        <ul>
          <li className='home_btn'>
              <a href='/dashboard'>Home</a>
          </li>
         <li className="img">
            <img
              src={currentUser?.photoURL}
              alt="log."
            />
            <div className="account_manage">
              <ul>
                <Link to='/' style={{textDecoration:'none'}}><li>Dashboard</li></Link>
                <Link to='/transaction-item' style={{textDecoration:'none'}}><li>All transactions</li></Link>
                <Link to='/get-transaction' style={{textDecoration:'none'}}><li>Filter transaction</li></Link>
                <Link to='/add-transaction' style={{textDecoration:'none'}}><li>Add transaction</li></Link>
                <Link onClick={logoutHandler} style={{textDecoration:'none'}}><li>Log out</li></Link>
              </ul>
            </div>
          </li>
        </ul>
      </div>}
    </div>
  );
}

export default Navbar