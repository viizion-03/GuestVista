import React, { useState } from 'react';
import './addingGuesthouse.scss';

function AddingGuesthouse() {
  const [details, setDetails] = useState({
    gName: '',
    description: '',
    price: '',
    location: '',
    amenities: '',
    contacts: '',
    email: '',
    ratings: '',
    photos: []
  });

  const PostData = async (e) => {
    e.preventDefault();
    const { gName, description, price, location, amenities, contacts, email, ratings, photos } = details;
    const res = await fetch('https://guestvista-4308f-default-rtdb.firebaseio.com/addGuesthouses.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        gName,
        description,
        price,
        location,
        amenities,
        contacts,
        email,
        ratings,
        photos
      })
    });
  };

  const handleFileInputChange = (event) => {
    const files = event.target.files;
    const updatedPhotos = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = (event) => {
        updatedPhotos.push({ file: file, src: event.target.result });
        if (updatedPhotos.length === files.length) {
          setDetails((prevState) => ({
            ...prevState,
            photos: [...prevState.photos, ...updatedPhotos]
          }));
        }
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='form'>
      <h2>ADD GUESTHOUSES</h2>
      <input type='text' placeholder='GuestHouse Name' onChange={(e) => setDetails({ ...details, gName: e.target.value })} />
      <input type='text' placeholder='Description' onChange={(e) => setDetails({ ...details, description: e.target.value })} />
      <input type='integer' placeholder='Price ' onChange={(e) => setDetails({ ...details, price: e.target.value })} />
      <input type='text' placeholder='Location' onChange={(e) => setDetails({ ...details, location: e.target.value })} />
      <input type='text' placeholder='Amenities' onChange={(e) => setDetails({ ...details, amenities: e.target.value })} />
      <input type='text' placeholder='Contacts' onChange={(e) => setDetails({ ...details, contacts: e.target.value })} />
      <input type='email' placeholder='Email' onChange={(e) => setDetails({ ...details, email: e.target.value })} />
      <input type='ratings' placeholder='Ratings' onChange={(e) => setDetails({ ...details, ratings: e.target.value })} />

      <div className='file-input-container'>
        <label htmlFor='photos-input'>Upload Photos</label>
        <input id='photos-input' type='file' accept='image/*' onChange={handleFileInputChange} multiple />
      </div>

      <div className='photos-container'>
        {details.photos.map((photo) => (
          <div className='photo' key={photo.src}>
            <img src={photo.src} alt='Guesthouse' />
            <p>{photo.file.name}</p>
          </div>
        ))}
      </div>

      <button onClick={PostData}>Submit</button>
    </div>
  );
}

export default AddingGuesthouse;