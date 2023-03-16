import React from "react";
import { Link } from "react-router-dom";
import './styles/Navbar.scss'
import logo from './pictures/logo.jpeg'

const Navbar = () => {
    return (
        <div className="nav">
            <div className="logo"> <img src={logo} alt="" style={{ maxWidth: "50px" }}/>
                GuestVista
            </div>
            <nav className="item">
                <ul className="ul">
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/contacts'>Contacts</Link>
                    </li>
                    <li>
                        <Link to='/register'>Register</Link>
                    </li>
                    <li>
                        <Link to='/admin-login'>Admin</Link>
                    </li>
                    <li>
                        <Link to='/signup'>Sign Up</Link>
                    </li>
                </ul>
            </nav>


        </div>
    )
}

export default Navbar