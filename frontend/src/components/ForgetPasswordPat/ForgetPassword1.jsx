import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import useCookies from "react-cookie/cjs/useCookies";

import Cookies from "universal-cookie";
import loginImg from "../../assets/s-2.png"

import { Modal } from "react-bootstrap";

const ForgetPassword1 = () => {
  const getcookies = new Cookies();
  const [cookies, setCookie] = useCookies(['user']);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [accountInput, setaccountInput] = useState({ email: "" });
  const [resStatus, setresStatus] = useState();
 // const location = useLocation();
  const navigate = useNavigate();
  //const email = location.state.email;
  const handleChange = (e) => {
    setaccountInput({ email: e.target.value });

    console.log(accountInput);
  };



  const postEmail = () => {
    console.log(accountInput);
    const data = JSON.stringify(accountInput);
    console.log(data);

    
    fetch("http://localhost:5000/api/user/signin/forget/v1Pat", {
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
        if(resBody.validMail===1)
        {
          setCookie("token", resBody.authToken, { path: "/" });
          navigate(`${resBody.nextroute}`,{
          state: { email: resBody.email },
        });
        }
        else if(resBody.validMail===0)
        {
          setErrorMessage('enter valid email');
          handleShow();
        }
        
      })
      .catch((err) => {
        console.log("error: " + err);
        navigate("/signin/forget/v1Pat");
        //setErrorMessage(`ERROR: ${resStatus}`);
        // handleShow();
      });
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
                      <p className="text-center h2 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Account recovery
                      </p>
                      <p className="text-start mb-5 mx-1 mx-md-4 mt-4">
                        Enter your email to get recovery code
                      </p>

                      <form className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label
                              className="form-label"
                              hmtlfor="form3Example1c"
                            >
                              <strong>Email</strong>
                            </label>
                            <input
                              type="email"
                              id="form3Example1c"
                              className="form-control"
                              name="name"
                              onChange={(e) => handleChange(e)}
                              value={accountInput.email}
                              required
                            />
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          {/*<button
                            type="button"
                            className="btn btn-primary btn-lg me-2"
                          >
                            Resend code
                          </button>*/}
                          <button
                            type="button"
                            className="btn btn-primary btn-lg"
                            onClick={postEmail}
                          >
                            Send
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-7 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src={loginImg}
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

export default ForgetPassword1;
