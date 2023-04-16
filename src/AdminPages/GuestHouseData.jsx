import { faEdit, faEnvelope, faMoneyBillAlt } from '@fortawesome/free-regular-svg-icons'
import { faBed,  faBeer, faCamera, faContactBook, faEarthAfrica, faInfoCircle,  faMapLocation, faMapMarker, faStreetView, faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useRef } from 'react'


const GuestHouseData = () => {

  // Refs to open corresponding file upload choosers
  const displayRef = useRef(null);
  const logoRef = useRef(null);
  const galleryRef = useRef(null);

  // Arrays to store data to be sent over
  const [amenitiesArray,setAmenitiesArray] = useState([]);
  const [roomAmenitiesArray,setRoomAmenitiesArray] = useState([]);
  const [guestHouse, setGuestHouse] = useState(null);

  function handleSubmit(event){
    
  }


  function addAmenity(event){

    let selected = event.target.value;    

    console.log("before adding")
    console.log(amenitiesArray)
    setAmenitiesArray( prevArray => {
      for(let i = 0; i < prevArray.length ; i++){
        if(prevArray[i] === selected){
          return prevArray;
        }
      }
      if(selected !== ""){
        return prevArray.concat(selected);
      }else
        return prevArray
    })

    console.log("after adding")
    console.log(amenitiesArray)
  }

  function addRoomAmentity(event){
    let selected = event.target.value;    
    setRoomAmenitiesArray( prevArray => {
      for(let i = 0; i < prevArray.length ; i++){
        if(prevArray[i] === selected){
          return prevArray;
        }
      }
      if(selected !== ""){
        return prevArray.concat(selected);
      }else
        return prevArray
    })
  }

  


  function loadFile(type) {
    if (type === "display") {
      displayRef.current.click()
      console.log("display clicked")
    }

    if (type === "gallery") {
      galleryRef.current.click()
      console.log("gallery clicked")
    }

    if (type === "logo") {
      logoRef.current.click()
      console.log("logo clicked")
    }
  }


  return (

    <>
      <h1 className='admin--header'>Guest House Details</h1>
      <div className='admin--ghd-content'>

        <div className='ghd--details'>

          <section className='text-fields'>
            <div className='details--col1'>
              <div className='input--fields'>
                <FontAwesomeIcon icon={faBed} className='icon' />
                <input type="text" placeholder='Name' />
              </div>

              <div className='input--fields'>
                <FontAwesomeIcon icon={faEnvelope} className='icon' />
                <input type="text" placeholder='Email' />
              </div>

              <div className='input--fields'>
                <FontAwesomeIcon icon={faMapMarker} className='icon' />
                <input type="text" placeholder='Location' />
              </div>

              <div className='input--fields'>
                <FontAwesomeIcon icon={faStreetView} className='icon' />
                <input type="text" placeholder='Physical Address' />
              </div>

              <div className='input--fields'>
                <FontAwesomeIcon icon={faMapLocation} className='icon' />
                <input type="text" placeholder='Co-ordinates' />
              </div>

              <div className='input--fields'>
                <FontAwesomeIcon icon={faInfoCircle} className='icon' />
                <input type="text" placeholder='Description' />
              </div>


            </div>
            <div className='details--col2'>
              <div className='input--fields'>
                <FontAwesomeIcon icon={faContactBook} className='icon' />
                <input type="text" placeholder='Contact' />
              </div>

              <div className='input--fields'>
                <FontAwesomeIcon icon={faEarthAfrica} className='icon' />
                <input type="text" placeholder='Website' />
              </div>

              <div className='input--fields'>
                <FontAwesomeIcon icon={faMoneyBillAlt} className='icon' />
                <input type="text" placeholder='Cheapest price/night (P)' />
              </div>

              <div className='input--fields'>

                {/* <input type="text" placeholder='Amenities' /> */}
                <label htmlFor="">
                  <FontAwesomeIcon icon={faBeer} />
                  Amenities Available</label>

                <select id='amenities' name='amenities' onChange={ event => addAmenity(event)}>
                  <option value="">Add an amenity</option>
                  <option value={"Free Wi-Fi"}>Free Wi-Fi</option>
                  <option value={"Free Parking"}>Free Parking</option>
                  <option value={"In-house Restaurant"}>In-house Restaurant</option>
                  <option value={"Bar Lounge"}>Bar Lounge</option>
                  <option value={"Free Gym"}>Free Gym</option>
                  <option value={"In-room Coffe & Tea"}>In-room Coffe & Tea</option>
                  <option value={"In-room Television"}>In-room Television</option>
                </select>
              </div>

            </div>
          </section>


          <section className='packages'>
            <label htmlFor="packageName">Package Name</label>
            <input type="text" />

            <label htmlFor="beds">Beds Included</label>
            <input type="text" />

            <label htmlFor="packagePrice">Price (BWP)</label>
            <input type="text" />

            <label htmlFor="roomAmenities">Room Amenities</label>

            <select id='roomAmenities' name='amenities' onChange={event => addRoomAmentity(event)}>
              <option value="">Add an amenity</option>
              <option value="Free toiletries">Free toiletries</option>
              <option value="Fridge">Fridge</option>
              <option value="Shower">Shower</option>
              <option value="In-room Coffe & Tea">In-room Coffe & Tea</option>
              <option value="Towels">Towels</option>
              <option value="Snacks">Snacks</option>
              <option value="Television">Television</option>
              <option value="Iron">Iron</option>
              <option value="Self care tools">Self-care tools</option>
            </select>
          </section>

        </div>

        <div className='ghd--gallery'>

          <div className='gallery--image-container'>
            <img src="/icons/house.png" alt="logo" />
            <FontAwesomeIcon icon={faCamera} onClick={event => loadFile("logo")} className='change--logo' />
            <input type="file" ref={logoRef} className='file-chooser' />
          </div>

          <h4>
            Change display picture
            <FontAwesomeIcon icon={faEdit} onClick={event => loadFile("display")} />
            <input type="file" ref={displayRef} className='file-chooser' />
          </h4>

          <button onClick={event => loadFile("gallery")}>
            <h4> Upload Guest House Images</h4>
            <FontAwesomeIcon icon={faUpload} />
          </button>

          <input type="file" ref={galleryRef} className='file-chooser' />
          <div className='previews'>

          </div>

        </div>
      </div>
    </>
  )
}

export default GuestHouseData