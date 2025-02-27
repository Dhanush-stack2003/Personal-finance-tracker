import React from 'react'
import { IoSearchSharp } from "react-icons/io5";
import './Navbar.css'
function Navbar() {
  return (
    <div className="navbar">
      <div className="logo">
        <h1>
          AI<span>Translator</span>
        </h1>
      </div>
      <div className="searchbar">
        <div className="search">
          <input type='search' placeholder='Enter the word Here'/>
          <IoSearchSharp className='icon'/>
        </div>
      </div>
      <div className="menubar">
        <ul>
          <li>
            <span>Profile</span>
            <div className="menubar_1">
              <ul>
                <li><span>Manage</span></li>
                <li>
                  <span>Refer</span>
                  <div className="dropdown_menu_1">
                    <ul>
                      <li><span>username</span></li>
                      <li><span>email</span></li>
                      <li><span>address</span></li>
                    </ul>
                  </div>
                </li>
                <li><span>Change name</span></li>
              </ul>
            </div>
          </li>
          <li><span>About</span></li>
          <li><span>Sign In</span></li>
          <li><span>image</span></li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar