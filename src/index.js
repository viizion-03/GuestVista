import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fortawesome/fontawesome-free/css/all.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './AdminLogin'
import DashboardOverview from './AdminPages/DashboardOverview'
import GuestHouses from './AdminPages/GuestHouses'
import Bookings from './AdminPages/Bookings'
import MySideNav from './MySideNav';
import { Authprovider } from './contexts/AuthContext'
import { AuthLayout } from './layouts/AuthLayout';
import GuestHouseData from './AdminPages/GuestHouseData';
import Adminitrators from './AdminPages/Adminitrators';
import Requests from './AdminPages/Requests';
import Settings from './AdminPages/Settings';
import GuestHouseDetails from './pages/GuestHouseDetails';
import GuestHousesList from "./pages/GuestHousesList";
import {UserLayout} from "./layouts/UserLayout";

// import DashboardOverview  from './Dashboard/DashboardOverview';
import AddingGuesthouse from './AdminPages/AddingGueshouse'
import UserHome from './UserPages/UserHome';
import UserSignUp from './UserPages/UserSignUp';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <<<<<<< HEAD
  //   <Router >
  //     <Routes>
  //       <Route path='/' element={<App />} />

  //       <Route path='/mysidenav' element={<MySideNav />} />
  //       <Route path='/dashboard-overview' element={<DashboardOverview />} />
  //       <Route path='/guest-houses' element={<GuestHouses />} />
  //       <Route path='/bookings' element={<Bookings />} />

  <Authprovider>
    < Router >
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/view-guesthouses' element={<GuestHousesList />} />
        <Route path='/guesthouse/:id' element={<GuestHouseDetails />} />
        <Route path='/admin-login' element={<AdminLogin />} />
        <Route path='/signup' element={<UserSignUp/>} />
        

        <Route element={<AuthLayout />}>
          <Route path='/admin' element={<DashboardOverview />} />
          <Route path='/admin/guest-houses' element={<GuestHouses />} />
          <Route path='/admin/guest-houses/house' element={<GuestHouseData />} />
          <Route path='/admin/administrators/' element={<Adminitrators />} />
          <Route path='/requests' element={<Requests />} />
          <Route path='/admin/settings' element={<Settings />} />
          <Route path='/admin/new-guesthouse' element={<GuestHouseData />} />
        </Route>

        <Route element={<UserLayout />} >
          <Route path='/users' element={<UserHome />} />
        </Route>

        <Route path='/new-guesthouse' element={<AddingGuesthouse />} />
      </Routes>

    </Router >
  </Authprovider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
