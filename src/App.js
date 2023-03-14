import React from 'react';
import "./App.css";
import MySideNav from './MySideNav';
//import Dashboard from "./Dashboard.jsx";
//import AdminLogin  from "./AdminLogin.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardOverview from './Dashboard/DashboardOverview.jsx';
import GuestHouses from './Dashboard/GuestHouses.jsx';
import Bookings from './Dashboard/Bookings.jsx';


function App() {

  return (
      <div className="App">
        <Router>
        <MySideNav />
        <Routes>
        <Route path='/' element={<DashboardOverview />} />
          <Route path='/dashboard-overview' element={<DashboardOverview />} />
          <Route path='/guest-houses' element={<GuestHouses />} />
          <Route path='/bookings' element={<Bookings />} />
        </Routes>
      </Router>
      </div>
    );
  }
export default App;