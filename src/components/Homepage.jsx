
import React, { useState, useEffect } from "react";
import home from './pictures/home.jpeg'
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LocationCards from "./LocationCards";

import HomeCarousel from "./HomeCarousel";
import { Card } from "react-bootstrap";
import { Col, Row, Container } from "react-bootstrap"
import { useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Placeholder } from "react-bootstrap";
import { faLocation, faMapPin, faPingPongPaddleBall } from "@fortawesome/free-solid-svg-icons";
import GuestHouseCard from "./GuestHouseCard";

const Homepage = () => {

  const navigate = useNavigate()
  const [filteredGuesthouses, setFilteredGuesthouses] = useState([]);
  const { guesthouses } = useContext(AuthContext)

  const [cheapestGuesthouses, setCheapestGuesthouses] = useState([]);


  useEffect(() => {
    const sorted = guesthouses.toSorted((a, b) => b.ratings - a.ratings)
    const filtered = sorted.filter((item) => item.ratings >= 4.0).slice(0, 6)

    const sortedPrice = guesthouses.toSorted((a, b) => a.price - b.price);
    const cheapGuestHs = sortedPrice.slice(0, 3);
    setFilteredGuesthouses(filtered)
    setCheapestGuesthouses(cheapGuestHs)
  }, [guesthouses])


  const styles = { width: "400px", height: "fit-content", margin: "30px 0px", background: "transparent", padding: "0px" }

  const source = "https://firebasestorage.googleapis.com/v0/b/guestvista-4308f.appspot.com/o/carousel%2Fzero-take-QzQe16eKc1I-unsplash%20%5BMConverter.eu%5D.webp?alt=media&token=23abc247-a128-45d4-a412-815f6646d34a"

  function seeGuestHouses(id) {
    navigate(`/guesthouse/${id}`)
  }

  function LoadingCard() {
    return (
      <Card style={{ styles }}>
        <Card.Img style={{ height: "250px" }} variant="top" src="./images/holder.jpg" />
        <Card.Body>
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder xs={10} />
          </Placeholder>
        </Card.Body>
      </Card>
    )
  }

  return (
    <div className="homepage">

      <HomeCarousel />

      <div className="popular-guesthouses" style={{ marginTop: "80px" }}>
        <h2>POPULAR GUESTHOUSES</h2>
        <button onClick={() => navigate('/view-guesthouses')} style={{width:"25.4rem"}}>View All Guest Houses</button>

        <Container style={{ marginTop: "30px", backgroundColor: "whitesmoke", padding: "30px", borderRadius: "20px" }}>
          <Row>
            <Col style={{ display: "flex", flexWrap: "wrap", width: "100%", justifyContent: "space-between" }}>
              {(guesthouses.length != 0) ? filteredGuesthouses.map((guesthouse) => {
                return (
                  <GuestHouseCard {...guesthouse} />
                )
              }) : <><LoadingCard /> <LoadingCard /><LoadingCard /><LoadingCard /></>
              }
            </Col>
          </Row>
        </Container>
      </div>
      <div className="cheapest-guesthouses" style={{ marginTop: "50px" }}>
        <h2>CHEAPEST GUESTHOUSES</h2>

        <Container style={{ marginTop: "30px", backgroundColor: "whitesmoke", padding: "30px", borderRadius: "20px" }}>
          <Row>
            
          <Col style={{ display: "flex", flexWrap: "wrap", width: "100%", justifyContent: "space-between" }}>
            {(guesthouses.length != 0) ? cheapestGuesthouses.map((guesthouse) => (
              <Col><GuestHouseCard {...guesthouse} /></Col>
            )) : <><LoadingCard /> <LoadingCard /><LoadingCard /><LoadingCard /></>
            }
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Homepage;

