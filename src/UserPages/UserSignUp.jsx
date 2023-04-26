import React, { createContext, useContext, useEffect, useState } from 'react'
import '../App.css'
import { createUserWithEmailAndPassword, AuthErrorCodes, updateProfile } from '@firebase/auth';
import { auth } from '../config/firebase';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const userContext = createContext();
export const useAuth = () => { return useContext(userContext) }

const UserSignUp = () => {
  // const { error, SignUp, currentUser } = useAuth()
  const { isLoggedIn } = useContext(AuthContext)
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const [backError, setBackError] = useState("")
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  useEffect(() => {
    console.log("Signup Successful")
    if (error) {
      setInterval(() => {
        setBackError("")
      }, 5000)
      setBackError(error)
    }
  }, [error, isLoggedIn])
  const UserHandler = (e) => {
    const { name, value } = e.target;
    console.log(name + "::::::::::" + value)
    setUser((pre) => {
      return {
        ...pre,
        [name]: value
      }
    })
  }

  const Signup = async (email, password, username) => {
    setError("");
    createUserWithEmailAndPassword(auth, email, password).then(
      async (result) => {
        console.log(result)
        alert("Welcome account created successfully")
        updateProfile(result.user, { displayName: username })
        navigate('/view-guesthouses')
      }
    ).catch(error => {
      if (error.code === "auth/email-already-in-use") {
        setInterval(() => {
          setError("")
        }, 5000)
        setError("email already in use try another email")
      }
      else if (error.code === AuthErrorCodes.WEAK_PASSWORD) {
        setInterval(() => {
          setError("")
        }, 5000)
        setError("Password Must be 6 or more characters")
      }
      else {
        setError(error.message)
      }
    })
  }

  const SubmitHandler = async (e) => {
    e.preventDefault()
    const { username, email, password, confirmPassword } = user
    if (password == "" || confirmPassword == "" || email == "" || username == "") {
      setInterval(() => {
        setError("")
      }, 5000)
      return setError("Fill all the fields")
    }
    else if (password !== confirmPassword) {
      setInterval(() => {
        setError("")
      }, 5000)
      return setError("Password does not match")
    }
    else if (!password.length >= 6 || !confirmPassword.length >= 6) {
      setInterval(() => {
        setError("")
      }, 5000)
      return setError("Password must be greater than 6 length")
    }
    else {
      Signup(user.email, user.password, user.username)
      // {
      //   currentUser && setUser({
      //     username: "",
      //     email: "",
      //     password: "",
      //     confirmPassword: ""
      //   })
      // }
    }
  }

  return (
    <div className='box'>
      {
        error ? (
          error && <p className='error'>{error}</p>
        ) : (
          backError && <p className='error'>{backError}</p>
        )
      }

      <form onSubmit={SubmitHandler} className="form">
        <h2>Signup</h2>
        <div className="input--fields">
          <input type="text" placeholder="UserName" value={user.username} name='username' onChange={UserHandler} />
        </div>
        <div className="input--fields">
          <input type="text" placeholder="Email" value={user.email} name='email' onChange={UserHandler} />
        </div>
        <div className="input--fields">
          <input type="password" placeholder="Password" value={user.password} name='password' onChange={UserHandler} />
        </div>
        <div className="input--fields">
          <input type="password" placeholder="ConfirmPassword" value={user.confirmPassword} name='confirmPassword' onChange={UserHandler} />
        </div>
        <div className="input--fields">
          <input type="submit" />
        </div>
        <p className="forget">Already have an account?<Link to="/admin-login">Login</Link></p>
      </form>
    </div>
  )
}

export default UserSignUp