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
import { useNavigate } from 'react-router-dom';
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
          <li>
            <a href="/dashboard" className="sidebar_label">
              <MdOutlineDashboard />
            </a>
            <a href="/dashboard" className="sidebar_link">
              Dashboard
            </a>
          </li>
          <li>
            <a href="/add-transaction" className="sidebar_label">
              <MdFormatListBulletedAdd />
            </a>
            <a href="/add-transaction" className="sidebar_link">
              Add Transaction
            </a>
          </li>
          <li>
            <a href="/get-transaction" className="sidebar_label">
              <FaSearch />
            </a>
            <a href="/get-transaction" className="sidebar_link">
              Find Transaction
            </a>
          </li>
            <div className="arrow_icon" onClick={toggleSidebar}>
              <FaArrowLeft className={`icon ${collapsed ? "rotated" : ""}`} />
            </div>
          <li>
            <a href="/contact" className="sidebar_label">
              <GrContact />
            </a>
            <a href="/contact" className="sidebar_link">
              Contact us
            </a>
          </li>
          <li>
            <a href="/logout" className="sidebar_label">
              <MdLogout />
            </a>
            <a onClick={logoutHandler} className="sidebar_link">
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar