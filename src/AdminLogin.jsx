import React, { useState, useContext, useEffect } from 'react';
import logo from "./images/logo.jpeg";
import { AuthContext } from './contexts/AuthContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './config/firebase';
import { useLocation, useNavigate } from 'react-router-dom';


const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext)

  const navigate = useNavigate()
  const location = useLocation()


  function handleSubmit(e) {
    e.preventDefault()

    setErrorMsg('')
    setLoading(true)
    signInWithEmailAndPassword(auth, email, pass)
      .then((user) => {
        setLoading(false)
        console.log("user signed in")
        console.log(user)
      })
      .catch((e) => {
        setErrorMsg("Wrong email or password")
        console.log(e)
      }).finally(() =>{
        setLoading(false)
      })
  }

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/admin")
    }
  })

  return (
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
        {errorMsg && <p>{errorMsg}</p>}
      </form>
    </div>
  );
}

export default AdminLogin;