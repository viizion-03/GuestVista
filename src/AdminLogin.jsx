import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import  logo from "./images/logo.jpeg"


function AdminLogin(){
  const [name, SetName] = useState("");
  const [pass, SetPass] = useState("");
  const navigate = useNavigate();

function handleClick(){
  navigate("/mySideNav")

}

    return (
        <div className="auth-form-container">
          <img src={logo} alt=""/><h1>GuestVista </h1>
            <form className="login-form" >
                <label htmlFor="User Name:">User Name:</label>
                <input value={name} onChange={(e) => SetName(e.target.value)}type="User Name:" id="userName" name="UserName" />
                <label htmlFor="Password">Password:</label>
                <input value={pass} onChange={(e) => SetPass(e.target.value)} type="Password:" placeholder="********" id="password" name="password" />
                <button onClick={handleClick}> LOGIN</button>
            </form>
            
        </div>
    )
    } 
export default AdminLogin;