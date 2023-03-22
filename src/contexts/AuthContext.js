import React, { useEffect, useState } from "react";
import {auth} from "../config/firebase"

export const AuthContext = React.createContext()

export function Authprovider(props){
    const [authUser, setAuthUser] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect( () => {
        auth.onAuthStateChanged( user => {
            
            setAuthUser(user)            
            if(user){
                setIsLoggedIn(true)
            }else {
                setIsLoggedIn(false)
            }
        })
    })

    const value ={
        authUser,
        isLoggedIn
    }

    return(
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}