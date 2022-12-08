import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import useCookies from "react-cookie/cjs/useCookies";
import Cookies from "universal-cookie";

import { Modal } from "react-bootstrap";


const ForgetPassword2 = () => {
  const cookies = new Cookies();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [codeInput, setCodeInput] = useState({ code: "" });
  const [resStatus, setresStatus] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state.email;
  const handleChange = (e) => {
    setCodeInput({ code: e.target.value });

    console.log(codeInput);
  };

  const postCode = () => {
    console.log(codeInput);
    const token = cookies.get("token");
    console.log(token);
    const data = JSON.stringify(codeInput);
    console.log(data);


    fetch("http://localhost:5000/api/user/signin/forget/v2Pat", {
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
        setresStatus(res.status);
        if (res.status === 200) return res.json();
        else throw new Error(res.status);
      })
      .then((resBody) => {
        console.log(resBody);
        if (resBody.verifybit === 1) 
            navigate(`${resBody.nextroute}`, {
                state: { email: location.state.email },
              });
        else if (resBody.verifybit === 0) {
          navigate(`${resBody.nextroute}`, {
            state: { email: location.state.email },
          });
          setErrorMessage("Invalid code entered");
          handleShow();
        }
      })
      .catch((err) => {
        //console.log("error: " + err);
        navigate("/signin/forget/v2Pat", {
          state: { email: location.state.email },
        });
        setErrorMessage('Internal Server Error');
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
                        Recovery Code
                      </p>
                      <p className="text-start h5 mb-5 mx-1 mx-md-4 mt-4">
                        Enter recovery code for {email}
                      </p>

                      <form className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label
                              className="form-label"
                              hmtlfor="form3Example1c"
                            >
                              <strong> Verification Code </strong>
                            </label>
                            <input
                              type="text"
                              id="form3Example1c"
                              className="form-control"
                              name="name"
                              onChange={(e) => handleChange(e)}
                              value={codeInput.code}
                              required
                            />
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                         {/* <button
                            type="button"
                            className="btn btn-primary btn-lg me-2"
                          >
                            Resend code
                        </button>*/}
                          <button
                            type="button"
                            className="btn btn-primary btn-lg"
                            onClick={postCode}
                          >
                            Verify
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-7 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://d1t78adged64l7.cloudfront.net/frontend/assets/images/s-2.png"
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

export default ForgetPassword2;
