import React from 'react'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faMagic } from '@fortawesome/free-solid-svg-icons';
import GuestHouseTile from '../components/GuestHouseTile';
import "./GuestHousesList.css"


const GuestHousesList = () => {

  
  const navigate = useNavigate();

  function goHome(){
    navigate('/')
  }
  return (

    <>
      <nav >
        <FontAwesomeIcon icon={faHome} size='2x' className='ghl--home-icon' onClick={goHome}/>

        <ul>
          <li>Sign In</li>
          <li>Sign Up</li>
          <li>About</li>
          <li>Contact Us</li>
        </ul>
      </nav>

 

      <div className='ghl--container'>
      <h3 className='ghl--heading'>Guest Houses</h3>
        {/* Decoration Grid */}
        <div className='ghl--photos-grid'>

          <div className='ghl--photo-grid-col'>
            <img src="/images/img1.jpg" alt="guesthouse" />
            <img src="./images/img2.jpg" alt="guesthouse" />
          </div>

          <div className='ghl--photo-grid-col'>
            <img src="./images/img3.jpg" alt="guesthouse" />
            <img src="./images/img4.jpg" alt="guesthouse" />
          </div>
        </div>

        {/* Displayin list of guest houses */}

        <div className='ghl--houses'>
          <GuestHouseTile
            img="./images/img3.jpg"
            name="Apical Guesthoue"
            price="500"
            rating="5.0"
            distance="3.8"
            description="Welcome to our guest house located just3.8 km away from the bustling city center. Our charming guest house offers a peaceful and comfortable retreat for travelers seeking a quiet getaway. "

          />
          <GuestHouseTile
            img="./images/img4.jpg"
            name="Apical Guesthoue"
            price="500"
            rating="5.0"
            distance="3.8"
            description="Welcome to our guest house located just3.8 km away from the bustling city center. Our charming guest house offers a peaceful and comfortable retreat for travelers seeking a quiet getaway. "

          />
          <GuestHouseTile
            img="./images/img2.jpg"
            name="Apical Guesthoue"
            price="500"
            rating="5.0"
            distance="3.8"
            description="Welcome to our guest house located just3.8 km away from the bustling city center. Our charming guest house offers a peaceful and comfortable retreat for travelers seeking a quiet getaway. "

          />
          <GuestHouseTile
            img="./images/img1.jpg"
            name="Apical Guesthoue"
            price="500"
            rating="5.0"
            distance="3.8"
            description="Welcome to our guest house located just3.8 km away from the bustling city center. Our charming guest house offers a peaceful and comfortable retreat for travelers seeking a quiet getaway. "

          />

        </div>
      </div>
    </>


  )
}

export default GuestHousesList