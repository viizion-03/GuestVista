import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import GuestHouseTile from '../components/GuestHouseTile';
import "./GuestHousesList.css"
import { h1 } from 'fontawesome';


const GuestHousesList = () => {


  const [guesthouses, setGuesthouses] = useState([]);
  const [filteredGuestHouses, setFilteredGuestHouses] = useState([]);
  const [searchLocation, setSearchLocation] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    setLoading(true)
    fetch("https://guestvista-4308f-default-rtdb.firebaseio.com/addGuesthouses.json")
      .then((res) => res.json())
      .then((data) => {
        const loadedGuesthouses = [];

        for (const key in data) {
          loadedGuesthouses.push({
            id: key,
            ...data[key],
          });
        }

        setGuesthouses(loadedGuesthouses);
        setLoading(false)
      })
      .catch((err) => console.log(err))
      .finally(() => {setLoading(false)})
  }, []);


  useEffect(() => {
    let tempGuesthouses = [...guesthouses];
    // Filter by name
    if (searchLocation) {
      tempGuesthouses = tempGuesthouses.filter((guestHouse) => guestHouse.location.toLowerCase().includes(searchLocation.toLowerCase()));
    }

    // Sort by price or rating
    if (sortBy === 'high-price') {
      tempGuesthouses.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'low-price') {
      tempGuesthouses.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'high-rating') {
      tempGuesthouses.sort((a, b) => b.ratings - a.ratings);
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
        <h3 className='ghl--heading'>Guest Houses</h3>

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

        <div className='ghl--houses'>

          {filteredGuestHouses.size != 0 &&filteredGuestHouses.map((house) => {
            return (
              <GuestHouseTile
                img={house.photos[0].src}
                name={house.gName}
                price={house.price}
                rating={house.ratings}
                location={house.location}
                description={house.description}
              />
            )
          })}        

        </div>
      </div>
    </>


  )
}

export default GuestHousesList