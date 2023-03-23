import React from 'react'

const GuestHouses = () => {
  return (
    <>
      <div className='admin--header'>
        <h1>Registered Guest Houses</h1>
      </div>
      <div className='admin--container'>
        {/* Filters Section */}
        <div className='admin--filters'>
          <h3>Sort by</h3>
          <div className='admin--radios'>
            <div className='admin--radio'>
              <input type="radio" id="name" />
              <label htmlfor="name">Name</label>
            </div>
            {/* <br /> */}

            <div className='admin--radio'>
              <input type="radio" id="price" />
              <label htmlfor="price">Price</label>
            </div>
            {/* <br /> */}

            <div className='admin--radio'>
              <input type="radio" id="rating" />
              <label htmlfor="rating">Rating</label>
            </div>
            {/* <br /> */}

            <div className='admin--radio'>
              <input type="radio" id="location" />
              <label htmlfor="location">Location</label>
            </div>
            {/* <br /> */}
          </div>
        </div>

        {/* Table Section */}
        <div className='table--container'>
          <table className='table'>
              <thead className='table-head'>
                <td style={{ textIndent: "10px" }}>Name</td>
                <td>Location</td>
                <td style={{ textAlign: "center" }}>Actions</td>
              </thead>
            <tbody>
              <tr className="table-row">
                <td className='table-data'>
                  <div className='ghl--name-container'>
                    <img className='table--logo' src='../icons/house.png' />
                    <h3>Lotsane Guest House</h3>
                  </div>
                </td>
                <td>Palapye</td>
                <div className='table--actions'>
                  <img src="../icons/edit.svg" alt="edit" />
                  <img src="../icons/message.svg" alt="message" />
                  <img src="../icons/delete.svg" alt="delete" />
                </div>
              </tr>

              <tr className="table-row">
                <td className='table-data'>
                  <div className='ghl--name-container'>
                    <img className='table--logo' src='../icons/house.png' />
                    <h3>Lotsane Guest House</h3>
                  </div>
                </td>
                <td>Palapye</td>
                <div className='table--actions'>
                  <img src="../icons/edit.svg" alt="edit" />
                  <img src="../icons/message.svg" alt="message" />
                  <img src="../icons/delete.svg" alt="delete" />
                </div>
              </tr>

              <tr className="table-row">
                <td className='table-data'>
                  <div className='ghl--name-container'>
                    <img className='table--logo' src='../icons/house.png' />
                    <h3>Lotsane Guest House</h3>
                  </div>
                </td>
                <td>Palapye</td>
                <div className='table--actions'>
                  <img src="../icons/edit.svg" alt="edit" />
                  <img src="../icons/message.svg" alt="message" />
                  <img src="../icons/delete.svg" alt="delete" />
                </div>
              </tr>
            </tbody>
          </table>

          <div className='ghl--new-button'>
            <button >New Entry</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default GuestHouses