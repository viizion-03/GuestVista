import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../config/firebase'
import { AuthContext } from '../contexts/AuthContext'
import "./styles/Sidebar.css"

const AdminNav = () => {
  const navigate = useNavigate()
  const {adminUser} = useContext(AuthContext)
  const defaultImg = "./icons/image 1.png"
  function logout() {
    auth.signOut()
    console.log("signed out")
    navigate('/')
  }

  return (
    <>
      <div id="mySideNav" className="side-nav">

        <div className='sn--user'>
          {/* <p src="" alt="x" className='sn--close' >x</p> */}
          <img src={adminUser.profilePic == "" ? defaultImg : adminUser.profilePic} alt="User Logo" />
          <h3 className='sn--username'>{adminUser.uName}</h3>
          <h5>Admin</h5>
        </div>

        <ul className='sn--nav-links-container'>

          <li className='sn--links-home'>
            <img src="./icons/home-ico.svg" />
            <Link to="/admin">
              Home
            </Link>
          </li>

          <li className='sn--links'>
            <img src="./icons/guest-houses-ico.svg" />
            <Link to="/admin/guest-houses">
              Guest Houses
            </Link>
          </li>

          <li className='sn--links'>
            <img src="./icons/subs-ico.svg" />
            <Link to="/admin/administrators">
              Administrators
            </Link>
          </li>

          <li className='sn--links'>
            <img src="./icons/requests-ico.svg" />
            <Link to="/requests">
              Requests
            </Link>
          </li>

          <li className='sn--links'>
            <img src="./icons/settings-ico.svg" />
            <Link to="/admin/settings/">
              Settings
            </Link>
          </li>
        </ul>

        <button className="sn--logout" onClick={logout}>Logout</button>
      </div>

      {/* <main>
        <button className='sn--open' >☰ Open Navbar</button>
      </main> */}
    </>
  )
}

export default AdminNav