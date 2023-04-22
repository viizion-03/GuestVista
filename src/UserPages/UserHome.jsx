import React from 'react'
import { auth } from '../config/firebase'
import { useNavigate } from 'react-router'

const UserHome = () => {
    const navigate = useNavigate()

  return (
    <>
    <h1>User Home </h1>
    <button onClick={() => {
        auth.signOut()
    }}>Sign out</button>
    <button onClick={navigate('/')}>go home</button>
    </>
  )
}

export default UserHome