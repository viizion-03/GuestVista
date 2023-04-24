import React, { useContext } from "react";
import { Link } from "react-router-dom";
import './styles/Navbar.scss'
import homelogo from './pictures/homelogo.png'
import { UserAuthContext } from "../contexts/UserAuthContext";
import { AuthContext } from "../contexts/AuthContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

const Navbar = () => {
    const { isLoggedIn } = useContext(AuthContext)

    return (
        <div className="nav">
            <img src={homelogo} alt="" style={{ maxHeight: "100px" }} />
            <nav className="item">
                <ul className="ul">
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/contacts'>Contacts</Link>
                    </li>

                    {!isLoggedIn &&
                        <>
                            <li>
                                <Link to='/admin-login'>Login</Link>
                            </li>
                            <li>
                                <Link to='/signup'>Sign Up</Link>
                            </li>
                        </>}
                    {isLoggedIn &&
                        <Link to='/users'>
                            <FontAwesomeIcon icon={faUser} />
                        </Link>
                    }
                </ul>
            </nav>


        </div>
    )
}

export default Navbar