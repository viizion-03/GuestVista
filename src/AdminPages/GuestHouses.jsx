import { faPlus, faPlusSquare, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { ref, getDatabase, remove, child, set } from 'firebase/database';

const GuestHouses = () => {
  // const [guesthouses, setGuesthouses] = useState([]);
  const { guesthouses, setGuesthouses, refreshGHList } = useContext(AuthContext)
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate()
  const [visibleGuestHouses, setVisibleGuestHouses] = useState(guesthouses)

  const filteredGuesthouses = guesthouses.filter((guesthouse) =>
    guesthouse.gName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const HouseItem = (props) => {
    return (
      <>
        <tr className="table-row" key={props.id}>
          <td className='table-data'>
            <div className='ghl--name-container'>
              <img className='table--logo' src={props.logo} />
              <h3>{props.gName}</h3>
            </div>
          </td>
          <td>{props.location}</td>
          <div className='table--actions'>
            <img src="../icons/edit.svg" alt="edit" onClick={() => navigate(`/admin/guesthouse/${props.id}`)} />
            <img src="../icons/message.svg" alt="message" />
            <img src="../icons/delete.svg" alt="delete" onClick={event => deleteHouse(props.id)} />
          </div>
        </tr>
      </>
    )
  }

  const deleteHouse = (id) => {
    let houseIndex = -1;
    console.log(visibleGuestHouses)
    for(let i = 0; i < guesthouses.length; i++){
      if(guesthouses[i].id == id){
        setVisibleGuestHouses(prevData => {
          return prevData.toSpliced(i,1)
        })
        console.log("guesthouse deleted")
        console.log(visibleGuestHouses)
      }
    }
    // setGuesthouses(prevStud => {
    //   return guesthouses.filter()
    // })
    // const houseRef = ref(getDatabase(), `/addGuesthouses/${id}`)
    // set(houseRef, null)
  }

  function createNew() {
    navigate('/admin/new-guesthouse')
  }


  return (
    <>

      <h1 className='admin--header'>Registered Guest Houses</h1>

      <div className='admin-ghl--content'>
        <div>
          {/* summary data section */}
          {/* <div className="guesthouses-count">
            <span>Total Guesthouses: </span>
            <input type="text" value={numGuesthouses} readOnly />
          </div> */}

        </div>
        <div className='admin--container'>
          {/* Filters Section */}
          <div className='admin--filters'>
            <h3>Sort by</h3>
            <div className='admin--radios'>
              <div className='admin--radio'>
                <input type="radio" id="name" name='sort' />
                <label htmlFor="name">Name</label>
              </div>
              {/* <br /> */}

              <div className='admin--radio'>
                <input type="radio" id="price" name='sort' />
                <label htmlFor="price">Price</label>
              </div>
              {/* <br /> */}

              <div className='admin--radio'>
                <input type="radio" id="rating" name='sort' />
                <label htmlFor="rating">Rating</label>
              </div>
              {/* <br /> */}

              <div className='admin--radio'>
                <input type="radio" id="location" name='sort' />
                <label htmlFor="location">Location</label>
              </div>
              {/* <br /> */}
            </div>
          </div>
          <div className='table-section'>

            {/* searchbar */}
            <div className='admin--searchbar'>
              <input
                type="text"
                placeholder="Search Guesthouses"
                className="admin--search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="admin--search-button">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
            {/* Table Section */}
            <div className='table--container'>
              <div className='table--headings'>
                <h2>Name</h2>
                <h2>Location</h2>
                <h2>Actions</h2>
              </div>
              <div className='table--scroller'>
                <table className='table'>
                  {/* <thead className='table-head'>
                    <td style={{ textIndent: "10px" }}>Name</td>
                    <td>Location</td>
                    <td style={{ textAlign: "center" }}>Actions</td>
                  </thead> */}
                  <tbody>
                    {filteredGuesthouses.map((guesthouse) => (
                      <HouseItem
                        logo={guesthouse.logo}
                        id={guesthouse.id}
                        gName={guesthouse.gName}
                        location={guesthouse.location}
                      />
                    ))}
                  </tbody>
                </table>
              </div>


              <button onClick={createNew} className='ghl--new-button' >
                <h5>New</h5>
                <FontAwesomeIcon icon={faPlusSquare} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default GuestHouses