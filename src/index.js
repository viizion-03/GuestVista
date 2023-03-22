import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fortawesome/fontawesome-free/css/all.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './AdminLogin'
import DashboardOverview from './Dashboard/DashboardOverview'
import GuestHouses from './Dashboard/GuestHouses'
import Bookings from './Dashboard/Bookings'
import MySideNav from './MySideNav';
import { Authprovider, AuthProvider } from './contexts/AuthContext'
import { AuthLayout } from './components/AuthLayout';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Authprovider>
    < Router >
      <Routes>
        <Route path='/' element={<App />} />

        <Route element={<AuthLayout />}>
          <Route path='/dashboard-overview' element={<DashboardOverview />} />
          <Route path='/guest-houses' element={<GuestHouses />} />
          <Route path='/bookings' element={<Bookings />} />
        </Route>

        <Route path='/admin-login' element={<AdminLogin />} />
        <Route path='/mysidenav' element={<MySideNav />} />



      </Routes>
    </Router >
  </Authprovider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
