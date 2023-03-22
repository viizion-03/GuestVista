import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

export const AuthLayout = () => {

    const {isLoggedIn } = useContext(AuthContext)

    if(!isLoggedIn){
        return(
            <Navigate 
                to="admin-login"
                state={{message: "You must Log in first"}}
            />
        )
    }

    return <Outlet/>

}
