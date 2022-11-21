import React from "react";
import { useLocation } from "react-router-dom";

import userlogo from '../../assets/stethoscope.png'
import "./navbar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';







import logo from "../../assets/logo.svg"
const PatientNavbar = () => {
  /*---User Name---*/
  const location = useLocation();
  const email = location.state.email;


  
  return (
    <div>
        {/* Navbar */}
      <Navbar bg="light" expand="md">
        <Container>
          <Navbar.Brand href="#home"><img className="img-fluid logo" src={logo} alt="DocAdvisor" /></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Container>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavDropdown
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

                <NavDropdown title="Labs" id="lab-nav-dropdown">
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
              </Nav>
            </Navbar.Collapse>
          </Container>
          
        </Container>
        <div className='pe-4 d-flex'><img src={userlogo} alt="" className="pe-1"/>{email}</div>

      </Navbar>


        {/* Jumbotron */}
      <div className="jumbotron py-5 px-5 text-wrap text-center">
        <div className="fs-1 mt-2">
          Find and book the <span className="important">best doctor</span> near
          you
        </div>

        <div className="mb-4 mt-4">
          <InputGroup >
            <Form.Control aria-label="Location" placeholder="Enter city" />
            <Form.Control aria-label="doctor" placeholder="Search for doctors, labs" />
            <InputGroup.Text id="searchDoc">
              <Button className="px-5" variant="warning">
                <span className="searchBox fs-5">Search</span>
              </Button>
            </InputGroup.Text>
          </InputGroup>
        </div>

        <div className="mb-5 py-5 fs-2">
           25,000+ doctors<span className="important px-4">| 15 million+ users |</span>200,000+ reviews
        </div>
      </div>

        {/* doctors with concern */}

      <Container className="text-center">
        <div className="text-wrap fs-3 mb-3">Find Doctors by concern</div>
        <Row>
            <Col md={2}>Gynecologist</Col>
            <Col md={2}>Skin Specialist</Col>
            <Col md={2}>Child Specialist</Col>
            <Col md={2}>Diagnostics</Col>
            <Col md={2}>Eye Specialist</Col>
            <Col md={2}>Heart Specialist</Col>

        </Row>
      </Container>
    </div>
  );
};

export default PatientNavbar;
