import React from 'react'
import { Card } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import { faLocation } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router'

const GuestHouseCard = (props) => {

    const navigate = useNavigate()
    function seeGuestHouses(id) {
        navigate(`/guesthouse/${id}`)
    }
    const styles = { width: "400px" , height: "fit-content", margin: "30px 0px", background: "transparent", padding: "0px" }
    const stylesSmall = { width: "340px" , height: "fit-content", margin: "30px 0px", background: "transparent", padding: "0px" }

    return (
        <Card style={props.size !== "small" ? styles: stylesSmall}>
            <Card.Img src={props.display_picture} style={props.size == "small" ? {height:"250px"} :{height: "350px" }} />

            <Card.ImgOverlay style={{ display: "absolute" }}>
                <Card.Text as="h3"
                    style={{ color: "white", backgroundColor: "black", width: "fit-content", float: "right", borderRadius: "10px", padding: "7px", margin: "7px" }}
                > {props.size != "small"? props.ratings :"P "+ props.price}
                    {props.size != "small" && <FontAwesomeIcon icon={faStar} />}
                </Card.Text>

                <Card.Text as="h4" style={{ position: "absolute", bottom: "40px", color: "white", margin: "10px", backgroundColor: " rgba(126, 126, 126, 0.4)", cursor: "pointer", padding: "5px", textShadow: "2px 2px black" }}
                    onClick={() => seeGuestHouses(props.id)}
                >{props.gName}
                </Card.Text>

                <Card.Text style={{ position: "absolute", bottom: "10px", left: "40px", textAlign: "start", color: "ButtonShadow", textShadow: "2px 2px black", display: "flex", marginTop: "15px", borderRadius: "10px" }}>
                    <FontAwesomeIcon icon={faLocation} style={{ color: "yellow", fontSize: "14px", padding: "5px", marginRight: "7px" }} />
                    <span style={{ fontSize: "18px", alignSelf: "center" }}>{props.location}</span>
                </Card.Text>
            </Card.ImgOverlay>
        </Card>
    )
}

export default GuestHouseCard