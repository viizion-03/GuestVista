import { library } from '@fortawesome/fontawesome-svg-core'
import { faEdit, faEnvelope, faMoneyBillAlt, faStar } from '@fortawesome/free-regular-svg-icons'
import { faBed, faBeer, faCamera, faContactBook, faEarthAfrica, faInfoCircle, faMapLocation, faMapMarker, faStreetView, faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useRef } from 'react'
import { useEffect } from 'react'
import { storage } from "../config/firebase"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"


const GuestHouseData = () => {

  // Refs to open corresponding file upload choosers
  const displayRef = useRef(null);
  const logoRef = useRef(null);
  const galleryRef = useRef(null);

  //image refs
  const [logoUrl, setLogoUrl] = useState(null);
  const [displayUrl, setDisplayUrl] = useState(null);
  const [previewImages, setPreviewImages] = useState([])
  const [imageUrls, setImageUrls] = useState([])

  // Arrays to store data to be sent over
  const [logoImg, setLogoImg] = useState(null);
  const [displayImg, setDispalyImg] = useState(null)
  const [images, setImages] = useState([])
  const [styles, setStyles] = useState(null)
  const [amenity, setAmenity] = useState("")
  const [roomAmenity, setRoomAmenity] = useState("")
  const [amenitiesArray, setAmenitiesArray] = useState([]);
  const [roomAmenitiesArray, setRoomAmenitiesArray] = useState([]);

  const [pricePackage, setPricePackage] = useState(
    {
      package_name: "",
      beds_available: "",
      price: "",
      room_amenities: []
    }
  )

  const [packagesArray, setPackagesArray] = useState([])

  const [guestHouse, setGuestHouse] = useState(
    {
      gName: "",
      email: "",
      contacts: "",
      website: "",
      location: "",
      price: "",
      physical_address: "",
      // coordinates: {
      //   latitude: "",
      //   longitude: ""
      // },
      ratings: "",
      coordinates: "",
      description: "",
      logo: "",
      display_picture: "",
      amenities: [],
      photos: [],
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

  const PostData = async (e) => {
    e.preventDefault();

    const {
      gName, email, contacts, website, location, price, physical_address, photos,
      ratings, coordinates, description, logo, display_picture, amenities, packages } = guestHouse


    const res = await fetch('https://guestvista-4308f-default-rtdb.firebaseio.com/addGuesthouses.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        gName, email, contacts, website, location, price, physical_address, photos,
        ratings, coordinates, description, logo, display_picture, amenities, packages
      })
    });
  };

  function handleSubmit(e) {
    e.preventDefault();


    PostData(e);
    alert("Data sent to the Database")
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


  function handlePackageChange(event) {
    const { name, value } = event.target;

    setPricePackage(prevData => {
      return (
        {
          ...prevData,
          [name]: value
        }
      )
    })
  }

  const addAmenity = () => {

    if (amenity !== "") {
      setAmenitiesArray(prevArray => {
        for (let i = 0; i < prevArray.length; i++) {
          if (amenity === prevArray[i])
            return prevArray
        }
        setGuestHouse(prevData => { return ({ ...prevData, amenities: prevData.amenities.concat(amenity) }) })
        return prevArray.concat(amenity)
      })
    }
  }

  function addRoomAmentity() {
    if (roomAmenity !== "") {
      setRoomAmenitiesArray(prevArray => {
        for (let i = 0; i < prevArray.length; i++) {
          if (roomAmenity === prevArray[i])
            return prevArray
        }
        return prevArray.concat(roomAmenity)
      })
    }
  }

  const removeAmenity = (item) => {
    setAmenitiesArray(prevArray => {
      prevArray.splice(prevArray.indexOf(item, 1))
      setAmenity("")
      return prevArray
    })
  }

  const removeRoomAmenity = (item) => {
    setRoomAmenitiesArray(prevArray => {
      prevArray.splice(prevArray.indexOf(item, 1))
      setRoomAmenity("")
      return prevArray
    })
  }
  useEffect(() => {
    setPricePackage(prevData => {
      return ({ ...prevData, room_amenities: roomAmenitiesArray })
    })
  }, [roomAmenitiesArray]);

  const addPackage = () => {

    setPricePackage(prevData => {
      return (
        {
          ...prevData,
          room_amenities: roomAmenitiesArray
        }
      )
    })

    setGuestHouse(prevData => {
      return ({ ...prevData, packages: prevData.packages.concat(pricePackage) })
    })

    setPackagesArray(prevArray => {
      return prevArray.concat(pricePackage)
    })

    setPricePackage(
      {
        package_name: "",
        beds_available: "",
        price: "",
        room_amenities: []
      }
    )
    setRoomAmenitiesArray([])
  }

  const handleFileInputChange = (event) => {
    const files = event.target.files;
    const updatedPhotos = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = (event) => {
        updatedPhotos.push({ file: file, src: event.target.result });
        if (updatedPhotos.length === files.length) {
          setGuestHouse((prevState) => ({
            ...prevState,
            photos: [...prevState.photos, ...updatedPhotos]
          }));
        }
      };

      reader.readAsDataURL(file);
    }
  };


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

  function uploadImage(e, type) {
    if (e.target.files[0]) {

      if (type === "logo")
        setLogoImg(e.target.files[0])


      if (type === "display")
        setDispalyImg(e.target.files[0])

      if (type === "images") {
        // const arr = Array.of(e.target.files[0])
        // setImages(arr)


        handleFileInputChange(e)
      }
    }

  }

  //listen for image additions

  // useEffect(() => {
  //   const imagesRef = ref(storage, `guesthouses/${guestHouse.gName}/images`)

  //   images.map((img) => {
  //     const imgRef = ref(imagesRef, img.name)

  //     uploadBytes(imgRef, img)
  //       .then(() => {
  //         getDownloadURL(imgRef)
  //           .then((url) => {
  //             setImageUrls(prev => prev.concat(url))
  //             console.log("url set")
  //           })
  //       })
  //   })
  //   console.log("looped")
  // }, [images])


  // listens for logo image changes
  useEffect(() => {
    const logoRef = ref(storage, `guesthouses/${guestHouse.gName}/logo`)
    uploadBytes(logoRef, logoImg)
      .then((snapshot) => {
        getDownloadURL(logoRef)
          .then((url) => {
            setLogoUrl(url)
            setGuestHouse(prevData => {
              return ({ ...prevData, logo: url })
            })

          })
          .catch((error) => {
            console.log(error)
          })
      }).catch((error) => {
        console.log(error)
      })

  }, [logoImg])

  //listens for display picture changes
  useEffect(() => {
    const displayRef = ref(storage, `guesthouses/${guestHouse.gName}/display`)
    uploadBytes(displayRef, displayImg)
      .then((snapshot) => {
        getDownloadURL(displayRef)
          .then((url) => {
            setDisplayUrl(url)
            setStyles({ backgroundImage: `url(${displayUrl})` })
            setGuestHouse(prevData => {
              return ({ ...prevData, display_picture: url })
            })
          })
          .catch((error) => {
            console.log(error)
          })
      }).catch((error) => {
        console.log(error)
      })


  }, [displayImg])

  return (

    <>
      <h1 className='admin--header'>Guest House Details</h1>


      <form onSubmit={handleSubmit} >
        <div className='admin--ghd-content'>

          <button type="submit">submit form</button>


          <div className='ghd--details'>

            <section className='text-fields'>
              <div className='details--col1'>
                <div className='input--fields'>
                  <FontAwesomeIcon icon={faBed} className='icon' />
                  <input
                    name="gName"
                    onChange={handleChange}
                    type="text"
                    placeholder='Name'
                    value={guestHouse.gName}
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
                    name="contacts"
                    onChange={handleChange}
                    type="text"
                    placeholder='Contact'
                    value={guestHouse.contacts}
                  />
                </div>

                <div className='input--fields'>
                  <FontAwesomeIcon icon={faEarthAfrica} className='icon' />
                  <input
                    name="website"
                    onChange={handleChange}
                    type="text"
                    placeholder='Website'
                    value={guestHouse.website}
                  />
                </div>

                <div className='input--fields'>
                  <FontAwesomeIcon icon={faMoneyBillAlt} className='icon' />
                  <input
                    name="price"
                    onChange={handleChange}
                    type="text"
                    placeholder='Cheapest price/night (P)'
                    value={guestHouse.price}
                  />
                </div>

                <div className='input--fields'>
                  <FontAwesomeIcon icon={faStar} className='icon' />
                  <input
                    name="ratings"
                    onChange={handleChange}
                    type="text"
                    placeholder='Rating'
                    value={guestHouse.ratings}
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
                  <button type="button" onClick={addAmenity}>Add</button>

                  <div className='amenities--preview'>
                    {amenitiesArray.map(item => {
                      return (
                        <p
                          key={item}
                          value={amenitiesArray[amenitiesArray.indexOf(item)]}
                          onClick={() => removeAmenity(item)}>{item}
                        </p>
                      )
                    })}
                  </div>
                </div>

              </div>
            </section>


            <section className='packages'>
              <label htmlFor="packageName">Package Name</label>
              <input
                type="text"
                id='packageName'
                name='package_name'
                value={pricePackage.package_name}
                onChange={handlePackageChange}
              />

              <label htmlFor="beds">Beds Included</label>
              <input
                type="text"
                id="beds"
                name="beds_available"
                value={pricePackage.beds_available}
                onChange={handlePackageChange}
              />
              <label htmlFor="packagePrice">Price (BWP)</label>
              <input
                type="text"
                id='packagePrice'
                name="price"
                value={pricePackage.price}
                onChange={handlePackageChange}
              />

              <label htmlFor="roomAmenities">Room Amenities</label>

              <select id='roomAmenities'
                name='roomAmenity'
                value={roomAmenity}
                onChange={event => setRoomAmenity(event.target.value)}
              >
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
              <button type="button" onClick={addRoomAmentity}>Add Room Amenity</button>

              <div className='packages--roomAmenities'>
                {roomAmenitiesArray.map(item => {
                  return (
                    <p
                      key={item}
                      value={roomAmenitiesArray[roomAmenitiesArray.indexOf(item)]}
                      onClick={() => removeRoomAmenity(item)}>{item}
                    </p>
                  )
                })}
              </div>

              <button type="button" onClick={addPackage}>Add Package</button>
              <div className='packages--preview'>
                {
                  packagesArray.map(item => {

                    return (
                      <div key={item.package_name}>
                        <h5>Package name:</h5>
                        <p>{item.package_name}</p>
                        <h5>Price:</h5>
                        <p>{item.price}</p>
                        <h5>Beds included</h5>
                        <p>{item.beds_available}</p>
                        <h5>Amenities included</h5>
                        <ul>
                          {item.room_amenities.map(itemName => {
                            let id = item.room_amenities.indexOf(itemName)
                            return (<li key={id}>{itemName}</li>)
                          })}
                        </ul>
                      </div>
                    )
                  })
                }

              </div>
            </section>

          </div>

          <div className='ghd--gallery'>

            <div
              className='gallery--image-container'
              style={styles}
            >
              <img src={logoUrl} alt="logo" />
              <FontAwesomeIcon icon={faCamera} onClick={event => loadFile("logo")} className='change--logo' />
              <input
                type="file"
                ref={logoRef}
                className='file-chooser'
                onChange={(e) => uploadImage(e, "logo")}
                accept='image/*'
              />
            </div>

            <h4>
              Change display picture
              <FontAwesomeIcon icon={faEdit} onClick={event => loadFile("display")} />
              <input
                type="file"
                ref={displayRef}
                className='file-chooser'
                onChange={(e) => uploadImage(e, "display")}
              />

            </h4>

            <button type="button" onClick={event => loadFile("gallery")}>
              <h4> Upload Guest House Images</h4>
              <FontAwesomeIcon icon={faUpload} />
            </button>

            <input
              type="file"
              ref={galleryRef}
              className='file-chooser'
              accept='image/*'
              onChange={(e) => uploadImage(e, "images")}
              multiple
            />
            <div className='previews'>
              {guestHouse.photos.map((photo) => (
                <div className='photo' key={photo.src}>
                  <img src={photo.src} alt='Guesthouse' />
                  <p>{photo.file.name}</p>
                </div>
              ))}
            </div>

          </div>

        </div>

      </form>
    </>
  )
}

export default GuestHouseData