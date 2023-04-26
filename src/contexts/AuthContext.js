import React, {createContext, useContext, useEffect, useState} from "react";
import { auth } from "../config/firebase"
import { ref, getDatabase, get, onValue } from "@firebase/database";


export const AuthContext = React.createContext()

const userContext = createContext();
export const useAuth = () => {return useContext(userContext)}

export function Authprovider(props) {
    const [authUser, setAuthUser] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [adminUser, setAdminUser] = useState(null)
    const [guesthouses, setGuesthouses] = useState([]);
    const [refresh, setRefresh] = useState(false)

    function refreshGHList(){
        setRefresh(prev => !prev)
    }
    
    // fetch data and populate GuestHouse list Array
    useEffect(() => {
        // fetch("https://guestvista-4308f-default-rtdb.firebaseio.com/addGuesthouses.json")
        
        fetch("https://react-project-5130e-default-rtdb.firebaseio.com/addGuesthouses.json")
            .then((res) => res.json())
            .then((data) => {
                const loadedGuesthouses = [];

                for (const key in data) {
                    loadedGuesthouses.push({
                        id: key,
                        ...data[key],
                    });
                }
                setGuesthouses(loadedGuesthouses);
                console.log("data fetched")
            })
            .catch((err) => console.log(err))
    }, [refresh]);
 
    //Checks for Authentications and updates relevant States
    auth.onAuthStateChanged(user => {
        setAuthUser(user)
    })
    useEffect(() => {
        if (authUser) {
            let found = false
            const dbRef = ref(getDatabase(), "Administrators")
            get(dbRef).then(snapshot => {
                snapshot.forEach(admin => {
                    if (admin.val().userId == authUser.uid) {
                        setAdminUser(admin.val())
                        found = true;
                    }
                })
                if (!found) { setAdminUser("none") }
            }).catch(e => console.log(e.message))
        }
        else { setAdminUser(null) }

        (authUser) ? setIsLoggedIn(true) : setIsLoggedIn(false)
    }, [authUser])

    //exported Variables & States
    const value = {adminUser,authUser,isLoggedIn, guesthouses, setGuesthouses, refreshGHList}

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}