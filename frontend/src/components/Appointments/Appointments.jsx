import { React, useEffect, useState } from "react";
import {
  Container,
  Navbar,
  Nav,
  Accordion,
  Alert,
  Form,
  InputGroup,
} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Cookies from "universal-cookie";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import userlogo from "../../assets/stethoscope.png";

const Appointments = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const [appointment, setappointment] = useState([]);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [replies, setreplies] = useState([]);
  const [replyCommentid, setreplyCommentid] = useState([]);


  const [username, setUserName]= useState();
  useEffect(()=>{

    const mail = cookies.get("username");
    setUserName(mail);

  },[])
  /* fecth all appointments */
  const fetchappointments = () => {
    const token = cookies.get("token");
    console.log(token);

    fetch("http://localhost:5000/api/user/fetchappointments", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "auth-token": token,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((res) => {
        if (res.status === 200) return res.json();
        else throw new Error(res.status);
      })
      .then((resBody) => {
        setappointment(resBody.data);
        console.log(resBody.data);
      })
      .catch((err) => {});
  };
  useEffect(() => {
    fetchappointments();
  }, []);

  const addcomment = (obj) => {
    if (comment !== "") {
      let currentDate = new Date().toJSON().slice(0, 10);

      const token = cookies.get("token");
      console.log(token);
      const data = JSON.stringify({
        date: currentDate,
        comment,
        Did: obj.email,
      });
      fetch("http://localhost:5000/api/user/addcomment", {
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
          setComment("");
          fetchComments(obj);
        })
        .catch((err) => {});
    }
  };

  const updateRating = (id, index) => {
    const token = cookies.get("token");
    console.log(token);
    const data = JSON.stringify({
      id,
      rating: index,
    });
    fetch("http://localhost:5000/api/user/updaterating", {
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
        setRating(0);
        fetchappointments();
      })
      .catch((err) => {});
  };

  const fetchComments = (obj) => {
    const token = cookies.get("token");
    console.log(token);
    const data = JSON.stringify({ Did: obj.email });
    fetch("http://localhost:5000/api/user/fetchcomment", {
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
              onClick={() => navigate("/")}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Container>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
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
      <Container className="m-5">
        {appointment.map((ap, i) => (
          <Card style={{}} key={ap.id} className="my-4">
            <Card.Body>
              <Card.Header className="fw-bold">Appointment {i + 1}</Card.Header>
              <Card.Text className="container pt-2">
                <div>Doctor's mail: {ap.email}</div>
                <div>Date: {ap.date}</div>
                <div>Time: {ap.slot}</div>
              </Card.Text>
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header
                    variant="Light"
                    style={{
                      fontSize: ".6rem",
                    }}
                    onClick={() => {
                      console.log("fetch");
                      fetchComments(ap);
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
                              index <= (hover || ap.rating || rating)
                                ? "on"
                                : "off"
                            }
                            onClick={() => {
                              setRating(index);
                              updateRating(ap.id, index);
                            }}
                            onMouseEnter={() => setHover(index)}
                            onMouseLeave={() => setHover(rating)}
                            style={{ padding: "0.1rem", margin: "0rem" }}
                          >
                            <span className="star">&#9733;</span>
                          </button>
                        );
                      })}
                      {}
                    </div>
                    {/* add comment */}
                    <InputGroup className="mb-3">
                      <Form.Control
                        placeholder="Write a comment here"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <Button
                        variant="warning"
                        className="fs-5 px-4"
                        style={{ color: "white" }}
                        id="button-addon2"
                        onClick={() => addcomment(ap)}
                      >
                        Add
                      </Button>
                    </InputGroup>

                    {/* comments */}
                    <Container className="px-4">
                      {comments.map((cmt) => {
                        if (cmt.Doctorid === ap.email) {
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
            </Card.Body>
          </Card>
        ))}
      </Container>
    </div>
  );
};

export default Appointments;
