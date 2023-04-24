import React, {createContext, useContext, useEffect, useState} from 'react'
import './App.css'

const userContext = createContext();
export const useAuth = () => {return useContext(userContext)}

const UserSignUp = () => {
  const {error, SignUp, currentUser} = useAuth()
  const [err, setError] = useState("")
  const [backError, setBackError] = useState("")
  const [user , setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  useEffect(() => {
    console.log("Signup Successful")
    if(error){
      setInterval(() => {
        setBackError("")
      }, 5000)
      setBackError(error)
    }
  }, [error, currentUser])
  const UserHandler = (e) => {
    const { name, value} = e.target;
    console.log(name +"::::::::::"+value)
    setUser((pre) => {
      return{
        ...pre,
        [name]: value
      }
    })
  }

  const SubmitHandler = async  (e) => {
    e.preventDefault()
    const {username, email, password, confirmPassword} = user
    if (password == "" || confirmPassword == "" || email == "" || username == ""){
      setInterval(() => {
        setError("")
      }, 5000)
      return setError("Fill all the fields")
    }
    else if(password !== confirmPassword){
      setInterval(() => {
        setError("")
      }, 5000)
      return setError("Password does not match")
    }
    else if(!password.length >= 6 || !confirmPassword.length >= 6){
      setInterval(() => {
        setError("")
      }, 5000)
      return setError("Password must be greater than 6 length")
    }
    else{
      SignUp(email, password, username)
      {
        currentUser && setUser({
          username: "",
          email: "",
          password: "",
          confirmPassword: ""
        })
      }
    }
  }

  return (
    <div className='box'>
      {
        err ? (
            err && <p className='error'>{err}</p>
        ) : (
            backError && <p className='error'>{backError}</p>
        )
      }

      <form onSubmit={SubmitHandler} className="form">
        <h2>Signup</h2>
        <div className="input--fields">
          <input type="text" placeholder="UserName" value={user.username} name = 'Username' onChange={UserHandler}/>
        </div>
        <div className="input--fields">
          <input type="text" placeholder="Email" value={user.email} name = 'Email' onChange={UserHandler}/>
        </div>
        <div className="input--fields">
          <input type="text" placeholder="Password" value={user.password} name = 'Password' onChange={UserHandler}/>
        </div>
        <div className="input--fields">
          <input type="text" placeholder="ConfirmPassword" value={user.confirmPassword} name = 'Confirm Password' onChange={UserHandler}/>
        </div>
        <div className="input--fields">
          <input type="submit"/>
        </div>
        <p className="forget">Don't have an account?<a href = "">Sign Up</a></p>
      </form>
    </div>
  )
}

export default UserSignUp