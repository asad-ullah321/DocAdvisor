import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";


import userlogo from "../../assets/stethoscope.png";
import "./navbar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import { Alert, Modal } from "react-bootstrap";

import logo from "../../assets/logo.svg";
const DoctorDashboard = () => {
  /*---User Name---*/
  //const location = useLocation();
  //const email = location.state.email;
  const cookies = new Cookies();
  
  
  
  //const [doctors, setDoctors] = useState([1, 2]);
  const [slots, setSlots] = useState(1);
  // const [slotsInput, setSlotsInput] = useState("");
  const [slotsData, setSlotsData] = useState([{slot: ""}]);
  const [date, setDate]= useState("");
  const handleChange = (i, e) => {
    const name = e.target.name;
    const value = e.target.value;
    let temp = [...slotsData];
    temp[i][name] = value;
    setSlotsData(temp);

    console.log(slotsData);
  };


  const manageSlots = (e) => {
    if (slots > e.target.value) {
      let newFormValues = [...slotsData];
      newFormValues.splice(slots-1, 1);
      setSlotsData(newFormValues);
      setSlots(e.target.value);
    }
    else if(slots < e.target.value){
    setSlotsData([...slotsData, { slot: "" }]);
    setSlots(e.target.value);

    }
  };



  const postSlots=()=>{
    if(date!=="")
    {
      for (let index = 0; index < slotsData.length; index++) {
        for (let j = index+1; j < slotsData.length; j++) {
          if(slotsData[index].slot === slotsData[j].slot)
          {
            console.log("same");
          return false;
          }
        }
        
      }
      const token = cookies.get("token");
      console.log(token);
      const data = JSON.stringify({
        date, slotsData
      });
      console.log(data);
      fetch("http://localhost:5000/api/user/addSlots", {
        method: "post",

        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        "auth-token": token,


          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data,
      })
        .then((res) => {
          //setresStatus(res.status);
          if (res.status === 200) return res.json();
          else throw new Error(res.status);
        })
        .then((resBody) => {
          console.log(resBody);
          
        })
        .catch((err) => {
          
        })
        .finally(() => {
          
        });
    }
    
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      {/* Navbar */}
      <Navbar bg="light" expand="md">
        <Container>
          <Navbar.Brand href="#home">
            <img
              className="img-fluid logo"
              src={logo}
              style={{ width: "7rem", height: "2rem" }}
              alt="DocAdvisor"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Container>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                {/*<NavDropdown
                  className="me-4"
                  title="Doctor"
                  id="doc-nav-dropdown"
                >
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown className="me-4" title="Labs" id="lab-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link className="me-4" href="#home">Appointments</Nav.Link>*/}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Container>
        {/*<div className='pe-4 d-flex'><img src={userlogo} alt="" className="pe-1"/>{email}</div>*/}
      </Navbar>

      {/* Jumbotron */}
      <div className="jumbotron py-5 px-5 text-wrap text-center">
        <div className="fs-1 mt-2">
          Reach to ones who <span className="important">needs your</span> help
          and expertise
        </div>

        <div className="mb-4 mt-4">
          <InputGroup>
            <Form.Control
              aria-label="doctor"
              placeholder="Search your patient"
            />
            <InputGroup.Text id="searchDoc">
              <Button className="px-5" variant="warning">
                <span className="searchBox fs-5">Search</span>
              </Button>
            </InputGroup.Text>
          </InputGroup>
        </div>

        <div className="mb-5 py-5 fs-2">
          25,000+ doctors
          <span className="important px-4">| 15 million+ users |</span>200,000+
          reviews
        </div>
      </div>

      {/*--- add schedual ---*/}
      <Container className="pb-5 mb-3">
        <Card className="bg-light">
          <Card.Header
            className="bg-warning fw-bold fs-5"
            style={{ color: "white" }}
          >
            Update your schedual here
          </Card.Header>
          <Card.Body>
            <Card.Title>Add avialable appointment slots</Card.Title>

            <Card.Text>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Date</Form.Label>
                  <Form.Control type="date" value={date} placeholder="Enter date" onChange={(e)=>setDate(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Slots</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Password"
                    value={slots}
                    onChange={(e) => {
                      if (e.target.value > 0) manageSlots(e);
                    }}
                  />
                </Form.Group>
                {slotsData.map((slot, index) => (
                  <Form.Group
                    key={index}
                    className="mb-3"
                    controlId="formBasicEmail"
                  >
                    <Form.Label>Slot {index + 1}</Form.Label>
                    <Form.Control
                      name="slot"
                      value={slot.slot}
                      onChange={(e) => handleChange(index, e)}
                      type="text"
                      placeholder="e.g 6:00 - 7:00 pm"
                    />
                  </Form.Group>
                ))}
                <Button onClick={postSlots} variant="primary" >
                  Submit
                </Button>
              </Form>
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>

      {/* patiensts record*/}
      <Container className="pb-5 mb-3">
        <Card className="bg-light">
          <Card.Header
            className="bg-warning fw-bold fs-5"
            style={{ color: "white" }}
          >
            Patients
          </Card.Header>
          <Card.Body>
            <Card.Title>Patients Records</Card.Title>

            <Card.Text></Card.Text>
          </Card.Body>
        </Card>
      </Container>

      {/*---modal for appointment 
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Dr. Mubasher appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Text className="text-muted fs-5">clicic address</Form.Text>
            <br />
            <Form.Text className="text-muted fw-bold">Rs. 2500</Form.Text>

            <Form.Group className="mb-3 mt-4" controlId="formBasicEmail">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Time</Form.Label>
              <Form.Select >
                <option>Disabled select</option>
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit" style={{fontSize:"1rem", color: "white" }}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose} style={{ fontSize:"1rem",color: "white" }}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>*/}
    </div>
  );
};

export default DoctorDashboard;
