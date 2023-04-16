import { faEdit, faEnvelope, faMoneyBillAlt } from '@fortawesome/free-regular-svg-icons'
import { faBed, faBeer, faCamera, faContactBook, faEarthAfrica, faInfoCircle, faMapLocation, faMapMarker, faStreetView, faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useRef } from 'react'


const GuestHouseData = () => {

  // Refs to open corresponding file upload choosers
  const displayRef = useRef(null);
  const logoRef = useRef(null);
  const galleryRef = useRef(null);

  // Arrays to store data to be sent over
  const [amenity, setAmenity] = useState("")
  const [amenitiesArray, setAmenitiesArray] = useState([]);
  const [roomAmenitiesArray, setRoomAmenitiesArray] = useState([]);
  const [guestHouse, setGuestHouse] = useState(
    {
      name: "",
      email: "",
      contact: "",
      website: "",
      location: "",
      price: "",
      physical_address: "",
      coordinates: {
        latitude: "",
        longitude: ""
      },
      description: "",
      logo: "",
      display_picture: "",
      amenities: [],
      images: [],
      packages: [
        {
          package_name: "",
          beds_available: "",
          price: "",
          room_amenities: []
        }
      ]
    }
  );

  function handleSubmit(e) {
    e.preventDefault();
    //consolidate all arrays and objects here
  }

  function handleChange(event) {

    const { name, value } = event.target;
    setGuestHouse(prevData => {
      return (
        {
          ...prevData,
          [name]: value
        }
      )
    })

    console.log(guestHouse)
  }

  const addAmenity = () => {

    if (amenity !== "") {
      setAmenitiesArray(prevArray => {
        for (let i = 0; i < prevArray.length; i++) {
          if (amenity === prevArray[i])
            return prevArray
        }
        return prevArray.concat(amenity)
      })
    }
  }

  function addRoomAmentity(event) {
    let selected = event.target.value;
    setRoomAmenitiesArray(prevArray => {
      for (let i = 0; i < prevArray.length; i++) {
        if (prevArray[i] === selected) {
          return prevArray;
        }
      }
      if (selected !== "") {
        return prevArray.concat(selected);
      } else
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

        <form onSubmit={handleSubmit}>


          <div className='ghd--details'>

            <section className='text-fields'>
              <div className='details--col1'>
                <div className='input--fields'>
                  <FontAwesomeIcon icon={faBed} className='icon' />
                  <input
                    name="name"
                    onChange={handleChange}
                    type="text"
                    placeholder='Name'
                    value={guestHouse.name}
                  />
                </div>

                <div className='input--fields'>
                  <FontAwesomeIcon icon={faEnvelope} className='icon' />
                  <input
                    name="email"
                    onChange={handleChange}
                    type="text"
                    placeholder='Email'
                    value={guestHouse.email}
                  />
                </div>

                <div className='input--fields'>
                  <FontAwesomeIcon icon={faMapMarker} className='icon' />
                  <input
                    name="location"
                    onChange={handleChange}
                    type="text"
                    placeholder='Location'
                    value={guestHouse.location}
                  />
                </div>

                <div className='input--fields'>
                  <FontAwesomeIcon icon={faStreetView} className='icon' />
                  <input
                    name="physical_address"
                    onChange={handleChange}
                    type="text"
                    placeholder='Physical Address'
                    value={guestHouse.physical_address}
                  />
                </div>

                <div className='input--fields'>
                  <FontAwesomeIcon icon={faMapLocation} className='icon' />
                  <input
                    name="coordinates"
                    onChange={handleChange}
                    type="text"
                    placeholder='Co-ordinates'
                    value={guestHouse.coordinates}
                  />
                </div>

                <div className='input--fields'>
                  <FontAwesomeIcon icon={faInfoCircle} className='icon' />
                  <input
                    name="description"
                    onChange={handleChange}
                    type="text"
                    placeholder='Description'
                    value={guestHouse.description}
                  />
                </div>


              </div>
              <div className='details--col2'>
                <div className='input--fields'>
                  <FontAwesomeIcon icon={faContactBook} className='icon' />
                  <input
                    name=""
                    onChange={handleChange}
                    type="text"
                    placeholder='Contact'
                    value={guestHouse.contact}
                  />
                </div>

                <div className='input--fields'>
                  <FontAwesomeIcon icon={faEarthAfrica} className='icon' />
                  <input
                    name=""
                    onChange={handleChange}
                    type="text"
                    placeholder='Website'
                    value={guestHouse.website}
                  />
                </div>

                <div className='input--fields'>
                  <FontAwesomeIcon icon={faMoneyBillAlt} className='icon' />
                  <input
                    name=""
                    onChange={handleChange}
                    type="text"
                    placeholder='Cheapest price/night (P)'
                    value={guestHouse.price}
                  />
                </div>

                <div className='input--fields'>

                  {/* <input type="text" placeholder='Amenities' /> */}
                  <label htmlFor="amenity">
                    <FontAwesomeIcon icon={faBeer} />
                    Amenities Available</label>

                  <select id='amenity'
                    name='amenity'
                    value={amenity}
                    onChange={(e) => setAmenity(e.target.value)}
                  >
                    <option value="">Add an amenity</option>
                    <option value={"Free Wi-Fi"}>Free Wi-Fi</option>
                    <option value={"Free Parking"}>Free Parking</option>
                    <option value={"In-house Restaurant"}>In-house Restaurant</option>
                    <option value={"Bar Lounge"}>Bar Lounge</option>
                    <option value={"Free Gym"}>Free Gym</option>
                    <option value={"In-room Coffe & Tea"}>In-room Coffe & Tea</option>
                    <option value={"In-room Television"}>In-room Television</option>
                  </select>
                  <button onClick={addAmenity}>Add</button>
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

        </form>
      </div>
    </>
  )
}

export default GuestHouseData