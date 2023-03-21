import React, { useContext, useEffect, useState } from 'react'
import { auth } from "..config/firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

const AuthContext = React.createContext()

export function getAuth() {
    useContext(AuthContext)
}

export const AuthProvider = (props) => {

    const [userCred, setUserCred] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    function login(email, password) {
        setIsLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
            .then(user => {
                setIsLoading(false)
            })
            .catch(error => {
                console.log(error)
                console.log("Sign in Failed")
            }).finally(() => {
                setIsLoading(false)
            })

    }

    function signUp(email, password) {
        setIsLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
            .then(user => {
                setIsLoading(false)
            }).catch(error => {
                console.log(error)
                console.log("Sign Up Failed")
            }).finally(() => {
                setIsLoading(false)
            })
    }

    function signOut() {
        auth.signOut()
    }

    useEffect(() => {
        const unsub = auth.onAuthStateChanged(user => {
            
            if(user){
                setUserCred(user)
                setIsLoggedIn(true)
            }else{
                setIsLoggedIn(false)
            }
        })

        return unsub
    })

    const value = {
        login,
        signUp,
        signOut,
        userCred,
        isLoggedIn,
        isLoading
    }

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}
