import SideNav,{Toggle, NavItem, NavIcon, NavText} from "@trendmicro/react-sidenav"
import '@fortawesome/fontawesome-free/css/all.css';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';


function MySideNav () {
    return (
        <SideNav
         onSelect={selected=> {
            console.log(selected)
         }}
         className='mysidenav'
         >
          <SideNav.Toggle />
          <SideNav.Nav defaultSelected="dashboardOverview">
            <NavItem eventKey="dashboardOverview">
                <NavIcon ><i className='fa-solid fa-globe' style={{fontSize: "1.5rem", color: "white"}}></i></NavIcon>
                <NavText >Dashboard Overview</NavText>
            </NavItem>
            <NavItem eventKey="guestHouses">
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