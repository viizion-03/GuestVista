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
                        src="https://firebasestorage.googleapis.com/v0/b/react-project-5130e.appspot.com/o/carousel%2Fr-architecture-2gDwlIim3Uw-unsplash%20%5BMConverter.eu%5D.webp?alt=media&token=bb8442bf-7056-40e0-b214-db18c458cee4"
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
                        src="https://firebasestorage.googleapis.com/v0/b/react-project-5130e.appspot.com/o/carousel%2Fvu-anh-TiVPTYCG_3E-unsplash%20%5BMConverter.eu%5D.webp?alt=media&token=5cffe46d-2d89-4ee3-8fa5-50d660efd7a4"
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
                        src="https://firebasestorage.googleapis.com/v0/b/react-project-5130e.appspot.com/o/carousel%2Fzero-take-Z1Y8kWBe6C8-unsplash%20%5BMConverter.eu%5D.webp?alt=media&token=caac80fc-57c9-42fe-984e-3d7f53c1059e"
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