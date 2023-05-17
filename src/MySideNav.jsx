import React from 'react'
import SideNav,{NavItem, NavIcon, NavText} from "@trendmicro/react-sidenav"
import '@fortawesome/fontawesome-free/css/all.css';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { useNavigate } from "react-router-dom";
import {auth} from './config/firebase'

function MySideNav () {
    const navigate = useNavigate();

    const logout = () => {
        auth.signOut().then(() => {
            // remove the user's authentication token from local storage or cookies
            // redirect the user to the sign-in page
            navigate('/admin-login');
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <SideNav
            onSelect={selected=> {
                console.log(selected);
                navigate('/' + selected)
            }}
            className='mysidenav'
        >
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected="/dashboard-overview" >
                <NavItem eventKey="dashboard-overview">
                    <NavIcon ><i className='fa-solid fa-globe' style={{fontSize: "1.5rem", color: "white"}}></i></NavIcon>
                    <NavText >Dashboard Overview</NavText>
                </NavItem>
                <NavItem eventKey="guest-houses">
                    <NavIcon ><i className='fa-solid fa-hotel' style={{fontSize: "1.5rem", color: "white"}}></i></NavIcon>
                    <NavText >Guest Houses</NavText>
                </NavItem>
                <NavItem eventKey="bookings">
                    <NavIcon ><i className='fa-solid fa-book' style={{fontSize: "1.5rem", color: "white"}}></i></NavIcon>
                    <NavText >Bookings</NavText>
                </NavItem>
                <NavItem onClick={logout}>
                    <NavIcon ><i className='fa-solid fa-right-from-bracket' style={{fontSize: "1.5rem", color: "white"}}></i></NavIcon>
                    <NavText >Log Out</NavText>
                </NavItem>
            </SideNav.Nav>  
         </SideNav>
    );
}

export default MySideNav;
