import React from "react";
import { Link } from "react-router-dom";
import { BsFillHouseDoorFill} from "react-icons/bs";


function Dashboard (){
  return(
    <div>
       <div className="navbar">
       <Link to="/" className="home-icon"><BsFillHouseDoorFill color="black" size="30px"/></Link>
        <button className="logout-button">LogOut</button>
      </div>
      <div className="sidebar">
      <Link to="/dashboardoverview">Dashboard Overview</Link>
        <Link to="/guesthouses">Guest Houses</Link>
        <Link to="/bookings">Bookings</Link>
      </div>
      <div className="main-content">
      <h1> DASHBOARD</h1>
      </div>
    </div>
  )

}
export default Dashboard;