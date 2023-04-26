import React, {useState,useEffect} from 'react'
import { auth } from '../config/firebase'
import { useNavigate } from 'react-router'
import {updateProfile} from "@firebase/auth";
import '../App.css'
import {useAuth} from "../contexts/AuthContext";

const UserHome = () => {
    const { currentuser, deleteUserProfile } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        setName(currentuser.username);
        setEmail(currentuser.email);
    }, [currentuser]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);

            await updateProfile(currentuser, { username: name });
            await updateProfile(currentuser, { email: email });
            alert('Your profile has been updated successfully!')

            setLoading(false);
        } catch (error) {
            setError('Failed to update profile');
            setLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        const confirmation = window.confirm('Are you sure you want to delete your profile')

        if(confirmation){
            try{
                await deleteUserProfile();
                alert('Your account has been deleted successfully!')
                history.push()
            } catch (error){
                console.error(error);
                setError('Failed to delete account');
            }
        }
    }


    return (
    <>
    <h1>User Home </h1>
        {error && <p>{error}</p>}

        <form onSubmit={handleSubmit}>
            <div>
                <label>Username</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={6}
                />
            </div>

            <button type="submit" disabled={loading}>
                Update
            </button>
        </form>
        <button onClick={handleDeleteAccount}>Delete Account</button>

        <button onClick={() => {
            auth.signOut()
        }}>Sign out</button>
    <button onClick={navigate('/')}>go home</button>
    </>
  )
}

export default UserHome