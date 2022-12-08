import { React, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
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
import { Link } from "react-router-dom";
import { Cookies } from "react-cookie";

import logo from "../../assets/logo.svg";
const PatientNavbar = () => {
  
  const cookies = new Cookies();
  const [doctors, setDoctors] = useState([1, 2]);
  const [appointmentModel, setappointmentModel] = useState({
    name: "",
    city: "",
    fee: "",
    email: "",
  });
  const [username, setUserName]= useState();
  useEffect(()=>{

    const mail = cookies.get("username");
    setUserName(mail);

  },[])
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [slots, setSlots] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (doctor) => {
    setappointmentModel({
      name: doctor.name,
      city: doctor.city,
      fee: doctor.fee,
      email: doctor.email,
    });
    setShow(true);
  };

  const [city, setcity] = useState("")
  const [type, setType] = useState("")
  const fetchDoctors = () => {



    const data = JSON.stringify({city, type})
    fetch("http://localhost:5000/api/user/fetchdoctors", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        //"auth-token": token,
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
        setDoctors(resBody.Doctors);
      })
      .catch((err) => {});
  };
  /* hook to fetch all doctors */
  useEffect(() => {
    fetchDoctors();
  }, []);

  const bookSlot = () => {
    if (slot !== "Avialable Slots") {
      const token = cookies.get("token");
      console.log(token);
      const data = JSON.stringify({
        slot,
        date,
        email: appointmentModel.email,
      });

      fetch("http://localhost:5000/api/user/bookslot", {
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
          console.log(resBody.message);
        })
        .catch((err) => {});
    }
  };
  /* fetch slots */
  const fetchSlots = (e) => {
    setDate(e.target.value);
  };
  useEffect(() => {
    if (date !== "") {
      const data = JSON.stringify({ date, email: appointmentModel.email });
      fetch("http://localhost:5000/api/user/fetchslots", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          //"auth-token": token,
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
          setSlots(resBody.slots);
        })
        .catch((err) => {});
    }
  }, [date]);

  const [comments, setComments] = useState([]);
  const [replies, setreplies] = useState([]);
  const [replyCommentid, setreplyCommentid] = useState([]);
  const [ratingid, setRatingid] = useState([]);

  const [rating, setRating] = useState([]);

  const fetchComments = (obj) => {
    const token = cookies.get("token");
    console.log(token);
    const data = JSON.stringify({ Did: obj.email });
    fetch("http://localhost:5000/api/user/fetchAllComments", {
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
        if (res.status === 200) return res.json();
        else throw new Error(res.status);
      })
      .then((resBody) => {
        console.log(resBody.message);
        setComments(resBody.data);
          fetch("http://localhost:5000/api/user/rating", {
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
              if (res.status === 200) return res.json();
              else throw new Error(res.status);
            })
            .then((resBody) => {
              console.log(resBody.rating);
              setRatingid([...ratingid, obj.email])
              setRating({email: obj.email, rating:resBody.rating});
              console.log(rating);
            })
            .catch((err) => {});
        
      })
      .catch((err) => {});
  };

  const fetchreply = (obj) => {
    if (!replyCommentid.includes(obj.id)) {
      const token = cookies.get("token");
      console.log(token);
      const data = JSON.stringify({ Cid: obj.id });
      fetch("http://localhost:5000/api/user/fetchreply", {
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
          if (res.status === 200) return res.json();
          else throw new Error(res.status);
        })
        .then((resBody) => {
          console.log(resBody.message);
          setreplies((prev) => {
            return [...prev, ...resBody.data];
          });
          setreplyCommentid([...replyCommentid, obj.id]);
          console.log(replyCommentid, replyCommentid.includes(obj.id));
        })
        .catch((err) => {});
    }
  };

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

                <NavDropdown
                  className="me-4"
                  title="Labs"
                  id="lab-nav-dropdown"
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
                <Nav.Link>
                  <Link
                    to="/appointments"
                    className="me-4 text-decoration-none"
                  >
                    Appointments
                  </Link>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Container>
        <div className='pe-4 d-flex'><img src={userlogo} alt="" className="pe-1"/>{username}</div>
      </Navbar>

      {/* Jumbotron */}
      <div className="jumbotron py-5 px-5 text-wrap text-center">
        <div className="fs-1 mt-2">
          Find and book the <span className="important">best doctor</span> near
          you
        </div>

        <div className="mb-4 mt-4">
          <InputGroup>
            <Form.Control aria-label="Location" placeholder="Enter city" value={city} onChange={(e)=> setcity(e.target.value)}/>
            <Form.Control
              aria-label="doctor"
              placeholder="Search doctors by concern"
              value={type} onChange={(e)=> setType(e.target.value)}
            />
            <InputGroup.Text id="searchDoc">
              <Button className="px-5" variant="warning" onClick={fetchDoctors}>
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

      {/* doctors with concern */}

      <Container className="text-center">
        <div className="text-wrap fs-3 mb-3">Find Doctors by concern</div>
        <Row>
          <Col md={2} onClick={()=>setType("Gynecologist")}>Gynecologist</Col>
          <Col md={2} onClick={()=>setType("Skin Specialist")}>Skin Specialist</Col>
          <Col md={2} onClick={()=>setType("Child Specialist")}>Child Specialist</Col>
          <Col md={2} onClick={()=>setType("Diagnostics")}>Diagnostics</Col>
          <Col md={2} onClick={()=>setType("Eye Specialist")}>Eye Specialist</Col>
          <Col md={2} onClick={()=>setType("Heart Specialist")}>Heart Specialist</Col>
        </Row>
      </Container>

      {/*--- doctors card ---*/}
      <Container className="mb-5">
        {doctors.map((doctor) => (
          <Card className="my-3" key={doctor.id}>
            <Card.Body>
              <Row className="align-item-center">
                <Col md={2}>
                  <img
                    src={`http://localhost:5000/${doctor.filename}`}
                    className="img-fluid"
                    style={{
                      width: "4rem",
                      height: "4rem",
                      borderRadius: "2rem",
                      backgroundColor: "black",
                    }}
                    alt=""
                  />
                </Col>
                <Col md={8}>
                  <div className="fs-5 fw-bold">{doctor.name}</div>
                  <div className="" style={{ fontSize: "1rem" }}>
                    {doctor.specialization}
                  </div>
                  <div className="" style={{ fontSize: "0.9rem" }}>
                    {doctor.qualification}
                  </div>
                  <div className="mb-3" style={{ fontSize: "0.8rem" }}>
                    <strong>{doctor.experience} Years Experience</strong>
                    <span className="fs-5"> | </span>
                    <strong>Fee {doctor.fee}</strong>
                  </div>
                </Col>
                <Col md={2}>
                  <div className="mb-2">
                    <Button
                      size="sm px-2 py-2 fw-bold"
                      variant="primary"
                      style={{ fontSize: ".75rem", color: "white" }}
                      onClick={() => handleShow(doctor)}
                    >
                      Book Appointment
                    </Button>
                  </div>
                </Col>
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header
                      variant="Light"
                      style={{
                        fontSize: ".6rem",
                      }}
                      onClick={() => {
                        console.log("fetch");
                        fetchComments(doctor);
                      }}
                    >
                      Details
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="star-rating py-2">
                        {[...Array(5)].map((star, index) => {
                          index += 1;
                          return (
                            <button
                              type="button"
                              key={index}
                              className={
                                index <=
                                (rating.rating)
                                  ? "on"
                                  : "off"
                              }
                              style={{ padding: "0.1rem", margin: "0rem" }}
                            >
                              <span className="star">&#9733;</span>
                            </button>
                          );
                        })}
                        {}
                      </div>
                      {/* comments */}
                      <Container className="px-4">
                        {comments.map((cmt) => {
                          if (cmt.Doctorid === doctor.email) {
                            return (
                              <Alert
                                variant="light"
                                style={{
                                  fontSize: ".75rem",
                                  backgroundColor: "#D3D3D3",
                                }}
                              >
                                <div
                                  className="fw-bold mb-1"
                                  style={{ fontSize: ".8rem" }}
                                >
                                  {cmt.Date}
                                </div>
                                <div className="ps-3">{cmt.Comment}</div>
                                <Alert.Link onClick={() => fetchreply(cmt)}>
                                  replies
                                </Alert.Link>
                                {replies.map((r) => {
                                  if (r.Commentid === cmt.id) {
                                    return (
                                      <div>
                                        <div
                                          className="fw-bold mb-1"
                                          style={{ fontSize: ".8rem" }}
                                        >
                                          Replied by {r.ReplyBy}
                                        </div>
                                        <div className="ps-3">{r.Reply}</div>
                                      </div>
                                    );
                                  }

                                  return null;
                                })}
                              </Alert>
                            );
                          } else return null;
                        })}
                      </Container>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Row>
            </Card.Body>
          </Card>
        ))}
      </Container>

      {/*---modal for appointment */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{appointmentModel.name}'s appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Text className="text-muted fs-5">
              {appointmentModel.city}
            </Form.Text>
            <br />
            <Form.Text className="text-muted fw-bold">
              {appointmentModel.fee}
            </Form.Text>

            <Form.Group className="mb-3 mt-4" controlId="formBasicEmail">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => fetchSlots(e)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Time</Form.Label>
              <Form.Select
                value={slot}
                onChange={(e) => {
                  console.log(e.target.value);
                  setSlot(e.target.value);
                }}
              >
                <option>Avialable Slots</option>
                {slots.map((s) => (
                  <option>{s.slot}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              style={{ fontSize: "1rem", color: "white" }}
              onClick={() => bookSlot()}
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
};

export default PatientNavbar;
