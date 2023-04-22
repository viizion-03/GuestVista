import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

export const UserLayout = () => {

    const { isLoggedIn,} = useContext(AuthContext)

    if (!isLoggedIn) {
        return (
            <Navigate
                to="admin-login"
                state={{ message: "You must Log in first" }}
            />
        )
    }

    return (
        <div className='admin--page'>
            <nav>Navigation here</nav>
            <main>
                <Outlet />
            </main>
        </div>
    )

}
