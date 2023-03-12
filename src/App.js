import React from 'react';
import "./App.css";
import MySideNav from './MySideNav';
//import Dashboard from "./Dashboard.jsx";
import AdminLogin  from "./AdminLogin.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardOverview from './Dashboard/DashboardOverview';
import GuestHouses from './Dashboard/GuestHouses';
import Bookings from './Dashboard/Bookings';


function App() {

  return (
      <div className="App">
        <Router>
        <Routes>
          
          <Route path="/" element={<AdminLogin />} />
          <Route path="/mySideNav" element={<MySideNav />} />
          <Route path="/mySideNav/dashboardOverview" element={<DashboardOverview />} />
          <Route path="/mySideNav/guestHouses" element={<GuestHouses />} />
          <Route path="/mySideNav/bookings" element={<Bookings />} />
         
        </Routes>
      </Router>
      </div>
    );
  }
export default App;