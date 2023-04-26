import React, { useRef, useState } from 'react';
import { Modal, Form, Button, Row, Col, FormLabel, FormControl, Container, Alert } from 'react-bootstrap'
import emailjs from '@emailjs/browser';

// Component for the Name field
const NameField = ({ value, onChange }) => {
    return (
        <Col>
            <FormLabel>Name</FormLabel>
            <FormControl type='text'
                value={value}
                onChange={onChange}
                placeholder="First Name"
                name='firstName'
                required
            />
        </Col>
    );
};

const SurnameField = ({ value, onChange }) => {
    return (
        <Col>
            <FormLabel>Surname</FormLabel>
            <FormControl type='text'
                value={value}
                onChange={onChange}
                placeholder="Surname"
                name='lastName'
                required
            />
        </Col>
    );
};


// Component for the Email field
const EmailField = ({ value, onChange }) => {
    return (
        <Row><Col>
            <FormLabel>Email</FormLabel>
            <FormControl type='email'
                value={value}
                onChange={onChange}
                placeholder="Email"
                name='email'
                required
            />
        </Col></Row>
    );
};

// Component for the Number of People field
const NumOfPeopleField = ({ value, onChange }) => {
    return (

        <Row><Col>
            <FormLabel>Number of People</FormLabel>
            <FormControl lg={2}
                type="number"
                value={value}
                onChange={onChange}
                placeholder="Number of people expected"
                name='peopleCount'
                required
            />
        </Col></Row>

    );
};

// Component for the Date In field
const DateInField = ({ value, onChange }) => {
    return (
        <>
            <FormLabel>Date In</FormLabel>
            <FormControl
                type="date" value={value} onChange={onChange} name='dateIn' required
            />
        </>
    );
};

// Component for the Date Out field
const DateOutField = ({ value, onChange }) => {
    return (
        <>
            <FormLabel>Date Out</FormLabel>
            <FormControl
                type="date" value={value} onChange={onChange} dateOut required
            />
        </>
    );
};


const Bookings = (props) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [numOfPeople, setNumOfPeople] = useState('');
    const [dateIn, setDateIn] = useState('');
    const [dateOut, setDateOut] = useState('');
    const [emailSent, setEmailSent] = useState(false)
    const [errorAlert, setErrorAlert] = useState(null)

    const form = useRef()

    const templateParams = {
        fname: name,
        lname: surname,
        email: userEmail,
        peopleCount: numOfPeople,
        indate: dateIn,
        outdate: dateOut,
        gName: props.gName,
        package_name: props.package_name,
        beds: props.beds_available,
        price: props.price,
        gEmail: props.email

    }

    const sendEmail = (e) => {
        e.preventDefault()
        setErrorAlert(null)
        emailjs.send('service_na2y2rw', 'template_4lyzwqt', templateParams, 'c8lekbrbjBwLVGGw0')
        .then((result) => {
            console.log(result.text);
            setEmailSent(true)
        }, (error) => {
            console.log(error.text);
            setErrorAlert("Booking Failed, try again later")
        });
    };

    const hideModal = () => props.hideFunction()


    return (

        <Container>
            {emailSent && <Alert variant='success'>Reservation Request Successfully Sent</Alert>}
            {errorAlert && <Alert variant='danger'>{errorAlert}</Alert>}

            <Form ref={form} onSubmit={sendEmail}>
                <Row>
                    <NameField value={name} onChange={(e) => setName(e.target.value)} />
                    <SurnameField value={surname} onChange={(e) => setSurname(e.target.value)} />
                </Row>
                <EmailField value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                <NumOfPeopleField
                    value={numOfPeople}
                    onChange={(e) => setNumOfPeople(e.target.value)}
                />

                <Row>
                    <Col><DateInField value={dateIn} onChange={(e) => setDateIn(e.target.value)} /></Col>
                    <Col><DateOutField value={dateOut} onChange={(e) => setDateOut(e.target.value)} /></Col>
                </Row>

                <Alert variant='info' style={{ marginTop: "10px" }}>
                    <h6>{props.gName}</h6>
                    <h6>{props.package_name}</h6>
                    <h6>{props.beds_available}</h6>
                    <h6>P {props.price}</h6>
                </Alert>

                <Modal.Footer style={{ display: "flex", width: "100%", justifyContent: "center" }}>
                    <Button variant="warning" type='submit' onClick={hideModal}>
                        Close
                    </Button>
                    <Button variant="primary" type='submit' >
                        Make Reservation
                    </Button> :

                </Modal.Footer>
            </Form>

        </Container>
    )
}

export default Bookings


