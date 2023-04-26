import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import GuestHouseTile from '../components/GuestHouseTile';
import "./GuestHousesList.css"
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Alert, Card, Container, Spinner } from 'react-bootstrap';
const GuestHousesList = () => {


  // const [guesthouses, setGuesthouses] = useState([]);
  const { guesthouses } = useContext(AuthContext)
  const [filteredGuestHouses, setFilteredGuestHouses] = useState([]);
  const [searchLocation, setSearchLocation] = useState('');
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    let tempGuesthouses = [...guesthouses];
    // Filter by name
    if (searchLocation) {
      tempGuesthouses = tempGuesthouses.filter((guestHouse) => guestHouse.location.toLowerCase().includes(searchLocation.toLowerCase()));
    }

    // Sort by price or rating
    if (sortBy === 'high-price') {
      tempGuesthouses.toSorted((a, b) => b.price - a.price);
    } else if (sortBy === 'low-price') {
      tempGuesthouses.toSorted((a, b) => a.price - b.price);
    } else if (sortBy === 'high-rating') {
      tempGuesthouses.toSorted((a, b) => b.ratings - a.ratings);
    }

    setFilteredGuestHouses(tempGuesthouses);
  }, [searchLocation, sortBy, guesthouses]);

  const navigate = useNavigate();

  function goHome() {
    navigate('/')
  }
  return (

    <>
      <nav >
        <FontAwesomeIcon icon={faHome} size='2x' className='ghl--home-icon' onClick={goHome} />

        <ul>
          <li>Sign In</li>
          <li>Sign Up</li>
          <li>About</li>
          <li>Contact Us</li>
        </ul>
      </nav>

      <div className='ghl--container'>
        <h2 className='ghl--heading'>Guest Houses</h2>

        {/* searchbar */}
        <div className='search-bar-container'>
          <div className='search-bar'>
            <input
              type="text"
              name="searchLocation"
              placeholder="Search Guesthouses"
              className="search-input"
              value={searchLocation}
              onChange={(text) => {
                setSearchLocation(text.target.value)
              }}
            />
          </div>
          <select
            name="sort"
            id="sort"
            onChange={(value) => setSortBy(value.target.value)}
            value={sortBy}
            className='sort-dropdown'
          >
            <option value="default">Sort by</option>
            <option value="low-price">Price: Low to High</option>
            <option value="high-price">Price: High to Low</option>
            <option value="high-rating">Rating: High to Low</option>
          </select>
        </div>

        <Container>
          <div className='ghl--houses'>

            {guesthouses.length == 0 && <Spinner style={{ width: "5rem", height: "5rem", fontSize: "10px", alignSelf: "center", color: "#004c6f" }} />}

            {filteredGuestHouses.size != 0 && filteredGuestHouses.map((house) => {
              return (
                // <Link to={`/guesthouse/${house.id}`}>
                // <Card onclick={() => navigate(`/guesthouse/${house.id}`)} style={{cursor:"pointer"}}>
                <GuestHouseTile key={house.id}
                  id={house.id}
                  img={house.display_picture}
                  name={house.gName}
                  price={house.price}
                  rating={house.ratings}
                  location={house.location}
                  description={house.brief}
                />
                // </Card>
                // </Link>
              )
            })}
            {filteredGuestHouses.length == 0 && guesthouses.length != 0
            && <Alert variant='info' style={{ width: "30%", textAlign: "center", alignSelf: 'center' }}>No Guest Houses Found</Alert>}
          </div>
        </Container>

      </div>
    </>


  )
}

export default GuestHousesList