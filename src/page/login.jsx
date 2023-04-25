import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Alert } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import useApi from "../helpers/useApi";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/reducer/user";
import MyNavbar from "../components/myNavbar";


function Login() {
  const { isAuth } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const api = useApi();
  const navigate = useNavigate();
  const [User, setUser] = useState({
    email: "demo@email.com",
    password: "demouser123",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const onChangeInput = (event) => {
    event.preventDefault();
    const data = { ...User };
    data[event.target.name] = event.target.value;
    setUser(data);
  };

  async function doLogin(event) {
    event.preventDefault();
    try {
      const res = await api.requests({
        method: "POST",
        url: "/auth/login",
        data: User,
      });
      const data = res.data.result[0];
      dispatch(login(data.token));
    } catch (err) {
      setErrorMessage(err.response.data.result);
    }
  }

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth]);
  return (
    <>
    <MyNavbar />
    <div className="bg-light min-vh-100 d-flex align-items-top justify-content-center">
      <Container className="py-5 px-4">
        <Row className="justify-content-center">
          <Col md={6} lg={4}>
            <h1 className="text-center mb-4">Login first!</h1>
            <p className="text-center mb-4">Before go to dashboard, login first.</p>
            <Form onSubmit={doLogin}>
              <Form.Group controlId="email" className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={onChangeInput}
                  value={User.email}
                />
              </Form.Group>

              <Form.Group controlId="password" className="mb-4">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={onChangeInput}
                  value={User.password}
                />
              </Form.Group>

              {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

              <Button
                variant="primary"
                type="submit"
                onClick={doLogin}
                className="w-100 mb-3"
              >
                Login
              </Button>
            </Form>

            <p className="text-center mt-3">
              Not registered yet? <a href="/signup">Create an account</a>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
    </>
  );
}

export default Login;
