import React from 'react'
import { Alert, Button, Col, Container, Form, FormControl, FormGroup, FormLabel, ListGroup, ListGroupItem, Placeholder, Row, Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { getDatabase, push, ref, set, get, remove } from "firebase/database"
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword, deleteUser } from '@firebase/auth';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft, faMinus } from '@fortawesome/free-solid-svg-icons';
import { getAuth } from '@firebase/auth';
import CardHeader from 'react-bootstrap/esm/CardHeader';


const Subcribers = () => {
  const db = getDatabase();
  const adminListRef = ref(db, "Administrators")
  const [deleteRef, setDeleteRef] = useState(adminListRef)
  const [adminList, setAdminList] = useState([])
  const [errorMsg, setErrorMsg] = useState(null)
  const [loading, setLoading] = useState(true)
  const [newUser, setNewUser] = useState(
    { uName: "", email: "", profilePic: "" }
  )
  const [password, setPassword] = useState({ password: "", confPassword: "" })

  const postData = (e) => {
    e.preventDefault()

    if (password.password !== password.confPassword) {
      setErrorMsg("Passwords don't match")
      setPassword({ password: "", confPassword: "" })
      return
    }

    createUserWithEmailAndPassword(auth, newUser.email, password.password)
      .then(userCred => {
        set(push(adminListRef), { ...newUser, userId: userCred.user.uid })
          .then(() => {
            alert("Admin account created")
            getData()
            setNewUser({ uName: "", email: "", profilePic: "" })
            setPassword({ password: "", confPassword: "" })
          })
          .catch(error => { console.log(error) })
      }).catch((e) => {
        console.log(e)
        if (e.code === "auth/weak-password") {
          setErrorMsg("Enter a password at least 6 characters long")
          setPassword({ password: "", confPassword: "" })
        }
        if (e.code === "auth/email-already-in-use") {
          setErrorMsg("Email is already in Use")
          setPassword({ password: "", confPassword: "" })
        }

      })
  }

  useEffect(() => {
    //initial data fetch
    getData()

  }, [])

  function getData() {
    setLoading(true)
    setAdminList([])
    get(adminListRef)
      .then(snapshot => {
        snapshot.forEach(childItem => {
          adminList.forEach(admin => {
            if (admin.userId === childItem.val().userId)
              return
          })

          setAdminList(prevList => { return (prevList.concat(childItem.val())) })
        })
      })
      .catch(e => console.log(e))
      .finally(setLoading(false))
  }

  const deleteAdmin = (admin) => {
    //remove from adminList
    let itemKey = ""
    get(adminListRef)
      .then(snapshot => {
        snapshot.forEach(item => {
          if (item.val().userId === admin.userId) {
            itemKey = item.key
            const myRef = ref(getDatabase(), `Administrators/${itemKey}`)
            if (myRef) { remove(myRef) }
            getData()
          }
        })
      })

    console.log(deleteRef)
    //remove logins from system
  }

  const handleChange = (e) => {
    setErrorMsg(null)
    const { name, value } = e.target;
    setNewUser(prevUser => {
      return ({ ...prevUser, [name]: value })
    })
  }

  return (
    <>
      <h1 className="admin--header">Administrators</h1>

      <Container>
        <h2 style={{margin:"30px 0px"}}>Registered Administrators</h2>
        <ListGroup as={Col} md={6} style={{marginBottom: "50px"}}>
          {adminList.map(item => {
            return (
              <ListGroup.Item key={item.userId} >
                <span>{item.uName}</span>
                <FontAwesomeIcon
                  icon={faDeleteLeft}
                  style={{ float: "right" }}
                  onClick={() => { deleteAdmin(item) }}
                />
              </ListGroup.Item>
            )
          })}
        </ListGroup>



        <h2 style={{margin:"20px 0px"}}>Create New Admin Account</h2>
        {errorMsg != null && <Alert variant='danger'>{errorMsg}</Alert>}
        <Form onSubmit={postData}>
          <Row md={3}>

            <Col>
              <FormGroup>
                <FormLabel htmlFor='uName'>Name</FormLabel>
                <FormControl type='text'
                  placeholder='User Name'
                  value={newUser.uName}
                  onChange={handleChange}
                  id='uName'
                  name="uName"
                  required
                />
              </FormGroup>
            </Col>
            <Col>

              <FormGroup>
                <FormLabel htmlFor='email'>Email</FormLabel>
                <FormControl type='email'
                  placeholder='Email'
                  onChange={handleChange}
                  value={newUser.email}
                  id='email'
                  name="email"
                  required
                />
              </FormGroup>
            </Col>
          </Row>
          <Row md={3}>
            <Col >
              <FormGroup>
                <FormLabel htmlFor='password'>Password</FormLabel>
                <FormControl type='password'
                  placeholder='Password'
                  onChange={e => setPassword(prevPwd => { return { ...prevPwd, password: e.target.value } })}
                  value={password.password}
                  id='password'
                  required
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <FormLabel htmlFor='confPassword'>Confirm Password</FormLabel>
                <FormControl type='password'
                  placeholder='Confirm Password'
                  onChange={e => setPassword(prevPwd => { return { ...prevPwd, confPassword: e.target.value } })}
                  value={password.confPassword}
                  id='confPassword'
                  required
                />
              </FormGroup>
            </Col>
          </Row>

          <Button type='submit' style={{ width: "fit-content" }}>Create User</Button>
        </Form>
      </Container>
    </>

  )
}

export default Subcribers