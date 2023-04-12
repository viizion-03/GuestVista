import React from 'react'
import { useNavigate } from 'react-router-dom';

const GuestHousesList = () => {
  
  const navigate = useNavigate()

  function seeGuestHouses(){
    navigate('/guesthouse')
  }


  return (
<>
    <div>GuestHouses</div>
    <button onClick={seeGuestHouses}>see guesthoues</button>
</>
  )}

export default GuestHousesList