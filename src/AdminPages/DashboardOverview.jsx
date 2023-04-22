import { useState, useEffect } from 'react';
import './addingGuesthouse.scss';
import PieChart from './PieChart';
import GuestHousesChart from './GuestHousesChart';

function DashboardOverview() {
    const [numGuesthouses, setNumGuesthouses] = useState(0);
    const [recentGuesthouses, setRecentGuesthouses] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("https://guestvista-4308f-default-rtdb.firebaseio.com/addGuesthouses.json?orderBy=\"$key\"")
            .then(response => response.json())
            .then(data => {
                setRecentGuesthouses(Object.values(data).reverse().slice(0, 3));
                setNumGuesthouses(Object.keys(data).length);
                setData(Object.values(data));
            })
            .catch(error => console.log(error));
    }, []);

    function HouseCard(props) {
        return (
            <div className="dash--card">
                <img className="dash--card-image" src={props.img} />
                <div className="dash--card-info">
                    <h4 className={props.ratings ? "card--rated" : "card--created"}>
                        {props.name}</h4>
                    {props.rating && <h4>{props.rating + "⭐"}</h4>}
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
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardOverview;