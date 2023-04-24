import { faEdit, faEnvelope, faMoneyBillAlt, faStar } from '@fortawesome/free-regular-svg-icons'
import { faBed, faBeer, faCamera, faContactBook, faDeleteLeft, faEarthAfrica, faInfoCircle, faMapLocation, faMapMarker, faStreetView, faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useRef } from 'react'
import { useEffect } from 'react'
import { storage } from "../config/firebase"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import "../components/styles/GuestHouseForm.css"
import { Alert } from "react-bootstrap"
import { useParams } from 'react-router'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { getDatabase, set, ref as dbRef } from '@firebase/database'
import { useNavigate } from 'react-router'

const GuestHouseData = () => {
  const params = useParams();

  const { guesthouses, setGuesthouses } = useContext(AuthContext)
  const [updateView, setUpdateView] = useState(false)
  const navigate = useNavigate()
  const { refreshGHList } = useContext(AuthContext)

  // Refs to open corresponding file upload choosers
  const displayRef = useRef(null);
  const logoRef = useRef(null);
  const galleryRef = useRef(null);

  const [errorMsg, setErrorMsg] = useState("")
  const [checkStates, setCheckStates] = useState({
    wifi: false, parking: false, restaurant: false, restaurant: false,
    bar: false, gym: false, coffee: false, tv: false
  })

  const [packageCheckStates, setPackageCheckStates] = useState({
    toiletries: false, fridge: false, shower: false, coffee: false,
    towels: false, snacks: false, tv: false, iron: false, selfCare: false
  })

  //image refs
  const defaultLogoUrl = "https://imgv3.fotor.com/images/blog-cover-image/10-profile-picture-ideas-to-make-you-stand-out.jpg";
  const defaultDisplayUrl = "https://img.freepik.com/premium-photo/blur-image-modern-room-home_93675-120149.jpg"
  const [logoUrl, setLogoUrl] = useState(defaultLogoUrl);
  const [displayUrl, setDisplayUrl] = useState(defaultDisplayUrl);


  // Arrays to store data to be sent over
  const [displayImg, setDispalyImg] = useState(null)
  const [styles, setStyles] = useState(null)
  const [pricePackage, setPricePackage] = useState(
    { package_name: "", beds_available: "", price: "", room_amenities: [] }
  )


  const [guestHouse, setGuestHouse] = useState(
    {
      gName: "", email: "", contacts: "", website: "", location: "",
      price: "", physical_address: "", ratings: "", coordinates: "",
      description: "", logo: "", display_picture: "", brief: "", reviews: [],
      amenities: [], photos: [], packages: []
    }
  );

  useEffect(() => {
    guesthouses.forEach(element => {
      if (element.id == params.id) {
        setGuestHouse(prev => { return ({ ...prev, ...element }) })
        setUpdateView(true)
        console.log(element)
      }
    })
  }, [])

  const PostData = async (e) => {
    e.preventDefault();
    if (updateView) {
      const houseRef = dbRef(getDatabase(), `addGuesthouses/${guestHouse.id}`)
      set(houseRef, guestHouse).then(() => {
        alert("Guest House Updated")
        refreshGHList()
        navigate("/admin/guest-houses")
      })
    }
    else {
      const {
        gName, email, contacts, website, location, price, physical_address, photos, brief, reviews,
        ratings, coordinates, description, logo, display_picture, amenities, packages } = guestHouse

      // const res = await fetch('https://guestvista-4308f-default-rtdb.firebaseio.com/addGuesthouses.json', {
      const res = await fetch('https://react-project-5130e-default-rtdb.firebaseio.com/addGuesthouses.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          gName, email, contacts, website, location, price, physical_address, photos, brief, reviews,
          ratings, coordinates, description, logo, display_picture, amenities, packages
        })
      });
      if (res)
        alert("Data sent to the Database")
      // setGuesthouses(prevHouses => {return([...prevHouses, guestHouse])})  
      refreshGHList()
      navigate("/admin/guest-houses")
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    //check most validations here
    if (guestHouse.amenities.length == 0)
      alert("Select at least one Amenity")
    else if (guestHouse.display_picture == "")
      alert("Please Upload a display picture")
    else if (guestHouse.logo == "")
      alert("Please choose a guest house logo")
    else if (guestHouse.packages.length == 0)
      alert("Guest house should include at least 1 service Package")
    else if (checkImageCount())
      PostData(e);
  }


  function handleChange(event) {
    setErrorMsg("")
    const { name, value, checked, type, id } = event.target;
    if (type === "checkbox") {
      setCheckStates(prevStates => {
        return { ...prevStates, [id]: prevStates[id] ? false : true }
      })
      checked ? addAmenity(value) : removeAmenity(value)
    }

    setGuestHouse(prevData => {
      return ({ ...prevData, [name]: type === "checkbox" ? checked : value, })
    })
  }

  function checkImageCount() {
    if (guestHouse.photos.length <= 7) {
      setErrorMsg("Please upload 8 or more images")
      return false
    }
    else { return true }
  }


  function handlePackageChange(event) {
    const { name, value, type } = event.target;
    if (type === "checkbox") {
      const { id, value, checked } = event.target
      setPackageCheckStates(prevStates => {
        return { ...prevStates, [id]: prevStates[id] ? false : true }
      })
      checked ? addRoomAmentity(value) : removeRoomAmenity(value)

    }
    else {
      setPricePackage(prevData => {
        return ({ ...prevData, [name]: value })
      })
    }
  }


  const addAmenity = (amenity) => {
    setGuestHouse(prevData => {
      return ({ ...prevData, amenities: prevData.amenities.concat(amenity) })
    })
  }

  function addRoomAmentity(amenity) {
    setPricePackage(prevData => {
      return ({ ...prevData, room_amenities: prevData.room_amenities.concat(amenity) })
    })
  }

  const removeAmenity = (amenity) => {
    setGuestHouse(prevData => {
      return ({
        ...prevData,
        amenities: prevData.amenities.filter(item => item !== amenity)
      })
    })
  }

  const removeRoomAmenity = (amenity) => {
    setPricePackage(prevData => {
      return ({
        ...prevData,
        room_amenities: prevData.room_amenities.filter(item => item !== amenity)
      })
    })
  }

  const addPackage = () => {

    const { beds_available, package_name, price, packages, room_amenities } = pricePackage
    if (package_name === "" || beds_available === "" || price === "" || packageCheckStates.size === 0) {
      alert("All package fields must be filled")
      return
    }
    else if (room_amenities.length == 0) {
      alert("Select at lease one amenity for your packgage")
      return
    }
    else {
      setGuestHouse(prevData => {
        return ({ ...prevData, packages: prevData.packages.concat(pricePackage) })
      })
      setPricePackage({ package_name: "", beds_available: "", price: "", room_amenities: [] })
      setPackageCheckStates({
        toiletries: false, fridge: false, shower: false, coffee: false,
        towels: false, snacks: false, tv: false, iron: false, selfCare: false
      })
    }

  }

  // function removePhoto(src){
  //   guestHouse.photos.forEach(photo => {
  //     if(photo.src == src){
  //       const updatedImgs = guestHouse.photos.toSpliced(guestHouse.photos.indexOf(src), 1) 
  //       setGuestHouse(prevData => {
  //         return({...prevData, photos: updatedImgs})
  //       })
  //     }
  //   })
  // }

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
    if (type === "display")
      displayRef.current.click()

    if (type === "gallery")
      galleryRef.current.click()

    if (type === "logo")
      logoRef.current.click()
  }

  function uploadImage(e, type) {
    if (e.target.files[0]) {
      if (type === "logo") {
        const logoImage = e.target.files[0]
        const logoRef = ref(storage, `guesthouses/${guestHouse.gName}/logo`)
        uploadBytes(logoRef, logoImage).then((snapshot) => {
          getDownloadURL(logoRef).then((url) => {
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
      }
      // setLogoImg(e.target.files[0])

      if (type === "display") {
        const displayImage = e.target.files[0]
        const displayRef = ref(storage, `guesthouses/${guestHouse.gName}/display`)
        uploadBytes(displayRef, displayImage)
          .then((snapshot) => {
            getDownloadURL(displayRef)
              .then((url) => {
                // setDisplayUrl(url)
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


      }
      setDispalyImg(e.target.files[0])

      if (type === "images") {
        handleFileInputChange(e)
      }
    }

  }

  // //listens for display picture changes
  // useEffect(() => {
  //   const displayRef = ref(storage, `guesthouses/${guestHouse.gName}/display`)
  //   uploadBytes(displayRef, displayImg)
  //     .then((snapshot) => {
  //       getDownloadURL(displayRef)
  //         .then((url) => {
  //           setDisplayUrl(url)
  //           setStyles({ backgroundImage: `url(${displayUrl})` })
  //           setGuestHouse(prevData => {
  //             return ({ ...prevData, display_picture: url })
  //           })
  //         })
  //         .catch((error) => {
  //           console.log(error)
  //         })
  //     }).catch((error) => {
  //       console.log(error)
  //     })


  // }, [displayImg])

  return (

    <>
      <h1 className='admin--header'>Guest House Details</h1>


      <form onSubmit={handleSubmit} >
        <div className='admin--ghd-content'>
          <div className='ghd--details'>
            <h3 id='heading'>Important Details</h3>
            {errorMsg != "" && <Alert
              variant='danger'
              style={{ width: "45%", marginLeft: "auto", marginRight: "30px" }}
            >{errorMsg}
            </Alert>}
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
                    required
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
                    required
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
                    required
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
                    required
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
                    required
                  />
                </div>

                <div className='input--fields'>
                  <FontAwesomeIcon icon={faInfoCircle} className='icon' />
                  <input
                    name="brief"
                    onChange={handleChange}
                    type="text"
                    placeholder='Brief Summary'
                    value={guestHouse.brief}
                    required
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
                    required
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
                    required
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
                    required
                  />
                </div>

                <div className='input--fields'>
                  <FontAwesomeIcon icon={faMoneyBillAlt} className='icon' />
                  <input
                    name="price"
                    onChange={handleChange}
                    type="number"
                    placeholder='Cheapest price/night (P)'
                    value={guestHouse.price}
                    required
                  />
                </div>

                <div className='input--fields'>
                  <FontAwesomeIcon icon={faStar} className='icon' />
                  <input
                    name="ratings"
                    onChange={handleChange}
                    type="number"
                    placeholder='Rating'
                    value={guestHouse.ratings}
                    required
                  />
                </div>

              </div>
              <div className='input--fields'>

                <h4 htmlFor="amenity" id='sub-heading'>
                  <FontAwesomeIcon icon={faBeer} />
                  Amenities Available</h4>

                <div className='checkbox--amenities'>
                  <div className='checkbox--container'>
                    <label htmlFor='wifi'>Free Wi-Fi</label>
                    <input type="checkbox" onChange={handleChange}
                      value={"Free Wi-Fi"} checked={checkStates.wifi} id='wifi'
                    /> <br />
                  </div>
                  <div className='checkbox--container'>
                    <label htmlFor='parking'>Free Parking</label>
                    <input type="checkbox" onChange={handleChange}
                      value={"Free Parking"} id='parking' checked={checkStates.parking}
                    /> <br />
                  </div>
                  <div className='checkbox--container'>
                    <label htmlFor='restaurant'>In-house Restaurant</label>
                    <input type="checkbox" onChange={handleChange}
                      value={"In-house Restaurant"} id='restaurant' checked={checkStates.restaurant}
                    /> <br />
                  </div>
                  <div className='checkbox--container'>
                    <label htmlFor='bar'>Bar Lounge</label>
                    <input type="checkbox" onChange={handleChange}
                      value={"Bar Lounge"} id='bar' checked={checkStates.bar}
                    /> <br />
                  </div>
                  <div className='checkbox--container'>
                    <label htmlFor='gym'>Free Gym</label>
                    <input type="checkbox" onChange={handleChange}
                      value={"Free Gym"} id='gym' checked={checkStates.gym}
                    /> <br />
                  </div>
                  <div className='checkbox--container'>
                    <label htmlFor='coffee'>In-room Coffe & Tea</label>
                    <input type="checkbox" onChange={handleChange}
                      value={"In-room Coffe & Tea"} id='coffee' checked={checkStates.coffee}
                    /> <br />
                  </div>
                  <div className='checkbox--container'>
                    <label htmlFor='tv'>In-room Television</label>
                    <input type="checkbox" onChange={handleChange}
                      value={"In-room Television"} id='tv' checked={checkStates.tv}
                    /> <br />
                  </div>
                </div>
              </div>
            </section>

            <h3>Service Packages</h3>*

            <section className='packages'>


              <div className='packages--inputs'>
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
              </div>

              <div className='packages--input-fields'>
                <label htmlFor="roomAmenities">Room Amenities</label>

                <div className='packages--checkbox-amenities'>

                  <div className='checkbox--container'>
                    <label htmlFor='toiletries'>Free toiletries</label>
                    <input type="checkbox" onChange={handlePackageChange}
                      value={"Free toiletries"} checked={packageCheckStates.toiletries} id='toiletries'
                    /> <br />
                  </div>
                  <div className='checkbox--container'>
                    <label htmlFor='fridge'>Fridge</label>
                    <input type="checkbox" onChange={handlePackageChange}
                      value={"Fridge"} checked={packageCheckStates.fridge} id='fridge'
                    /> <br />
                  </div>

                  <div className='checkbox--container'>
                    <label htmlFor='coffee'>In-room Coffee & Tea</label>
                    <input type="checkbox" onChange={handlePackageChange}
                      value={"In-room Coffee & Tea"} checked={packageCheckStates.coffee} id='coffee'
                    /> <br />
                  </div>

                  <div className='checkbox--container'>
                    <label htmlFor='towels'>Towels</label>
                    <input type="checkbox" onChange={handlePackageChange}
                      value={"Towels"} checked={packageCheckStates.towels} id='towels'
                    /> <br />
                  </div>

                  <div className='checkbox--container'>
                    <label htmlFor='snacks'>Snacks</label>
                    <input type="checkbox" onChange={handlePackageChange}
                      value={"Snacks"} checked={packageCheckStates.snacks} id='snacks'
                    /> <br />
                  </div>

                  <div className='checkbox--container'>
                    <label htmlFor='tv'>Television</label>
                    <input type="checkbox" onChange={handlePackageChange}
                      value={"Television"} checked={packageCheckStates.tv} id='tv'
                    /> <br />
                  </div>

                  <div className='checkbox--container'>
                    <label htmlFor='iron'>Iron & Laundry</label>
                    <input type="checkbox" onChange={handlePackageChange}
                      value={"Iron & Laundry"} checked={packageCheckStates.iron} id='iron'
                    /> <br />
                  </div>

                  <div className='checkbox--container'>
                    <label htmlFor='selfCare'>Self-care tools</label>
                    <input type="checkbox" onChange={handlePackageChange}
                      value={"Self-care tools"} checked={packageCheckStates.selfCare} id='selfCare'
                    /> <br />
                  </div>
                </div>

                <button type="button" onClick={addPackage} className='add-package-btn'>Add Package</button>
              </div>
              <div className='packages--preview'>


                <div className='preview--cards'>
                  {
                    guestHouse.packages.length !== 0 && guestHouse.packages.map(item => {
                      return (
                        <div key={item.package_name} className='preview--card'>
                          <h4 className='preview-subhead'>Package {guestHouse.packages.indexOf(item) + 1}</h4>

                          <p><b>Package name:</b> {item.package_name}</p>

                          <p><b>Price: </b>{item.price}</p>
                          <p><b>Beds included: </b>{item.beds_available}</p>
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
              </div>
            </section>

          </div>

          <div className='ghd--gallery'>

            <div
              className='gallery--image-container'
              style={{ backgroundImage: (guestHouse.display_picture != "" ? guestHouse.display_picture : defaultDisplayUrl) }}
            >
              <img src={(guestHouse.logo != "") ? guestHouse.logo : logoUrl} alt="logo" />
              <FontAwesomeIcon icon={faCamera} onClick={event => loadFile("logo")} className='change--logo' />
              <input
                type="file"
                ref={logoRef}
                className='file-chooser'
                onChange={(e) => uploadImage(e, "logo")}
                accept='image/*'
                disabled={(guestHouse.gName == "") ? true : false}
                style={{ cursor: "pointer" }}
              />
            </div>

            <h4 htmlFor="displayIcon">
              Change display picture
              <FontAwesomeIcon id='displayIcon' icon={faEdit} onClick={event => loadFile("display")} />
              <input
                type="file"
                ref={displayRef}
                className='file-chooser'
                onChange={(e) => uploadImage(e, "display")}
                accept='image/*'
                disabled={(guestHouse.gName == "") ? true : false}
                style={{ cursor: "pointer" }}
              />

            </h4>

            <button className='upload-btn' type="button" onClick={event => loadFile("gallery")}>
              <h5 > Upload Guest House Images</h5>
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
                <div className='photo' key={photo.src} style={{maxWidth: "50%", backgroundColor: "red"}}>

                  {/* <FontAwesomeIcon icon={faDeleteLeft} style={{position:"absolute",marginLeft: "140px", color: "white"}} /> */}
                  <img src={photo.src} alt='Guesthouse' style={{height: "100%", width:"100%", objectFit:"fill"}} />
                  {/* <p>{photo.file.name}</p> */}
                </div>
              ))}
            </div>

            <button id='submit' type="submit">{updateView ? "Update" : "submit form"}</button>
          </div>
        </div >

      </form >
    </>
  )
}

export default GuestHouseData