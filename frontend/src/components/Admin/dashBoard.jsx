import React from "react";
import { useLocation } from "react-router-dom";
import  {useState} from 'react'
import userlogo from '../../assets/stethoscope.png'
import "./navbar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import dashboardcss from "./dashboard.css";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useNavigate} from "react-router-dom"

import logo from "../../assets/logo.svg"
const PatientNavbar = ({socket}) => {
  /*---User Name---*/
  
  const navigate = useNavigate()
  const [userName, setUserName] = useState("");

  const handleSubmit = (e) => {
      setUserName("ADMIN@123");
      let name="ADMIN123";
      e.preventDefault()
      localStorage.setItem("userName", name)
      socket.emit("newUser", {name, socketID: socket.id})
      navigate("/chat")
  }


  
  return (
    <div>
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
                  <NavDropdown.Item href="/removeDoc">Remove Doctor</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">Check Doctor</NavDropdown.Item>
                
           
                </NavDropdown>

                <NavDropdown title="Labs" id="lab-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Remove Lab</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">Check Lab</NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Chat" id="chat-nav-dropdown">
                  <NavDropdown.Item onClick={handleSubmit}>CHAT</NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Insert Medicine" id="chat-nav-dropdown">
                  <NavDropdown.Item href="/insertMed">Insert Medicine</NavDropdown.Item>
                </NavDropdown>



              </Nav>
            </Navbar.Collapse>
          </Container>
          
        </Container>
        <div className='pe-4 d-flex' style={{color:"#12126a",fontWeight: 'bold'}}><img src={userlogo} alt="" className="pe-1"/>ADMIN</div>

      </Navbar>

      <h1 className="textmain"> ADMIN</h1>
      <h1 className="textmain1"> MODULE</h1>



  
    </div>
  );
};

export default PatientNavbar;
