import './Sidebar.css'
import { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { MdOutlineDashboard } from "react-icons/md";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { GrContact } from "react-icons/gr";
import { FaArrowLeft } from "react-icons/fa";
import user_icon from '../../Asserts/default_profile_icon.jpg';
import { useDispatch, useSelector } from 'react-redux';
import Api from '../../pages/privateProfile/Api'
import { Link, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'
import { SignOutStart,SignOutFailure,SignOutSuccess} from '../../store/userSlice/userSlice'

function Sidebar() {

  const [collapsed, setCollapsed] = useState(false);
  const { currentUser } = useSelector(state => state.user);
  const dispatch  = useDispatch();
  const navigate = useNavigate()
  
  const logoutHandler = async () => {
    try {
      dispatch(SignOutStart());
      const { data } = await Api.get("/auth/log-out", {
        withCredentials: true,
      });
      if (data.success) {
        dispatch(SignOutSuccess());
        navigate("/sign-in");
      }
    } catch (error) {
      dispatch(SignOutFailure());
      toast.error(error.message);
    }
  };

  const toggleSidebar = () => {
    setCollapsed(collapsed => !collapsed)
  }  
  
  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="username">
        <img alt="" src={user_icon} />
        <p>{currentUser.username}</p>
      </div>

      <div className="sidebar_container">
        <ul>
            <Link to='/dashboard' style={{textDecoration:'none'}}>
          <li>
            <p className="sidebar_label">
              <MdOutlineDashboard />
            </p>
            <p className="sidebar_link">
              Dashboard
            </p>
          </li>
            </Link>
            <Link to='/add-transaction' style={{textDecoration:'none'}}>
          <li>
              <p className="sidebar_label">
                <MdFormatListBulletedAdd />
              </p>
              <p className="sidebar_link">
                Add Transaction
              </p>
          </li>
            </Link>
            <Link to='/get-transaction' style={{textDecoration:'none'}}>
          <li>
              <p className="sidebar_label">
                <FaSearch />
              </p>
              <p className="sidebar_link">
                Find Transaction
              </p>
          </li>
            </Link>
          <div className="arrow_icon" onClick={toggleSidebar}>
            <FaArrowLeft className={`icon ${collapsed ? "rotated" : ""}`} />
          </div>
            <Link to='/contact' style={{textDecoration:'none'}}>
          <li>
            <p className="sidebar_label">
              <GrContact />
            </p>
            <p className="sidebar_link">
              Contact us
            </p>
          </li>
            </Link>
          <li>
            <p className="sidebar_label">
              <MdLogout />
            </p>
            <p onClick={logoutHandler} className="sidebar_link">
              Logout
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar