
import React, { useState, useEffect } from "react";
import home from './pictures/home.jpeg'
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LocationCards from "./LocationCards";

import HomeCarousel from "./HomeCarousel";
import { Card } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { Col, Row, Container } from "react-bootstrap"
import { useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";


const Homepage = () => {

  const navigate = useNavigate()
  const [filteredGuesthouses, setFilteredGuesthouses] = useState([]);
  const { guesthouses } = useContext(AuthContext)

  const [cheapestGuesthouses, setCheapestGuesthouses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    const sorted = guesthouses.sort((a, b) => b.ratings - a.ratings)
    const filtered = sorted.filter((item) => item.ratings >= 4.0).slice(0, 6)

    const sortedPrice = guesthouses.sort((a, b) => a.price - b.price);
    const cheapGuestHs = sortedPrice.slice(0, 3);
    setFilteredGuesthouses(filtered)
    setCheapestGuesthouses(cheapGuestHs)
  }, [guesthouses])

  useEffect(() => {
    fetch("https://guestvista-4308f-default-rtdb.firebaseio.com/addGuesthouses.json")
      .then((response) => response.json())
      .then((data) => {
        // const filteredGuesthouses = Object.values(data).filter((guesthouse) => guesthouse.ratings >= 4.5);
        // setGuesthouses(filteredGuesthouses);

        // const sortedPrice = Object.values(data).sort((a, b) => a.price - b.price);
        // const cheapGuesthouses = sortedPrice.slice(0,3);
        // setCheapestGuesthouses(cheapGuesthouses);
      })
      .catch((error) => console.error(error));
  }, []);

  const styles = { width: "400px", height: "fit-content", margin: "30px 0px", background: "transparent", padding: "0px" }

  const source = "https://firebasestorage.googleapis.com/v0/b/guestvista-4308f.appspot.com/o/carousel%2Fzero-take-QzQe16eKc1I-unsplash%20%5BMConverter.eu%5D.webp?alt=media&token=23abc247-a128-45d4-a412-815f6646d34a"

  function seeGuestHouses(id) {
    navigate(`/guesthouse/${id}`)
  }

  return (
    <div className="homepage">

      <HomeCarousel />

      <input type="text" placeholder="Search for your guesthouse here!" style={{ marginRight: "10px", padding: "15px" }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} />
      <div className="popular-guesthouses">
        <h2>POPULAR GUESTHOUSES</h2>
        <Container>
          <Row>
            <Col style={{ display: "flex", flexWrap: "wrap", width: "100%", justifyContent: "space-between" }}>
              {filteredGuesthouses.map((guesthouse) => {
                return (
                  //   {/* // <div className="card" key={guesthouse.id} style={{ width: "600px", marginBottom: "40px" ,marginLeft: "100px", marginRight: "100px", marginTop: "40px"}}>
                  // //   <img src={guesthouse.photos[0].src} alt={guesthouse.name} style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "5px" }} />
                  // //   <h3 style={{ fontSize: "1.5rem", marginTop: "10px", marginBottom: "5px" }}>{guesthouse.gName}</h3>
                  // //   <p style={{ fontSize: "1.2rem", marginBottom: "10px" }}>{guesthouse.description}</p>
                  // //   <p style={{ fontSize: "1.2rem", marginBottom: "3" }}><FontAwesomeIcon icon={faStar} color='#FFD700' /> {guesthouse.ratings}</p>
                  // //   <p style={{ fontSize: "1.2rem", marginBottom: "0" }}>Location: {guesthouse.location}</p>
                  // // </div> */}


                  // <Card style={{}}>
                  //   <Card.Img src={guesthouse.display_picture} />
                  //   <Card.Title>{guesthouse.gName}</Card.Title>
                  //   <Card.Text>{guesthouse.brief}</Card.Text>
                  //   <Card.Subtitle></Card.Subtitle>
                  //   <Card.Footer>{guesthouse.ratings} Rating</Card.Footer>
                  // </Card> */

                  <Card style={styles}>
                    <Card.Img src={guesthouse.display_picture} style={{ height: "350px" }} />

                    <Card.ImgOverlay style={{ display: "absolute" }}>
                      <Card.Text as="h3"
                        style={{ color: "white", backgroundColor: "black", width: "fit-content", float: "right", borderRadius: "10px", padding: "10px", margin: "15px" }}
                      > {guesthouse.ratings}
                        <FontAwesomeIcon icon={faStar} />
                      </Card.Text>

                      <Card.Text as="h4" style={{ position: "absolute", bottom: "10px", color: "white", margin: "10px", backgroundColor: " rgba(126, 126, 126, 0.4)", cursor: "pointer", padding: "5px" }}
                        onClick={() => seeGuestHouses(guesthouse.id)}
                      >{guesthouse.gName}
                      </Card.Text>
                    </Card.ImgOverlay>
                  </Card>
                )
              })}
            </Col>
          </Row>
        </Container>
      </div>
      <div className="cheapest-guesthouses">
        <h2>CHEAPEST GUESTHOUSES</h2>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
          {cheapestGuesthouses.map((guesthouse) => (
            <div className="card" key={guesthouse.id} style={{ width: "600px", marginBottom: "40px", marginLeft: "100px", marginRight: "100px", marginTop: "40px" }}>
              <img src={guesthouse.photos[0].src} alt={guesthouse.name} style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "5px" }} />
              <h3 style={{ fontSize: "1.5rem", marginTop: "10px", marginBottom: "5px" }}>{guesthouse.gName}</h3>
              <p style={{ fontSize: "1.2rem", marginBottom: "3" }}><FontAwesomeIcon icon={faStar} color='#FFD700' /> {guesthouse.ratings}</p>
              <p style={{ fontSize: "1.2rem", marginBottom: "0" }}>Location: {guesthouse.location}</p>
              <p style={{ fontSize: "1.2rem", marginBottom: "0" }}>Price: {guesthouse.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;

