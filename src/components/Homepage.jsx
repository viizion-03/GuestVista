
import React, { useState, useEffect } from "react";
import home from './pictures/home.jpeg'
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Homepage = () => {
  const [guesthouses, setGuesthouses] = useState([]);
  useEffect(() => {
    fetch("https://guestvista-4308f-default-rtdb.firebaseio.com/addGuesthouses.json")
      .then((response) => response.json())
      .then((data) => {
        const filteredGuesthouses = Object.values(data).filter((guesthouse) => guesthouse.ratings >= 4.5);
        setGuesthouses(filteredGuesthouses);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="homepage">
      <div className="homepic" style={{ position: "relative" }}>
        <img src={home} alt="" style={{ maxWidth: "2600px" }} />
        <div
          style={{
            position: "absolute",
            top: "70%",
            left: "30%",
            transform: "translate(-50%, -50%)",
            color: "white",
            fontSize: "1rem",
            backgroundColor: "rgba(0,0,0,0.5)",
            padding: "10px"
          }}
        >
          <p>Experience the ultimate relaxation and comfort with our selection of guest houses.</p>
          <p>Our web app make it easy to find and book the guesthouse for your next trip,with direct bookings that save you time and money.</p>
          <p>Start browsing now and experience the comfort and convenience of our guesthouses!!!</p>
        </div>
        <div
          style={{
            position: "absolute",
            top: "90%",
            left: "15%",
            transform: "translate(-50%, -50%)",
            padding: "10px",
            borderRadius: "5px"
          }}
        >
          <input type="text" placeholder="Search for your guesthouse here!" style={{ marginRight: "10px", padding: "15px" }} />
          <button style={{ backgroundColor: "blue", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px" }}>Search</button>
        </div>
      </div>
      
      <div className="popular-guesthouses">
        <h2>POPULAR GUESTHOUSES</h2>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
          {guesthouses.map((guesthouse) => (
            <div className="card" key={guesthouse.id} style={{ width: "600px", marginBottom: "40px" ,marginLeft: "100px", marginRight: "100px", marginTop: "40px"}}>
              <img src={guesthouse.photos[0].src} alt={guesthouse.name} style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "5px" }} />
              <h3 style={{ fontSize: "1.5rem", marginTop: "10px", marginBottom: "5px" }}>{guesthouse.gName}</h3>
              <p style={{ fontSize: "1.2rem", marginBottom: "10px" }}>{guesthouse.description}</p>
              <p style={{ fontSize: "1.2rem", marginBottom: "3" }}><FontAwesomeIcon icon={faStar} color='#FFD700' /> {guesthouse.ratings}</p>
              <p style={{ fontSize: "1.2rem", marginBottom: "0" }}>Location: {guesthouse.location}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;

