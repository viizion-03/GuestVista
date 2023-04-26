import React, { useState, useEffect, useContext } from 'react'
import { auth } from '../config/firebase'
import { useNavigate } from 'react-router'
import { updateProfile, deleteUser, getAuth } from "@firebase/auth";
import '../App.css'
import { AuthContext, useAuth } from "../contexts/AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Col, Container, Row } from 'react-bootstrap';

const UserHome = () => {
    const auth = getAuth()
    const user = auth.currentUser;
    // const { authUser, deleteUserProfile } = useContext(AuthContext)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);


    const navigate = useNavigate()
    useEffect(() => {
        setName(user.displayName);
        setEmail(user.email);
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);

            await updateProfile(user, { displayName: name });
            await updateProfile(user, { email: email });
            alert('Your profile has been updated successfully!')

            setLoading(false);
        } catch (error) {
            setError('Failed to update profile');
            setLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        const confirmation = window.confirm('Are you sure you want to delete your profile')

        if (confirmation) {
            try {
                await deleteUser(user).then(() => {
                    alert('Your account has been deleted successfully!')
                })
                // history.push()
            } catch (error) {
                console.error(error);
                setError('Failed to delete account');
            }
        }
    }

    function goHome() {
        navigate("/")
    }

    return (
        <>
            <nav >
                <FontAwesomeIcon icon={faHome} size='2x' className='ghl--home-icon' onClick={goHome} />

                <ul>
                    <li onClick={()=> {
                        auth.signOut()
                        goHome()
                    }}>Sign Out</li>
                </ul>
            </nav>

            <h1>User Home </h1>
            {error && <p>{error}</p>}

            <form onSubmit={handleSubmit}>
                <Container style={{width:"50%"}}>


                    <Row>
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
                    </Row>
                    <Row>
                        <Col>

                            <button type="submit" disabled={loading}>
                                Update
                            </button>
                        </Col>
                        <Col>
                            <button onClick={handleDeleteAccount}>Delete Account</button>
                        </Col>
                    </Row>

                </Container>
            </form>
        </>
    )
}

export default UserHome