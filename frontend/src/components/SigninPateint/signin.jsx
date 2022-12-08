import React from "react";
import { Link } from "react-router-dom";
import "./siginP.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCookies from "react-cookie/cjs/useCookies";
import { Modal } from "react-bootstrap";
import loginImg from "../../assets/s-2.png"

const SignIn = () => {
  const [cookies, setCookie] = useCookies(["user"]);
  const navigate = useNavigate();
  const [resStatus, setresStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });

    console.log(formData);
  };

  const postData = () => {
    if (formData.email !== "" && formData.password !== "") {
      const data = JSON.stringify({
        email: formData.email,
        password: formData.password,
      });

      fetch("http://localhost:5000/api/user/signinPat", {
        method: "post",

        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",

          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data,
      })
        .then((res) => {
          setresStatus(res.status);
          if (res.status === 200) return res.json();
          else throw new Error(res.status);
        })
        .then((resBody) => {
          console.log(resBody);
          if (resBody.nextroute === "/verification") 
          {
          setCookie("token", resBody.authToken, { path: "/" });
          setCookie("username", resBody.username, { path: "/" });

            navigate(`${resBody.nextroute}`, {
              state: { email: resBody.email },
            });

          } 
          else if (resBody.nextroute === "/signup" || resBody.nextroute ==='/signin') 
          {
            setErrorMessage('Invalid email or password');
            handleShow();
          }
          else if(resBody.nextroute==='/')
          {
          setCookie("username", resBody.email, { path: "/" });
          setCookie("token", resBody.authToken, { path: "/" });
          navigate('/PatientDashBoard', {state: { email: resBody.email }});
          }
        })
        .catch((err) => {
          console.log("error: " + err);
          navigate("/signup");
          setErrorMessage(`ERROR: ${resStatus}`);
          handleShow();
        })
        .finally(() => {
          setFormData({
            email: "",
            password: "",
          });
        });
    }
  };

  return (
    <div>
      <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src={loginImg} alt="menu image"
                className="img-fluid"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form>
                <div className="divider d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0 fs-4">
                    <span style={{ color: "#2f96db" }}>
                      <span className="fs-3">D</span>oc
                    </span>
                    <span className="fs-3">A</span>dvisor.com
                  </p>
                </div>
                <div className="fs-1 d-flex justify-content-center align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0">Sign in</p>
                </div>

                {/*<!-- Email input -->*/}
                <div className="form-outline mb-4">
                  <label className="form-label" for="form3Example3">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="form3Example3"
                    name="email"
                    className="form-control form-control-md"
                    placeholder="Enter a valid email address"
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                {/*<!-- Password input -->*/}
                <div className="form-outline mb-3">
                  <label className="form-label" for="form3Example4">
                    Password
                  </label>
                  <input
                    type="password"
                    id="form3Example4"
                    name="password"
                    className="form-control form-control-md"
                    placeholder="Enter password"
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  {/*<!-- Checkbox -->*/}

                  <Link to={"/signin/forget/v1Pat"} className="text-body">
                    Forgot password?
                  </Link>
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="button"
                    className="btn btn-lg fw-bold px-4 py-2 "
                    style={{ color: "white", backgroundColor: "#2f96db" }}
                    onClick={postData}
                  >
                    Login
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Don't have an account?{" "}
                    <Link to={"/signup"} className="link-info">
                      Register
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-colorP">
          {/*<!-- Copyright -->*/}
          <div className="text-white mb-3 mb-md-0">
            Copyright © 2022. All rights reserved.
          </div>
          {/*<!-- Copyright -->*/}

          {/*<!-- Right -->
    <div>
      <a href="#!" className="text-white me-4">
        <i className="fab fa-facebook-f"></i>
      </a>
      <a href="#!" className="text-white me-4">
        <i className="fab fa-twitter"></i>
      </a>
      <a href="#!" className="text-white me-4">
        <i className="fab fa-google"></i>
      </a>
      <a href="#!" className="text-white">
        <i className="fab fa-linkedin-in"></i>
      </a>
    </div>
    {/*<!-- Right -->*/}
        </div>
      </section>

      {/* error modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorMessage}</Modal.Body>
      </Modal>
    
    </div>
  );
};

export default SignIn;
