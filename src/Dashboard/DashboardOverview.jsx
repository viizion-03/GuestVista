import React from 'react'
import MySideNav from "../MySideNav";
import { useEffect, useState } from "react";
import "../AdminPages/addingGuesthouse.scss";

function DashboardOverview() {
  const [guesthouses, setGuesthouses] = useState([]);
  const [numGuesthouses, setNumGuesthouses] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://react-project-5130e-default-rtdb.firebaseio.com/addGuesthouses")
      .then((res) => res.json())
      .then((data) => {
        const loadedGuesthouses = [];

        for (const key in data) {
          loadedGuesthouses.push({
            id: key,
            ...data[key],
          });
        }

        setGuesthouses(loadedGuesthouses);
        setNumGuesthouses(loadedGuesthouses.length);
      })
      .catch((err) => console.log(err));
  }, []);

  const filteredGuesthouses = guesthouses.filter((guesthouse) =>
    guesthouse.gName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <MySideNav />
      <div className="dashboard">
        <div className="guesthouses-count">
          <span>Total Guesthouses: </span>
          <input type="text" value={numGuesthouses} readOnly />
        </div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search Guesthouses"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-button">Search</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Email</th>
              <th>Ratings</th>
              <th>Price</th>
              <th>Location</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredGuesthouses.map((guesthouse) => (
              <tr key={guesthouse.id}>
                <td>{guesthouse.gName}</td>
                <td>{guesthouse.description}</td>
                <td>{guesthouse.email}</td>
                <td>{guesthouse.ratings}</td>
                <td>{guesthouse.price}</td>
                <td>{guesthouse.location}</td>
                <td>
                  <button
                    onClick={() => {
                      fetch(`https://guestvista-4308f-default-rtdb.firebaseio.com/addGuesthouses/${guesthouse.id}.json`, {
                        method: "DELETE",
                      })
                        .then(() => {
                          setGuesthouses((prevGuesthouses) =>
                            prevGuesthouses.filter((g) => g.id !== guesthouse.id)
                          );
                          setNumGuesthouses((prevNumGuesthouses) => prevNumGuesthouses - 1);
                        })
                        .catch((err) => console.log(err));
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DashboardOverview;