import React, { useState, useEffect } from "react";
import { Button, Col, Container, Form, Row, Alert } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

import useApi from "../helpers/useApi";
import { useDispatch, useSelector } from "react-redux";
import MyNavbar from "../components/myNavbar";
import { login } from "../store/reducer/user";

const Signup = () => {
  const { isAuth } = useSelector((state) => state.user);
  const api = useApi();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [User, setUser] = useState({
    name: "",
    email: "",
    gender: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const onChangeInput = (event) => {
    event.preventDefault();
    const data = { ...User };
    data[event.target.name] = event.target.value;
    setUser(data);
  };

  const register = async (event) => {
    event.preventDefault();
    try {
      const res = await api.requests({
        method: "POST",
        url: "/auth/register",
        data: User,
      });
      const data = res.data.result[0];
      console.log(data);
      dispatch(login(data.token));
    } catch (err) {
      setErrorMessage(err.response.data.result);
    }
  };
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
            <h1 className="text-center mb-4">Create ur account</h1>
            <p className="text-center mb-4">Bit fun if you try several validation scenario</p>
            <Form onSubmit={register}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Full Name"
                  name="name"
                  onChange={onChangeInput}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={onChangeInput}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Select name="gender" onChange={onChangeInput} required>
                  <option>Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={onChangeInput}
                  required
                />
              </Form.Group>

              {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

              <Button type="submit " variant="primary" className="w-100 mb-3">
                Register
              </Button>
            </Form>

            <p className="text-center mt-3">
              Have registered? <a href="/login">Login instead</a>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
    </>
  );
};

export default Signup;
