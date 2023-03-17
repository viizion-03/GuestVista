import React from "react";
import { Link } from "react-router-dom";
import './styles/Navbar.scss'
import homelogo from './pictures/homelogo.png'

const Navbar = () => {
    return (
        <div className="nav">
            <img src={homelogo} alt="" style={{ maxHeight: "100px"}}/>
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