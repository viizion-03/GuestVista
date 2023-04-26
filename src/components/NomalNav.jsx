import React,{useContext, } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../contexts/AuthContext'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import{useNavigate, Link} from 'react-router-dom'

const NomalNav = () => {
    const navigate = useNavigate()

    const {isLoggedIn} = useContext(AuthContext)

    function goHome() {
        navigate('/')
      }
    

    return (
        <nav >
            <FontAwesomeIcon icon={faHome} size='2x' className='ghl--home-icon' onClick={goHome} />

            <ul>
                {!isLoggedIn &&
                    <>
                        <li onClick={()=> navigate("/admin-login")}>Sign In</li>
                        <li onClick={()=> navigate("/signup")}>Sign Up</li> </>

                }
                {isLoggedIn &&
                    <Link to='/users'>
                        <FontAwesomeIcon icon={faUser} />
                    </Link>}

                <li>About</li>
                <li>Contact Us</li>
            </ul>
        </nav>
    )
}

export default NomalNav