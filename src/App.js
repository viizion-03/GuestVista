import React from 'react';
import "./App.css";
import Dashboard from "./Dashboard.jsx";
import AdminLogin  from "./AdminLogin.jsx";
import { Route,Routes } from "react-router-dom";

function App() {

  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<AdminLogin />}/>
      <Route path="/dashboard" element={<Dashboard />}/>
      </Routes>

    </div>
  );
}
export default App;