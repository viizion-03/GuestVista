import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import AdminNav from '../components/AdminNav'

export const AuthLayout = () => {

    const { adminUser, isLoggedIn } = useContext(AuthContext)

    if (!isLoggedIn || adminUser == null) {

        return (
            <Navigate
                to="admin-login"
                state={{ message: "You must Log in first" }}
            />
        )
    }

    return (
        <div className='admin--page'>
            <AdminNav />
            <main>
                <Outlet />
            </main>
        </div>
    )

}
