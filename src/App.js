import React from 'react';
import "./App.css";
import Content from './components/Content';
import Footer from './components/Footer';
import Homepage from './components/Homepage';
import  Navbar  from './components/Navbar';

function App() {

  return (
      <div className="App">
       <Navbar/>
       <Homepage/>
       <Content/>
       <Footer/>
      </div>
    );
  }
export default App;