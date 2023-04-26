import React, { useState, useContext, useEffect } from 'react';
import logo from "./images/logo.jpeg";
import { AuthContext } from './contexts/AuthContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './config/firebase';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';




const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [submited, setSubmited] = useState(false)

  const { isLoggedIn, checkIsAdmin, adminUser } = useContext(AuthContext)

  const navigate = useNavigate()
  const location = useLocation()

  function handleSubmit(e) {
    e.preventDefault()
    setErrorMsg('')
    setLoading(true)
    signInWithEmailAndPassword(auth, email, pass)
      .then((loggedUser) => {
        setLoading(false)
        setSubmited(true)
        console.log(loggedUser)
      })
      .catch((e) => {
        setErrorMsg("Wrong email or password")
        console.log(e)
      }).finally(() => {
        setLoading(false)
      })
  }

  //check if signed user is admin
  useEffect(() => {
    if (adminUser != null) {
      if (adminUser == "none") {
        navigate("/view-guesthouses")
      }
      else {
        navigate("/admin") 
      }
    }
  })


  return (
    <>
          <nav >
        <FontAwesomeIcon icon={faHome} size='2x' className='ghl--home-icon' onClick={() =>  navigate('/')} />
      </nav>
      <div className="auth-form-container">
        <img src={logo} alt="" />
        <h1>GuestVista</h1>
        {
          location.state?.message &&
          <h3 className="login-error">{location.state.message}</h3>
        }

        <form className="login-form" onSubmit={handleSubmit} >
          <label htmlFor="Email">Email:</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            name="email"
            placeholder='Email Address'
          />
          <label htmlFor="Password">Password:</label>
          <input
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            placeholder="Password"
            id="password"
            name="password"
          />
          <button type="submit" disabled={loading}>
            {!loading ? "Login" : "Loggin in"}
          </button>
          <p>Don't have an Account</p>
          <Link to={"/signup"} >Sign Up</Link>
          {errorMsg && <p>{errorMsg}</p>}
        </form>
      </div>
    </>

  );
}

export default AdminLogin;