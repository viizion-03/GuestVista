import React, { useState, } from 'react'
import { ref, listAll } from "firebase/storage"
import { getDatabase } from '@firebase/database'
import { Carousel } from 'react-bootstrap'
import { InputGroup, Button, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Navigate, useNavigate } from 'react-router-dom'


const HomeCarousel = () => {
    const [styles, setStyles] = useState({ height: "800px" })
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate()
    function handleSearch(e) {
        navigate("/view-guesthouses", {state: {searchKey: searchTerm}})
    }
    return (
        <>
            <input type="text" placeholder="Search Town/City here!" value={searchTerm} className="home--searchbar"
                onChange={(e) => setSearchTerm(e.target.value)} />

            <FontAwesomeIcon icon={faSearch} className='home--search-ico' onClick={handleSearch} />
            <Carousel >
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://firebasestorage.googleapis.com/v0/b/guestvista-4308f.appspot.com/o/carousel%2Fr-architecture-2gDwlIim3Uw-unsplash%20%5BMConverter.eu%5D.webp?alt=media&token=24132dae-903a-4b7d-8f47-0ab62799ddfe"
                        alt="First slide"
                        style={styles}
                    />
                    <Carousel.Caption>
                        <h3>A Home Away From Home</h3>
                        <p>Experience the ultimate relaxation and comfort with our selection of guest houses.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://firebasestorage.googleapis.com/v0/b/guestvista-4308f.appspot.com/o/carousel%2Fvu-anh-TiVPTYCG_3E-unsplash%20%5BMConverter.eu%5D.webp?alt=media&token=1430cab4-8cd4-4afa-8694-85a5dff8aea7"
                        alt="First slide"
                        style={styles}
                    />
                    <Carousel.Caption>
                        <h3>Make A Wise Economical Choice</h3>
                        <p>Our web app make it easy to find and book the guesthouse for your next trip,with direct bookings that save you time and money.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://firebasestorage.googleapis.com/v0/b/guestvista-4308f.appspot.com/o/carousel%2Fzero-take-QzQe16eKc1I-unsplash%20%5BMConverter.eu%5D.webp?alt=media&token=23abc247-a128-45d4-a412-815f6646d34a"
                        alt="First slide"
                        style={styles}
                    />
                    <Carousel.Caption>
                        <h3>So What Are You Waiting For</h3>
                        <p>Start browsing now and experience the comfort and convenience of our guesthouses!!!</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </>
    )
}

export default HomeCarousel