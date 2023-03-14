import SideNav,{Toggle, NavItem, NavIcon, NavText} from "@trendmicro/react-sidenav"
import '@fortawesome/fontawesome-free/css/all.css';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { useNavigate } from "react-router-dom";


function MySideNav () {
    const navigate = useNavigate();
    return (
        <SideNav
         onSelect={selected=> {
            console.log(selected);
            navigate('/' + selected)
         }}
         className='mysidenav'
         >
          <SideNav.Toggle />
          <SideNav.Nav defaultSelected="/dashboard-overview">
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
            </SideNav.Nav>  
         </SideNav>

    );
}

export default MySideNav;