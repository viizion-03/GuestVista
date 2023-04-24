import React, { useState } from 'react';
import {Modal, Form, Button,} from 'react-bootstrap'

// Component for the Name field
const NameField = ({ value, onChange }) => {
    return (
        <div>
            <label>Name</label>
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder="Enter your name"
            />
        </div>
    );
};

// Component for the Email field
const EmailField = ({ value, onChange }) => {
    return (
        <div>
            <label>Email</label>
            <input
                type="email"
                value={value}
                onChange={onChange}
                placeholder="Enter your email"
            />
        </div>
    );
};

// Component for the Number of People field
const NumOfPeopleField = ({ value, onChange }) => {
    return (
        <div>
            <label>Number of People</label>
            <input
                type="number"
                value={value}
                onChange={onChange}
                placeholder="Enter number of people"
            />
        </div>
    );
};

// Component for the Date In field
const DateInField = ({ value, onChange }) => {
    return (
        <div>
            <label>Date In</label>
            <input type="date" value={value} onChange={onChange} />
        </div>
    );
};

// Component for the Date Out field
const DateOutField = ({ value, onChange }) => {
    return (
        <div>
            <label>Date Out</label>
            <input type="date" value={value} onChange={onChange} />
        </div>
    );
};

// Component for the Guest House field
const GuestHouseField = ({ value, onChange }) => {
    return (
        <div>
            <label>Guest House</label>
            <select value={value} onChange={onChange}>
                <option value="">Select a guest house</option>
                <option value="guesthouse1">Guest House 1</option>
                <option value="guesthouse2">Guest House 2</option>
                <option value="guesthouse3">Guest House 3</option>
            </select>
        </div>
    );
};
const Bookings = (props) => {
    const {gName, email, package_name, beds_available, price} = props

    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    // const [email, setEmail] = useState('');
    const [numOfPeople, setNumOfPeople] = useState('');
    const [dateIn, setDateIn] = useState('');
    const [dateOut, setDateOut] = useState('');
    // const [guesthouse, setGuesthouse] = useState({ gName: props.gName, gEmail: props.gEmail })
    // const [servicePackage, setPackage] = useState({ pName: props.pName, pPrice: props.pPrice, pBeds: props.pBeds })

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleBooking = () => {
        // You can use the form data here to send an email, make an API call, etc.
        // Construct the email content with the form data
        const emailContent = `
        Name: ${name}
        Email: ${email}
        Number of People: ${numOfPeople}
        Date In: ${dateIn}
        Date Out: ${dateOut}
      `;
        // Send email to the email of the selected guesthouse
        const recipientEmail = getRecipientEmail(email); // replace this with your logic to get the recipient email
        const subject = 'Booking Request';
        sendEmail(recipientEmail, subject, emailContent); // replace this with your email sending logic

        console.log(gName)
        console.log(props)
    };

    const getRecipientEmail = (guestHouse) => {
        // Replace this with your logic to map guesthouse to recipient email
        switch (guestHouse) {
            case 'guesthouse1':
                return 'guesthouse1@example.com';
            case 'guesthouse2':
                return 'guesthouse2@example.com';
            case 'guesthouse3':
                return 'guesthouse3@example.com';
            default:
                return '';
        }
    };

    const sendEmail = (recipientEmail, subject, content) => {
        // Replace this with your logic to send an email
        // You can use a library like nodemailer or axios to make an HTTP request to your email server

        // Example using axios
        // axios.post('/send-email', {
        //     recipientEmail,
        //     subject,
        //     content
        // })
        //     .then(response => {
        //         console.log('Email sent successfully:', response);
        //         // Handle success, e.g. show a success message to the user
        //     })
        //     .catch(error => {
        //         console.error('Failed to send email:', error);
        //         // Handle error, e.g. show an error message to the user
        //     });
    };


    function BookingsModal() {
        const [show, setShow] = useState(false);
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

        return (
            <>
                <Button variant="primary" onClick={handleShow}>
                    Launch demo modal
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h1>Booking Form</h1>
                        <NameField value={name} onChange={(e) => setName(e.target.value)} />
                        {/* <EmailField value={email} onChange={(e) => setEmail(e.target.value)} /> */}
                        <NumOfPeopleField
                            value={numOfPeople}
                            onChange={(e) => setNumOfPeople(e.target.value)}
                        />
                        <DateInField value={dateIn} onChange={(e) => setDateIn(e.target.value)} />
                        <DateOutField value={dateOut} onChange={(e) => setDateOut(e.target.value)} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleBooking}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button>

            {/* <h1>Booking Form</h1>
            <NameField value={name} onChange={(e) => setName(e.target.value)} />
            <EmailField value={email} onChange={(e) => setEmail(e.target.value)} />
            <NumOfPeopleField
                value={numOfPeople}
                onChange={(e) => setNumOfPeople(e.target.value)}
            />
            <DateInField value={dateIn} onChange={(e) => setDateIn(e.target.value)} />
            <DateOutField value={dateOut} onChange={(e) => setDateOut(e.target.value)} />
            <GuestHouseField
                value={guestHouse}
                onChange={(e) => setGuestHouse(e.target.value)}
            />
            <button onClick={handleBooking}>Book</button> */}
        </>
    )
}

export default Bookings


