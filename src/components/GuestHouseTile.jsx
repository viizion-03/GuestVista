import React from 'react'

import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faMapMarker } from '@fortawesome/free-solid-svg-icons';

const GuestHouseTile = (props) => {

  const navigate = useNavigate()

  function seeGuestHouses() {
    navigate('/guesthouse')
  }

  return (
    <div className='ghl--house-card'>
      <div className='house-card-image'>
        <img src={props.img} alt='guesthouse' />
      </div>

      <div className='house-card-details'>
        <span className='house-card-header'>
          <h4>{props.name}</h4>
          <h3>P{props.price}</h3>
        </span>

        <div className='house-card-rating'>
          {<FontAwesomeIcon icon={faStar} color='#FFD700' />}
          {<FontAwesomeIcon icon={faStar} color='#FFD700' />}
          {<FontAwesomeIcon icon={faStar} color='#FFD700' />}
          {<FontAwesomeIcon icon={faStar} color='#FFD700' />}
          {<FontAwesomeIcon icon={faStar} color='#FFD700' />}
          <h4>{props.rating}</h4>
        </div>

        <span className='house-card-distance'>
          <FontAwesomeIcon icon={faMapMarker} />
          <h4>{props.distance} </h4>
        </span>

        <p className='house-card-description'>
          {props.description}
        </p>

        <button className='ghl--view-house-btn' onClick={seeGuestHouses}>View Details</button>
      </div>
    </div>
  )
}

export default GuestHouseTile