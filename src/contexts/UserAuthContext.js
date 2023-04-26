import React, {createContext, useContext, useEffect, useState} from "react";
import { auth, db} from "../config/firebase"
import {AuthErrorCodes, createUserWithEmailAndPassword, onAuthStateChanged} from "@firebase/auth";
import {addDoc, collection, doc, setDoc} from "firebase/firestore";

const userContext = createContext();
export const useAuth = () => {return useContext(userContext)}

const UserAuthContext = ({children}) => {
    const [error, setError] = useState("")
    const [currentuser, setuser] = useState()
    useEffect(
        () => {
            onAuthStateChanged(auth, user => {
                console.log(user)
                if(user){
                    setuser(user)
                    console.log("Successfully Logged In")
                }
                else {
                    alert("Logging Out")
                }
            })
        },[currentuser]
    )

    const Signup = async (email, password, username) =>{
        setError("");
        createUserWithEmailAndPassword(auth, email, password).then(
            async (result) => {
                console.log(result)
                try {
                    //const docRef = await addDoc(collection(db,"users"),{
                    //    username,
                    //    userId: `${result.user.uid}`
                    //});
                    const ref = doc(db, "userinfo", result.user.uid)
                    const docRef = await setDoc(ref, {username})
                    alert("Welcome account created successfully")
                    console.log("Document written with ID: ", docRef.id);
                } catch (e){
                    console.error("Error adding document: ", e);
                }
            }
        ).catch(err => {
            if(err.code === "auth/email-already-in-use"){
                setInterval(() => {
                    setError("")
                }, 5000)
                setError("email already in use try another email")
            }
            else if(err.code === AuthErrorCodes.WEAK_PASSWORD){
                setInterval(() => {
                    setError("")
                },5000)
                setError("Password Must be 6 or more characters")
            }
            else{
                setError(err.message)
            }
        })
    }
    const value = {
        Signup,
        error,
        currentuser
    }

    return(
        <userContext.Provider value={value}>{children}</userContext.Provider>
    )
}

export default UserAuthContext