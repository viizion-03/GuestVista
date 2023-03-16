import React from 'react';
import "./App.css";
import Homepage from './components/Homepage';
import  Navbar  from './components/Navbar';
//import MySideNav from './MySideNav';
//import Dashboard from "./Dashboard.jsx";
//import AdminLogin  from "./AdminLogin.jsx";
//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import DashboardOverview from './Dashboard/DashboardOverview.jsx';
//import GuestHouses from './Dashboard/GuestHouses.jsx';
//import Bookings from './Dashboard/Bookings.jsx';


function App() {

  return (
      <div className="App">
       <Navbar/>
       <Homepage/>
      </div>
    );
  }
export default App;