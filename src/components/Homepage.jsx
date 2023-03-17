
import React from "react";
import home from './pictures/home.jpeg'


const Homepage = () => {
    return (
        <div className="homepage">
              <div className="homepic" style={{ position: "relative" }}>
                 <img src={home} alt="" style={{ maxWidth: "1900px" }}/>
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
     </div>
  

    );
};

export default Homepage