import React from "react";
import { useState } from "react";
import "./signup.css";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import useCookies from "react-cookie/cjs/useCookies";
import menuImg from "../../assets/s-2.png"






const SignUp = () => {

  const [cookies, setCookie] = useCookies(['user']);
  const navigate = useNavigate();
  const [resStatus, setresStatus]= useState(null); 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [profilePic, setProfilePic] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /*handle form input*/
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });

    console.log(formData);
  };

  const uploadfile = (e) => {
    setProfilePic(e.target.files[0]);
    console.log(profilePic);
  };

  const postFormData = () => {
    if (
      formData.name !== "" &&
      formData.email !== "" &&
      formData.city !== "" &&
      formData.phoneNumber !== "" &&
      formData.password !== "" &&
      formData.confirmPassword !== "" &&
      profilePic !== null
    ) {
      if (formData.password === formData.confirmPassword) {
        if (
          /^[0-9]+$/.test(formData.phoneNumber) &&
          formData.phoneNumber.length === 11
        ) {
          /* apply fetch api here to send data */
          let data = new FormData();
          data.append("profilepic", profilePic);
          data.append("name", formData.name);
          data.append("email", formData.email);
          data.append("city", formData.city);
          data.append("phoneNumber", formData.phoneNumber);
          data.append("password", formData.password);
        
        
          fetch("http://localhost:5000/api/user/signUpPat", {
            method: "post",
            body: data,
            
          })
            .then((res) => {
              setresStatus(res.status);
              if (res.status === 200) return res.json();
              else throw new Error(res.status);
            })
            .then((resBody) => {
              console.log(resBody);
              setCookie('token', resBody.authToken,{path:'/'});
              navigate('/verification',{state:{email:resBody.email}});

            })
            .catch((err) => {
              console.log("error: " + err);
              navigate("/signupPat");
              setErrorMessage(`ERROR: ${resStatus}`);
              handleShow();
            })
            .finally(()=>{ setFormData({
              name: "",
              email: "",
              city: "",
              phoneNumber: "",
              password: "",
              confirmPassword: "",
            }) })
        } else {
          setErrorMessage("Enter valid phone nummber ");
          handleShow();
        }
      } else {
        setErrorMessage("Password miss match");
        handleShow();
      }
    } else {
      setErrorMessage("Fill all fields");
      handleShow();
    }
  };

  return (
    <div>
      <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div
                className="card text-black my-4"
                style={{ borderRadius: "25px" }}
              >
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Sign up as
                        <br />
                        Patient
                      </p>

                      <form className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label
                              className="form-label"
                              hmtlfor="form3Example1c"
                            >
                              Name
                            </label>
                            <input
                              type="text"
                              id="form3Example1c"
                              className="form-control"
                              name="name"
                              onChange={(e) => handleChange(e)}
                              value={formData.name}
                              required
                            />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label
                              className="form-label"
                              hmtlfor="form3Example3c"
                            >
                              Email
                            </label>
                            <input
                              type="email"
                              id="form3Example3c"
                              className="form-control"
                              name="email"
                              onChange={(e) => handleChange(e)}
                              value={formData.email}
                              required
                            />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label
                              className="form-label"
                              hmtlfor="form3Example1c"
                            >
                              City
                            </label>
                            <input
                              type="text"
                              id="form3Example1c"
                              className="form-control"
                              name="city"
                              onChange={(e) => handleChange(e)}
                              required
                              value={formData.city}
                            />
                          </div>
                        </div>


                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label
                              className="form-label"
                              hmtlfor="form3Example1c"
                            >
                              Phone number
                            </label>
                            <input
                              type="text"
                              id="form3Example1c"
                              className="form-control"
                              name="phoneNumber"
                              onChange={(e) => handleChange(e)}
                              required
                              value={formData.phoneNumber}
                            />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label
                              className="form-label"
                              hmtlfor="form3Example4c"
                            >
                              Profile Pic
                            </label>
                            <input
                              type="file"
                              id="form3Example4c"
                              className="form-control"
                              name="profilepic"
                              required
                              onChange={(e) => uploadfile(e)}
                            />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label
                              className="form-label"
                              hmtlfor="form3Example4c"
                            >
                              Password
                            </label>
                            <input
                              type="password"
                              id="form3Example4c"
                              className="form-control"
                              name="password"
                              onChange={(e) => handleChange(e)}
                              required
                              value={formData.password}
                            />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label
                              className="form-label"
                              hmtlfor="form3Example4cd"
                            >
                              Confirm password
                            </label>
                            <input
                              type="password"
                              id="form3Example4cd"
                              className="form-control"
                              name="confirmPassword"
                              onChange={(e) => handleChange(e)}
                              required
                              value={formData.confirmPassword}
                            />
                          </div>
                        </div>

                        <div className="form-check d-flex justify-content-center mb-5">
                          <input
                            className="form-check-input me-2"
                            type="checkbox"
                            value=""
                            id="form2Example3c"
                          />
                          <label
                            className="form-check-label"
                            hmtlfor="form2Example3"
                          >
                            I agree all statements in{" "}
                            <a href="#!">Terms of service</a>
                          </label>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="button"
                            className="btn btn-primary btn-lg"
                            onClick={postFormData}
                          >
                            Register
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src={menuImg}
                        className="img-fluid"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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

export default SignUp;
