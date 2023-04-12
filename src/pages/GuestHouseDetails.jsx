import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import "./GuestHousesList.css"
import { useNavigate } from 'react-router-dom';

const GuestHouseDetails = () => {

  const navigate = useNavigate();

  function goHome(){
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

      <div className='ghd--container'>

        <h3 className='ghd--name'>Apical Guest House</h3>
        <section>
          <div className='ghd--photos-grid'>
            <div className='photo-grid-col1'>

              <img src='./images/guest_house_name/img3.jpg' />
              <img src='./images/guest_house_name/img1.jpg' />
              <img src='./images/guest_house_name/img2.jpg' />
            </div>

            <div className='photo-grid-col2'>

              <img src='./images/guest_house_name/img7.jpg' />
              <img src='./images/guest_house_name/img6.jpg' />
              <img src='./images/guest_house_name/img5.jpg' />
              <img src='./images/guest_house_name/img4.jpg' />
            </div>
          </div>
          <div className='ghd--amenities'>
            <h3>
              Amenities Available
            </h3>
            <ul>
              <li>Swimming Pool</li>
              <li>Bar & Restaurant</li>
              <li>Wifi</li>
              <li>Television</li>
              <li>Spa salon</li>
            </ul>
          </div>
          <div className='ghd--description'>
            <h4>Description</h4>
            <p>The guest house located in Lobatse offers a variety of room types, including standard rooms, deluxe rooms,
              and suites. It features a well-maintained garden and outdoor pool area, a restaurant serving local and
              international dishes, and a fully equipped conference room. Other amenities include complimentary Wi-Fi,
              24-hour security, laundry services, free parking, and airport transfers. It is conveniently located near
              major attractions in Lobatse such as the Lobatse Border Post and Lobatse Clay Pots.</p>
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
                <tr>
                  <td>
                    <h5>Kings of Rooms</h5>
                    <p>1 extra-large double bed</p>
                  </td>
                  <td>
                    <h5>BWP 550</h5>
                    <p>tax & vat included</p>
                  </td>
                  <td>
                    <ul>
                      <li>Free toiletries</li>
                      <li>Shower</li>
                      <li>Towels</li>
                      <li>Refridgerator</li>
                      <li>Television</li>
                    </ul>
                  </td>
                </tr>

                <tr>
                  <td>
                    <h5>Twin Room</h5>
                    <p>2 single beds</p>
                  </td>
                  <td>
                    <h5>BWP 450</h5>
                    <p>tax & vat included</p>
                  </td>
                  <td>
                    <ul>
                      <li>Free toiletries</li>
                      <li>Shower</li>
                      <li>Towels</li>
                      <li>Refridgerator</li>
                      <li>Television</li>
                    </ul>
                  </td>
                </tr>



                <tr>
                  <td>
                    <h5>Queen Room</h5>
                    <p>1 large bed</p>
                  </td>
                  <td>
                    <h5>BWP 500</h5>
                    <p>tax & vat included</p>
                  </td>
                  <td>
                    <ul>
                      <li>Free toiletries</li>
                      <li>Shower</li>
                      <li>Towels</li>
                      <li>Refridgerator</li>
                      <li>Television</li>
                    </ul>
                  </td>
                </tr>

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
      </div>
    </div>
  )
}

export default GuestHouseDetails