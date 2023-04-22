import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import "./GuestHousesList.css"
import { useNavigate, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const GuestHouseDetails = () => {

  const navigate = useNavigate();
  const params = useParams()
  const { guesthouses } = useContext(AuthContext)
  let guestHouse = null

  guesthouses.forEach(element => {
    if (element.id == params.id) {
      guestHouse = element
      return
    }
  });

  function goHome() {
    navigate('/')
  }


  return (
    <div>
      <nav >
        <FontAwesomeIcon icon={faHome} size='2x' className='ghl--home-icon' onClick={goHome} />

        <ul>
          <li>Sign In</li>
          <li>Sign Up</li>
          <li>About</li>
          <li>Contact Us</li>
        </ul>
      </nav>
      {guestHouse != null &&
        <div className='ghd--container'>

          <h3 className='ghd--name'>{guestHouse.gName}</h3>
          <section>
            <div className='ghd--photos-grid'>
              <div className='photo-grid-col1'>

                <img src={guestHouse.photos[0].src} />
                <img src={guestHouse.photos[1].src} />
                <img src={guestHouse.photos[2].src} />
              </div>

              <div className='photo-grid-col2'>

                <img src={guestHouse.photos[3].src} />
                {/* <img src={guestHouse.photos[4].src} /> */}
                {/* <img src={guestHouse.photos[5].src} /> */}
                {/* <img src={guestHouse.photos[6].src} /> */}
              </div>
            </div>
            <div className='ghd--amenities'>
              <h3>
                Amenities Available
              </h3>
              <ul>
                {guestHouse.amenities.map(item => {
                  return (<li>{item}</li>)
                })}
              </ul>
            </div>
            <div className='ghd--description'>
              <h4>Description</h4>
              <p>{guestHouse.description}</p>
            </div>


          </section>

          <section className='ghd--packages'>
            <h4>Rooms Available</h4>

            <div className='ghd--table-container'>
              <table>
                <thead>
                  <td>Types of Rooms</td>
                  <td>Price per night</td>
                  <td>Room Amenities</td>
                </thead>
                <tbody>
                  {guestHouse.packages.map(item => {
                    return (
                      <tr>
                        <td>
                          <h4>{item.package_name}</h4>
                          <h5>{item.beds_available}</h5>
                        </td>
                        <td>
                          <h4>{item.price}</h4>
                        </td>
                        <td>
                          <ul>
                            {item.room_amenities.map(amenity =>{
                              return(<li>{amenity}</li>)
                            })}
                          </ul>
                        </td>
                      </tr>
                    )
                  })}

                </tbody>
              </table>
            </div>

          </section>

          <section className='ghd--reviews-section'>
            <h3>Guest Reviews</h3>
            <div className='ghd--reviews'>

              <div className='ghd--review-card'>
                <span className='review-card-name'>
                  <FontAwesomeIcon icon={faUser} />
                  <h4>Thato Sebape</h4>
                </span>
                <p>
                  "Very nice hotel with really good food"
                </p>
              </div>

              <div className='ghd--review-card'>
                <span className='review-card-name'>
                  <FontAwesomeIcon icon={faUser} />
                  <h4>Jose Morinuo</h4>
                </span>
                <p>
                  "Very nice hotel with really good food"
                </p>
              </div>

              <div className='ghd--review-card'>
                <span className='review-card-name'>
                  <FontAwesomeIcon icon={faUser} />
                  <h4>Samoxa</h4>
                </span>
                <p>
                  "The Bar is top class"
                </p>
              </div>


            </div>
            <button className='ghd--more-reviews-btn'>Read all Reviews</button>
          </section>
        </div>}
    </div>
  )
}

export default GuestHouseDetails