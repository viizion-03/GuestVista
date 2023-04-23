import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import '../AdminPages/addingGuesthouse.scss';

function LocationCards(props) {
  const [locations, setLocations] = useState([]);
  const [isOneLine, setIsOneLine] = useState(false);

  useEffect(() => {
    fetch(`https://react-project-5130e-default-rtdb.firebaseio.com/addGuesthouses`)
      .then((response) => response.json())
      .then((data) => {
        const guesthousesData = Object.entries(data).map(([id, guesthouse]) => ({ id, ...guesthouse }));
        const locationsData = guesthousesData.reduce((acc, guesthouse) => {
          const { location } = guesthouse;
          const index = acc.findIndex((item) => item.location === location);
          if (index === -1) {
            acc.push({ location, count: 1, img: guesthouse.photos[0].src });
          } else {
            acc[index].count += 1;
          }
          return acc;
        }, []);
        setLocations(locationsData);
      });
  }, []);

  function LocationCard(props) {
    return (
      <div className="dash--card">
        <img className="dash--card-image" src={props.img} alt={props.location} />
        <div className="dash--card-info">
          <p>{props.location}</p>
          <p>{props.count} guesthouses</p>
        </div>
      </div>
    );
  }

  return (
    <div className="location-cards-container">
      <button className={`one-line-toggle ${isOneLine ? "hidden" : ""}`} onClick={() => setIsOneLine(true)}>
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
      <div className={`dash--cards ${isOneLine ? "one-line" : ""}`}>
        <div className="cards-wrapper">
          {locations.slice(0, 4).map((location) => (
            <LocationCard
              key={location.location}
              location={location.location}
              img={location.img}
              count={location.count}
            />
          ))}
        </div>
      </div>
      <button className={`one-line-toggle ${!isOneLine ? "hidden" : ""}`} onClick={() => setIsOneLine(false)}>
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
    </div>
  );
}

export default LocationCards;