import { useState, useEffect } from 'react';
import './addingGuesthouse.scss';
import PieChart from './PieChart';
import GuestHousesChart from './GuestHousesChart';

function DashboardOverview() {
    const [numGuesthouses, setNumGuesthouses] = useState(0);
    const [recentGuesthouses, setRecentGuesthouses] = useState([]);
    const [topRatedGuesthouses, setTopRatedGuesthouses] = useState([]);
    const [highPricedGuesthouses, setHighPricedGuesthouses] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        // fetch("https://guestvista-4308f-default-rtdb.firebaseio.com/addGuesthouses.json?orderBy=\"$key\"")
        fetch("https://react-project-5130e-default-rtdb.firebaseio.com/addGuesthouses?orderBy=\"$key\"")
            .then(response => response.json())
            .then(data => {
                const sortedData = Object.values(data).sort((a, b) => b.ratings - a.ratings);
                const sortedPrice = Object.values(data).sort((a, b) => b.price - a.price);
                setRecentGuesthouses(Object.values(data).reverse().slice(0, 4));
                setNumGuesthouses(Object.keys(data).length);
                setData(Object.values(data));
                setTopRatedGuesthouses(sortedData.slice(0, 4));
                setHighPricedGuesthouses(sortedPrice.slice(0, 4));
            })
            .catch(error => console.log(error));
    }, []);

    function HouseCard(props) {
        return (
            <div className="dash--card">
                <img className="dash--card-image" src={props.img} />
                <div className="dash--card-info">
                    <div className="card--header">
                        <h4 className={props.ratings ? "card--rated" : "card--created"}>
                            {props.name}</h4>
                        {props.rating && <h4>{props.rating + "⭐"}</h4>}
                    </div>
                    <h5 className="card--price">P{props.price}</h5>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className='main--dashboard'>
                <h1 className="admin--header">Dashboard</h1>
                <div className="dash--content">
                    <div className="counter-wrapper">
                        <h3 className="dash--header"> Total Active Guesthouses:</h3>
                        <span className="counter">{numGuesthouses}</span>
                    </div>

                    <div className="charts-container">
                    <div className="pie-chart-wrapper">
                    <PieChart data={data} />
                    </div>
                      <div className="guesthouses-chart">
                    <GuestHousesChart />
                    </div>
                     </div>
                    <h3 className="dash--header">Recently Created</h3>
                    <div className="dash--cards">
                        {recentGuesthouses.map(guesthouse => (
                            <HouseCard
                                key={guesthouse.id}
                                img={guesthouse.photos[0].src}
                                name={guesthouse.gName}
                                rating={guesthouse.ratings}
                                price={guesthouse.price}
                            />
                        ))}
                    </div>
                    <h3 className="dash--header">Top Rated Guesthouses</h3>
                    <div className="dash--cards">
                    {topRatedGuesthouses.map(guesthouse => (
                    <HouseCard
                    key={guesthouse.id}
                    img={guesthouse.photos[0].src}
                    name={guesthouse.gName}
                    rating={guesthouse.ratings}
                    price={guesthouse.price}
                     />
                     ))}
                    </div>
                    <h3 className="dash--header">Most Expensive Guesthouses</h3>
                    <div className="dash--cards">
                    {highPricedGuesthouses.map(guesthouse => (
                    <HouseCard
                    key={guesthouse.id}
                    img={guesthouse.photos[0].src}
                    name={guesthouse.gName}
                    rating={guesthouse.ratings}
                    price={guesthouse.price}
                     />
                     ))}
                        </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardOverview;