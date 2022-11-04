import React from "react";
import { Container,Row,Col, Form } from "react-bootstrap";

const SignIn = () => {

    
  return (
    <div>
      <Row>
        <Col md={4}>
          <Container>
            <Form>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextEmail"
              >
                <Form.Label column sm="2">
                  Email
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    plaintext
                    readOnly
                    defaultValue="email@example.com"
                  />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="2">
                  Password
                </Form.Label>
                <Col sm="10">
                  <Form.Control type="password" placeholder="Password" />
                </Col>
              </Form.Group>
              
            </Form>
          </Container>
        </Col>
      </Row>
    </div>
  );
};

export default SignIn;
